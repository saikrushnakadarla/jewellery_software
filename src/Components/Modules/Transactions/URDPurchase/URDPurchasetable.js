import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout'; // Import the reusable DataTable component
import { Button, Row, Col } from 'react-bootstrap';
import baseURL from "../../../../Url/NodeBaseURL";
import { FaTrash } from 'react-icons/fa'; // Import delete icon

const RepairsTable = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [data, setData] = useState([]); // State to store fetched data
  const location = useLocation();
  const { mobile } = location.state || {};
  const initialSearchValue = location.state?.mobile || '';

  useEffect(() => {
    if (mobile) {
      console.log("Selected Mobile from Dashboard:", mobile);
    }
  }, [mobile]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchUrdPurchases = async () => {
    try {
      const response = await fetch(`${baseURL}/get-purchases`); // Replace with your actual API endpoint
      const result = await response.json();

      if (response.ok) {
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
          date: formatDate(purchase.date),
          urdpurchase_number: purchase.urdpurchase_number,
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

        setData(formattedData);
      } else {
        console.error('Failed to fetch data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching URD purchases:', error);
    }
  };

  useEffect(() => {
    fetchUrdPurchases(); // Call the function to fetch data
  }, []);

  const handleDelete = async (urdpurchase_number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    try {
      const response = await fetch(`${baseURL}/delete/${urdpurchase_number}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.urdpurchase_number !== urdpurchase_number));
        console.log(`Deleted purchase with number: ${urdpurchase_number}`);
         alert("Record deleted successfully.");
      } else {
        console.error('Failed to delete:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting purchase:', error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Customer Name',
        accessor: 'account_name',
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Purchase No',
        accessor: 'urdpurchase_number',
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
        Header: 'ML%',
        accessor: 'ml_percent',
      },
      {
        Header: 'Net Weight',
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
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.original.urdpurchase_number)}
          >
            <FaTrash />
          </Button>
          </>
        ),
      },
    ],
    []
  );

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
        <DataTable columns={columns} data={data} initialSearchValue={initialSearchValue} /> {/* Pass the fetched data */}
      </div>
    </div>
  );
};

export default RepairsTable;
