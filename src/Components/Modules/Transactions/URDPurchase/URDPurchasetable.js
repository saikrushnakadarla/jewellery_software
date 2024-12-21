import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { Button, Row, Col } from 'react-bootstrap';

const RepairsTable = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [data, setData] = useState([]); // State to store fetched data

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
      {
        Header: 'Account Name',
        accessor: 'account_name',
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
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Purchase No',
        accessor: 'purchase_no',
      },
      {
        Header: 'Product Name',
        accessor: 'product_name',
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
        Header: 'Gross Weight',
        accessor: 'gross',
      },
      {
        Header: 'Dust Weight',
        accessor: 'dust',
      },
      {
        Header: 'Touch Percent',
        accessor: 'touch_percent',
      },
      {
        Header: 'ML Percent',
        accessor: 'ml_percent',
      },
      {
        Header: 'EQT Weight',
        accessor: 'eqt_wt',
      },
      {
        Header: 'Rate',
        accessor: 'rate',
      },
      {
        Header: 'Total Amount',
        accessor: 'total_amount',
      },
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
          // Map the data into the format that matches the table columns
          const formattedData = result.map((purchase) => ({
            customer_id: purchase.customer_id,
            account_name: purchase.account_name,
            mobile: purchase.mobile,
            email: purchase.email,
            address1: purchase.address1,
            address2: purchase.address2,
            city: purchase.city,
            state: purchase.state,
            state_code: purchase.state_code,
            aadhar_card: purchase.aadhar_card,
            gst_in: purchase.gst_in,
            pan_card: purchase.pan_card,
            date: formatDate(purchase.date), // Format the date
            purchase_no: purchase.purchase_number,
            product_id: purchase.product_id,
            product_name: purchase.product_name,
            metal: purchase.metal,
            purity: purchase.purity,
            hsn_code: purchase.hsn_code,
            gross: purchase.gross,
            dust: purchase.dust,
            touch_percent: purchase.touch_percent,
            ml_percent: purchase.ml_percent,
            eqt_wt: purchase.eqt_wt,
            remarks: purchase.remarks,
            rate: purchase.rate,
            total_amount: purchase.total_amount,
          }));

          // Log the fetched data to the console
          console.log('Fetched URD Purchase Data:', formattedData);

          // Set the data to state
          setData(formattedData);
        } else {
          console.error('Failed to fetch data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching URD purchases:', error);
      }
    };

    fetchUrdPurchases(); // Call the function to fetch data
  }, []);

  const handleCreate = () => {
    navigate('/urd_purchase'); // Navigate to the create page
  };

  return (
    <div className="main-container">
      <div className="payments-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>URD Purchase</h3>
            <Button
              className="create_but"
              variant="success"
              onClick={handleCreate}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} /> {/* Pass the fetched data */}
      </div>
    </div>
  );
};

export default RepairsTable;
