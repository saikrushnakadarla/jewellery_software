import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import InputField from './InputfieldSales';

const InvoiceDetails = ({ setReturnData,returnData, invoiceDetails, filteredInvoices, setFilteredInvoices, uniqueInvoice,handleInvoiceChange, formData , setFormData}) => {
  return (
    <Col style={{width:'454%'}}>
      <Row>
      <Col xs={12} md={6}>
        <InputField
          label="Invoice Number"
          name="invoice_number"
          type="select"
          value={returnData.invoice_number || ""}
          onChange={handleInvoiceChange}
          options={filteredInvoices.map((invoice) => ({
            value: invoice.invoice_number,
            label: invoice.invoice_number,
          }))}
        />
         </Col>
            <Col xs={12} md={6}>
          <InputField
                     label="Date:"
                     name="date"
                     value={formData.date}
                     type="date"
                     onChange={(e) =>
                       setFormData((prev) => ({
                         ...prev,
                         date: e.target.value,
                       }))
                     }
                     max={new Date().toISOString().split("T")[0]}
                   />
        </Col>
      </Row>
    
    </Col>
  );
};

export default InvoiceDetails;
