import React, { useState, useEffect } from "react";
import "./Payments.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import baseURL from "../../../../Url/NodeBaseURL";
import axios from 'axios';
import { pdf } from "@react-pdf/renderer";

import PDFContent from "./ReceiptPdf"; 

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
    invoice_number:"",
    total_amt: "",
    discount_amt: "",
    cash_amt: "",
    remarks: "",
  });

  const [accountOptions, setAccountOptions] = useState([]);

  const [purchases, setPurchases] = useState([]);
  const [invoiceOptions, setInvoiceOptions] = useState([]);

 const { invoiceData } = location.state || {};

  useEffect(() => {
    if (invoiceData) {
      setFormData((prevData) => ({
        ...prevData,
        account_name: invoiceData.account_name || "", // Set account name
        invoice_number: invoiceData.invoice || "", // Set invoice number
      }));
  
      // Populate invoice number options based on account_name
      const filteredInvoices = purchases
        ?.filter((item) => item.account_name === invoiceData.account_name)
        .map((item) => ({
          value: item.invoice_number,
          label: item.invoice_number,
        }));
  
        setInvoiceOptions(filteredInvoices);
  
      // Automatically set total amount based on selected invoice
      const selectedInvoice = purchases?.find(
        (item) => item.invoice_number === invoiceData.invoice
      );
  
      if (selectedInvoice) {
        const totalAmt = selectedInvoice.balance_after_receipt || selectedInvoice.balance_amount || "";
        setFormData((prevData) => ({
          ...prevData,
          total_amt: totalAmt,
        }));
      }
    }
  }, [invoiceData, purchases]);

  useEffect(() => {
    const fetchLastPaymentNumber = async () => {
      try {
        const response = await axios.get(`${baseURL}/lastPaymentNumber`);
        // setFormData(prev => ({ ...prev, receipt_no: response.data.lastPaymentNumber }));
        setFormData((prev) => ({
          ...prev,
          receipt_no: repairData ? repairData.receipt_no : response.data.lastPaymentNumber,
        }));
      } catch (error) {
        console.error("Error fetching invoice_number number:", error);
      }
    };

    fetchLastPaymentNumber();
  }, []);

  useEffect(() => {
    if (repairData) {
      setFormData(repairData);
    } else {
      const today = new Date().toISOString().split("T")[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [repairData]);

  useEffect(() => {
    // Fetch purchases data when component mounts
    axios.get(`${baseURL}/get/purchases`)
      .then((response) => {
        setPurchases(response.data);
        
        // Extract account names for options
        const accounts = response.data.map((purchase) => purchase.account_name);
        setAccountOptions([...new Set(accounts)]); // Remove duplicates
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
      });
  }, []);

  useEffect(() => {
    if (formData.account_name) {
      // Filter purchases to get invoice options for the selected account name
      const filteredInvoices = purchases
        .filter((purchase) => purchase.account_name === formData.account_name)
        .map((purchase) => ({
          value: purchase.invoice, // Assuming `invoice` is the key for invoice number
          label: purchase.invoice,
        }));
  
      setInvoiceOptions(filteredInvoices); // Update invoice dropdown options
    } else {
      // Reset invoice options, invoice_number, and total_amt when account_name is cleared
      setInvoiceOptions([]);
      setFormData((prevData) => ({
        ...prevData,
        invoice_number: "",
        total_amt: "",
      }));
    }
  }, [formData.account_name, purchases]);
  
useEffect(() => {
  if (formData.invoice_number) {
    const selectedInvoice = purchases.find(
      (purchase) => purchase.invoice === formData.invoice_number
    );

    if (selectedInvoice) {
      setFormData((prevData) => ({
        ...prevData,
        total_amt:
          selectedInvoice.balance_after_receipt > 0
            ? selectedInvoice.balance_after_receipt
            : selectedInvoice.balance_amount || 0,
      }));
    }
  } else {
    // Clear total_amt when invoice_number is cleared
    setFormData((prevData) => ({
      ...prevData,
      total_amt: "",
    }));
  }
}, [formData.invoice_number, purchases]);

  

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
        console.error(' account name:', data);

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
      const endpoint = repairData
        ? `${baseURL}/edit/payments/${repairData.id}`
        : `${baseURL}/post/payments`;
      const method = repairData ? "PUT" : "POST";
  
      // Save payment details to the server
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Failed to save data");
  
      // Notify user about successful save
      window.alert("Payment saved successfully!");
  
      // Generate the PDF
      const pdfDoc = <PDFContent formData={formData} />;
      const pdfBlob = await pdf(pdfDoc).toBlob();
  
      // Create a download link and trigger it
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `payment-receipt-${formData.id || "new"}.pdf`;
      link.click();
  
      // Clean up the download link
      URL.revokeObjectURL(link.href);
  
      // Navigate to the payments table after saving
      navigate("/paymentstable");
    } catch (error) {
      window.alert(`Error: ${error.message}`);
    }
  };

  const handleBack = () => {
    const from = location.state?.from || "/paymentstable"; // Default to /receiptstable if no from location provided
    navigate(from);
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
              options={accountOptions} // Dynamically populated
            />
          </Col>
          <Col xs={12} md={3}>
            <InputField
              label="Invoice"
              type="select"
              name="invoice_number"
              value={formData.invoice_number}
              onChange={handleInputChange}
              options={invoiceOptions} // Dynamically populated with invoiceData
            />
          </Col>


          <Col xs={12} md={2}>
            <InputField
              label="Total Amt"
              type="number"
              name="total_amt"
              value={formData.total_amt}
              onChange={handleInputChange}
              readOnly
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Paid Amt"
              type="number"
              name="discount_amt"
              value={formData.discount_amt}
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Bal Amt"
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
            // onClick={() => navigate("/paymentstable")}
            onClick={handleBack}
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
