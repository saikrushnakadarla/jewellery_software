import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';

const InvoiceDetails = ({ formData, setFormData }) => {
  useEffect(() => {
    // Set the default date value to the current date if it's not already set
    if (!formData.date) {
      setFormData({ ...formData, date: new Date().toISOString().split("T")[0] });
    }
  }, [formData, setFormData]);

  return (
    <Col className="sales-form-section">
      <Row>
        <InputField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          max={new Date().toISOString().split("T")[0]} // Ensuring the max date is today
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </Row>
      <Row>
        <InputField
          label="Invoice Number"
          name="invoice_number"
          value={formData.invoice_number}
          onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
        />
      </Row>
    </Col>
  );
};

export default InvoiceDetails;
