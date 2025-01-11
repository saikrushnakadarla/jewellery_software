import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Reusable DataTable component
import { Button, Row, Col } from 'react-bootstrap';
import './PurchaseTable.css';
import baseURL from '../../../../Url/NodeBaseURL'; // Update with your base URL setup

const PurchaseTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store fetched table data

  // Function to format date to DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Define columns for the DataTable
  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'account_name' },
      // { Header: 'Customer Id', accessor: 'customer_id' },
      { Header: 'Mobile', accessor: 'mobile' },
      // { Header: 'GST IN', accessor: 'gst_in' },
      // { Header: 'Terms', accessor: 'terms' },
      { Header: 'Invoice', accessor: 'invoice' },
      // { Header: 'Bill No', accessor: 'bill_no' },
      // { Header: 'Rate Cut', accessor: 'rate_cut' },
      { Header: 'Date', accessor: 'date', Cell: ({ value }) => <span>{formatDate(value)}</span> },
      // { Header: 'Bill Date', accessor: 'bill_date', Cell: ({ value }) => <span>{formatDate(value)}</span> },
      // { Header: 'Due Date', accessor: 'due_date', Cell: ({ value }) => <span>{formatDate(value)}</span> },
      { Header: 'Category', accessor: 'category' },
      // { Header: 'Barcode', accessor: 'rbarcode' },
      { Header: 'Pcs', accessor: 'pcs' },
      { Header: 'Gross Weight', accessor: 'gross_weight' },
      // { Header: 'Stone Weight', accessor: 'stone_weight' },
      // { Header: 'Net Weight', accessor: 'net_weight' },
      // { Header: 'HM Charges', accessor: 'hm_charges' },
      // { Header: 'Other Charges', accessor: 'other_charges' },
      // { Header: 'Total Charges', accessor: 'charges' },
      { Header: 'Purity', accessor: 'purity' },
      { Header: 'Pure Weight', accessor: 'pure_weight' },
      // { Header: 'Rate', accessor: 'rate' },
      { Header: 'Total Amount', accessor: 'total_amount' },
      { Header: 'Bal Amount', accessor: 'balance_amount' },
    ],
    []
  );

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/purchases`);
        const result = await response.json();
        if (result) {
          setData(result); // Assuming API returns an array of purchases
        } else {
          console.error('Unexpected data structure:', result);
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };
    fetchData();
  }, []);

  // Handle navigation to the Create Purchase page
  const handleCreate = () => {
    navigate('/purchase'); // Update with your correct route
  };

  return (
    <div className="main-container">
      <div className="purchase-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Purchases</h3>
            <Button
              className="create_but"
              onClick={handleCreate}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={[...data].reverse()} />
      </div>
    </div>
  );
};

export default PurchaseTable;
