import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import './PurchaseTable.css'

const PurchaseTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data

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
        
          
      },
      
    ],
    []
  );



  const handleCreate = () => {
    navigate('/purchase'); // Navigate to the /suppliers page
  };

  return (
    <div className="main-container">
      <div className="purchase-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Purchase</h3>
            <Button variant="success" onClick={handleCreate}>
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
