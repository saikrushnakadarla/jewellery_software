import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Button, Row, Col, Modal, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import baseURL from '../../../../Url/NodeBaseURL';
import Swal from 'sweetalert2';
const RepairsTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [repairDetails, setRepairDetails] = useState(null);
  const [accounts, setAccounts] = useState([]);


  // Extract mobile from location state
  const { mobile } = location.state || {};
  const initialSearchValue = location.state?.mobile || '';

  useEffect(() => {
    if (mobile) {
      console.log("Selected Mobile from Dashboard:", mobile);
    }
  }, [mobile]);

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
        Header: 'Mobile Number',
        accessor: 'mobile',
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
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => (
          <select
            value={row.original.order_status}
            onChange={(e) => handleStatusChange(row.original.invoice_number, e.target.value)}
            style={{
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        ),
      },
      {
        Header: 'Order Status',
        accessor: 'order_status',
        Cell: ({ row }) => row.original.order_status || '-',
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
            <FaTrash
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
                color: 'red',
              }}
              onClick={() => handleDelete(row.original.invoice_number)}
            />
          </div>
        ),
      },
    ],
    []
  );


  const handleStatusChange = async (invoiceNumber, newStatus) => {
    try {
      // Make the PUT request to update the status in the backend
      const response = await axios.put(`${baseURL}/update-order-status`, {
        invoice_number: invoiceNumber,
        order_status: newStatus,
      });
  
      if (response.status === 200) {
        // Update the local state with the new status
        setData((prevData) =>
          prevData.map((item) =>
            item.invoice_number === invoiceNumber
              ? { ...item, order_status: newStatus }
              : item
          )
        );
  
        Swal.fire('Success', 'Order status updated successfully.', 'success');
      } else {
        Swal.fire('Error', 'Failed to update the order status.', 'error');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      Swal.fire('Error', 'An error occurred while updating the order status.', 'error');
    }
  };
  
  

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-unique-repair-details`);
        const filteredData = response.data.filter(
          (item) => item.transaction_status === 'Orders'
        );
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  useEffect(() => {
    const fetchEmployeeCompensationAccounts = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-employee-compensation-accounts`);
        if (Array.isArray(response.data)) {
          setAccounts(response.data);
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
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching repair details:', error);
    }
  };

  const handleWorkerAssignment = async (invoice_number, code, worker_name) => {
    try {
      // Find the selected account and get its account_id
      const selectedAccount = accounts.find(account => account.account_name === worker_name);
      const account_id = selectedAccount?.account_id;

      if (!account_id) {
        alert('Account ID is not found for the selected worker.');
        return;
      }

      const response = await axios.post(`${baseURL}/assign-worker`, {
        invoice_number,
        code,
        worker_name,
        account_id, // Pass the account_id to the backend
      });

      if (response.data.success) {
        setRepairDetails(prev => ({
          ...prev,
          repeatedData: prev.repeatedData.map(product => {
            if (product.code === code) {
              return {
                ...product,
                assigning: 'assigned',
                account_name: worker_name,
                account_id
              };
            }
            return product;
          })
        }));

        // Show success message
        alert('Worker assigned successfully!');
      }
    } catch (error) {
      console.error('Error assigning worker:', error);
      alert('Failed to assign worker. Please try again.');
    }
  };

  const handleDelete = async (invoiceNumber) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete invoice ${invoiceNumber}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${baseURL}/repair-details/${invoiceNumber}`);
          if (response.status === 200) {
            Swal.fire('Deleted!', response.data.message, 'success');
            // Update the table data by removing the deleted record
            setData((prevData) => prevData.filter((item) => item.invoice_number !== invoiceNumber));
          }
        } catch (error) {
          console.error('Error deleting repair details:', error);
          Swal.fire('Error!', 'Failed to delete repair details. Please try again.', 'error');
        }
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRepairDetails(null);
  };

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
          <DataTable columns={columns} data={data} initialSearchValue={initialSearchValue} />
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
              <div className="table-responsive">
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
                      <th>Worker Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repairDetails.repeatedData.map((product, index) => (
                      <tr key={index}>
                        <td>{product.code}</td>
                        <td>
                          {product.product_image ? (
                            <img
                              src={`${baseURL}/uploads/${product.product_image}`}
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
                          {product.assigning === 'pending' ? (
                            <Form.Select
                              onChange={(e) => handleWorkerAssignment(
                                repairDetails.uniqueData.invoice_number,
                                product.code,
                                e.target.value
                              )}
                            >
                              <option value="">Select Worker</option>
                              {Array.isArray(accounts) && accounts.map((account, idx) => (
                                <option key={idx} value={account.account_name}>
                                  {account.account_name}
                                </option>
                              ))}
                            </Form.Select>
                          ) : (
                            <span>{product.account_name} (Assigned)</span>
                          )}
                        </td>
                        <td>{product.worker_name || "not Assigned"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
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