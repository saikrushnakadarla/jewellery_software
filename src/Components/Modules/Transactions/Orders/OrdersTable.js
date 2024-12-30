import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout';
import { FaEye } from 'react-icons/fa';
import { Button, Row, Col, Modal, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import baseURL from '../../../../Url/NodeBaseURL';

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [repairDetails, setRepairDetails] = useState(null);
  const [accounts, setAccounts] = useState([]); // Ensure accounts is an array

  // Fetch unique repair details from the API
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-unique-repair-details`);
        
        // Filter the data based on the 'transaction_status' column
        const filteredData = response.data.filter(item => item.transaction_status === 'Orders');
        
        setData(filteredData); // Set the filtered data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  // Fetch accounts for "Employee Compensation" when the "Assigning" is "Pending"
  useEffect(() => {
    const fetchEmployeeCompensationAccounts = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-employee-compensation-accounts`);
        if (Array.isArray(response.data)) {
          setAccounts(response.data); // Set accounts for the dropdown
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchEmployeeCompensationAccounts();
  }, []);

  const handleViewDetails = async (invoice_number) => {
    try {
      const response = await axios.get(`${baseURL}/get-repair-details/${invoice_number}`);
      setRepairDetails(response.data);
      setShowModal(true); // Show the modal with repair details
    } catch (error) {
      console.error('Error fetching repair details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRepairDetails(null); // Clear repair details on modal close
  };

  // Columns for the DataTable
  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Invoice Number',
        accessor: 'invoice_number',
      },
      {
        Header: 'Account Name',
        accessor: 'account_name',
      },
      {
        Header: 'Total Amt',
        accessor: 'net_amount',
        Cell: ({ value }) => value || '-',
      },
      {
        Header: 'Paid Amount',
        accessor: 'paid_amount',
        Cell: ({ row }) => row.original.net_amount || '-',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <FaEye
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'green' }}
              onClick={() => handleViewDetails(row.original.invoice_number)}
            />
          </div>
        ),
      },
    ],
    []
  );

  // Function to format date in Indian format (DD-MM-YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <div className="main-container">
      <div className="payments-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Orders</h3>
            <Button
              className="create_but"
              onClick={() => navigate('/orders')}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>

      {/* Modal to display repair details */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" className="m-auto">
        <Modal.Header closeButton>
          <Modal.Title>Orders Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {repairDetails && (
            <>
              <h5>Customer Info</h5>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Customer ID</td>
                    <td>{repairDetails.uniqueData.customer_id}</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>{repairDetails.uniqueData.mobile}</td>
                  </tr>
                  <tr>
                    <td>Account Name</td>
                    <td>{repairDetails.uniqueData.account_name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{repairDetails.uniqueData.email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{repairDetails.uniqueData.address1}</td>
                  </tr>
                  <tr>
                    <td>Invoice Number</td>
                    <td>{repairDetails.uniqueData.invoice_number}</td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td>{repairDetails.uniqueData.net_amount}</td>
                  </tr>
                </tbody>
              </Table>

              <h5>Products</h5>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Metal</th>
                    <th>Metal Type</th>
                    <th>Purity</th>
                    <th>Gross Weight</th>
                    <th>Stone Weight</th>
                    <th>Wastage Weight</th>
                    <th>Total Weight</th>
                    <th>Making Charges</th>
                    <th>Rate</th>
                    <th>Tax Amount</th>
                    <th>Total Price</th>
                    <th>Assigning</th>
                  </tr>
                </thead>
                <tbody>
                  {repairDetails.repeatedData.map((product, index) => (
                    <tr key={index}>
                      <td>{product.code}</td>
                      <td>
                        {product.product_image ? (
                          <img
                            src={`http://localhost:5000/uploads/${product.product_image}`}
                            alt={product.product_name}
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                        ) : (
                          'No Image'
                        )}
                      </td>
                      <td>{product.product_name}</td>
                      <td>{product.metal || 'N/A'}</td>
                      <td>{product.metal_type}</td>
                      <td>{product.purity}</td>
                      <td>{product.gross_weight}</td>
                      <td>{product.stone_weight}</td>
                      <td>{product.wastage_weight}</td>
                      <td>{product.total_weight_av}</td>
                      <td>{product.making_charges}</td>
                      <td>{product.rate}</td>
                      <td>{product.tax_amt}</td>
                      <td>{product.total_price}</td>
                      <td>
                        {product.assigning === 'pending' && (
                          <Form.Select>
                            <option>Select Account</option>
                            {Array.isArray(accounts) &&
                              accounts.map((account, index) => (
                                <option key={index} value={account.account_name}>
                                  {account.account_name}
                                </option>
                              ))}
                          </Form.Select>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RepairsTable;
