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
        Header: 'ID.',
        accessor: 'product_id',
      },

      {
        Header: 'Product Code',
        accessor: 'pcode',
      },
      {
        Header: 'Product Name',
        accessor: 'product_name',
      },
      {
        Header: 'Gross Weight',
        accessor: 'gross_weight',
      },
      {
        Header: 'Stone Weight',
        accessor: 'stones_weight',
      },
      {
        Header: 'Stone Price',
        accessor: 'stones_price',
      },
      {
        Header: 'Weight WW',
        accessor: 'weight_ww',
      },
      {
        Header: 'Wastage Percent',
        accessor: 'wastage_percent',
      },
      {
        Header: 'Wastage',
        accessor: 'wastage',
      },
      {
        Header: 'Net Weight',
        accessor: 'nett_weight',
      },
      {
        Header: 'Rate Average',
        accessor: 'rate_av',
      },
      {
        Header: 'Rate (10g)',
        accessor: 'rate_10g',
      },
      {
        Header: 'Rate (1g)',
        accessor: 'rate_1g',
      },
      {
        Header: 'MC Per Gram',
        accessor: 'mc_per_gram',
      },
      {
        Header: 'Total Before Tax',
        accessor: 'total_b4_tax',
      },
      {
        Header: 'Total MC',
        accessor: 'total_mc',
      },
      {
        Header: 'Tax Percent',
        accessor: 'tax_percent',
      },
      {
        Header: 'Tax VAT Amount',
        accessor: 'tax_vat_amount',
      },
      {
        Header: 'Total Rs',
        accessor: 'total_rs',
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
          <h3>EstimateReport</h3>
        
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
