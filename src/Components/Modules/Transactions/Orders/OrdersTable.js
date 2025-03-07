import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { Button, Row, Col, Modal, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import baseURL from '../../../../Url/NodeBaseURL';
import Swal from 'sweetalert2';
import PDFLayout from '../../Transactions/OrderSection/TaxInvoiceA4';
const RepairsTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
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
        Header: 'Order No.',
        accessor: 'order_number',
      },
      {
        Header: 'Invoice No.',
        accessor: 'invoice_number',
      },
      {
        Header: 'Account Name',
        accessor: 'account_name',
      },
      {
        Header: 'Total Amt',
        accessor: 'net_amount',
        Cell: ({ value }) => value || 0
      },
      {
        Header: 'Old Amt',
        accessor: 'old_exchange_amt',
        Cell: ({ value }) => value || 0
      },
      {
        Header: 'Net Amt',
        accessor: 'net_bill_amount',
        Cell: ({ value }) => value || 0
      },
      
      {
        Header: 'Paid Amt',
        accessor: 'paid_amt',
        Cell: ({ row }) => {
          const paid_amt = Number(row.original.paid_amt) || 0;
          const receipts_amt = Number(row.original.receipts_amt) || 0;
          const totalPaid = (paid_amt + receipts_amt).toFixed(2);      
          return totalPaid;
        },
      },
      {
        Header: 'Bal Amt',
        accessor: 'bal_amt',
        Cell: ({ row }) => {
          const bal_amt = Number(row.original.bal_amt) || 0;
          const bal_after_receipts = Number(row.original.bal_after_receipts) || 0;
          const receipts_amt = Number(row.original.receipts_amt) || 0;      
          let finalBalance;
          if (bal_amt === receipts_amt) {
            finalBalance = bal_after_receipts || 0;
          } else {
            finalBalance = bal_after_receipts ? bal_after_receipts : bal_amt || 0;
          }      
          return finalBalance.toFixed(2);
        },
      }, 
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      //   Cell: ({ row }) => (
      //     <select
      //       value={row.original.order_status}
      //       onChange={(e) => handleStatusChange(row.original.order_number, e.target.value)}
      //       style={{
      //         padding: '5px',
      //         border: '1px solid #ccc',
      //         borderRadius: '4px',
      //       }}
      //     >
      //       <option value="Pending">Pending</option>
      //       <option value="In Transit">In Transit</option>
      //       <option value="Delivered">Delivered</option>
      //     </select>
      //   ),
      // },
      // {
      //   Header: 'Order Status',
      //   accessor: 'order_status',
      //   Cell: ({ row }) => row.original.order_status || '-',
      // },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => {
          const isEditDisabled = row.original.invoice === "Converted"; // Check if the invoice is "Converted"

          return (
            <div>
              <FaEye
                style={{ cursor: 'pointer', marginLeft: '10px', color: 'green' }}
                onClick={() => handleViewDetails(row.original.order_number)}
              />

              <FaEdit
                style={{
                  cursor: isEditDisabled ? 'not-allowed' : 'pointer', // Change cursor style when disabled
                  marginLeft: '10px',
                  color: isEditDisabled ? 'gray' : 'blue', // Change color when disabled
                }}
                onClick={() => {
                  if (!isEditDisabled) { // Only allow editing if not disabled
                    handleEdit(
                      row.original.order_number,
                      row.original.mobile,
                      row.original.old_exchange_amt,
                      row.original.scheme_amt,
                      row.original.cash_amount,
                      row.original.card_amt,
                      row.original.chq_amt,
                      row.original.online_amt
                    );
                  }
                }}
              />

              <FaTrash
                style={{
                  cursor: 'pointer',
                  marginLeft: '10px',
                  color: 'red',
                }}
                onClick={() => handleDelete(row.original.order_number)}
              />
            </div>
          );
        },
      },
      {
        Header: 'Invoice',
        accessor: 'convert',
        Cell: ({ row }) => {
          const isDisabled = row.original.invoice; // Use extracted invoice status
          return (
            <Button
              style={{
                backgroundColor: isDisabled ? "#ccc" : "#28a745",
                borderColor: isDisabled ? "#ccc" : "#28a745",
                fontSize: "0.875rem",
                padding: "0.25rem 0.5rem",
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleConvert(row.original)}
              disabled={isDisabled}
            >
              Convert
            </Button>
          );
        },
      }

    ],
    []
  );

 
 // Initialize missing variables as state
 const [formData, setFormData] = useState({});
 const [repairDetails, setRepairDetails] = useState({});
 const [paymentDetails, setPaymentDetails] = useState({});
 const [taxAmount, setTaxAmount] = useState(0);
 const [discountAmt, setDiscountAmt] = useState(0);
 const [oldItemsAmount, setOldItemsAmount] = useState(0);
 const [schemeAmount, setSchemeAmount] = useState(0);
 const [netPayableAmount, setNetPayableAmount] = useState(0);

 const fetchOrderDetails = async (orderNumber) => {
   try {
     const response = await axios.get(`${baseURL}/invoice/${orderNumber}`);
     if (response.data.success) {
       // Assign values based on the API response or some other source
       setFormData(response.data.formData);
       setRepairDetails(response.data.repairDetails);
       setPaymentDetails(response.data.paymentDetails);
       setTaxAmount(response.data.taxAmount);
       setDiscountAmt(response.data.discountAmt);
       setOldItemsAmount(response.data.oldItemsAmount);
       setSchemeAmount(response.data.schemeAmount);
       setNetPayableAmount(response.data.netPayableAmount);
     }
   } catch (error) {
     console.error("Error fetching order details:", error);
   }
 };

 const handleConvert = async (order) => {
   const result = await Swal.fire({
     title: 'Are you sure?',
     text: 'Do you want to convert this sale order to an invoice?',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, convert it!',
     cancelButtonText: 'No, cancel',
   });

   // If the user confirms, proceed with the conversion
   if (result.isConfirmed) {
     try {
       const response = await axios.post(`${baseURL}/convert-order`, {
         order_number: order.order_number,
       });

       if (response.data.success) {
         Swal.fire('Converted!', 'Order has been converted to invoice.', 'success'); // Success message

         // Fetch the invoice number after conversion
         const invoiceResponse = await axios.get(`${baseURL}/invoice/${order.order_number}`);

         if (invoiceResponse.data.success) {
           const invoiceNumber = invoiceResponse.data.invoice_number;

           // Generate PDF Blob
           const pdfDoc = (
             <PDFLayout
               formData={formData}
               repairDetails={repairDetails}
               cash_amount={paymentDetails.cash_amount || 0}
               card_amt={paymentDetails.card_amt || 0}
               chq_amt={paymentDetails.chq_amt || 0}
               online_amt={paymentDetails.online_amt || 0}
               taxAmount={taxAmount}
               discountAmt={discountAmt}
               oldItemsAmount={oldItemsAmount}
               schemeAmount={schemeAmount}
               netPayableAmount={netPayableAmount}
             />
           );

           // Assuming you have a function to generate and download the PDF
           const pdfBlob = generatePDF(pdfDoc);
           downloadPDF(pdfBlob, `${invoiceNumber}.pdf`);
         }
       }

       // Additional logic to update state or re-fetch data
       fetchRepairs(); // Refresh the list of repairs
     } catch (error) {
       console.error('Error converting order:', error);
       Swal.fire('Error', 'Unable to convert the order. Please try again.', 'error'); // Error message
     }
   } else {
     Swal.fire('Cancelled', 'Order conversion has been cancelled.', 'info'); // Cancellation message
   }
 };

 // Add the generatePDF and downloadPDF helper functions here
 const generatePDF = (pdfDoc) => {
   // Implement PDF generation logic here (e.g., using react-pdf or jsPDF)
   const pdfBlob = new Blob([pdfDoc], { type: 'application/pdf' });
   return pdfBlob;
 };

 const downloadPDF = (pdfBlob, filename) => {
   const link = document.createElement('a');
   link.href = URL.createObjectURL(pdfBlob);
   link.download = filename;
   link.click();
 };


 const handleStatusChange = async (orderNumber, newStatus) => {
  try {
    console.log("Sending Request with:", { order_number: orderNumber, order_status: newStatus }); // Debugging

    // Make the PUT request to update the status in the backend
    const response = await axios.put(`${baseURL}/update-order-status`, {
      order_number: orderNumber,
      order_status: newStatus,
    });

    if (response.status === 200) {
      // Update the local state with the new status
      setData((prevData) =>
        prevData.map((item) =>
          item.order_number === orderNumber ? { ...item, order_status: newStatus } : item
        )
      );

      Swal.fire("Success", "Order status updated successfully.", "success");
    } else {
      Swal.fire("Error", "Failed to update the order status.", "error");
    }
  } catch (error) {
    console.error("Error updating order status:", error.response?.data || error.message);

    Swal.fire("Error", "An error occurred while updating the order status.", "error");
  }
};

  
  const fetchRepairs = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-unique-order-details`);
      // console.log("Full response data: ", response.data); 
      // const filteredData = response.data.filter(
      //   (item) => item.transaction_status === 'Orders'
      // );
      // console.log("Filtered Orders: ", filteredData); 
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching repair details:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRepairs();
    handleViewDetails();
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

  const handleViewDetails = async (order_number) => {
    try {
      const response = await axios.get(`${baseURL}/get-order-details/${order_number}`);
      console.log("Fetched order details: ", response.data); // Log full response data

      // Filter repeatedData to include only items where transaction_status is "Orders"
      const filteredData = response.data.repeatedData.filter(
        (item) => item.transaction_status === "Orders"
      );

      // Check if any item in repeatedData has invoice === "Converted"
      const isInvoiceConverted = filteredData.some(item => item.invoice === "Converted");
      console.log("isInvoiceConverted=", isInvoiceConverted)

      // Set state with filtered repeatedData and invoice status
      setOrderDetails({
        ...response.data,
        repeatedData: filteredData,
        isInvoiceConverted,
      });

      setShowModal(true);

    } catch (error) {
      console.error("Error fetching repair details:", error);
    }
  };

  const handleWorkerAssignment = async (order_number, code, worker_name) => {
    try {
      // Find the selected account and get its account_id
      const selectedAccount = accounts.find(account => account.account_name === worker_name);
      const account_id = selectedAccount?.account_id;

      if (!account_id) {
        alert('Account ID is not found for the selected worker.');
        return;
      }

      const response = await axios.post(`${baseURL}/assign-worker`, {
        order_number,
        code,
        worker_name,
        account_id, // Pass the account_id to the backend
      });

      if (response.data.success) {
        setOrderDetails(prev => ({
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
      fetchRepairs();
      handleViewDetails();
    } catch (error) {
      console.error('Error assigning worker:', error);
      alert('Failed to assign worker. Please try again.');
    }
  };

  const handleEdit = async (
    order_number,
    mobile,
    cash_amount,
    card_amt,
    chq_amt,
    online_amt
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
        const response = await axios.get(`${baseURL}/get-order-details/${order_number}`);
        const details = response.data;

        // Fetch old items details
        const oldItemsResponse = await axios.get(`${baseURL}/get/olditems/${order_number}`);
        const oldItemsDetails = oldItemsResponse.data;

        // Verify if the API returned data
        if (!details || !details.repeatedData) {
          console.error('No repeatedData found in response:', details);
          Swal.fire('Error', 'No repair details found for the provided order number.', 'error');
          return;
        }

        // Retrieve existing repair details from localStorage or set to an empty array if not available
        const existingDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];

        // Retrieve existing old items details from localStorage or set to an empty array if not available
        const existingOldItems = JSON.parse(localStorage.getItem('oldTableData')) || [];

        // Get today's date in yyyy-mm-dd format
        const today = new Date().toISOString().split('T')[0];

        // Update repeatedData with today's date
        const formattedDetails = details.repeatedData.map((item) => ({
          ...item,
          date: today,
          order_number, // Ensure the order_number is explicitly included
        }));

          // Format old items details with today's date
          const formattedOldItems = oldItemsDetails.map((item) => ({
            ...item,
            date: today,
            order_number, // Ensure invoice_number is included
          }));

        // Combine existing details with the new ones
        const updatedDetails = [...existingDetails, ...formattedDetails];

         // Combine existing old items with new ones
         const updatedOldItems = [...existingOldItems, ...formattedOldItems];

        // Save updated details back to localStorage
        localStorage.setItem('orderDetails', JSON.stringify(updatedDetails));
        localStorage.setItem('oldTableData', JSON.stringify(updatedOldItems));

        console.log('Updated repair details added to localStorage:', updatedDetails);

        // Navigate to the sales page with state
        navigate('/orders', {
          state: {
            order_number,
            mobile,
            // old_exchange_amt,
            // scheme_amt,
            cash_amount,
            card_amt,
            chq_amt,
            online_amt,
            orderDetails: details,
          },
        });

        // Call handleDelete without confirmation
        await handleDelete(order_number, true, true);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        Swal.fire('Error', 'Unable to fetch repair details. Please try again.', 'error');
      }
    } else {
      Swal.fire('Cancelled', 'Edit operation was cancelled.', 'info');
    }
  };

  const handleDelete = async (orderNumber, skipConfirmation = false, skipMessage = false) => {
    if (skipConfirmation) {
      try {
        const response = await axios.delete(
          `${baseURL}/order-details/${orderNumber}`,
          { params: { skipMessage: skipMessage ? 'true' : 'false' } } // Pass skipMessage as query parameter
        );

        if (response.status === 200 || response.status === 204) {
          if (!skipMessage) {
            Swal.fire('Deleted!', response.data.message, 'success');
          }
          setData((prevData) => prevData.filter((item) => item.order_number !== orderNumber));
        }
      } catch (error) {
        console.error('Error deleting repair details:', error);
        Swal.fire('Error!', 'Failed to delete repair details. Please try again.', 'error');
      }
    } else {
      // Show the confirmation alert
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to delete order ${orderNumber}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              `${baseURL}/order-details/${orderNumber}`
            );
            if (response.status === 200) {
              Swal.fire('Deleted!', response.data.message, 'success');
              setData((prevData) => prevData.filter((item) => item.order_number !== orderNumber));
            }
          } catch (error) {
            console.error('Error deleting repair details:', error);
            Swal.fire('Error!', 'Failed to delete repair details. Please try again.', 'error');
          }
        }
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrderDetails(null);
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
          <DataTable columns={columns} data={[...data].reverse()} initialSearchValue={initialSearchValue} />
        )}
      </div>

      {/* Modal to display repair details */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" className="m-auto">
        <Modal.Header closeButton>
          <Modal.Title>Orders Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderDetails && (
            <>
              <h5>Customer Info</h5>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Customer ID</td>
                    <td>{orderDetails.uniqueData.customer_id}</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>{orderDetails.uniqueData.mobile}</td>
                  </tr>
                  <tr>
                    <td>Account Name</td>
                    <td>{orderDetails.uniqueData.account_name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{orderDetails.uniqueData.email}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{orderDetails.uniqueData.address1}</td>
                  </tr>
                  <tr>
                    <td>Invoice Number</td>
                    <td>{orderDetails.uniqueData.order_number}</td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td>{orderDetails.uniqueData.net_amount}</td>
                  </tr>
                </tbody>
              </Table>

              <h5>Products</h5>
              <div className="table-responsive">
                <Table bordered>
                  <thead style={{whiteSpace:'nowrap'}}>
                    <tr>
                      <th>Bar Code</th>
                      <th>Product Name</th>
                      <th>Metal Type</th>
                      <th>Purity</th>
                      <th>Gross Wt</th>
                      <th>Stone Wt</th>
                      <th>W.Wt</th>
                      <th>Total Wt</th>
                      <th>MC</th>
                      <th>Rate</th>
                      <th>Tax Amt</th>
                      <th>Total Price</th>
                      <th>Assigning</th>
                      <th>Worker Name</th>
                    </tr>
                  </thead>
                  <tbody style={{whiteSpace:'nowrap'}}>
                    {orderDetails.repeatedData.map((product, index) => (
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
                        <td>
                          {product.assigning === 'pending' ? (
                            <Form.Select
                              onChange={(e) => handleWorkerAssignment(
                                orderDetails.uniqueData.order_number,
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