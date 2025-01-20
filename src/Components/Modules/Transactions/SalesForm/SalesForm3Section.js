import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import OldSalesForm from "./OldForm";
import SchemeSalesForm from "./SchemesForm";
import SaleReturnForm from "./SaleReturnForm"; // Import the SaleReturnForm component
import { useNavigate } from "react-router-dom";

const SalesFormSection = ({ setOldSalesData, setSchemeSalesData, selectedMobile }) => {
  const [activeForm, setActiveForm] = useState("old");
  const navigate = useNavigate();

  return (
    <Col className="sales-form-section">
      <Row>
        <Col xs={12} className="mb-3">
          <Button
            variant={activeForm === "old" ? "primary" : "secondary"}
            onClick={() => setActiveForm("old")}
          >
            URD Purchase
          </Button>
          <Button
            variant={activeForm === "schemes" ? "primary" : "secondary"}
            onClick={() => setActiveForm("schemes")}
            className="ms-2"
          >
            Schemes
          </Button>
          <Button
            variant={activeForm === "sale_return" ? "primary" : "secondary"}
            onClick={() => setActiveForm("sale_return")}
            className="ms-2"
          >
            Sale Return
          </Button>
          <Button
            variant={activeForm === "orders" ? "primary" : "secondary"}
            onClick={() => {
              setActiveForm("orders");
              console.log("Navigating to Orders with Mobile:", selectedMobile); // Log before navigation
              navigate("/orders", { state: { mobile: selectedMobile } });
            }}
            className="ms-2"
          >
            Orders
          </Button>
          <Button
            variant={activeForm === "repairs" ? "primary" : "secondary"}
            onClick={() => {
              setActiveForm("repairs");
              console.log("Navigating to Repairs with Mobile:", selectedMobile); // Log before navigation
              navigate("/repairs", { state: { mobile: selectedMobile } });
            }}
            className="ms-2"
          >
            Repairs
          </Button>
        </Col>
      </Row>

      {activeForm === "old" && <OldSalesForm setOldSalesData={setOldSalesData} />}
      {activeForm === "schemes" && (
        <SchemeSalesForm
          setSchemeSalesData={setSchemeSalesData}
          selectedMobile={selectedMobile} // Pass the selected mobile number
        />
      )}
      {activeForm === "sale_return" && <SaleReturnForm />} {/* Render SaleReturnForm */}
    </Col>
  );
};

export default SalesFormSection;
