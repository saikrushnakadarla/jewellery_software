import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Modal, Form, Overlay, Popover, Table } from 'react-bootstrap';
import { FaEye, FaTrash} from 'react-icons/fa';
import { FiAlignJustify } from 'react-icons/fi';
import DataTable from '../../../Pages/InputField/TableLayout';
import './RepairsTable.css';
import { saveToLocalStorage, getFromLocalStorage, clearLocalStorage } from './LocalStorageUtils';
import baseURL from '../../../../Url/NodeBaseURL';

const RepairsTable = () => {
  const navigate = useNavigate();
  const [repairs, setRepairs] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverData, setPopoverData] = useState({ repairId: null, target: null });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    metal_type: '',
    description: '',
    weight: '',
    qty: '',
    rate_type: '',
    rate: '',
  });
  const [localDetails, setLocalDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch repairs

    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/repairs`);
        setRepairs(response.data);
      } catch (error) {
        console.error('Error fetching repairs:', error);
      }
    };
  useEffect(() => {
    fetchRepairs();
  }, []);

  useEffect(() => {
    const storedDetails = getFromLocalStorage('repairDetails') || [];
    setLocalDetails(storedDetails);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handlePopoverToggle = (event, repairId) => {
    setPopoverData({
      repairId,
      target: event.target,
    });
    setShowPopover((prev) => popoverData.repairId !== repairId);
  };

  const handleReceiveFromWorkshop = () => {
    setShowPopover(false);
    setShowModal(true);
  };

  const handleUpdateStatus = async (repairId, status) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to update the status?");
  
    if (!isConfirmed) {
      return; // If user cancels, exit the function
    }
  
    try {
      const response = await axios.post(`${baseURL}/update/repair-status/${repairId}`, {
        repair_id: repairId,
        status,
      });
  
      if (response.status === 200) {
        setRepairs((prev) =>
          prev.map((repair) =>
            repair.repair_id === repairId ? { ...repair, status } : repair
          )
        );
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return ''; // Return an empty string if no date is provided
  
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  // Pad single digit days with 0
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Pad months with 0
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Repair No', accessor: 'repair_no' },
      { Header: 'Customer Name', accessor: 'name' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Entry Type', accessor: 'entry_type' },
      { Header: 'Item Name', accessor: 'item' },
      { Header: 'Metal Type', accessor: 'metal_type' },
      { Header: 'Purity', accessor: 'purity' },
      { Header: 'Total', accessor: 'total' },

      {
        Header: 'Delivery Date',
        accessor: 'delivery_date',
        Cell: ({ value }) => <span>{formatDate(value)}</span>, // Format birthday date
      },
      { Header: 'Counter', accessor: 'counter' },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'ACTION',
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button
              className="action-button view-button"
              onClick={() => navigate(`/repairsview/${row.original.repair_id}`)}
            >
              <FaEye />
            </button>
            <button
              className="action-button delete-button"
              onClick={() => handleDeleteRepair(row.original.repair_id)}
            >
              <FaTrash />
            </button>
            <button
              className="action-button sticky-note-button"
              onClick={(e) => handlePopoverToggle(e, row.original.repair_id)}
            >
              <FiAlignJustify />
            </button>
          </div>
        ),
      },
      
    ],
    [popoverData.repairId]
  );

  const handleDeleteRepair = async (repairId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this repair?");
    if (!isConfirmed) {
      return; // Exit if the user cancels
    }
  
    try {
      const response = await axios.delete(`${baseURL}/delete/repairs/${repairId}`);
      if (response.status === 200) {
        alert(response.data.message);
  
        // Update the state to remove the deleted repair
        setRepairs((prevRepairs) => prevRepairs.filter((repair) => repair.repair_id !== repairId));
      }
    } catch (error) {
      console.error('Error deleting repair:', error.message);
      alert('Failed to delete repair entry. Please try again.');
    }
  };
  
  const handleAddToLocalDetails = () => {
    if (editIndex !== null) {
      const updatedDetails = [...localDetails];
      updatedDetails[editIndex] = formData;
      setLocalDetails(updatedDetails);
      setEditIndex(null);
    } else {
      setLocalDetails([...localDetails, formData]);
    }
    setFormData({ metal_type: '', description: '', weight: '', qty: '', rate_type: '', rate: '' });
  };

  const handleEdit = (index) => {
    setFormData(localDetails[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDetails = localDetails.filter((_, i) => i !== index);
    setLocalDetails(updatedDetails);
  };

  const handleSubmitDetails = async () => {
    if (localDetails.length === 0) {
        alert('No details to submit');
        return;
    }

    // Calculate totals
    const totalWeight = localDetails.reduce((total, detail) => total + Number(detail.weight || 0), 0);
    const totalQty = localDetails.reduce((total, detail) => total + Number(detail.qty || 0), 0);
    const totalPrice = localDetails.reduce((total, detail) => total + (Number(detail.qty || 0) * Number(detail.rate || 0)), 0);

    const updatedDetails = localDetails.map((detail) => ({
        ...detail,
        overall_weight: totalWeight,
        overall_qty: totalQty,
        overall_total: totalPrice,
    }));

    try {
        await axios.post(`${baseURL}/add/repair-details`, {
            repair_id: popoverData.repairId,
            details: updatedDetails,
        });

        clearLocalStorage('repairDetails');
        setLocalDetails([]);
        setRepairs((prev) =>
            prev.map((repair) =>
                repair.repair_id === popoverData.repairId
                    ? { ...repair, status: 'Receive from Workshop' }
                    : repair
            )
        );

        setShowModal(false);
        // Refresh the page after successful submission
        window.location.reload();
    } catch (error) {
        console.error('Error submitting details:', error);
    }
};

  return (
    <div className="main-container">
      <div className="repairs-table-container">
        <Row className="mb-4">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Repairs</h3>
            <Button
              className="create_but"
              onClick={() => navigate('/repairs')}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={[...repairs].reverse()} />
        {/* Popover */}
        <Overlay
          show={showPopover}
          target={popoverData.target}
          placement="bottom"
          containerPadding={10}
          rootClose
          onHide={() => setShowPopover(false)}
        >
          <Popover>
            <Popover.Body>
              <ul className="popover-options">
                <li
                  onClick={() => {
                    handleUpdateStatus(popoverData.repairId, 'Assign To Workshop');
                    setShowPopover(false);
                  }}
                >
                  Assign to Workshop
                </li>
                <li onClick={handleReceiveFromWorkshop}>Receive from Workshop</li>
                <li
                  onClick={() => {
                    handleUpdateStatus(popoverData.repairId, 'Delivery to Customer');
                    setShowPopover(false);
                  }}
                >
                  Delivery to Customer
                </li>
              </ul>
            </Popover.Body>
          </Popover>
        </Overlay>

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Receive from Workshop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  <Form>
    <Row>
      <Col md={6}>
        <Form.Group controlId="formMetalType">
          <Form.Label>Metal Type</Form.Label>
          <Form.Control
            type="text"
            name="metal_type"
            value={formData.metal_type}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <Form.Group controlId="formWeight">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formQty">
          <Form.Label>Qty</Form.Label>
          <Form.Control
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <Form.Group controlId="formRateType">
          <Form.Label>Rate Type</Form.Label>
          <Form.Select
            name="rate_type"
            value={formData.rate_type}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Per Qty">Per Qty</option>
            <option value="Per Weight">Per Weight</option>
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formRate">
          <Form.Label>Rate</Form.Label>
          <Form.Control
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Col>
    </Row>
    <Button className="mt-3" onClick={handleAddToLocalDetails}>
      Add
    </Button>
  </Form>

  <Table striped bordered hover className="mt-4">
    <thead>
      <tr>
        <th>S No</th>
        <th>Metal Type</th>
        <th>Description</th>
        <th>Weight</th>
        <th>Qty</th>
        <th>Rate Type</th>
        <th>Rate</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {localDetails.map((detail, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{detail.metal_type}</td>
          <td>{detail.description}</td>
          <td>{detail.weight}</td>
          <td>{detail.qty}</td>
          <td>{detail.rate_type}</td>
          <td>{detail.rate}</td>
          <td>
            <Button variant="warning" size="sm" onClick={() => handleEdit(index)}>
              Edit
            </Button>{' '}
            <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>

  {/* Display totals */}
  <Row className="mt-4">
    <Col md={4}>
      <Form.Group>
        <Form.Label>Total Weight</Form.Label>
        <Form.Control
          type="text"
          value={localDetails.reduce((total, detail) => total + Number(detail.weight || 0), 0)}
          readOnly
        />
      </Form.Group>
    </Col>
    <Col md={4}>
      <Form.Group>
        <Form.Label>Total Qty</Form.Label>
        <Form.Control
          type="text"
          value={localDetails.reduce((total, detail) => total + Number(detail.qty || 0), 0)}
          readOnly
        />
      </Form.Group>
    </Col>
    <Col md={4}>
      <Form.Group>
        <Form.Label>Total Price</Form.Label>
        <Form.Control
          type="text"
          value={localDetails.reduce(
            (total, detail) => total + Number(detail.qty || 0) * Number(detail.rate || 0),
            0
          )}
          readOnly
        />
      </Form.Group>
    </Col>
  </Row>
</Modal.Body>
<Modal.Footer>
  <Button onClick={handleSubmitDetails}>Submit</Button>
</Modal.Footer>

        </Modal>
      </div>
    </div>
  );
};

export default RepairsTable;
