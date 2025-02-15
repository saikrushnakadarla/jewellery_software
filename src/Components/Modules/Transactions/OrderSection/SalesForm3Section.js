import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import OldSalesForm from "./OldForm";
import SchemeSalesForm from "./SchemesForm";

const SalesFormSection = ({ setOldSalesData, setSchemeSalesData, orderDetails }) => {
  const [activeForm, setActiveForm] = useState("old");

  return (
    <Col className="sales-form-section">
      <Row>
        <Col xs={12} className="mb-3">
           <Button
              style={{
                backgroundColor: activeForm === "old" ? "rgb(163, 110, 41)" : "gray",
                borderColor: activeForm === "old" ? "rgb(163, 110, 41)" : "gray",
                color: "white",
              }}
              onClick={() => setActiveForm("old")}
            >
              URD Purchase
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
        <OldSalesForm setOldSalesData={setOldSalesData} orderDetails={orderDetails}/>
      ) 
      : (
        <SchemeSalesForm setSchemeSalesData={setSchemeSalesData} />
      )}
    </Col>
  );
};

export default SalesFormSection;