import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import OldSalesForm from "./OldForm";
import SchemeSalesForm from "./SchemesForm";
import SaleReturnForm from "./SaleReturnForm"; // Import the SaleReturnForm component
import { useNavigate } from "react-router-dom";
import './SalesForm3section.css';
const SalesFormSection = ({ setOldSalesData,
  setSchemeSalesData,
  selectedMobile,
  invoiceDetails,
  filteredInvoices,
  setFilteredInvoices,
  uniqueInvoice,
  handleInvoiceChange,
  setReturnData,
  returnData,
  selectedRows,
  setSelectedRows,
  isAllSelected,
  setIsAllSelected,
  handleCheckboxChange,
  handleSelectAllChange,
  salesTaxableAmount,
  salesTaxAmount,
  salesNetAmount,
  repairDetails,
  resetSaleReturnForm,
  handleCheckout,
  tabId
}) => {

  const [activeForm, setActiveForm] = useState("old");
  const navigate = useNavigate();

  return (
    <Col className="sales-form-section">
      <Row style={{height:"45px"}}>
        <Col xs={12} className="mb-3">
          <Button 
            style={{
              backgroundColor: activeForm === "old" ? "rgb(163, 110, 41)" : "gray",
              borderColor: activeForm === "old" ? "rgb(163, 110, 41)" : "gray",
              color: "white", fontSize:'13px', padding:'5px'
            }}
            onClick={() => setActiveForm("old")}
          >
            URD Purchase
          </Button>
          <Button
            style={{
              backgroundColor: activeForm === "schemes" ? "rgb(163, 110, 41)" : "gray",
              borderColor: activeForm === "schemes" ? "rgb(163, 110, 41)" : "gray",
              color: "white", fontSize:'13px', padding:'5px'
            }}
            onClick={() => setActiveForm("schemes")}
            className="ms-2"
          >
            Schemes
          </Button>
          <Button
            style={{
              backgroundColor: activeForm === "sale_return" ? "rgb(163, 110, 41)" : "gray",
              borderColor: activeForm === "sale_return" ? "rgb(163, 110, 41)" : "gray",
              color: "white", fontSize:'13px', padding:'5px'
            }}
            onClick={() => setActiveForm("sale_return")}
            className="ms-2"
          >
            Sale Return
          </Button>
          <Button
            style={{
              backgroundColor: activeForm === "orders" ? "rgb(163, 110, 41)" : "gray",
              borderColor: activeForm === "orders" ? "rgb(163, 110, 41)" : "gray",
              color: "white", fontSize:'13px', padding:'5px'
            }}
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
            style={{
              backgroundColor: activeForm === "repairs" ? "rgb(163, 110, 41)" : "gray",
              borderColor: activeForm === "repairs" ? "rgb(163, 110, 41)" : "gray",
              color: "white", fontSize:'13px', padding:'5px'
            }}
            onClick={() => {
              setActiveForm("repairs");
              console.log("Navigating to Repairs with Mobile:", selectedMobile); // Log before navigation
              navigate("/repairstable", { state: { mobile: selectedMobile } });
            }}
            className="ms-2"
          >
            Repairs
          </Button>
        </Col>

      </Row>

      {activeForm === "old" && <OldSalesForm setOldSalesData={setOldSalesData} repairDetails={repairDetails} tabId={tabId}/>}
      {activeForm === "schemes" && (
        <SchemeSalesForm
          setSchemeSalesData={setSchemeSalesData}
          selectedMobile={selectedMobile} // Pass the selected mobile number
        />
      )}
      {activeForm === "sale_return" && <SaleReturnForm
        invoiceDetails={invoiceDetails}
        filteredInvoices={filteredInvoices}
        setFilteredInvoices={setFilteredInvoices}
        uniqueInvoice={uniqueInvoice}
        handleInvoiceChange={handleInvoiceChange}
        returnData={returnData}
        setReturnData={setReturnData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAllChange={handleSelectAllChange}
        salesTaxableAmount={salesTaxableAmount}
        salesTaxAmount={salesTaxAmount}
        salesNetAmount={salesNetAmount}
        resetSaleReturnForm={resetSaleReturnForm}
        handleCheckout={handleCheckout}
      />} {/* Render SaleReturnForm */}
    </Col>
  );
};

export default SalesFormSection;
