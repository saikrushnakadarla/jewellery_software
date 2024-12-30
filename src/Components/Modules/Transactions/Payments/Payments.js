import React, { useState, useEffect } from "react";
import "./Payments.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import baseURL from "../../../../Url/NodeBaseURL";

const RepairForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const repairData = location.state?.repairData;

  const [formData, setFormData] = useState({
    transaction_type: "Payment",
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

  useEffect(() => {
    if (repairData) {
      setFormData(repairData);
    } else {
      const today = new Date().toISOString().split("T")[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [repairData]);
  const [accountOptions, setAccountOptions] = useState([]);

  // Fetch account names on component mount
  useEffect(() => {
     // Set default date to today
     const today = new Date().toISOString().split("T")[0];
     setFormData((prevData) => ({ ...prevData, date: today }));
    const fetchAccountNames = async () => {
      try {
        const response = await fetch(`${baseURL}/payment-account-names`);
        if (!response.ok) {
          throw new Error("Failed to fetch account names");
        }
        const data = await response.json();
  
        // Map API response to match the options structure
        const formattedOptions = data.map((item) => ({
          value: item.account_name,
          label: item.account_name,
        }));
  
        setAccountOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching account names:", error);
      }
    };
  
    fetchAccountNames();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (name === "total_amt" || name === "discount_amt") {
        const totalAmt = parseFloat(updatedData.total_amt) || 0;
        const discountAmt = parseFloat(updatedData.discount_amt) || 0;

        // Ensure discount amount is not greater than total amount
        if (discountAmt > totalAmt) {
          alert("Discount amount cannot be greater than total amount.");
          updatedData.discount_amt = "";
        } else {
          updatedData.cash_amt = (totalAmt - discountAmt).toFixed(2);
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = repairData ? `${baseURL}/edit/payments/${repairData.id}` : `${baseURL}/post/payments`;
      const method = repairData ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to save data");
      window.alert("Data saved successfully!");
      navigate("/paymentstable");
    } catch (error) {
      window.alert(`Error: ${error.message}`);
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
              max={new Date().toISOString().split("T")[0]}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Payment No."
              name="receipt_no"
              value={formData.receipt_no}
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
              label="Reference Number"
              name="cheque_number"
              value={formData.cheque_number}
              onChange={handleInputChange}
            />
          </Col>
         
          <Col xs={12} md={3}>
            <InputField
              label="Account Name"
              type="select"
              name="account_name"
              value={formData.account_name}
              onChange={handleInputChange}
              options={accountOptions}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Total Amt"
              type="number"
              name="total_amt"
              value={formData.total_amt}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Discount Amt"
              type="number"
              name="discount_amt"
              value={formData.discount_amt}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Cash Amt"
              type="number"
              name="cash_amt"
              value={formData.cash_amt}
              readOnly
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
            {repairData ? "Update" : "Save"}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default RepairForm;
