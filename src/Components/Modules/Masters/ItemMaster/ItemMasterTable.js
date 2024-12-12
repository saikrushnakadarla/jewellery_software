import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { Button, Row, Col } from 'react-bootstrap';
import './ItemMasterTable.css';

const ItemMasterTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Columns definition for DataTable
  const columns = React.useMemo(
    () => [
      { Header: 'Product Name:', accessor: 'product_name' },
      { Header: 'Categories', accessor: 'Category' },
      { Header: 'Item Prefix', accessor: 'item_prefix' },
      { Header: 'Short Name:', accessor: 'short_name' },
     
    ],
    []
  );

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        setData(result); // Populate the data state with API response
      } catch (error) {
        setError(error.message); // Handle any errors during fetch
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  const handleCreate = () => {
    navigate('/itemmaster'); // Navigate to the itemmaster creation page
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-container">
      <div className="itemmaster-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Products</h3>
            <Button
              className="create_but"
              onClick={handleCreate}
              variant="success"
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} /> {/* Render the table with fetched data */}
      </div>
    </div>
  );
};

export default ItemMasterTable;
