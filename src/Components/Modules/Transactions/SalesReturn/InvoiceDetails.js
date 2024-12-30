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
      <Col xs={12} md={6}>
        <InputField label="Terms" type="select" value={formData.terms} name="terms"
          onChange={(e) => setFormData({ ...formData, terms: e.target.value })} 
          options={[
            { value: "Cash", label: "Cash" },
            { value: "Credit", label: "Credit" },
          ]}
        />
      </Col>
      <Col xs={12} md={6}>
        <InputField label="Date:" name="date" value={formData.date} type="date" 
          onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
          max={new Date().toISOString().split("T")[0]}/>
      </Col>
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
