import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Button, Row, Col, Modal, Table } from 'react-bootstrap';
import DataTable from '../../../Pages/InputField/DataTable'; // Import the DataTable component
import baseURL from "../../../../Url/NodeBaseURL";
import axios from 'axios';

const RepairsTable = () => {
  const [data, setData] = useState([]); // State to store table data
  const [loading, setLoading] = useState(true); // Loading state
    const [repairDetails, setRepairDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-unique-estimates`);
        
        // Filter the data based on the 'transaction_status' column
        const filteredData = response.data
        
        setData(filteredData); // Set the filtered data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const formatDate = (date) => {
    if (!date) return ''; // Return an empty string if no date is provided
  
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  // Pad single digit days with 0
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Pad months with 0
    const year = d.getFullYear();
    
    return `${day}/${month}/${year}`;
  };


  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Estimate Number',
        accessor: 'estimate_number',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => {
          const date = new Date(value);
          return date.toLocaleDateString('en-GB'); // en-GB for dd/mm/yyyy format
        },
      },

      {
        Header: 'Product Name',
        accessor: 'product_name',
      },
      {
        Header: 'Gross Weight',
        accessor: 'gross_weight',
      },
      {
        Header: 'Stone Weight',
        accessor: 'stones_weight',
      },
      {
        Header: 'Stone Price',
        accessor: 'stones_price',
      },
      {
        Header: 'Wastage Percent',
        accessor: 'wastage_percent',
      },
      {
        Header: 'Wastage Weight',
        accessor: 'wastage_weight',
      },
      {
        Header: 'Net Weight',
        accessor: 'total_weight',
      },
      {
        Header: 'MC Per Gram',
        accessor: 'mc_per_gram',
      },
      {
        Header: 'Total MC',
        accessor: 'total_mc',
      },
      {
        Header: 'Tax Percent',
        accessor: 'tax_percent',
      },
      {
        Header: 'Tax VAT Amount',
        accessor: 'tax_vat_amount',
      },
      {
        Header: 'Total Rs',
        accessor: 'total_rs',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <FaEye
              style={{ cursor: 'pointer', marginLeft: '10px', color: 'green' }}
              onClick={() => handleViewDetails(row.original.estimate_number)} // Pass estimate_number
            />
          </div>
        ),
      },
    ],
    []
  );

    const handleViewDetails = async (estimate_number) => {
      try {
        const response = await axios.get(`${baseURL}/get-estimates/${estimate_number}`);
        setRepairDetails(response.data);
        setShowModal(true); // Show the modal with repair details
      } catch (error) {
        console.error('Error fetching repair details:', error);
      }
    };
  
    // Close the modal
    const handleCloseModal = () => {
      setShowModal(false);
      setRepairDetails(null); // Clear repair details on modal close
    };

  return (
    <div className="main-container">
      <div className="sales-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Estimate Report</h3>
          </Col>
        </Row>
        {loading ? (
          <p>Loading...</p> // Show loading message while fetching data
        ) : (
          <DataTable columns={columns} data={[...data].reverse()} /> // Render the table
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" className='m-auto'>
        <Modal.Header closeButton>
          <Modal.Title>Estimate Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {repairDetails && (
            <>
              
              <Table bordered>
                <tbody>
                <tr>
                  <td>Date</td>
                  <td>{formatDate(repairDetails.uniqueData.date)}</td>
                </tr>
                  <tr>
                    <td>Invoice Number</td>
                    <td>{repairDetails.uniqueData.estimate_number}</td>
                  </tr>
                  
                </tbody>
              </Table>

              <h5>Products</h5>
              <Table bordered>
              <thead>
              <tr>
                <th>RbarCode/BarCode</th>
                <th>Product Name</th>
                <th>Metal Type</th>
                <th>Design Name</th>
                <th>Purity</th>
                <th>Gross Weight</th>
                <th>Stone Weight</th>
                <th>Wastage Weight</th>
                <th>Total Weight</th>
                <th>Making Charges</th>
                <th>Rate</th>
                <th>Tax Amount</th>
                <th>Total Price</th>
              </tr>
                </thead>
                <tbody>
                {repairDetails.repeatedData.map((product, index) => (
                <tr key={index}>
                <td>{product.code}</td>
                <td>{product.product_name}</td>
                <td>{product.metal_type}</td>
                <td>{product.design_master}</td>
                <td>{product.purity}</td>
                <td>{product.gross_weight}</td>
                <td>{product.stones_weight}</td>  
                <td>{product.wastage_weight}</td>
                <td>{product.total_weight}</td>
                <td>{product.total_mc}</td>
                <td>{product.rate}</td>
                <td>{product.tax_vat_amount}</td>
                <td>{product.total_rs}</td>
                
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RepairsTable;
