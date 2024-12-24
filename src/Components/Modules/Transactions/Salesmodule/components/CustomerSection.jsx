import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import InputField from "../../../../Pages/InputField/InputField";

const CustomerSection = ({ formData, customers, handleCustomerChange, handleAddCustomer,setFormData }) => {
  return (
    <div className="sales-form-left">
      <Col className="sales-form-section">
      <Row>
              <Col xs={12} md={3} className="d-flex align-items-center">
                <div style={{ flex: 1 }}>
                  <InputField
                    label="Mobile"
                    name="mobile"
                    type="select"
                    value={formData.mobile || ""} // Use customer_id to match selected value
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      if (selectedValue) {
                        handleCustomerChange(selectedValue); // Handle selection logic
                      } else {
                        // Clear all related fields if no mobile is selected
                        setFormData({
                          ...formData,
                          mobile: "",
                          account_name: "",
                          email: "",
                          address1: "",
                          address2: "",
                          city: "",
                          pincode: "",
                          state: "",
                          state_code: "",
                          aadhar_card: "",
                          gst_in: "",
                          pan_card: "",
                        });
                      }
                    }}
                    options={[
                      ...customers.map((customer) => ({
                        value: customer.account_id, // Use account_id as the value
                        label: customer.mobile, // Display mobile as the label
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
                  label="Customer Name"
                  name="account_name"
                  value={formData.account_name || ""}
                  readOnly
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
                <InputField label="State:" name="state" value={formData.state || ""} readOnly />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="State Code:" name="state_code" value={formData.state_code || ""} readOnly />
              </Col>
              <Col xs={12} md={3}>
                <InputField label="Aadhar" name="aadhar_card" value={formData.aadhar_card || ""} readOnly />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="GSTIN" name="gst_in" value={formData.gst_in || ""} readOnly />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="PAN" name="pan_card" value={formData.pan_card || ""} readOnly />
              </Col>
            </Row>
      </Col>
    </div>
  );
};

export default CustomerSection;