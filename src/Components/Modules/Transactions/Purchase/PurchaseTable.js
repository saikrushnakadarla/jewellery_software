import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/ExpandedTable';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import TagEntry from "./TagEntry";
import baseURL from '../../../../Url/NodeBaseURL';
import Swal from 'sweetalert2';

const RepairsTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState(null);
  const { mobile } = location.state || {};
  const initialSearchValue = location.state?.mobile || '';

  useEffect(() => {
    fetchPurchases();
  }, []);

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
        Header: 'Invoice No.',
        accessor: 'invoice',
      },
      {
        Header: 'Account Name',
        accessor: 'account_name',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => {
          return (
            <div>
              <FaEye
                style={{ cursor: 'pointer', marginLeft: '10px', color: 'green' }}
                onClick={() => handleViewDetails(row.original.invoice)}
              />
              <FaEdit
                style={{
                  cursor: 'pointer',
                  marginLeft: '10px',
                  color: 'blue',
                }}
                onClick={() => handleEdit(row.original.invoice, row.original.mobile)}
              />
              <FaTrash
                style={{
                  cursor: 'pointer',
                  marginLeft: '10px',
                  color: 'red',
                }}
                onClick={() => handleDelete(row.original.invoice)}
              />
            </div>
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
  const handleCreate = () => {
    navigate('/purchase');
  };

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-unique-purchase-details`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching repair details:', error);
      setLoading(false);
    }
  };

  const handleAddPayment = (product) => {
    navigate("/payments", {
      state: {
        account_name: product.account_name,
        invoice_number: product.invoice,
        total_wt: product.balance_pure_weight,
        category: product.category
      }
    });
  };

  const handleExpandedDetails = async (rowIndex, invoice) => {
    try {
      const response = await axios.get(`${baseURL}/get-purchase-details/${invoice}`);
      const expandedContent = (
        <Table bordered>
          <thead>
            <tr>
              <th>Category</th>
              <th>Purity</th>
              <th>Pcs</th>
              <th>Gross Wt</th>
              <th>Stone Wt</th>
              <th>W.Wt</th>
              <th>Total Wt</th>
              <th>Paid Wt</th>
              <th>Bal Wt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {response.data.repeatedData.map((product, idx) => (
              <tr key={idx}>
                
                <td>{product.category}</td>
                <td>{product.purity}</td>
                <td>{product.pcs}</td>
                <td>{product.gross_weight}</td>
                <td>{product.stone_weight}</td>
                <td>{product.wastage_wt}</td>
                <td>{product.total_pure_wt}</td>
                <td>{product.paid_pure_weight}</td>
                <td>{product.balance_pure_weight}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#a36e29', borderColor: '#a36e29', padding: '0.25rem 0.5rem', fontSize: '0.875rem', marginRight:'5px' }}
                    onClick={() => handleOpenTagModal(product)} // Pass entire row data
                  >
                    Tag Entry
                  </button>

                  <Button
                    style={{
                      backgroundColor: '#28a745',
                      borderColor: '#28a745',
                      fontSize: '0.875rem', 
                      padding: '0.25rem 0.5rem', 
                    }}
                    onClick={() => handleAddPayment(product)} // Pass row data to handle receipt creation
                  >
                    Add Payment
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );

      setData((prevData) =>
        prevData.map((item, index) =>
          index === rowIndex ? { ...item, expandedContent } : item
        )
      );
    } catch (error) {
      console.error('Error fetching purchase details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPurchaseDetails(null);
  };

  const toggleRowExpansion = async (rowId, rowIndex, invoice) => {
    setExpandedRows((prev) => {
      const isExpanding = !prev[rowId];
      if (isExpanding) {
        handleExpandedDetails(rowIndex, invoice);
      } else {
        setData((prevData) =>
          prevData.map((item) =>
            item.invoice === invoice ? { ...item, expandedContent: null } : item
          )
        );
      }
      return { [rowId]: isExpanding };
    });
  };

  const handleViewDetails = async (invoice) => {
    try {
      const response = await axios.get(`${baseURL}/get-purchase-details/${invoice}`);
      console.log("Fetched order details: ", response.data);

      // Set repair details directly without filtering or checking conversion status
      setPurchaseDetails(response.data);

      setShowModal(true);
    } catch (error) {
      console.error("Error fetching repair details:", error);
    }
  };

  const handleEdit = async (
    invoice,
    mobile,
  ) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to edit this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, go ahead!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      try {
        // Fetch repair details
        const response = await axios.get(`${baseURL}/get-purchase-details/${invoice}`);
        const details = response.data;

        if (!details || !details.repeatedData) {
          console.error('No repeatedData found in response:', details);
          Swal.fire('Error', 'No repair details found for the provided order number.', 'error');
          return;
        }

        // Retrieve existing repair details from localStorage or set to an empty array if not available
        const existingDetails = JSON.parse(localStorage.getItem('tableData')) || [];

        // Get today's date in yyyy-mm-dd format
        const today = new Date().toISOString().split('T')[0];

        // Update repeatedData with today's date
        const formattedDetails = details.repeatedData.map((item) => ({
          ...item,
          date: today,
          invoice,
        }));

        const updatedDetails = [...existingDetails, ...formattedDetails];

        localStorage.setItem('tableData', JSON.stringify(updatedDetails));

        console.log('Updated repair details added to localStorage:', updatedDetails);

        // Navigate to the sales page with state
        navigate('/purchase', {
          state: {
            invoice,
            mobile,
            tableData: details,
          },
        });

        // Call handleDelete without confirmation
        // await handleDelete(invoice, true, true);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        Swal.fire('Error', 'Unable to fetch repair details. Please try again.', 'error');
      }
    } else {
      Swal.fire('Cancelled', 'Edit operation was cancelled.', 'info');
    }
  };

  const handleDelete = async (invoice) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this purchase?');
    if (!confirmDelete) return;

    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/deletepurchases/${invoice}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Purchase deleted successfully');
        // Remove the deleted item from the state
        setData((prevData) => prevData.filter((item) => item.invoice !== invoice));
      } else {
        console.error('Error deleting purchase:', result.message);
        alert(result.message || 'Failed to delete purchase');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while deleting the purchase');
    } finally {
      setLoading(false);
    }
  };

  const [showTagModal, setShowTagModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenTagModal = (data) => {
    console.log("Opening Modal with Data:", data); // Log data when opening modal
    setSelectedProduct(data);
    setShowTagModal(true);
  };

  const handleCloseTagModal = () => {
    console.log("Closing Modal, Resetting Data:", selectedProduct); // Log data before closing
    setSelectedProduct(null);
    setShowTagModal(false);
  };


  return (
    <div className="main-container">
      <div className="sales-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Purchases</h3>
            <Button
              className="create_but"
              onClick={handleCreate}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} initialSearchValue={initialSearchValue} expandedRows={expandedRows} toggleRowExpansion={toggleRowExpansion} />
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" className="m-auto">
        <Modal.Header closeButton>
          <Modal.Title>Purchase Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {purchaseDetails && (
            <>
              <h5>Customer Info</h5>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Bill Date</td>
                    <td>{new Date(purchaseDetails.uniqueData.date).toLocaleDateString('en-GB')}</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>{purchaseDetails.uniqueData.mobile}</td>
                  </tr>
                  <tr>
                    <td>Account Name</td>
                    <td>{purchaseDetails.uniqueData.account_name}</td>
                  </tr>
                  <tr>
                    <td>GST Number</td>
                    <td>{purchaseDetails.uniqueData.gst_in}</td>
                  </tr>
                  <tr>
                    <td>Invoice Number</td>
                    <td>{purchaseDetails.uniqueData.invoice}</td>
                  </tr>
                </tbody>
              </Table>

              <h5>Products</h5>
              <div className="table-responsive">
                <Table bordered>
                  <thead style={{ whiteSpace: 'nowrap' }}>
                    <tr>
                      <th>Category</th>
                      <th>Purity</th>
                      <th>Pcs</th>
                      <th>Gross Wt</th>
                      <th>Stone Wt</th>
                      <th>W.Wt</th>
                      <th>Total Wt</th>
                      <th>Paid Wt</th>
                      <th>Bal Wt</th>
                    </tr>
                  </thead>
                  <tbody style={{ whiteSpace: 'nowrap' }}>
                    {purchaseDetails.repeatedData.map((product, index) => (
                      <tr key={index}>
                        <td>{product.category}</td>
                        <td>{product.purity}</td>
                        <td>{product.pcs}</td>
                        <td>{product.gross_weight}</td>
                        <td>{product.stone_weight}</td>
                        <td>{product.wastage_wt}</td>
                        <td>{product.total_pure_wt}</td>
                        <td>{product.paid_pure_weight}</td>
                        <td>{product.balance_pure_weight}</td>
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

      <Modal
        show={showTagModal}
        onHide={handleCloseTagModal}
        size="lg"
        backdrop="static"
        keyboard={false}
        dialogClassName="custom-tagentrymodal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tag Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <TagEntry
              handleCloseTagModal={handleCloseTagModal}
              selectedProduct={selectedProduct}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RepairsTable;
