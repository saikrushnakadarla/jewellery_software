import React, { useState } from "react";
import "./Repairs.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";

const RepairForm = () => {
  const [metal, setMetal] = useState("");
  const [type, setType] = useState("");
  const [purity, setPurity] = useState("");

  return (
    <div className="main-container">
    <Container className="repair-form-container">
      <form className="repair-form">
        {/* Left Section */}
        <div className="repair-form-left">
          {/* Customer Details */}
          <Col className="form-section">
            <h4 className="mb-2">Customer Details</h4>
            <Row>
            <Col xs={12} md={4}>
              <InputField label="Name:" />
            </Col>
            <Col xs={12} md={4}>
              <InputField label="Mobile:" />
            </Col>
            <Col xs={12} md={4}>
              <InputField label="Email:" type="email" />
            </Col>
            
              
              
              {/* <InputField label="Phone:" /> */}
              
            </Row>
            <Row >
            <Col xs={12} md={4}>
            <InputField label="Address1:" />
            </Col>
            <Col xs={12} md={4}>
            <InputField label="Address2:" />
            </Col>
            <Col xs={12} md={4}>
            <InputField label="Address3:" />
            </Col>
            </Row>
            <Row >
            <Col xs={12} md={2}>
            <InputField label="Staff:" />
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Delivery Date:" type="date" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Place:" />
            </Col>
            <Col xs={12} md={2}>
            <InputField
                label="Metal:"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "GOLD", label: "Gold" },
                  { value: "SILVER", label: "Silver" },
                  { value: "PLATINUM", label: "Platinum" },
                ]}
              />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Counter:" placeholder="Counter Name" />
            </Col>
            </Row>
            </Col>
         
        </div>
        {/* Right Section */}
        <div className="repair-form-right">
          <Col className="form-section">
          
            <Row className="mt-4">
            <InputField label="Entry Type:" value="REPAIR" readOnly />
            </Row>
            <Row>  
              <InputField label="Receipt No:" />
            </Row>
            <Row>
            <InputField label="Date:" type="date" />

            </Row>
            
          </Col>
        </div>
      </form>

      {/* Repair Item Details */}
      <Row className="form-section">
          <h4>Repair Item Details</h4>
          <Col xs={12} md={2}>
                  
              <InputField
              label="Type:"
              type="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "ORDER PURPOSE", label: "Order Purpose" },
                { value: "REPAIR PURPOSE", label: "Repair Purpose" },
              ]}
            />
           </Col>
            <Col xs={12} md={3}>
            <InputField label="Item:" placeholder="Item Name" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Tag No:" />
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Description:" placeholder="Description" />
            </Col>
            <Col xs={12} md={2}>
            <InputField
              label="Purity:"
              type="select"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              options={[
                { value: "916HM", label: "916HM" },
                { value: "22K", label: "22K" },
                { value: "18K", label: "18K" },
              ]}
            />
            </Col>
            
            
            
           
          
          
        </Row>

        {/* Extra Charges */}
        <Row className="form-section">
          <h4>Extra Charges</h4> 
          <Col xs={12} md={2}>
              <InputField label="Extra Weight:" />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Stone Value:" />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Making Charge (MC):" />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Handling Charge (HC):" />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Total:" />
            </Col>
          </Row>
          
       

        {/* Buttons */}
        <div className="form-buttons">
          <Button type="submit" variant="secondary">cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </div>
      </Container>
      </div>
  );
};

export default RepairForm;
