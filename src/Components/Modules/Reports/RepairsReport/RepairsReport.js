import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/DataTable'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col, Form } from 'react-bootstrap';
// import './EstimateTable.css';

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },

      {
        Header: 'Mobile ',
        accessor: 'mobile',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: ' Address1',
        accessor: 'address_1',
      },
      {
        Header: ' Address2',
        accessor: 'address_2',
      },
      {
        Header: ' Address3',
        accessor: 'address_3',
      },
      {
        Header: 'Staff ',
        accessor: 'staff',
      },
      {
        Header: 'Delivery Date:',
        accessor: 'delivery_date:',
      },
      {
        Header: 'Wastage',
        accessor: 'wastage',
      },
      {
        Header: 'Place',
        accessor: 'place',
      },
      {
        Header: 'Metal',
        accessor: 'metal',
      },
      {
        Header: 'Counter',
        accessor: 'counter',
      },
     
     
      {
        Header: 'Action',
       
      },

    ],
    []
  );


  return (
    <div className="main-container">
    <div className="sales-table-container">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h3>Repairs Report</h3>        
        </Col>
      </Row>
      <DataTable columns={columns} data={data} />
    </div>
  </div>
  );
};

export default RepairsTable;
