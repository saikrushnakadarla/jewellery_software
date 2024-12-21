import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/DataTable'; // Import the reusable DataTable component
import { Button, Row, Col } from 'react-bootstrap';

const RepairsTable = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Utility function to format date as dd/mm/yyyy
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Columns definition for the DataTable
  const columns = React.useMemo(
    () => [
      { Header: 'Account Name', accessor: 'account_name' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Purchase No', accessor: 'purchase_no' },
      { Header: 'Product Name', accessor: 'product_name' },
      { Header: 'Metal', accessor: 'metal' },
      { Header: 'Purity', accessor: 'purity' },
      { Header: 'Gross Weight', accessor: 'gross' },
      { Header: 'Dust Weight', accessor: 'dust' },
      { Header: 'Touch Percent', accessor: 'touch_percent' },
      { Header: 'ML Percent', accessor: 'ml_percent' },
      { Header: 'EQT Weight', accessor: 'eqt_wt' },
      { Header: 'Rate', accessor: 'rate' },
      { Header: 'Total Amount', accessor: 'total_amount' },
    ],
    []
  );

  // Fetch the URD purchase data when the component mounts
  useEffect(() => {
    const fetchUrdPurchases = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-purchases'); // Replace with your actual API endpoint
        const result = await response.json();

        if (response.ok) {
          // Ensure the result is an array
          const formattedData = Array.isArray(result) ? result : [result];

          // Format the data to match the table columns
          const dataToDisplay = formattedData.map((purchase) => ({
            customer_id: purchase.customer_id,
            account_name: purchase.account_name,
            mobile: purchase.mobile,
            email: purchase.email,
            date: formatDate(purchase.date), // Format the date
            purchase_no: purchase.purchase_number,
            product_id: purchase.product_id,
            product_name: purchase.product_name,
            metal: purchase.metal,
            purity: purchase.purity,
            gross: purchase.gross,
            dust: purchase.dust,
            touch_percent: purchase.touch_percent,
            ml_percent: purchase.ml_percent,
            eqt_wt: purchase.eqt_wt,
            rate: purchase.rate,
            total_amount: purchase.total_amount,
          }));

          setData(dataToDisplay); // Set the formatted data to state
          setFilteredData(dataToDisplay); // Initially set filtered data to all data
        } else {
          console.error('Failed to fetch data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching URD purchases:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchUrdPurchases(); // Call the function to fetch data
  }, []);

  // Handle date filtering
  const handleDateFilter = (fromDate, toDate) => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      return (
        (!from || itemDate >= from) &&
        (!to || itemDate <= to)
      );
    });
    setFilteredData(filtered); // Update filtered data state
  };

  return (
    <div className="main-container">
      <div className="payments-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>URD Purchase Report</h3>
          </Col>
        </Row>
        {loading ? (
          <div>Loading...</div> // Show loading state while fetching
        ) : (
          <DataTable
            columns={columns}
            data={filteredData} // Pass filtered data to DataTable
            handleDateFilter={handleDateFilter}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        )}
      </div>
    </div>
  );
};

export default RepairsTable;
