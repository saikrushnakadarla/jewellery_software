import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { Button, Row, Col } from 'react-bootstrap';
import './ItemMasterTable.css';
import baseURL from "../../../../Url/NodeBaseURL";

const ItemMasterTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const columns = React.useMemo(() => [
    { Header: 'Product ID:', accessor: 'product_id' }, 
    { Header: 'Product Name:', accessor: 'product_name' }, 
    { Header: 'Barcode', accessor: 'rbarcode' }, 
    { Header: 'Category', accessor: 'Category' }, 
    { Header: 'Design Master', accessor: 'design_master' }, 
    { Header: 'Purity', accessor: 'purity' }, 
    { Header: 'Item Prefix', accessor: 'item_prefix' }, 
    { Header: 'Short Name:', accessor: 'short_name' }, 
    { Header: 'Sale Account Head', accessor: 'sale_account_head' }, 
    { Header: 'Purchase Account Head:', accessor: 'purchase_account_head' }, 
    // { Header: 'Status', accessor: 'status' }, 
    { Header: 'Tax Slab', accessor: 'tax_slab' }, 
    { Header: 'HSN Code', accessor: 'hsn_code' }, 
    { Header: 'Maintain Tags', accessor: 'maintain_tags' }, 
    { Header: 'OP. Qty:', accessor: 'op_qty' }, 
    { Header: 'OP. Value:', accessor: 'op_value' }, 
    { Header: 'OP. Weight:', accessor: 'op_weight' }, 
    { Header: 'HUID No:', accessor: 'huid_no' }
  ], []);
  

   // Fetch data from the API
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        setData(result); // Populate the data state with API response
      } catch (error) {
        
      } 
    };

    fetchData();
  }, []);


  const handleCreate = () => {
    navigate('/itemmaster'); // Navigate to the /itemmaster page
  };

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