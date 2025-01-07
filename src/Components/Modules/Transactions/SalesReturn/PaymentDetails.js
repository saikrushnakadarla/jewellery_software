import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';
import { Table } from 'react-bootstrap';

const PaymentDetails = ({
  paymentDetails,
  setPaymentDetails,
  handleSave,
  handleBack,
  repairDetails,
  invoiceDetails,
  selectedRows,
  totalPrice, 
}) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  // Calculate taxable amount based on selected rows
  const taxableAmount = selectedRows.reduce((sum, rowIndex) => {
    const detail = invoiceDetails[rowIndex];
    const stonePrice = parseFloat(detail.stone_price) || 0;
    const makingCharges = parseFloat(detail.making_charges) || 0;
    const rateAmt = parseFloat(detail.rate_amt) || 0;
    return sum + stonePrice + makingCharges + rateAmt;
  }, 0);

  console.log("Taxable Amount from Selected Entries:", taxableAmount);

  const taxAmount = selectedRows.reduce((sum, rowIndex) => {
    const detail = invoiceDetails[rowIndex];
    return sum + parseFloat(detail.tax_amt || 0);
  }, 0);

  const netAmount = taxableAmount + taxAmount;
  console.log("Net Amount from Selected Entries:", netAmount);

  // Calculate total entered amount
  useEffect(() => {
    const totalEnteredAmount =
      parseFloat(paymentDetails.cash_amount || 0) +
      parseFloat(paymentDetails.card_amt || 0) +
      parseFloat(paymentDetails.chq_amt || 0) +
      parseFloat(paymentDetails.online_amt || 0);

    const tolerance = 0.01;
    setIsSubmitEnabled(Math.abs(totalEnteredAmount - parseFloat(totalPrice || 0)) < tolerance);
  }, [paymentDetails, totalPrice]);

  return (
    <div>
      <Col className="sales-form-section">
        <Row>
          <h4 className="mb-3">Summary</h4>
          <Table bordered hover responsive>
            {Array.isArray(invoiceDetails) && invoiceDetails.length > 0 ? (
              <>
                <tr>
                  <td colSpan="20" className="text-right">Taxable Amount</td>
                  <td colSpan="4">{taxableAmount}</td>
                </tr>
                <tr>
                  <td colSpan="20" className="text-right">Tax Amount</td>
                  <td colSpan="4">{taxAmount}</td>
                </tr>
                <tr>
                  <td colSpan="20" className="text-right">Net Amount</td>
                  <td colSpan="4">{netAmount}</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td colSpan="20" className="text-right">Taxable Amount</td>
                  <td colSpan="4">0.00</td>
                </tr>
                <tr>
                  <td colSpan="20" className="text-right">Tax Amount</td>
                  <td colSpan="4">0.00</td>
                </tr>
                <tr>
                  <td colSpan="20" className="text-right">Net Amount</td>
                  <td colSpan="4">0.00</td>
                </tr>
              </>
            )}
          </Table>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            <Button
              onClick={handleSave}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
              disabled={!isSubmitEnabled} 
            >
              Check Out
            </Button>
          </Col>
          <Col xs={12} md={2}>
            <Button
              type="button"
              className="cus-back-btn"
              variant="secondary"
              onClick={handleBack}
              style={{ backgroundColor: 'gray', marginRight: '10px' }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Col>

    </div>
  );
};

export default PaymentDetails;
