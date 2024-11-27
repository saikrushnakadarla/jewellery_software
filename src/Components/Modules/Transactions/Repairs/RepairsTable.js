import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap'; // Import React Bootstrap components

const RepairsTable = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const columns = React.useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: 'name', // Key from the data
      },
      {
        Header: 'CONTACT INFO',
        accessor: 'contact',
      },
      {
        Header: 'CREATED BY',
        accessor: 'createdBy',
      },
      {
        Header: 'ACTION',
        Cell: ({ row }) => (
          <div>
            <button className="action-button edit-button">
              <FaEdit />
            </button>
            <button
              className="action-button delete-button"
              onClick={() => handleDelete(row.original.id)} // Call a delete handler
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      { id: 1, name: 'John Doe', contact: '1234567890', createdBy: 'Admin' },
      { id: 2, name: 'Jane Smith', contact: '9876543210', createdBy: 'Manager' },
      // Add more records as needed
    ],
    []
  );

  const handleDelete = (id) => {
    console.log('Delete record with id:', id);
    // Implement your delete logic here
  };

  const handleCreate = () => {
    navigate('/repairs'); // Navigate to the /repairs page
  };

  return (
    <div className="main-container">
      <div className="repairs-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Repairs</h3>
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
