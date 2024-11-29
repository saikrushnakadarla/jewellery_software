import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';

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
        accessor: 'print_name',
      },
      {
        Header: 'Purity',
        accessor: 'account_group',
      },
      {
        Header: 'A/C Address:',
        accessor: 'pincode',
      },
      {
        Header: 'GSTIN',
        accessor: 'state',
      },
      {
        Header: ' Indent',
        accessor: 'state_code',
      },
      {
        Header: 'Bill No:',
        accessor: 'phone',
      },
      {
        Header: 'Type',
        accessor: 'mobile',
      },
      {
        Header: 'Rate-Cut',
        accessor: 'email',
      },
      {
        Header: 'Date',
        accessor: 'birthday',
      },
      {
        Header: 'Bill Date:',
        accessor: 'anniversary',
      },
      {
        Header: 'Category',
        accessor: 'bank_account_no',
      },
      {
        Header: 'Due Date',
        accessor: 'bank_name',
      },
      {
        Header: 'Rate',
        accessor: 'ifsc_code',
      },
      {
        Header: 'Item Name',
        accessor: 'branch',
      },
      {
        Header: 'Design Code ',
        accessor: 'gst_in',
      },
      {
        Header: ' HSN',
        accessor: 'aadhar_card',
      },
      {
        Header: 'Type',
        accessor: 'pan_card',
      },
      {
        Header: 'Stock Type',
        accessor: 'branch',
      },
      {
        Header: 'Pcs',
        accessor: 'branch',
      },
      {
        Header: 'Gross',
        accessor: 'branch',
      },
      {
        Header: 'Stone',
        accessor: 'branch',
      },
      {
        Header: 'Net',
        accessor: 'branch',
      },
      {
        Header: 'Purity',
        accessor: 'branch',
      },
      {
        Header: 'Rate',
        accessor: 'branch',
      },
      {
        Header: 'Unit',
        accessor: 'branch',
      },
      {
        Header: 'W% ',
        accessor: 'branch',
      },
      {
        Header: 'Waste ',
        accessor: 'branch',
      },
      {
        Header: 'Pure Wt',
        accessor: 'branch',
      },
      {
        Header: 'Alloy ',
        accessor: 'branch',
      },
      {
        Header: 'Cost',
        accessor: 'branch',
      },
      {
        Header: 'Tot Wt :',
        accessor: 'branch',
      },
      {
        Header: 'WT*Rate Amt',
        accessor: 'branch',
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
      {
        Header: 'Stone ',
        accessor: 'stone',
      },
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
    
      {
        Header: 'Rate  ',
        accessor: 'rate',
      },
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

  const handleCreate = () => {
    navigate('/purchase'); // Navigate to the /estimates page
  };

  return (
    <div className="main-container">
      <div className="estimates-table-container">
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
