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
        Header: 'Date',
        accessor: 'date', // Key from the data
        Cell: ({ value }) => new Date(value).toLocaleDateString('en-IN'), // Format the date
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
        Header: 'Mode',
        accessor: 'mode',
      },
      {
        Header: 'Cheque Number',
        accessor: 'cheque_number',
        Cell: ({ value }) => (value ? value : 'N/A'), // Handle null values
      },
      {
        Header: 'Total Amt',
        accessor: 'total_amt',
      },
      {
        Header: 'Discount Amt',
        accessor: 'discount_amt',
      },
      {
        Header: 'Cash Amt',
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
              className="action-icon edit-icon"
              onClick={() => handleEdit(row.original)}
            />
            <FaTrash
              className="action-icon delete-icon"
              onClick={() => handleDelete(row.original.receipt_id)}
            />
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    // Fetch data from the API
    const fetchReceipts = async () => {
      try {
        const response = await fetch(`${baseURL}/get/receipts`); // API endpoint
        const result = await response.json();
        console.log('Fetched Data:', result);
        if (response.ok) {
          setData(result || []); // Use the array from the response
        } else {
          console.error('Error fetching receipts:', result.message);
        }
      } catch (error) {
        console.error('Error fetching receipts:', error);
      }
    };

    fetchReceipts();
  }, []);

  const handleDelete = (id) => {
    console.log('Delete record with id:', id);
    // Implement your delete logic here
  };

  const handleEdit = (record) => {
    console.log('Edit record:', record);
    // Implement your edit logic here
  };

  const handleCreate = () => {
    navigate('/receipts'); // Navigate to the /receipts page
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
        {data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <p>No receipts found.</p>
        )}
      </div>
    </div>
  );
};

export default ReceiptsTable;
