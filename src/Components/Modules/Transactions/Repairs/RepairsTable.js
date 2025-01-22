import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button, Form, Table } from 'react-bootstrap';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import baseURL from "../../../../Url/NodeBaseURL";
import axios from 'axios';

import './RepairsTable.css';
import {useLocation, useNavigate } from 'react-router-dom';

const RepairsTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [repairs, setRepairs] = useState([]);
  const [assignedRepairDetails, setAssignedRepairDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [assignedData, setAssignedData] = useState({
    item_name: '',
    purity: '',
    qty: '',
    weight: '',
  });
  const [tempTableData, setTempTableData] = useState([]);

  const [receivedData, setReceivedData] = useState({
    item_name: '',
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


    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/repairs`);
        setRepairs(response.data);
      } catch (error) {
        console.error('Error fetching repairs:', error);
      }
    };

    const fetchAssignedRepairDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/assigned-repairdetails`);
        setAssignedRepairDetails(response.data);
        console.log("assigned Details=",response.data)
      } catch (error) {
        console.error('Error fetching repairs:', error);
      }
    };
  useEffect(() => {
    fetchRepairs();
    fetchAssignedRepairDetails();
  }, []);

  const handleActionChange = (repairId, action) => {
    if (action === 'Assign to Workshop') {
      const repair = repairs.find((repair) => repair.repair_id === repairId);
      setSelectedRepair(repair);
      setShowModal(true); 
    } else if (action === 'Receive from Workshop') {
      const repair = repairs.find((repair) => repair.repair_id === repairId);
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
  

  const handleAddToTable = () => {
    const updatedData = [...tempTableData, assignedData];
    setTempTableData(updatedData);
    setAssignedData({ item_name: '', purity: '', qty: '', weight: '' });
  
    // Save to local storage
    localStorage.setItem('tempTableData', JSON.stringify(updatedData));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('tempTableData');
    if (storedData) {
      setTempTableData(JSON.parse(storedData));
    }
  }, []);
  
  const handleSubmit = async () => {
    try {
      const requestData = tempTableData.map((data) => ({
        ...data,
        repair_id: selectedRepair.repair_id, // Ensure the key matches backend
      }));
      await axios.post(`${baseURL}/assign/repairdetails`, requestData);
      alert('Data submitted successfully!');
      setTempTableData([]);
      localStorage.removeItem('tempTableData'); // Clear local storage
      setShowModal(false);
      fetchRepairs();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
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
    setReceivedData({ item_name: '', purity: '', qty: '', weight: '' });
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
      // {
      //   Header: 'Email',
      //   accessor: 'email',
      // },
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
            onChange={(e) => handleActionChange(row.original.repair_id, e.target.value)}
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

        <Modal show={showModal} onHide={() => setShowModal(false)} >
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
              <Form.Group controlId="item_name">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="item_name"
                  value={assignedData.item_name}
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
            <Button style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }} onClick={handleAddToTable} className="mt-3">
              Add 
            </Button>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Purity</th>
                  <th>Quantity</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {tempTableData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.item_name}</td>
                    <td>{data.purity}</td>
                    <td>{data.qty}</td>
                    <td>{data.weight}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }} onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showReceiveModal} onHide={() => setShowReceiveModal(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Receive from Workshop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRepair && (
              <div className="mb-3">
                <h5 style={{fontWeight:'bold'}}>Repair Item Details</h5>
             <Row className="mb-2">
             <Col md="2">
                <Form.Group controlId="category">
                  <Form.Label><strong>Category</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.category} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="sub_category">
                  <Form.Label><strong>Sub Category</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.sub_category} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="item">
                  <Form.Label><strong>Item</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.item} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="metal_type">
                  <Form.Label><strong>Metal Type</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.metal_type} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="purity">
                  <Form.Label><strong>Purity</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.purity} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="gross_weight">
                  <Form.Label><strong>Gross Wt</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.gross_weight} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
              </Row>
              <Row className="mb-2">
              <Col md="1">
                <Form.Group controlId="pcs">
                  <Form.Label><strong>Pcs</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.pcs} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="estimated_dust">
                  <Form.Label><strong>Estimated Dust</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.estimated_dust} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group controlId="estimated_amt">
                  <Form.Label><strong>Estimated Amt</strong></Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedRepair.estimated_amt} 
                    readOnly 
                  />
                </Form.Group>
              </Col>
            </Row>
            {assignedRepairDetails
              .filter((repair) => repair.repair_id === selectedRepair.repair_id)
              .length > 0 ? (
                <>
                  <h5 style={{fontWeight:'bold'}}>Assigned Details</h5>
                  <Table size="sm">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Purity</th>
                        <th>Quantity</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedRepairDetails
                        .filter((repair) => repair.repair_id === selectedRepair.repair_id)
                        .map((repair, index) => (
                          <tr key={index}>
                            <td>{repair.item_name}</td>
                            <td>{repair.purity}</td>
                            <td>{repair.qty}</td>
                            <td>{repair.weight}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                <div>No assigned details available</div>
              )}
            </div>  
            )}
            <Form>
              <Row>
              <Col md={6}>
              <Form.Group controlId="item_name">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="item_name"
                  value={receivedData.item_name}
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
            <Button style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }} onClick={handleReceiveSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RepairsTable;
