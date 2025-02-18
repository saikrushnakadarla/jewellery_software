import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import InputField from "./../../../Pages/InputField/InputField";
import { Table } from "react-bootstrap";
import axios from "axios"; // Assuming you are using axios for API calls
import baseURL from '../../../../Url/NodeBaseURL';

const PaymentDetails = ({
  invoiceDetails,
  selectedRows,
  setSelectedRows,
  isAllSelected,
  setIsAllSelected,
  resetSaleReturnForm,
  salesTaxableAmount,
  salesTaxAmount,
  salesNetAmount,
  handleCheckout
}) => {

  // const handleCheckout = async () => {
  //   if (!invoiceDetails.length || !selectedRows.length) {
  //     alert("No invoices selected for sale return.");
  //     return;
  //   }

  //   try {
  //     const selectedInvoices = selectedRows.map((rowIndex) => invoiceDetails[rowIndex]);

  //     const repairDetailsUpdates = selectedInvoices.map((invoice) => ({
  //       id: invoice.id,
  //       status: "Sale Returned",
  //     }));

  //     const openTagsUpdates = selectedInvoices.map((invoice) => ({
  //       PCode_BarCode: invoice.code,
  //       Status: "Sale Returned",
  //     }));

  //     const productUpdates = selectedInvoices.map((invoice) => ({
  //       product_id: invoice.product_id,
  //       qty: invoice.qty,
  //       gross_weight: invoice.gross_weight,
  //     }));

  //     const codesForAvailableEntries = selectedInvoices.map((invoice) => invoice.code);

  //     await axios.post(`${baseURL}/updateRepairDetails`, { updates: repairDetailsUpdates });
  //     await axios.post(`${baseURL}/updateOpenTags`, { updates: openTagsUpdates });
  //     await axios.post(`${baseURL}/updateProduct`, { updates: productUpdates });
  //     await axios.post(`${baseURL}/addAvailableEntry`, { codes: codesForAvailableEntries });

  //     alert("Sale Return added Successfully!");
  //     // resetSaleReturnForm();
  //     // setSelectedRows([]); 
  //     // setIsAllSelected(false);
  //   } catch (error) {
  //     console.error("Error during checkout:", error);
  //     alert("An error occurred during checkout. Please try again.");
  //   }
  // };


  return (
    <div>
      <Col >
        <Row>
          <h4 className="mb-3">Summary</h4>
          <Table bordered hover responsive>
            {Array.isArray(invoiceDetails) && invoiceDetails.length > 0 ? (
              <>
                <tr>
                  <td colSpan="20" className="text-right">
                    Taxable Amount
                  </td>
                  <td colSpan="4">{salesTaxableAmount}</td>
                </tr>
                <tr>
                  <td colSpan="20" className="text-right">
                    Tax Amount
                  </td>
                  <td colSpan="4">{salesTaxAmount}</td>
                </tr>
                <tr>
                  <td colSpan="20" className="text-right">
                    Net Amount
                  </td>
                  <td colSpan="4">{salesNetAmount}</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td colSpan="20" className="text-right">
                    Taxable Amount
                  </td>
                  <td colSpan="4">0.00</td>
                </tr>
                <tr>
                  <td colSpan="20" className="text-right">
                    Tax Amount
                  </td>
                  <td colSpan="4">0.00</td>
                </tr>
                <tr>
                  <td colSpan="20" className="text-right">
                    Net Amount
                  </td>
                  <td colSpan="4">0.00</td>
                </tr>
              </>
            )}
          </Table>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <Button
              onClick={handleCheckout}
              style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
            // disabled={!isSubmitEnabled}
            >
              Add
            </Button>
          </Col>
          {/* <Col xs={12} md={2}>
            <Button
              type="button"
              className="cus-back-btn"
              variant="secondary"
              onClick={handleBack}
              style={{ backgroundColor: "gray", marginLeft: "-120px" }}
            >
              Cancel
            </Button>
          </Col> */}
        </Row>
      </Col>
    </div>
  );
};

export default PaymentDetails;
