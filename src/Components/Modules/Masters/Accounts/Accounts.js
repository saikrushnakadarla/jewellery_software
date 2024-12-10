import React, { useState, useEffect } from "react";
import "./Accounts.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import baseURL from "../../../../Url/NodeBaseURL";


const RepairForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the account ID from URL params
  const [formData, setFormData] = useState({
    account_name: "",
    print_name: "",
    account_group: "",
    op_bal: "",
    dr_cr: "",
    metal_balance: "",
    address1: "",
    address2: "",
    city: "",
    gst_in: '',
    pincode: "",
    state: "",
    state_code: "",
    phone: "",
    mobile: "",
    contact_person: "",
    email: "",
    birthday: "",
    anniversary: "",
    branch: "",
    bank_account_no: "",
    bank_name: "",
    ifsc_code: "",
  });

  // Fetch data if editing an existing account
  useEffect(() => {
    if (id) {
      const fetchAccountData = async () => {
        try {
          const response = await fetch(`${baseURL}/get/account-details/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch account data");
          }
          const result = await response.json();
          setFormData(result);
        } catch (error) {
          console.error("Error fetching account data:", error.message);
        }
      };
      fetchAccountData();
    }
  }, [id]);

  const [accountGroups, setAccountGroups] = useState([]);
  useEffect(() => {
    const fetchAccountGroups = async () => {
      try {
        const response = await fetch(`${baseURL}/accountsgroup`);
        if (!response.ok) {
          throw new Error("Failed to fetch account groups");
        }
        const data = await response.json();
        // Assuming the API returns an array of objects with `AccountsGroupName`
        const formattedOptions = data.map(group => ({
          value: group.AccountsGroupName,
          label: group.AccountsGroupName,
        }));
        setAccountGroups(formattedOptions);
      } catch (error) {
        console.error("Error fetching account groups:", error.message);
      }
    };
    fetchAccountGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${baseURL}/edit/account-details/${id}`
        : `${baseURL}/account-details`;
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }
  
      const result = await response.json();
      alert(id ? "Account updated successfully!" : "Account created successfully!");
      navigate("/accountstable");
    } catch (err) {
      console.error("Error submitting form:", err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="main-container">
      <Container className="accounts-form-container">
        <form onSubmit={handleSubmit}>
          <Row className="accounts-form-section">
          <h4 className="mb-4">{id ? "Edit Account" : "Create Account"}</h4>
            <Col xs={12} md={4}>
              <InputField
                label="Account Name"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={4}>
              <InputField
                label="Print Name"
                name="print_name"
                value={formData.print_name}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={4}>
              <InputField
                label="Group"
                name="account_group"
                type="select"
                value={formData.account_group}
                onChange={handleChange}
                options={accountGroups} // Dynamic options
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Op. Bal."
                name="op_bal"
                type="number"
                value={formData.op_bal}
                onChange={handleChange}
              />
            </Col>
          
            <Col xs={12} md={2}>
              <InputField
                label="Metal Balance"
                name="metal_balance"
                type="number"
                value={formData.metal_balance}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={1}>
              <InputField
                label="Dr/Cr"
                name="dr_cr"
                type="select"
                value={formData.dr_cr}
                onChange={handleChange}
                options={[
                  { value: "Dr", label: "Dr." },
                  { value: "Cr", label: "Cr." },
                ]}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Address"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={4}>
              <InputField
                label="Address2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Col>
           
            <Col xs={12} md={2}>
              <InputField
                label="Pincode"
                name="pincode"
                type="number"
                value={formData.pincode}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="State Code"
                name="state_code"
                type="text"
                value={formData.state_code}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Mobile"
                name="mobile"
                type="number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Contact Person"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Birthday On"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Anniversary On"
                name="anniversary"
                type="date"
                value={formData.anniversary}
                onChange={handleChange}
              />
            </Col>
            <Col  xs={12} md={3}>
      <InputField
        label="GSTIN:"
        name="gst_in"
        value={formData.gst_in}
        onChange={handleChange}
        required
      />
    </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Bank Account No."
                name="bank_account_no"
                value={formData.bank_account_no}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="IFSC Code"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="form-buttons">
            <Button
              variant="secondary"
              type="button"
              className="cus-back-btn"
              onClick={() => navigate("/accountstable")}
            >
              Cancel
            </Button>
            <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>
              
              {id ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default RepairForm;
