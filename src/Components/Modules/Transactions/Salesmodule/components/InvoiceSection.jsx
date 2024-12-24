import React from 'react';
import { Col, Row } from 'react-bootstrap';
import InputField from "../../../../Pages/InputField/InputField";

const InvoiceSection = ({ formData ,setFormData}) => {
  return (
    <div className="sales-form-right">
      <Col className="sales-form-section">
      <Row>
                  <InputField
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    max={new Date().toISOString().split("T")[0]} 
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </Row>
                <Row>

                  <InputField
                    label="Invoice Number"
                    name="invoice_number"
                    value={formData.invoice_number}
                    onChange={(e) =>
                      setFormData({ ...formData, invoice_number: e.target.value })
                    }
                  />
                </Row>
      </Col>
    </div>
  );
};

export default InvoiceSection;