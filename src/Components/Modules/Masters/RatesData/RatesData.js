import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { Row, Col } from 'react-bootstrap';

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const [loading, setLoading] = useState(true); // State to handle loading

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'rate_date',
      },
      {
        Header: 'Gold16',
        accessor: 'rate_16crt',
      },
      {
        Header: 'Gold18',
        accessor: 'rate_18crt',
      },
      {
        Header: 'Gold22',
        accessor: 'rate_22crt',
      },
      {
        Header: 'Gold24',
        accessor: 'rate_24crt',
      },
      {
        Header: 'SilverRate',
        accessor: 'silver_rate',
      },
    ],
    []
  );

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get/rates');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        // Format the date to YYYY-MM-DD
        const formattedData = result.map((item) => ({
          ...item,
          rate_date: item.rate_date.split('T')[0], // Extract the date part
        }));

        setData(formattedData); // Populate the table data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="sales-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Sales Report</h3>
          </Col>
        </Row>
        {loading ? (
          <div>Loading...</div> // Loading indicator
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default RepairsTable;
