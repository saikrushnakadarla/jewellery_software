import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../../Pages/InputField/TableLayout';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import baseURL from '../../../../Url/NodeBaseURL';
import InputField from "../../../Pages/InputField/InputField";
import { FaTrash, FaEdit } from 'react-icons/fa'; // Import icons

const RepairsTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({}); // State for editing form data
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
      const response = await fetch(`${baseURL}/get-purchases`);
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
    fetchUrdPurchases();
  }, []);

  const handleEdit = (row) => {
    setFormData(row);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/urd-purchase/${formData.urdpurchase_number}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (response.ok) {
        setShowEditModal(false);
        alert('Record updated successfully.');
        fetchUrdPurchases(); // Refresh the table data
      } else {
        console.error('Failed to update:', await response.json());
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };
  

  const handleDelete = async (urdpurchase_number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseURL}/delete/${urdpurchase_number}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.urdpurchase_number !== urdpurchase_number));
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
      { Header: 'Customer Name', accessor: 'account_name' },
      { Header: 'Mobile', accessor: 'mobile' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Purchase No', accessor: 'urdpurchase_number' },
      { Header: 'Gross Weight', accessor: 'gross' },
      { Header: 'Dust Weight', accessor: 'dust' },
      { Header: 'ML%', accessor: 'ml_percent' },
      { Header: 'Net Weight', accessor: 'eqt_wt' },
      { Header: 'Rate', accessor: 'rate' },
      { Header: 'Total Amount', accessor: 'total_amount' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
            <Button
              variant="primary"
              size="sm"
              className="me-2"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </Button>
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

  

  return (
    <div className="main-container">
      <div className="payments-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>URD Purchase</h3>
            <Button
              className="create_but"
              variant="success"
              onClick={() => navigate('/urd_purchase')}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            >
              + Create
            </Button>
          </Col>
        </Row>
        <DataTable columns={columns} data={data} initialSearchValue={initialSearchValue} />

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Record</Modal.Title>
  </Modal.Header>
  <Modal.Body >
    <Row>
      <Col xs={12} md={2}>
        <InputField
          label="Product"
          name="product_name"
          value={formData.product_name || ''}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="Metal"
          name="metal"
          type="select"
          value={formData.metal || ''}
          onChange={handleInputChange}
          // options={metalOptions.map(option => ({ value: option.value, label: option.label }))}
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="Purity"
          type="select"
          name="purity"
          value={formData.purity || ''}
          onChange={handleInputChange}
          // options={purityOptions.map(purity => ({
          //   value: purity.name,
          //   label: purity.name,
          // }))}
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="HSN Code"
          name="hsn_code"
          type="text"
          value={formData.hsn_code || ''}
          onChange={handleInputChange}
          readOnly
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="Gross"
          type="number"
          name="gross"
          value={formData.gross || ''}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="Dust"
          type="number"
          name="dust"
          value={formData.dust || ''}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={12} md={1}>
        <InputField
          label="ML %"
          type="number"
          name="ml_percent"
          value={formData.ml_percent || ''}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="Net WT"
          type="number"
          name="eqt_wt"
          value={formData.eqt_wt || ''}
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="Rate"
          name="rate"
          value={formData.rate  }
          onChange={handleInputChange}
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="Amount"
          type="number"
          name="total_amount"
          value={formData.total_amount || ''}
          onChange={handleInputChange}
          readOnly
        />
      </Col>
      <Col xs={12} md={2}>
        <InputField
          label="Remarks"
          type="text"
          name="remarks"
          value={formData.remarks || ''}
          onChange={handleInputChange}
        />
      </Col>
    </Row>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSaveEdit}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

      </div>
    </div>
  );
};

export default RepairsTable;
