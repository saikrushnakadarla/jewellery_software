import React, { useState, useEffect } from "react";
import "./Accounts.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Baseurl from "../../../../Url/Baseurl";

const RepairForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the account ID from URL params
  const [formData, setFormData] = useState({
    account_name: "",
    print_name: "",
    group: "",
    op_bal: "",
    dr_cr: "",
    metal_balance: "",
    address: "",
    address2: "",
    city: "",
    area: "",
    pincode: "",
    state: "",
    state_code: "",
    phone: "",
    mobile: "",
    contact_person: "",
    email: "",
    birthday_on: "",
    anniversary_on: "",
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
          const response = await fetch(`${Baseurl}/get/accounts/${id}`);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${Baseurl}/put/accounts/${id}`
        : `${Baseurl}/post/accounts`;
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
                name="group"
                type="select"
                value={formData.group}
                onChange={handleChange}
                options={[
                  { value: "Capital Ac", label: "Capital Ac" },
                  { value: "Current As", label: "Current As" },
                  { value: "Current Li", label: "Current Li" },
                  { value: "Fixed Asse", label: "Fixed Asse" },
                  { value: "Investment", label: "Investment" },
                  { value: "Loans (Lia", label: "Loans (Lia" },
                  { value: "Pre-Operat", label: "Pre-Operat" },
                  { value: "Profit & L", label: "Profit & L" },
                  { value: "Revenue Ac", label: "Revenue Ac" },
                  { value: "Suspense A", label: "Suspense A" },
                ]}
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
            <Col xs={12} md={2}>
              <InputField
                label="Metal Balance"
                name="metal_balance"
                type="number"
                value={formData.metal_balance}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Address"
                name="address"
                value={formData.address}
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
            <Col xs={12} md={3}>
              <InputField
                label="Area"
                name="area"
                type="select"
                value={formData.area}
                onChange={handleChange}
                options={[
                  { value: "Area1", label: "Area1" },
                  { value: "Area2", label: "Area2" },
                ]}
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
            <Col xs={12} md={2}>
              <InputField
                label="Birthday On"
                name="birthday_on"
                type="date"
                value={formData.birthday_on}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Anniversary On"
                name="anniversary_on"
                type="date"
                value={formData.anniversary_on}
                onChange={handleChange}
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
