import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Reusable DataTable component
import { Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import './PurchaseTable.css';
import baseURL from '../../../../Url/NodeBaseURL'; // Update with your base URL setup

const PurchaseTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store fetched table data
  const [loading, setLoading] = useState(false); // Loading state for delete actions

  // Function to format date to DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

// Function to handle delete request
const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this purchase?');
  if (!confirmDelete) return;

  setLoading(true);

  try {
    const response = await fetch(`${baseURL}/delete-purchases`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purchaseIds: [id] }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message || 'Purchase deleted successfully');
      // Remove the deleted item from the state
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } else {
      console.error('Error deleting purchase:', result.error);
      alert(result.message || 'Failed to delete purchase');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong while deleting the purchase');
  } finally {
    setLoading(false);
  }
};

  const columns = React.useMemo(
    () => [
      { Header: 'Sr.No', accessor: 'id' },
      { Header: 'Name', accessor: 'account_name' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'Invoice', accessor: 'invoice' },
      { Header: 'Date', accessor: 'date', Cell: ({ value }) => <span>{formatDate(value)}</span> },
      { Header: 'Category', accessor: 'category' },
      { Header: 'Pcs', accessor: 'pcs' },
      { Header: 'Gross Weight', accessor: 'gross_weight' },
      { Header: 'Purity', accessor: 'purity' },
      { Header: 'Pure Weight', accessor: 'pure_weight' },
      { Header: 'Total Amount', accessor: 'total_amount' },
      { 
        Header: 'Paid Amount', 
        accessor: 'paid_amount',
        Cell: ({ row }) => {
          const { paid_amount, paid_amt } = row.original;
          const totalPaid = (paid_amount || 0) + (paid_amt || 0);
          return totalPaid;
        },
      },
      { 
        Header: 'Bal Amount', 
        accessor: 'balance_amount',
        Cell: ({ row }) => {
          const { balance_amount, balance_after_receipt, paid_amt } = row.original;
          if (balance_amount === paid_amt) {
            return balance_after_receipt ;
          }
          return balance_after_receipt ? balance_after_receipt : balance_amount || '-';
        },
      },
      // {
      //   Header: 'Receipts',
      //   accessor: 'receipts',
      //   Cell: ({ row }) => (
      //     <Button
      //       style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
      //       onClick={() => handleAddReceipt(row.original)}
      //     >
      //       Add Receipt
      //     </Button>
      //   ),
      // },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <Button
            variant="danger"
            onClick={() => handleDelete(row.original.id)}
            disabled={loading}
          >
            <FaTrash />
          </Button>
        ),
      },
      {
        Header: 'Payments',
        accessor: 'payment',
        Cell: ({ row }) => {
          const { total_amount, paid_amount, paid_amt } = row.original;
          const totalPaid = (paid_amount || 0) + (paid_amt || 0);
  
          return (
            <Button
              style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
              onClick={() => handleAddReceipt(row.original)}
              disabled={total_amount === totalPaid} // Disable button if total_amount equals totalPaid
            >
              Add Payment
            </Button>
          );
        },
      },
    ],
    [loading]
  );
  

  const handleAddReceipt = (invoiceData) => {
    console.log("Invoice Data:", invoiceData);
    navigate("/payments", { state: { from: "/purchasetable", invoiceData } });
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/purchases`);
        const result = await response.json();
        if (result) {
          setData(result); // Assuming API returns an array of purchases
        } else {
          console.error('Unexpected data structure:', result);
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };
    fetchData();
  }, []);

  // Handle navigation to the Create Purchase page
  const handleCreate = () => {
    navigate('/purchase'); // Update with your correct route
  };

  return (
    <div className="main-container">
      <div className="purchase-table-container">
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
        <DataTable columns={columns} data={[...data].reverse()} />
      </div>
    </div>
  );
};

export default PurchaseTable;
