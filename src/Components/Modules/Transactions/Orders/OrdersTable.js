import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap'; 
// import './PaymentsTable.css'

const OdersTable = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date', // Key from the data
      },
      {
        Header: 'Order No',
        accessor: 'order_no',
      },
      {
        Header: 'Mode',
        accessor: 'mode',
      },
      {
        Header: 'Cheque Number',
        accessor: 'cheque_number',
      },
      
      {
        Header: 'Account Name',
        accessor: 'account_name',
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
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
   
    ],
    []
  );

  const handleDelete = (id) => {
    console.log('Delete record with id:', id);
    // Implement your delete logic here
  };

  const handleCreate = () => {
    navigate('/orders'); // Navigate to the /repairs page
  };

  return (
    <div className="main-container">
      <div className="payments-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Orders</h3>
            <Button className='create_but' variant="success" onClick={handleCreate} style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default OdersTable;
