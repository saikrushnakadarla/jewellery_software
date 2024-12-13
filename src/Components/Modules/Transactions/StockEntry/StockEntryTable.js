import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import your reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import './StockEntryTable.css';

const StockEntryTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store fetched table data

  // Define the columns for the table
  const columns = React.useMemo(
    () => [
      { Header: 'Pricing', accessor: 'Pricing' },
      { Header: 'Product ID', accessor: 'product_id' },
      // { Header: 'Product Name', accessor: 'productname' },
      { Header: 'Category', accessor: 'Category' },
      { Header: 'Prefix', accessor: 'Prefix' },
      { Header: 'Purity', accessor: 'Purity' },
      { Header: 'Product Code', accessor: 'PCode_BarCode' },
      { Header: 'Gross Weight', accessor: 'Gross_Weight' },
      { Header: 'Stones Weight', accessor: 'Stones_Weight' },
      { Header: 'Stones Price', accessor: 'Stones_Price' },
      { Header: 'Weight (WW)', accessor: 'WastageWeight' },
      { Header: 'Wastage On', accessor: 'Wastage_On' },
      { Header: 'Wastage', accessor: 'Wastage_Percentage' },
      { Header: 'Percentage', accessor: 'percentage' },
      { Header: 'Weight', accessor: 'Weight_BW' },
      { Header: 'Making Charges', accessor: 'Making_Charges' },
      { Header: 'Cal', accessor: 'cal' },
      { Header: 'Tax', accessor: 'tax' },
      { Header: 'Stock Point', accessor: 'stackpoint' },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button
              className="action-button edit-button"
              onClick={() => navigate(`/edit-stock/${row.original.pid}`)}
            >
              <FaEdit />
            </button>
            <button
              className="action-button delete-button"
              onClick={() => handleDelete(row.original.pid)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:5000/get/opening-tags-entry') // Correct URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch stock entries');
        }
        return response.json();
      })
      .then((data) => {
        setData(data.result); // Use data.result since the backend sends { result: [...] }
      })
      .catch((error) => {
        console.error('Error fetching stock entries:', error);
      });
  }, []);
  

  // Handle delete action
  const handleDelete = (pid) => {
    if (window.confirm('Are you sure you want to delete this stock entry?')) {
      fetch(`http://localhost:5000/deleteStockEntry/${pid}`, { method: 'DELETE' })
        .then((response) => response.json())
        .then((result) => {
          alert(result.message);
          setData((prevData) => prevData.filter((item) => item.pid !== pid)); // Update state
        })
        .catch((error) => {
          console.error('Error deleting stock entry:', error);
          alert('Failed to delete stock entry. Please try again.');
        });
    }
  };

  // Navigate to the create stock entry page
  const handleCreate = () => {
    navigate('/stockEntry');
  };

  return (
    <div className="main-container">
      <div className="stockentry-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Stock Entry</h3>
            <Button className='create_but' onClick={handleCreate} style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>
              + Create
            </Button>
          </Col>
        </Row>
        {/* DataTable component */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default StockEntryTable;
