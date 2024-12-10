
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../../Pages/InputField/InputField';
import './Supplier_Master.css';

import baseURL from "../../../../Url/NodeBaseURL";
import { Row, Col } from 'react-bootstrap';


function Customer_Master() {
  const [formData, setFormData] = useState({
    account_name: '',
    print_name: '',
    account_group: 'SUPPLIERS',
    address1:'',
    address2:'',
    city:'',
    pincode: '',
    state: '',
    state_code: '',
    phone: '',
    mobile: '',
    email: '',
    birthday: '',
    anniversary: '',
    bank_account_no: '',
    bank_name: '',
    ifsc_code: '',
    branch: '',
    gst_in: '',
    aadhar_card: '',
    pan_card: '',
  });

  const [tcsApplicable, setTcsApplicable] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL

  useEffect(() => {
    if (id) {
      const fetchSupplier = async () => {
        try {
          const response = await fetch(`${baseURL}/get/account-details/${id}`);
          const result = await response.json();
          setFormData(result);
        } catch (error) {
          console.error('Error fetching supplier:', error);
        }
      };
      fetchSupplier();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setTcsApplicable(!tcsApplicable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!formData.account_name.trim()) {
      alert('Customer Name is required.');
      return;
    }
    if (!formData.mobile.trim()) {
      alert('Mobile number is required.');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Phone number is required.');
      return;
    }
  
    try {
      const method = id ? 'PUT' : 'POST';
      const endpoint = id
        ? `${baseURL}/edit/account-details/${id}`
        : `${baseURL}/account-details`;
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, tcsApplicable }),
      });
  
      if (response.ok) {
        alert(`Supplier ${id ? 'updated' : 'created'} successfully!`);
        navigate('/suppliertable');
      } else {
        console.error('Failed to save customer');
        alert('Failed to save customer.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };
  

  const handleBack = () => {
    navigate('/suppliertable'); 
  };


  return (
    <div className="main-container">
      <div className="customer-master-container">
      <h2>{id ? 'Edit Supplier' : 'Add Supplier'}</h2>
      <form className="customer-master-form" onSubmit={handleSubmit}>
  {/* Row 1 */}
  <Row>
    <Col md={4}>
      <InputField
        label="Customer Name:"
        name="account_name"
        value={formData.account_name}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={4}>
      <InputField
        label="Print Name:"
        name="print_name"
        value={formData.print_name}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={4}>
      <InputField
        label="Account Group:"
        name="account_group"
        value="Customer"
        readOnly
      />
    </Col>
    <Col md={4}>
      <InputField
        label="Address1"
        name="address1"
        value={formData.address1}
        readOnly
      />
    </Col>

    <Col md={4}>
      <InputField
        label="Address2"
        name="address2"
        value={formData.address2}
        readOnly
      />
    </Col>
    <Col md={4}>
      <InputField
        label="City"
        name="city"
        value={formData.city}
        readOnly
      />
    </Col>
    <Col md={2}>
      <InputField
        label="Pincode:"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={2}>
      <InputField
        label="State:"
        name="state"
        type="select"
        value={formData.state}
        onChange={handleChange}
        required
        options={[
          { value: 'Telangana', label: 'Telangana' },
          { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
          { value: 'Bihar', label: 'Bihar' },
          { value: 'Delhi', label: 'Delhi' },
          { value: 'Goa', label: 'Goa' },
          { value: 'Maharashtra', label: 'Maharashtra' },
          { value: 'Tamil Nadu', label: 'Tamil Nadu' },
          { value: 'West Bengal', label: 'West Bengal' },
        ]}
      />
    </Col>

    <Col md={2}>
      <InputField
        label="State Code:"
        name="state_code"
        value={formData.state_code}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={3}>
      <InputField
        label="Phone:"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={3}>
      <InputField
        label="Mobile:"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={4}>
      <InputField
        label="Email:"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </Col>

    <Col md={2}>
      <InputField
        label="Birthday:"
        name="birthday"
        type="date"
        value={formData.birthday}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={2}>
      <InputField
        label="Anniversary:"
        name="anniversary"
        type="date"
        value={formData.anniversary}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={4}>
      <InputField
        label="Bank Account No:"
        name="bank_account_no"
        value={formData.bank_account_no}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={3}>
      <InputField
        label="Bank Name:"
        name="bank_name"
        value={formData.bank_name}
        onChange={handleChange}
        required
      />
    </Col>

    <Col md={3}>
      <InputField
        label="IFSC Code:"
        name="ifsc_code"
        value={formData.ifsc_code}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={3}>
      <InputField
        label="Branch:"
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={3}>
      <InputField
        label="GSTIN:"
        name="gst_in"
        value={formData.gst_in}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={4}>
      <InputField
        label="Aadhar Card:"
        name="aadhar_card"
        value={formData.aadhar_card}
        onChange={handleChange}
        required
      />
    </Col>
    <Col md={4}>
      <InputField
        label="PAN Card:"
        name="pan_card"
        value={formData.pan_card}
        onChange={handleChange}
        required
      />
    </Col>
  </Row>

  {/* Checkbox */}
  <Row>
    <Col>
      <div className="form-group">
        <label className="checkbox-label" htmlFor="tcs">
          <input
            type="checkbox"
            id="tcs"
            name="tcsApplicable"
            className="checkbox-input"
            checked={tcsApplicable}
            onChange={handleCheckboxChange}
          />
          TCS Applicable
        </label>
      </div>
    </Col>
  </Row>

  {/* Buttons */}
  <div className="sup-button-container">
            <button
              type="button"
              className="cus-back-btn"
              onClick={handleBack}
            >
              Close
            </button>
            <button
              type="submit"
              className="cus-submit-btn"
            >  
              {id ? 'Update' : 'Save'}
            </button>
          </div>
</form>
      </div>
    </div>
  );
}

export default Customer_Master;
