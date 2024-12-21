import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { Row, Col } from 'react-bootstrap';
import { format } from 'date-fns'; // Import date-fns for date formatting

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to store table data
  const [loading, setLoading] = useState(true); // State to handle loading

  const columns = React.useMemo(
    () => [
      {
        Header: 'S No', // Serial Number
        accessor: 'sno', // The key for S No in the data
      },
      {
        Header: 'Date',
        accessor: 'rate_date',
      },
      {
        Header: '16 Crt',
        accessor: 'rate_16crt',
      },
      {
        Header: '18 Crt',
        accessor: 'rate_18crt',
      },
      {
        Header: '22 Crt',
        accessor: 'rate_22crt',
      },
      {
        Header: '24 Crt',
        accessor: 'rate_24crt',
      },
      {
        Header: 'Silver',
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

        // Format the date and add serial number (S No)
        const formattedData = result.map((item, index) => ({
          sno: index + 1, // Serial number, incrementing from 1
          rate_date: format(new Date(item.rate_date), 'dd-MM-yyyy'), // Format the date to dd-MM-yyyy
          rate_16crt: item.rate_16crt,
          rate_18crt: item.rate_18crt,
          rate_22crt: item.rate_22crt,
          rate_24crt: item.rate_24crt,
          silver_rate: item.silver_rate,
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
            <h3>Rates</h3>
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
