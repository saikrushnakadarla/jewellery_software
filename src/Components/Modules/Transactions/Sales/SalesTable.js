import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout';
import { FaEye } from 'react-icons/fa';
import { Button, Row, Col, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import baseURL from '../../../../Url/NodeBaseURL';

const RepairsTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [repairDetails, setRepairDetails] = useState(null);

  // Extract mobile from location state
  const { mobile } = location.state || {};
  const initialSearchValue = location.state?.mobile || '';

  useEffect(() => {
    if (mobile) {
      console.log('Selected Mobile from Dashboard:', mobile);
    }
  }, [mobile]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1, // Generate a sequential number based on the row index
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => formatDate(value), // Format date value
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
        Header: 'Old Amt',
        accessor: 'old_exchange_amt',
        Cell: ({ value }) => value || '-', 
      },
      {
        Header: 'Scheme Amt',
        accessor: 'scheme_amt',
        Cell: ({ value }) => value || '-', 
      },
      {
        Header: 'Net Amt',
        accessor: 'net_bill_amount',
        Cell: ({ value }) => value || '-', 
      },
      {
        Header: 'Paid Amt',
        accessor: 'paid_amt',
        Cell: ({ row }) => {
          const { paid_amt, receipts_amt } = row.original;
          const totalPaid = (paid_amt || 0) + (receipts_amt || 0);
          return totalPaid;
        },
      },
      
      {
        Header: 'Bal Amt',
        accessor: 'bal_amt', 
        Cell: ({ row }) => {
          const { bal_amt, bal_after_receipts, receipts_amt } = row.original;
          
          // If bal_amt equals receipts_amt, show bal_after_receipts
          if (bal_amt === receipts_amt) {
            return bal_after_receipts || '-';
          }
      
          // Default logic: Show bal_after_receipts if it exists, otherwise bal_amt
          return bal_after_receipts ? bal_after_receipts : bal_amt || '-';
        },
      },
      
      
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <FaEye
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'green' }}
              onClick={() => handleViewDetails(row.original.invoice_number)} // Pass invoice_number
            />
          </div>
        ),
      },
      {
        Header: 'Receipts',
        accessor: 'receipts',
        Cell: ({ row }) => {
          const { net_bill_amount, paid_amt, receipts_amt } = row.original;
          const totalPaid = (paid_amt || 0) + (receipts_amt || 0);
      
          return (
            <Button
              style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
              onClick={() => handleAddReceipt(row.original)} // Pass the row data to handle the receipt creation
              disabled={net_bill_amount === totalPaid} // Disable button if net_bill_amount equals totalPaid
            >
              Add Receipt
            </Button>
          );
        },
      },
      
    ],
    [] 
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;
  };

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-unique-repair-details`);
        
        // Filter the data based on the 'transaction_status' column
        const filteredData = response.data.filter(item => item.transaction_status === 'Sales');
        
        setData(filteredData); // Set the filtered data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  const handleCreate = () => {
    navigate('/sales');
  };

  const handleViewDetails = async (invoice_number) => {
    try {
      const response = await axios.get(`${baseURL}/get-repair-details/${invoice_number}`);
      setRepairDetails(response.data);
      setShowModal(true); // Show the modal with repair details
    } catch (error) {
      console.error('Error fetching repair details:', error);
    }
  };

  const handleAddReceipt = (invoiceData) => {
    navigate("/receipts", { state: { from: "/salestable", invoiceData } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRepairDetails(null); // Clear repair details on modal close
  };



  return (
    <div className="main-container">
      <div className="sales-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Sales</h3>
            <Button
              className="create_but"
              onClick={handleCreate}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={[...data].reverse()} initialSearchValue={initialSearchValue} />
        )}
      </div>

      {/* Modal to display repair details */}
      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>Sales Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {repairDetails && (
            <>
              <h5>Customer Info</h5>
              <Table bordered>
                <tbody>
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
                    <th>Bar Code</th>
                    <th>Product Name</th>
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
                  </tr>
                </thead>
                <tbody>
                  {repairDetails.repeatedData.map((product, index) => (
                    <tr key={index}>
                      <td>{product.code}</td>
                      <td>{product.product_name}</td>
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
                    </tr>
                  ))}
                  <tr style={{ fontWeight: 'bold' }}>
                    <td colSpan="11" className="text-end">
                      Total Amount
                    </td>
                    <td>{repairDetails.uniqueData.net_amount}</td>
                  </tr>
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
