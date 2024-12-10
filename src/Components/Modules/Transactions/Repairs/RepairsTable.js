import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiAlignJustify } from 'react-icons/fi';
import { Button, Row, Col, Overlay, Popover, Modal, Form } from 'react-bootstrap';
import './RepairsTable.css';
import baseURL from '../../../../Url/NodeBaseURL';

const RepairsTable = () => {
  const navigate = useNavigate();

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
  const [repairs, setRepairs] = useState([]);
  const [repairDetails, setRepairDetails] = useState([]);
  const [selectedRepair, setSelectedRepair] = useState(null);

  // Fetch repairs
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/repairs`);
        setRepairs(response.data);
      } catch (error) {
        console.error('Error fetching repairs:', error);
      } 
    };

    fetchRepairs();
  }, []);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handlePopoverToggle = (event, repairId) => {
  // Check if repairs data is loaded
  if (!repairs || repairs.length === 0) {
    console.warn('Repairs data is not loaded or empty.');
    return;
  }

  const repair = repairs.find((r) => r.repair_id === repairId);

  // Check if the specific repair exists
  if (!repair) {
    console.warn(`Repair data not found for repairId: ${repairId}`, { repairs, repairId });
    return;
  }

  setSelectedRepair(repair);
  setPopoverData({
    repairId: popoverData.repairId === repairId ? null : repairId,
    target: event.target,
  });
  setShowPopover((prev) => popoverData.repairId !== repairId);
};

  

  // Handle "Receive from Workshop"
  const handleReceiveFromWorkshop = () => {
    if (!selectedRepair) {
      console.error('No repair selected!');
      return;
    }
    setShowPopover(false);
    setShowModal(true);
  };

  // Fetch repair details
  const fetchRepairDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/get/repair-details`);
      setRepairDetails(response.data);
    } catch (error) {
      console.error('Error fetching repair details:', error);
    }
  };

  useEffect(() => {
    fetchRepairDetails();
  }, []);
  const clearForm = () => {
    setFormData({
      metal_type: '',
      description: '',
      weight: '',
      qty: '',
      rate_type: '',
      rate: '',
    });
  };

  
const handleEditDetail = (detail) => {
  setFormData(detail); // Populate form with selected detail
  setSelectedRepair(detail); // Set selected repair detail for update
  setShowModal(true); // Open modal
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedRepair) {
    console.error('No repair selected.');
    return;
  }

  try {
    if (selectedRepair.id) {
      // Update existing repair detail
      const response = await axios.put(
        `${baseURL}/update/repair-details/${selectedRepair.id}`,
        formData
      );

      if (response.status === 200) {
        console.log('Details updated successfully');
        fetchRepairDetails(); // Refresh details
        clearForm(); // Clear form fields
        // setShowModal(false); 
        setSelectedRepair(null); // Reset selected repair
      }
    } else {
      // Add new repair detail
      const { repair_id, repair_no } = selectedRepair;
      const dataToSend = { ...formData, repair_id, repair_no };
      const response = await axios.post(`${baseURL}/add/repair-details`, dataToSend);

      if (response.status === 200) {
        console.log('Details added successfully');
        fetchRepairDetails(); // Refresh details
        clearForm(); // Clear form fields
        setShowModal(false); // Close modal
      }
    }
  } catch (error) {
    console.error('Error adding or updating repair details:', error);
  }
};


  const handleDeleteDetail = async (id) => {
    try {
      await axios.delete(`${baseURL}/delete/repair-details/${id}`);
      console.log('Detail deleted successfully');
      fetchRepairDetails(); // Refresh the table
    } catch (error) {
      console.error('Error deleting detail:', error);
    }
  };

  // Update repair status
  const handleUpdateStatus = async (repairId, status) => {
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
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Define table columns
  const columns = React.useMemo(
    () => [
      { Header: 'NAME', accessor: 'name' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Staff', accessor: 'staff' },
      { Header: 'Delivery Date', accessor: 'delivery_date' },      
      { Header: 'Metal', accessor: 'metal' },
      { Header: 'Counter', accessor: 'counter' },
      { Header: 'Repair No', accessor: 'repair_no' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Total', accessor: 'total' },
      {
        Header: 'ACTION',
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button className="action-button edit-button">
              <FaEdit />
            </button>
            <button className="action-button delete-button">
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
        <DataTable columns={columns} data={repairs} />

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
            <Form onSubmit={handleSubmit}>
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
                      <option value="">Select </option>
                      <option value="per_item">Per Qty</option>
                      <option value="per_weight">Per Weight</option>
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
              <Button type="submit" variant="primary" className="mt-3 mb-3">
        {selectedRepair?.id ? 'Update' : 'Add'}
      </Button>
            </Form>
            <table className="table table-striped table-bordered">
        <thead>
          <tr>
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
          {repairDetails
            .filter((detail) => detail.repair_id === selectedRepair?.repair_id)
            .map((detail) => (
              <tr key={detail.id}>
                <td>{detail.metal_type}</td>
                <td>{detail.description}</td>
                <td>{detail.weight}</td>
                <td>{detail.qty}</td>
                <td>{detail.rate_type}</td>
                <td>{detail.rate}</td>
                <td >
                  <div className="d-flex align-items-center">
                  <button
                   className="action-button edit-button"
                    onClick={() => handleEditDetail(detail)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDeleteDetail(detail.id)}
                  >
                    <FaTrash />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default RepairsTable;
