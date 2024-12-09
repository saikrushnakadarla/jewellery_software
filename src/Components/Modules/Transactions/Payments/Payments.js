import React, { useState } from "react";
import "./Payments.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../../Url/NodeBaseURL";

const RepairForm = () => {
  const navigate = useNavigate();

  // State variables for form fields
  const [formData, setFormData] = useState({
    date: "",
    mode: "",
    cheque_number: "", // Updated to match the database field name
    receipt_no: "", // Updated to match the database field name
    account_name: "", // Updated to match the database field name
    total_amt: "", // Updated to match the database field name
    discount_amt: "", // Updated to match the database field name
    cash_amt: "", // Updated to match the database field name
    remarks: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/post/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData directly
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save payment data.");
      }

      // Show success message
      window.alert("Payment data saved successfully!");
      
      // Clear form data
      setFormData({
        date: "",
        mode: "",
        cheque_number: "",
        receipt_no: "",
        account_name: "",
        total_amt: "",
        discount_amt: "",
        cash_amt: "",
        remarks: "",
      });
    } catch (err) {
      // Show error message
      window.alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="main-container">
      <Container className="payments-form-container">
        <Row className="payments-form-section">
          <h4 className="mb-4">Payments</h4>

          <Col xs={12} md={2}>
            <InputField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Mode"
              type="select"
              name="mode"
              value={formData.mode}
              onChange={handleInputChange}
              options={[
                { value: "Cash", label: "Cash" },
                { value: "Cheque", label: "Cheque" },
                { value: "Online", label: "Online" },
              ]}
            />
          </Col>
          <Col xs={12} md={3}>
            <InputField
              label="Cheque Number"
              name="cheque_number" // Updated to match the database field name
              value={formData.cheque_number}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Payment No."
              name="receipt_no" // Updated to match the database field name
              value={formData.receipt_no}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={3}>
            <InputField
              label="Account Name"
              type="select"
              name="account_name" // Updated to match the database field name
              value={formData.account_name}
              onChange={handleInputChange}
              options={[
                { value: "Account1", label: "Account1" },
                { value: "Account2", label: "Account2" },
                { value: "Account3", label: "Account3" },
              ]}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Total Amt"
              type="number"
              name="total_amt" // Updated to match the database field name
              value={formData.total_amt}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Discount Amt"
              type="number"
              name="discount_amt" // Updated to match the database field name
              value={formData.discount_amt}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Cash Amt"
              type="number"
              name="cash_amt" // Updated to match the database field name
              value={formData.cash_amt}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={3}>
            <InputField
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
            />
          </Col>
        </Row>

        <div className="form-buttons">
          <Button
            variant="secondary"
            className="cus-back-btn"
            type="button"
            onClick={() => navigate("/paymentstable")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default RepairForm;
