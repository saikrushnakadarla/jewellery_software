import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import your reusable DataTable component
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import './StockEntryTable.css';
import baseURL from "../../../../Url/NodeBaseURL";

const StockEntryTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store fetched table data

  // Fetch data from the API
  useEffect(() => {
    fetch(`${baseURL}/get/opening-tags-entry`) // Correct URL
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
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
        fetch(`${baseURL}/delete/opening-tags-entry/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete the record');
            }
            return response.json();
        })
        .then(() => {
            // Update the table data after successful deletion
            setData((prevData) => prevData.filter((item) => item.opentag_id !== id));
            alert("Record deleted successfully.");
        })
        .catch((error) => {
            console.error('Error deleting record:', error);
        });
    }
};


  // Define the columns for the table
  const columns = React.useMemo(
    () => [
      { Header: 'Pricing', accessor: 'Pricing' },
      { Header: 'Product ID', accessor: 'product_id' },
      { Header: 'Product Name', accessor: 'product_Name' },
      { Header: 'Category', accessor: 'Category' },
      { Header: 'Prefix', accessor: 'Prefix' },
      { Header: 'Purity', accessor: 'Purity' },
      { Header: 'Product Code', accessor: 'PCode_BarCode' },
      { Header: 'Gross Weight', accessor: 'Gross_Weight' },
      { Header: 'Stones Weight', accessor: 'Stones_Weight' },
      { Header: 'Stones Price', accessor: 'Stones_Price' },
      { Header: 'Weight (WW)', accessor: 'Weight_BW' },
      { Header: 'Wastage On', accessor: 'Wastage_On' },
      { Header: 'Wastage', accessor: 'WastageWeight' },
      { Header: 'Percentage', accessor: 'Wastage_Percentage' },
      { Header: 'Weight', accessor: 'TotalWeight_AW' },
      { Header: 'Making Charges', accessor: 'Making_Charges' },
      { Header: 'Stock Point', accessor: 'Stock_Point' },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button
              className="action-button edit-button"
              onClick={() => navigate(`/edit-stock/${row.original.product_id}`)}
            >
              <FaEdit />
            </button>
            <button
              className="action-button delete-button"
              onClick={() => handleDelete(row.original.opentag_id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

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
            <Button
              className="create_but"
              onClick={handleCreate}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
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
