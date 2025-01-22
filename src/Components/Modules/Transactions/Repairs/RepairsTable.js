import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import baseURL from "../../../../Url/NodeBaseURL";
import axios from 'axios';

import './RepairsTable.css';
import {useLocation, useNavigate } from 'react-router-dom';

const RepairsTable = () => {
    const navigate = useNavigate();
      const location = useLocation();
  const [repairs, setRepairs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [assignedData, setAssignedData] = useState({
    itemName: '',
    purity: '',
    qty: '',
    weight: '',
  });

  const [receivedData, setReceivedData] = useState({
    itemName: '',
    purity: '',
    qty: '',
    weight: '',
  });
  
    const { mobile } = location.state || {};
    const initialSearchValue = location.state?.mobile || '';
    
    useEffect(() => {
     if (mobile) {
      console.log("Selected Mobile from Dashboard:", mobile);
    }
    }, [mobile]);

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

  const handleActionChange = (repairId, action) => {
    if (action === 'Assign to Workshop') {
      const repair = repairs.find((repair) => repair.repair_no === repairId);
      setSelectedRepair(repair);
      setShowModal(true); 
    } else if (action === 'Receive from Workshop') {
      const repair = repairs.find((repair) => repair.repair_no === repairId);
      setSelectedRepair(repair);
      setShowReceiveModal(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Assigned data submitted:', assignedData);
    setShowModal(false);
    setAssignedData({ itemName: '', purity: '', qty: '', weight: '' });
  };

  const handleReceiveInputChange = (e) => {
    const { name, value } = e.target;
    setReceivedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReceiveSubmit = () => {
    console.log('Assigned data submitted:', receivedData);
    setShowReceiveModal(false);
    setReceivedData({ itemName: '', purity: '', qty: '', weight: '' });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Repair No',
        accessor: 'repair_no',
      },
      {
        Header: 'Customer Name',
        accessor: 'account_name',
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Entry Type',
        accessor: 'entry_type',
      },
      {
        Header: 'Item Name',
        accessor: 'item',
      },
      {
        Header: 'Metal Type',
        accessor: 'metal_type',
      },
      {
        Header: 'Purity',
        accessor: 'purity',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-GB');
        },
      },
      {
        Header: 'Total',
        accessor: 'estimated_amt',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
          <select
            className="form-select"
            onChange={(e) => handleActionChange(row.original.repair_no, e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select Action
            </option>
            <option value="Assign to Workshop">Assign to Workshop</option>
            <option value="Receive from Workshop">Receive from Workshop</option>
            <option value="Delivery to Customer">Delivery to Customer</option>
          </select>
        ),
      },
    ],
    [repairs]
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
        <DataTable columns={columns} data={[...repairs].reverse()} initialSearchValue={initialSearchValue}/>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Assign to Workshop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRepair && (
              <div className="mb-3">
              <Row>
              <Col md="4">
                  <strong>Item:</strong> {selectedRepair.item}
                </Col>
                <Col md="4">
                  <strong>Gross Weight:</strong> {selectedRepair.gross_weight}
                </Col>
                <Col md="2">
                  <strong>Pcs:</strong> {selectedRepair.pcs}
                </Col>               
              </Row>
            </div>  
            )}
            <Form>
            <Row>
            <Col md={6}>
              <Form.Group controlId="itemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={assignedData.itemName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="purity">
                <Form.Label>Purity</Form.Label>
                <Form.Control
                  type="text"
                  name="purity"
                  value={assignedData.purity}
                  onChange={handleInputChange}
                />
              </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="qty">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="qty"
                  value={assignedData.qty}
                  onChange={handleInputChange}
                />
              </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={assignedData.weight}
                  onChange={handleInputChange}
                />
              </Form.Group>
              </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showReceiveModal} onHide={() => setShowReceiveModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Assign to Workshop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRepair && (
              <div className="mb-3">
              <Row>
              <Col md="4">
                  <strong>Item:</strong> {selectedRepair.item}
                </Col>
                <Col md="4">
                  <strong>Gross Weight:</strong> {selectedRepair.gross_weight}
                </Col>
                <Col md="2">
                  <strong>Pcs:</strong> {selectedRepair.pcs}
                </Col>               
              </Row>
            </div>  
            )}
            <Form>
              <Row>
              <Col md={6}>
              <Form.Group controlId="itemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={receivedData.itemName}
                  onChange={handleReceiveInputChange}
                />
              </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="purity">
                <Form.Label>Purity</Form.Label>
                <Form.Control
                  type="text"
                  name="purity"
                  value={receivedData.purity}
                  onChange={handleReceiveInputChange}
                />
              </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="qty">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="qty"
                  value={receivedData.qty}
                  onChange={handleReceiveInputChange}
                />
              </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={receivedData.weight}
                  onChange={handleReceiveInputChange}
                />
              </Form.Group>
              </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReceiveModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleReceiveSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RepairsTable;
