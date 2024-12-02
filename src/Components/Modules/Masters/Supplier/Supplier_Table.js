import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
// import './Customers_Table.css';

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
        accessor: 'customer_name',
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
          <div>
            <button
              className="edit-btn edit-button"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </button>
            <button
              className="delete-btn delete-button"
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

const handleEdit = (customer) => {
  navigate(`/suppliereditform/:id`); // Navigate to the edit form with the customer ID
};


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this customer?'
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/delete/supplier-and-customer/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        alert('Customer deleted successfully.');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete customer: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('An error occurred while trying to delete the customer.');
    }
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
            <Button variant="success" onClick={handleCreate}>
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
