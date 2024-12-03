import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap'; 
import './AccountsTable.css'

const RepairsTable = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const columns = React.useMemo(
    () => [
      {
        Header: 'Account Name',
        accessor: 'account_name', // Key from the data
      },
      {
        Header: 'Print Name',
        accessor: '',
      },
      {
        Header: 'Group',
        accessor: '',
      },
      {
        Header: 'Op. Bal.',
        accessor: '',
      },
      {
        Header: 'Dr/Cr',
        accessor: '',
      },
      {
        Header: 'Metal Balance',
        accessor: '',
      },
      {
        Header: 'Address',
        accessor: '',
      },
      {
        Header: 'Address2',
        accessor: '',
      },
      {
        Header: 'City',
        accessor: '',
      },
      {
        Header: 'Area',
        accessor: '',
      },
      {
        Header: 'Pincode',
        accessor: '',
      },
      {
        Header: 'State',
        accessor: '',
      },
      {
        Header: 'State Code',
        accessor: '',
      },
      {
        Header: 'Phone',
        accessor: '',
      },
      {
        Header: 'Mobile',
        accessor: '',
      },
      {
        Header: 'Contact Person',
        accessor: '',
      },
      {
        Header: 'Email',
        accessor: '',
      },
      {
        Header: 'Birthday On',
        accessor: '',
      },
      {
        Header: 'Anniversary',
        accessor: '',
      },
      {
        Header: 'Bank Account No.',
        accessor: '',
      },
      {
        Header: 'Bank Name',
        accessor: '',
      },
      {
        Header: 'IFSC Code',
        accessor: '',
      },
      {
        Header: 'Branch',
        accessor: '',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
   
    ],
    []
  );



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
