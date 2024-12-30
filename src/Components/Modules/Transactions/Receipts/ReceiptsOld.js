import React, { useState, useEffect } from "react";
import "./Receipts.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation for passing data
import baseURL from "../../../../Url/NodeBaseURL";
import InputField from "../../../Pages/InputField/InputField";

const RepairForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get passed data
  const repairData = location.state?.repairData || {}; // Default to empty object if no data is passed

  const [formData, setFormData] = useState({
    transaction_type: "Receipt",
    date: "", // Ensure this field is properly set
    mode: "",
    cheque_number: "",
    receipt_no: "",
    account_name: "",
    total_amt: "",
    discount_amt: "",
    cash_amt: "",
    remarks: "",
  });

  const [accountNames, setAccountNames] = useState([]);

  useEffect(() => {
    // Set default date to today or use the passed repairData
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      ...repairData,
      date: repairData.date
        ? new Date(repairData.date).toISOString().split("T")[0]
        : today, // Ensure date is in YYYY-MM-DD format
    }));

    // Fetch account names when the component mounts
    const fetchAccountNames = async () => {
      try {
        const response = await fetch(`${baseURL}/account-names`);
        if (response.ok) {
          const data = await response.json();
          setAccountNames(data);
        } else {
          console.error("Error fetching account names:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching account names:", error);
      }
    };

    fetchAccountNames();
  }, [repairData]);

  const handleChange = (e) => {
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
      const url = repairData.id
        ? `${baseURL}/edit/payments/${repairData.id}`
        : `${baseURL}/post/payments`; // Use the correct API endpoint

      const method = repairData.id ? "PUT" : "POST"; // PUT for edit, POST for create

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          repairData.id
            ? "Receipt updated successfully!"
            : "Receipt added successfully!"
        );
        navigate("/receiptstable");
      } else {
        console.error("Error saving receipt:", result.message);
        alert(result.message || "Failed to save receipt.");
      }
    } catch (error) {
      console.error("Error saving receipt:", error);
      alert("An error occurred while saving the receipt.");
    }
  };

  return (
    <div className="main-container">
      <Container className="receipt-form-container">
        <form onSubmit={handleSubmit}>
          <Row className="receipt-form-section">
          <h2>{repairData.id ? "Edit Receipt" : "Create Receipt"}</h2>
            <Col xs={12} md={2}>
              <InputField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} // Restricts future dates
              />
            </Col>


            <Col xs={12} md={2}>
              <InputField
                label="Receipt No."
                name="receipt_no"
                value={formData.receipt_no}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Mode"
                type="select"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Col>

            <Col xs={12} md={3}>
              <InputField
                label="Account Name"
                type="select"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
                options={accountNames.map((name) => ({
                  value: name.account_name, // Access the correct field from your API response
                  label: name.account_name,
                }))}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Total Amt"
                type="number"
                name="total_amt"
                value={formData.total_amt}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Discount Amt"
                type="number"
                name="discount_amt"
                value={formData.discount_amt}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Col>
          </Row>
          <div className="form-buttons">
            <Button
              variant="secondary"
              className="cus-back-btn"
              type="button"
              onClick={() => navigate("/receiptstable")}
            >
              Cancel
            </Button>
           
            <Button variant="primary" 
            style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }} type="submit">
          {repairData.id ? "Update Receipt" : "Create Receipt"}
        </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default RepairForm;
