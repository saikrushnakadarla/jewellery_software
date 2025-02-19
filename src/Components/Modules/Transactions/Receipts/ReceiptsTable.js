import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap'; 
import './ReceiptsTable.css';
import baseURL from "../../../../Url/NodeBaseURL";

const ReceiptsTable = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [data, setData] = useState([]); // State to hold fetched data

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1, // Generate a sequential number based on the row index
      },
      {
        Header: 'Date',
        accessor: 'date', // Key from the data
        Cell: ({ value }) => new Date(value).toLocaleDateString('en-IN'), // Format date
      },
      {
        Header: 'Mode',
        accessor: 'mode',
      },
      {
        Header: 'Receipt No',
        accessor: 'receipt_no',
      },
      {
        Header: 'Account Name',
        accessor: 'account_name',
      },
      {
        Header: 'Reference Number',
        accessor: 'cheque_number',
        Cell: ({ value }) => (value ? value : 'N/A'), // Display 'N/A' if null
      },
      {
        Header: 'Total Amt',
        accessor: 'total_amt',
      },
      {
        Header: 'Paid Amt',
        accessor: 'discount_amt',
      },
      {
        Header: 'Bal Amt',
        accessor: 'cash_amt',
      },
      {
        Header: 'Remarks',
        accessor: 'remarks',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
          <FaEdit
            className="edit-icon"
            style={{ color: 'blue', cursor: 'pointer', marginRight: '10px' }}
            onClick={() => handleEdit(row.original.id)}
          />
          <FaTrash
            className="delete-icon"
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => handleDelete(row.original.id)}
          />
        </div>
        ),
      },
    ],
    [data]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/payments`); // Fetch data from the endpoint
        const result = await response.json();
        
        if (result?.payments) {
          // Filter the data where transaction_type === "Payment"
          const filteredPayments = result.payments.filter(payment => payment.transaction_type === "Receipt");
          setData(filteredPayments); // Set filtered data
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Receipt?')) return;
  
    try {
      const response = await fetch(`${baseURL}/delete/receipt/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Success message
        alert('Receipt deleted successfully');
        
        // Update state after successful deletion
        setData((prevData) => prevData.filter((payment) => payment.id !== id));
      } else {
        const result = await response.json();
        console.error('Error deleting Receipt:', result.message || 'Unknown error');
        alert(result.message || 'Failed to delete Receipt. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting Receipt:', error);
      alert('An error occurred while deleting the Receipt. Please try again.');
    }
  };

  const handleEdit = (id) => {
    // navigate('/receipts', { state: { repairData: rowData } });
    navigate(`/receipts/${id}`);
  };

  const handleCreate = () => {
    navigate('/receipts'); // Navigate to the payments creation page
  };

  return (
    <div className="main-container">
      <div className="receipt-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Receipts</h3>
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

export default ReceiptsTable;
