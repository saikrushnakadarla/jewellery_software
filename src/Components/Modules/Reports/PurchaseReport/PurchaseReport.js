import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col, Form  } from 'react-bootstrap';

const PurchaseTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const [fromDate, setFromDate] = useState(''); // State for From Date
  const [toDate, setToDate] = useState(''); // State for To Date


  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'supplier_id',
      },
        
      {
        Header: 'Metal',
        accessor: 'metal',
      },
      {
        Header: 'Purity',
        accessor: 'purity',
      },
      {
        Header: 'A/C Address:',
        accessor: 'a/c_address',
      },
      {
        Header: 'GSTIN',
        accessor: 'gst_in',
      },
      {
        Header: ' Indent',
        accessor: 'indent',
      },
      {
        Header: 'Bill No:',
        accessor: 'bill_no',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Rate_Cut',
        accessor: 'rate_cut',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Bill Date:',
        accessor: 'bill_date',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Due Date',
        accessor: 'due_date',
      },
      {
        Header: 'Rate',
        accessor: 'rate',
      },
      {
        Header: 'Item Name',
        accessor: 'item_name',
      },
      {
        Header: 'Design Code ',
        accessor: 'design_code',
      },
      {
        Header: ' HSN',
        accessor: 'hsn',
      },
      // {
      //   Header: 'Type',
      //   accessor: 'type',
      // },
      {
        Header: 'Stock Type',
        accessor: 'stock_type',
      },
      // {
      //   Header: 'Pcs',
      //   accessor: 'pcs',
      // },
      {
        Header: 'Gross',
        accessor: 'gross',
      },
      {
        Header: 'Stone',
        accessor: 'stone',
      },
      {
        Header: 'Net',
        accessor: 'net',
      },
      // {
      //   Header: 'Purity',
      //   accessor: 'purity',
      // },
      // {
      //   Header: 'Rate',
      //   accessor: 'rate',
      // },
      {
        Header: 'Unit',
        accessor: 'unit',
      },
      {
        Header: 'W% ',
        accessor: 'w%',
      },
      {
        Header: 'Waste ',
        accessor: 'waste',
      },
      {
        Header: 'Pure Wt',
        accessor: 'pure_wt',
      },
      {
        Header: 'Alloy ',
        accessor: 'alloy',
      },
      {
        Header: 'Cost',
        accessor: 'cost',
      },
      {
        Header: 'Tot Wt :',
        accessor: 'total_wt',
      },
      {
        Header: 'WT*Rate Amt',
        accessor: 'wt_rate_amt',
      },
      {
        Header: 'MC/GM',
        accessor: 'mc/gm',
      },
      {
        Header: 'MC',
        accessor: 'mc',
      },
      {
        Header: 'Stn. Amt',
        accessor: 'stn_amt',
      },
      {
        Header: 'Total ',
        accessor: 'total',
      },
      // {
      //   Header: 'Stone ',
      //   accessor: 'stone',
      // },
      {
        Header: 'Pcs ',
        accessor: 'pcs',
      },
      {
        Header: 'CT ',
        accessor: 'ct',
      },

      {
        Header: 'Gms  ',
        accessor: 'gms',
      },
      {
        Header: 'CWP ',
        accessor: 'cwp',
      },
    
      // {
      //   Header: 'Rate  ',
      //   accessor: 'rate',
      // },
      {
        Header: 'Clear  ',
        accessor: 'clear',
      },
      {
        Header: 'Class  ',
        accessor: 'class',
      },
      {
        Header: 'Cut  ',
        accessor: 'cut',
      },
      {
        Header: 'Clarity  ',
        accessor: 'clarity',
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
      <div className="estimates-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>PurchaseReport</h3>
          
          </Col>
        </Row>
         {/* From Date, To Date, and Filter Button */}
         <Row className="mb-4">
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
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

export default PurchaseTable;
