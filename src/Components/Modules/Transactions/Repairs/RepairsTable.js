import React from 'react';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';

const RepairsTable = () => {
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

  return (
<div className="main-container">
    <div className="repairs-table-container">
      <h3>Repairs Table</h3>
      <DataTable columns={columns} data={data} />
    </div>
</div>
  );
};

export default RepairsTable;
