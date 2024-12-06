import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
 import './Supplier_Table.css';

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const [loading, setLoading] = useState(true); // State for loading indicator

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr. No.',
        Cell: ({ row }) => row.index + 1, // Generate a sequential number based on the row index
      },
      {
        Header: 'Customer Name',
        accessor: 'account_name',
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
        accessor: 'pin_code',
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
        Header: 'Bank Name',
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
              onClick={() => handleEdit(row.original.id)}
            >
              <FaEdit />
            </button>
            <button
              className="action-button delete-button"
              onClick={() => handleDelete(row.original.id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );
 // Fetch data and filter where account_group = "supplier"
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/get/supplier-and-customer'
      );
      const result = await response.json();

      // Filter only suppliers
      const suppliers = result.filter(
        (item) => item.account_group && item.account_group.toLowerCase() === 'supplier'
      );

      setData(suppliers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, []);



const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this customer?')) {
    try {
      const response = await fetch(`http://localhost:5000/delete/supplier-and-customer/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Supplier deleted successfully!');
        setData((prevData) => prevData.filter((customer) => customer.id !== id));
      } else {
        console.error('Failed to delete customer');
        alert('Failed to delete customer.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting.');
    }
  }
};

  // Navigate to edit form
  const handleEdit = (id) => {
    navigate(`/suppliermaster/${id}`);
  };

  const handleCreate = () => {
    navigate('/suppliermaster'); // Navigate to the /customers page
  };
  

  return (
    <div className="main-container">
      <div className="customers-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Suppliers</h3>
            <Button className='create_but' variant="success" onClick={handleCreate}>
              + Create
            </Button>
          </Col>
        </Row>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default RepairsTable;
