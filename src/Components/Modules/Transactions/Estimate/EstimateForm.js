import React from "react";
import "./Estimate.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";

const RepairForm = () => {
  return (
<div className="main-container">
    <Container className="estimate-form-container">
      <Row className="estimate-form-section">
        {/* First Row of Inputs */}
        <h2>Estimate</h2>
        <Col xs={12} md={3}>
          <InputField label="PCODE:" placeholder="PCODE" />
        </Col>
        <Col xs={12} md={3}>
          <InputField label="Product Name:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Gross Weight:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Stones Weight:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Stones Price:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Weight WW:" />
        </Col>
        <Col xs={12} md={2}>
          <div className="input-with-suffix">
            <InputField label="Wastage:" />
            <span className="suffix">%</span>
          </div>
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Nett Weight:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Rate AV:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Rate/10Gms:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Rate/1Gms:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="MC Per Gram:" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Total B4 Tax" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Total MC" />
        </Col>
        <Col xs={12} md={1}>
          <InputField label="Tax %" />
        </Col>
        <Col xs={12} md={2}>
          <InputField label="Tax VAT Amount" />
        </Col>
        <Col xs={12} md={3}>
          <InputField label="Total Rs." />
        </Col>
      </Row>
      <Row className="form-buttons">
        <Col>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" type="button">
            Print
          </Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default RepairForm;
