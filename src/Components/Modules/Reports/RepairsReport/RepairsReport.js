import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col, Form } from 'react-bootstrap';
// import './EstimateTable.css';

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const [fromDate, setFromDate] = useState(''); // State for From Date
  const [toDate, setToDate] = useState(''); // State for To Date



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
    navigate('/estimates'); // Navigate to the /estimates page
  };
  const handleFilter = () => {
    // Fetch or filter data based on the selected dates
    if (!fromDate || !toDate) {
      alert('Please select both From Date and To Date.');
      return;
    }

    fetch(`http://localhost:4000/filter-estimates?from_date=${fromDate}&to_date=${toDate}`)
      .then((response) => response.json())
      .then((filteredData) => {
        setData(filteredData); // Set the filtered data
      })
      .catch((error) => {
        console.error('Error filtering data:', error);
      });
  };

  return (
    <div className="main-container">
    <div className="sales-table-container">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h3>RepairsReport</h3>
        
        </Col>
      </Row>
       {/* From Date, To Date, and Filter Button */}
       <Row className="mb-4">
        <Col xs={12} md={2}>
          <Form.Group>
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{width:'200px'}}

            />
          </Form.Group>
        </Col>
        <Col xs={12} md={2}>
          <Form.Group>
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{width:'200px'}}

            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4} className="d-flex align-items-end">
          <Button variant="primary" onClick={handleFilter}>
            Filter Data
          </Button>
        </Col>
      </Row>
      <DataTable columns={columns} data={data} />
    </div>
  </div>
  );
};

export default RepairsTable;
