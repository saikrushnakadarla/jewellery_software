

import React, { useEffect } from "react";
import { Col, Row } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';
import { AiOutlinePlus } from 'react-icons/ai';
import { useLocation } from "react-router-dom";
const CustomerDetails = ({ formData, handleCustomerChange, handleAddCustomer, customers, setSelectedMobile }) => {
  const location = useLocation();

   // Inside useEffect
   useEffect(() => {
    if (location.state?.mobile) {
      console.log("Received Mobile from navigation:", location.state.mobile);
      const customer = customers.find(
        (cust) => cust.mobile === location.state.mobile
      );
      if (customer) {
        handleCustomerChange(customer.account_id); // Update formData
        setSelectedMobile(location.state.mobile); // Pass the mobile number
      }
    }
  }, [location.state?.mobile, customers]); // Add location.state.mobile and customers as dependencies
  

  return (
    <Col className="sales-form-section">
      <Row>
        <Col xs={12} md={3} className="d-flex align-items-center">
          <div style={{ flex: 1 }}>
          <InputField
              label="Mobile"
              name="mobile"
              type="select"
              value={formData.customer_id || ""}
              onChange={(e) => {
                handleCustomerChange(e.target.value);
                const selectedCustomer = customers.find(
                  (customer) => customer.account_id === e.target.value
                );
                setSelectedMobile(selectedCustomer?.mobile || "");
              }}
              options={[
                ...customers.map((customer) => ({
                  value: customer.account_id,
                  label: customer.mobile,
                })),
              ]}
            />

          </div>
          <AiOutlinePlus
            size={20}
            color="black"
            onClick={handleAddCustomer}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Customer Name:"
            name="account_name"
            type="select"
            value={formData.customer_id || ""} // Use customer_id to match selected value
            onChange={(e) => handleCustomerChange(e.target.value)}
            options={[
              ...customers.map((customer) => ({
                value: customer.account_id, // Use account_id as the value
                label: customer.account_name, // Display mobile as the label
              })),
            ]}

          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Email:"
            name="email"
            type="email"
            value={formData.email || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Address1:"
            name="address1"
            value={formData.address1 || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Address2:"
            name="address2"
            value={formData.address2 || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="City"
            name="city"
            value={formData.city || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="PIN"
            name="pincode"
            value={formData.pincode || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="State:"
            name="state"
            value={formData.state || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="State Code:"
            name="state_code"
            value={formData.state_code || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={3}>
          <InputField
            label="Aadhar"
            name="aadhar_card"
            value={formData.aadhar_card || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="GSTIN"
            name="gst_in"
            value={formData.gst_in || ""}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="PAN"
            name="pan_card"
            value={formData.pan_card || ""}
            readOnly
          />
        </Col>
      </Row>
    </Col>
  );
};

export default CustomerDetails;