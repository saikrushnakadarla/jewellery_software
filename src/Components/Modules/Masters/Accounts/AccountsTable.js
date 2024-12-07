import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap'; 
import './AccountsTable.css';
import baseURL from "../../../../Url/BaseURL";

const RepairsTable = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [data, setData] = useState([]); // State to store accounts data
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch accounts data from the API
  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${baseURL}/get/accounts`);
      if (!response.ok) {
        throw new Error('Failed to fetch accounts data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching accounts data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts(); // Initial fetch when the component mounts
  }, []);

  const handleEdit = (id) => {
    navigate(`/accounts/${id}`); // Navigate to the edit form with account ID
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        const response = await fetch(`${baseURL}/delete/accounts/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error deleting account: ${errorText}`);
        }
        alert("Account deleted successfully!");
        // Refetch data after deletion
        fetchAccounts();
      } catch (err) {
        console.error("Error deleting account:", err.message);
        alert(`Error: ${err.message}`);
      }
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Account Name', accessor: 'account_name' },
      { Header: 'Print Name', accessor: 'print_name' },
      { Header: 'Group', accessor: 'group' },
      { Header: 'Op. Bal.', accessor: 'op_bal' },
      { Header: 'Dr/Cr', accessor: 'dr_cr' },
      { Header: 'Metal Balance', accessor: 'metal_balance' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Address2', accessor: 'address2' },
      { Header: 'City', accessor: 'city' },
      { Header: 'Area', accessor: 'area' },
      { Header: 'Pincode', accessor: 'pincode' },
      { Header: 'State', accessor: 'state' },
      { Header: 'State Code', accessor: 'state_code' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'Contact Person', accessor: 'contact_person' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Birthday On', accessor: 'birthday_on' },
      { Header: 'Anniversary', accessor: 'anniversary_on' },
      { Header: 'Bank Account No.', accessor: 'bank_account_no' },
      { Header: 'Bank Name', accessor: 'bank_name' },
      { Header: 'IFSC Code', accessor: 'ifsc_code' },
      { Header: 'Branch', accessor: 'branch' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <FaEdit 
              style={{ cursor: 'pointer', marginRight: 10 }} 
              onClick={() => handleEdit(row.original.account_id)} 
            />
            <FaTrash 
              style={{ cursor: 'pointer' }} 
              onClick={() => handleDelete(row.original.account_id)} 
            />
          </div>
        )
      }
    ],
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCreate = () => {
    navigate('/accounts'); // Navigate to the /repairs page
  };

  return (
    <div className="main-container">
      <div className="accounts-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Accounts</h3>
            <Button className='create_but' onClick={handleCreate} style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>
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
