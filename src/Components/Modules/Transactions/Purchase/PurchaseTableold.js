import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import './PurchaseTable.css';
import baseURL from "../../../../Url/NodeBaseURL";

const PurchaseTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data

  const formatDate = (date) => {
    if (!date) return ''; // Return an empty string if no date is provided
  
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  // Pad single digit days with 0
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Pad months with 0
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'account_name' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'Email', accessor: 'email' },
      // { Header: 'A/C Address:', accessor: 'address1' },
      // { Header: 'Address 2', accessor: 'address2' },
      // { Header: 'City', accessor: 'city' },
      // { Header: 'Pincode', accessor: 'pincode' },
      // { Header: 'State', accessor: 'state' },
      // { Header: 'State Code', accessor: 'state_code' },
      // { Header: 'Aadhar Card', accessor: 'aadhar_card' },
      // { Header: 'GSTIN', accessor: 'gst_in' },
      // { Header: 'PAN Card', accessor: 'pan_card' },
      // { Header: 'Indent', accessor: 'indent' },
      // { Header: 'Bill No:', accessor: 'bill_no' },
      // { Header: 'Type', accessor: 'type' },
      // { Header: 'Rate Cut', accessor: 'rate_cut' },
      { Header: 'Date', accessor: 'date',Cell: ({ value }) => <span>{formatDate(value)}</span>, },
      { Header: 'Bill Date:', accessor: 'bill_date',Cell: ({ value }) => <span>{formatDate(value)}</span>, },
      { Header: 'Due Date', accessor: 'due_date',Cell: ({ value }) => <span>{formatDate(value)}</span>, },
      // { Header: 'Purchase Rate', accessor: 'Purchase_rate' },
      // { Header: 'Product ID', accessor: 'product_id' },
      { Header: 'Product Name', accessor: 'product_name' },
      { Header: 'Metal Type', accessor: 'metal_type' },
      { Header: 'Design Name', accessor: 'design_name' },
      { Header: 'Purity', accessor: 'purity' },
      // { Header: 'HSN', accessor: 'hsn' },
      // { Header: 'Product Type', accessor: 'product_type' },
      // { Header: 'Stock Type', accessor: 'stock_type' },
      // { Header: 'Pcs', accessor: 'pcs' },
      { Header: 'Gross Weight', accessor: 'gross_weight' },
      { Header: 'Stone Weight', accessor: 'stone_weight' },
      // { Header: 'Net Weight', accessor: 'net_weight' },
      // { Header: 'Nit Weight', accessor: 'nit_weight' },
      // { Header: 'Waste Percentage', accessor: 'waste_percentage' },
      // { Header: 'Waste Amount', accessor: 'waste_amount' },
      // { Header: 'Pure Weight', accessor: 'pure_weight' },
      // { Header: 'Alloy', accessor: 'alloy' },
      // { Header: 'Cost', accessor: 'cost' },
      // { Header: 'Total Weight', accessor: 'total_weight' },
      // { Header: 'WT*Rate Amount', accessor: 'wt_rate_amount' },
      // { Header: 'MC/GM', accessor: 'mc_per_gram' },
      // { Header: 'MC', accessor: 'mc' },
      // { Header: 'Stone Amount', accessor: 'stone_amount' },
      // { Header: 'Total Amount', accessor: 'total_amount' },
      // { Header: 'Stone', accessor: 'stone' },
      // { Header: 'Stone Pcs', accessor: 'stone_pcs' },
      // { Header: 'Stone CT', accessor: 'stone_ct' },
      // { Header: 'CWP', accessor: 'cwp' },
      // { Header: 'GMS', accessor: 'gms' },
      // { Header: 'Stone Rate', accessor: 'stone_rate' },
      // { Header: 'Clarity', accessor: 'clarity' },
      // { Header: 'Rate', accessor: 'rate' },
      // { Header: 'Clear', accessor: 'clear' },
      // { Header: 'Class', accessor: 'class' },
      // { Header: 'Cut', accessor: 'cut' },
      // { Header: 'Action', accessor: 'action' },
    ],
    []
  );
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/purchases`); // Fetch data from the endpoint
        const result = await response.json();
        if (result?.purchases) {
          setData(result.purchases); // Set fetched data
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreate = () => {
    navigate('/purchase'); // Navigate to the /suppliers page
  };

  return (
    <div className="main-container">
      <div className="purchase-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Purchase</h3>
            <Button  className='create_but' onClick={handleCreate} style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default PurchaseTable;
