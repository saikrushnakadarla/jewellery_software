import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap'; 
import './AccountsTable.css'

const RepairsTable = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [data, setData] = useState([]); // State to store accounts data
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch accounts data from the API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get/accounts'); // Adjust the URL if necessary
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

    fetchAccounts();
  }, []);

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
            <Button className='create_but' variant="success" onClick={handleCreate}>
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
