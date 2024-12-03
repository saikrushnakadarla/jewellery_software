import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import './ItemMasterTable.css';

const ItemMasterTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const columns = React.useMemo(
    () => [
      {
        Header: 'Product Name:',
        accessor: 'productname',
      },
        
      {
        Header: 'Categories',
        accessor: 'categories',
      },
      {
        Header: 'Item Prefix',
        accessor: 'itemprefix',
      },
      {
        Header: 'Short Name:',
        accessor: 'shortname',
      },
      {
        Header: 'Sale Account Head',
        accessor: 'saleaccounthead',
      },
      {
        Header: 'Purchase Account Head:',
        accessor: 'purchaseaccounthead',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Tax Slab',
        accessor: 'taxslab',
      },
      {
        Header: 'HSN Code',
        accessor: 'hsncode',
      },
      {
        Header: 'OP.Qty:',
        accessor: 'opqty',
      },
      {
        Header: 'OP.Value:',
        accessor: 'opvalue',
      },
      {
        Header: 'OP.Weight:',
        accessor: 'opweight',
      },
      {
        Header: 'Purity',
        accessor: 'purity',
      },
      {
        Header: 'HUID No:',
        accessor: 'huidno',
      },
      {
        Header: 'Pricing',
        accessor: 'pricing',
      },
      {
        Header: 'P ID:',
        accessor: 'pid',
      },
      // {
      //   Header: 'Product Name:',
      //   accessor: 'product_name',
      // },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'PCode',
        accessor: 'pcode',
      },
      {
        Header: 'Gross Weight:',
        accessor: 'grossweight',
      },
      {
        Header: 'Stones Weight:',
        accessor: 'stonesweight',
      },
      {
        Header: 'Stones Price:',
        accessor: 'stonesprice',
      },
      {
        Header: 'Weight WW:',
        accessor: 'weightww',
      },
      {
        Header: 'Wastage On:',
        accessor: 'wastageon',
      },
      {
        Header: 'Wastage:',
        accessor: 'wastage',
      },
      {
        Header: '%:',
        accessor: 'percentage',
      },
      {
        Header: 'Weight:',
        accessor: 'weight',
      },
      {
        Header: 'Making Chaeges::',
        accessor: 'makingchaeges',
      },
      {
        Header: 'Cal:',
        accessor: 'cal',
      },
      {
        Header: 'Tax:',
        accessor: 'tax',
      },
      {
        Header: 'Stack Point:',
        accessor: 'stackpoint',
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
    navigate('/itemmaster'); // Navigate to the /estimates page
  };
  return (
    <div className="main-container">
      <div className="itemmaster-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Item Master Table</h3>
            <Button className='create_but' variant="success" onClick={handleCreate}>
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ItemMasterTable;
