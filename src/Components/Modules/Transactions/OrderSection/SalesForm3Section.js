import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import OldSalesForm from "./OldForm";
import SchemeSalesForm from "./SchemesForm";

const SalesFormSection = ({ setOldSalesData, setSchemeSalesData }) => {
  const [activeForm, setActiveForm] = useState("old");

  return (
    <Col className="sales-form-section">
      <Row>
        <Col xs={12} className="mb-3">
          <Button
            variant={activeForm === "old" ? "primary" : "secondary"}
            onClick={() => setActiveForm("old")}
          >
            Old
          </Button>
          {/* <Button
            variant={activeForm === "schemes" ? "primary" : "secondary"}
            onClick={() => setActiveForm("schemes")}
            className="ms-2"
          >
            Schemes
          </Button> */}
        </Col>
      </Row>

      {activeForm === "old" ? (
        <OldSalesForm setOldSalesData={setOldSalesData} />
      ) 
      : (
        <SchemeSalesForm setSchemeSalesData={setSchemeSalesData} />
      )}
    </Col>
  );
};

export default SalesFormSection;