import React, { useState } from "react";
import "./Payments.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";

const RepairForm = () => {
  const [metal, setMetal] = useState("");
  const [type, setType] = useState("");
  const [purity, setPurity] = useState("");

  return (
    <div className="main-container">
    <Container className="payments-form-container">

      <Row className="payments-form-section">
          <h4 className="mb-3">Product Details</h4>
          <Col xs={12} md={2}> <InputField label="Date:" type="date" /></Col>
          <Col xs={12} md={2}>
                  
              <InputField
              label="Mode:"
              type="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "Cash", label: "Cash" },
                { value: "Cheque", label: "Cheque" },
                { value: "Online", label: "Online" },
              ]}
            />
           </Col>
            <Col xs={12} md={3}>
            <InputField label="Cheque Number:"/>
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Payment No.:" />
            </Col>
            
            <Col xs={12} md={3}>
            <InputField
              label="Account Name:"
              type="select"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              options={[
                { value: "Account1", label: "Account1" },
                { value: "Account2", label: "Account2" },
                { value: "Account3", label: "Account3" },
              ]}
            />
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Total Amt:" type="number"/>
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Discount Amt:" type="number" />
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Cash Amt:" type="number"/>
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Remarks:" />
            </Col>
          
          
        </Row>

        <div className="form-buttons">
          <Button type="submit" variant="primary">Save</Button>
          {/* <Button type="button">Print</Button> */}
        </div>
      </Container>
      </div>
  );
};

export default RepairForm;
