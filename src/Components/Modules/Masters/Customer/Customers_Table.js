import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
// import './EstimateTable.css';

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data

  const columns = React.useMemo(
    () => [
      {
        Header: 'Customer Name',
        accessor: 'supplier_id',
      },
        
      {
        Header: 'Print Name',
        accessor: 'print_name',
      },
      {
        Header: 'Account Group',
        accessor: 'account_group',
      },
      {
        Header: 'Pincode',
        accessor: 'pincode',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'State Code',
        accessor: 'state_code',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
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
        Header: 'Birthday',
        accessor: 'birthday',
      },
      {
        Header: 'Anniversary',
        accessor: 'anniversary',
      },
      {
        Header: 'Bank Account No',
        accessor: 'bank_account_no',
      },
      {
        Header: 'Bank Name ',
        accessor: 'bank_name',
      },
      {
        Header: 'IFSC Code',
        accessor: 'ifsc_code',
      },
      {
        Header: 'Branch',
        accessor: 'branch',
      },
      {
        Header: 'GSTIN',
        accessor: 'gst_in',
      },
      {
        Header: 'Aadhar Card',
        accessor: 'aadhar_card',
      },
      {
        Header: 'PAN Card',
        accessor: 'pan_card',
      },
     
      {
        Header: 'Action',
        Cell: ({ row }) => (
            <div className="d-flex align-items-center">
              <button
                className="action-button edit-button"
                onClick={() => navigate(`/estimates/${row.original.product_id}`)}
              >
                <FaEdit />
              </button>
              <button
                className="action-button delete-button"
                onClick={() => handleDelete(row.original.product_id)}
              >
                <FaTrash />
              </button>
            </div>
          ),
          
      },
      
    ],
    []
  );

  useEffect(() => {
    fetch('http://localhost:4000/get-estimates')
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (product_id) => {
    if (window.confirm('Are you sure you want to delete this estimate?')) {
      fetch(`http://localhost:4000/delete-estimate/${product_id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message); // Success message
          // Refresh data after deletion
          setData((prevData) => prevData.filter((item) => item.product_id !== product_id));
        })
        .catch((error) => {
          console.error('Error deleting record:', error);
          alert('Failed to delete estimate. Please try again.');
        });
    }
  };

  const handleCreate = () => {
    navigate('/customermaster'); // Navigate to the /estimates page
  };

  return (
    <div className="main-container">
      <div className="estimates-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Customers</h3>
            <Button variant="success" onClick={handleCreate}>
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default RepairsTable;
