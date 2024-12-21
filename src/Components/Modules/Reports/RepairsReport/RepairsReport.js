import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import DataTable from '../../../Pages/InputField/DataTable'; // Import the reusable DataTable component

const RepairsTable = () => {
  const [data, setData] = useState([]); // State to store table data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get/repairs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        // If the result is not an array, wrap it in an array
        setData(Array.isArray(result) ? result : [result]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchData();
  }, []);

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Repair ID',
        accessor: 'repair_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Address 1',
        accessor: 'address1',
      },
      {
        Header: 'Address 2',
        accessor: 'address2',
      },
      {
        Header: 'Address 3',
        accessor: 'address3',
      },
      {
        Header: 'Staff',
        accessor: 'staff',
      },
      {
        Header: 'Delivery Date',
        accessor: 'delivery_date',
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format delivery date
      },
      {
        Header: 'Place',
        accessor: 'place',
      },
      {
        Header: 'Metal',
        accessor: 'metal',
      },
      {
        Header: 'Counter',
        accessor: 'counter',
      },
      {
        Header: 'Entry Type',
        accessor: 'entry_type',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format date
      },
      {
        Header: 'Metal Type',
        accessor: 'metal_type',
      },
      {
        Header: 'Item',
        accessor: 'item',
      },
      {
        Header: 'Tag No',
        accessor: 'tag_no',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Purity',
        accessor: 'purity',
      },
      {
        Header: 'Extra Weight',
        accessor: 'extra_weight',
      },
      {
        Header: 'Stone Value',
        accessor: 'stone_value',
      },
      {
        Header: 'Making Charge',
        accessor: 'making_charge',
      },
      {
        Header: 'Handling Charge',
        accessor: 'handling_charge',
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'Repair No',
        accessor: 'repair_no',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  return (
    <div className="main-container">
      <div className="sales-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Repairs Report</h3>
          </Col>
        </Row>
        {loading ? (
          <p>Loading...</p> // Show loading message while fetching data
        ) : (
          <DataTable columns={columns} data={data} /> // Render the table
        )}
      </div>
    </div>
  );
};

export default RepairsTable;
