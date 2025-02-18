import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const PaymentDetails = ({
  paymentDetails,
  setPaymentDetails,
  handleSave,
  handleBack,
  repairDetails,
  totalPrice,
  schemeSalesData,
  oldSalesData,
  taxableAmount,
  discountAmt,
  totalAmount,
  taxAmount,
  oldItemsAmount,
  schemeAmount,
  netPayableAmount,
  netAmount,
  salesNetAmount,
  discount,
  handleDiscountChange,
}) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const location = useLocation();
  const updatedOldItemsAmount = oldItemsAmount + salesNetAmount;
  const netPayAmount = netPayableAmount - salesNetAmount
  useEffect(() => {
    // Set the default payment details from location.state if available
    if (location.state?.cash_amount || location.state?.card_amt || location.state?.chq_amt || location.state?.online_amt) {
      setPaymentDetails((prev) => ({
        ...prev,
        cash_amount: location.state.cash_amount || prev.cash_amount,
        card_amt: location.state.card_amt || prev.card_amt,
        chq_amt: location.state.chq_amt || prev.chq_amt,
        online_amt: location.state.online_amt || prev.online_amt,
      }));
    }
  }, [location.state, setPaymentDetails]);

  useEffect(() => {
    // Sum of all payment details
    const totalEnteredAmount =
      parseFloat(paymentDetails.cash_amount || 0) +
      parseFloat(paymentDetails.card_amt || 0) +
      parseFloat(paymentDetails.chq_amt || 0) +
      parseFloat(paymentDetails.online_amt || 0);

    // Using a small tolerance to avoid floating point precision issues
    const tolerance = 0.01;

    // Enable submit only if the total entered amount is approximately equal to totalPrice
    setIsSubmitEnabled(Math.abs(totalEnteredAmount - parseFloat(totalPrice || 0)) < tolerance);
  }, [paymentDetails, totalPrice]);

  const handlePaymentChange = (field, value) => {
    // Convert value to float, default to 0 if empty or NaN
    const newValue = parseFloat(value) || 0;

    // Calculate the total amount including the new value
    const totalAmount =
      (field === "cash_amount" ? newValue : parseFloat(paymentDetails.cash_amount || 0)) +
      (field === "card_amt" ? newValue : parseFloat(paymentDetails.card_amt || 0)) +
      (field === "chq_amt" ? newValue : parseFloat(paymentDetails.chq_amt || 0)) +
      (field === "online_amt" ? newValue : parseFloat(paymentDetails.online_amt || 0));

    // Ensure the total does not exceed netPayAmount
    if (totalAmount > netPayAmount) {
      alert("Total payment amount cannot exceed Net Payable Amount.");
      return;
    }

    // Update state if valid
    setPaymentDetails({ ...paymentDetails, [field]: value });
  };


  return (
    <div>
      <Col className="sales-form-section">
        <Row>
          <h4 className="mb-3">Summary</h4>
          <Table bordered hover responsive>
            <tr>
              <td colSpan="16" className="text-right">Total Amount</td>
              <td colSpan="4">{totalAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="12" className="text-right">Discount Amount</td>
              <td colSpan="4">  @
                <input
                  type="number"
                  value={discount}
                  onChange={handleDiscountChange}
                  style={{ width: '80px', padding: '5px' }}
                />
              </td>
              <td colSpan="4">
                {discountAmt.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="16" className="text-right">Taxable Amount</td>
              <td colSpan="4">{taxableAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="16" className="text-right">Tax Amount</td>
              <td colSpan="4">{taxAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="16" className="text-right">Net Amount</td>
              <td colSpan="4">{netAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="16" className="text-right">Old Items Amount</td>
              <td colSpan="4">{updatedOldItemsAmount.toFixed(2)}</td> {/* Display the updated amount */}
            </tr>
            <tr>
              <td colSpan="16" className="text-right">Scheme Amount</td>
              <td colSpan="4">{schemeAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="16" className="text-right">Net Payable Amount</td>
              <td colSpan="4">{Math.round(netPayAmount).toFixed(2)}</td>
            </tr>
          </Table>
        </Row>
      </Col>

      <Col className="sales-form-section">
        <Row>
          <h4 className="mb-3">Payment Details</h4>
          <Col xs={12} md={4}>
            <InputField
              label="Cash Amt"
              name="cash_amount"
              value={paymentDetails.cash_amount}
              onChange={(e) => handlePaymentChange("cash_amount", e.target.value)}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputField
              label="Card Amt"
              name="card_amt"
              value={paymentDetails.card_amt}
              onChange={(e) => handlePaymentChange("card_amt", e.target.value)}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputField
              label="Cheque Amt"
              name="chq_amt"
              value={paymentDetails.chq_amt}
              onChange={(e) => handlePaymentChange("chq_amt", e.target.value)}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputField
              label="Online Amt"
              name="online_amt"
              value={paymentDetails.online_amt}
              onChange={(e) => handlePaymentChange("online_amt", e.target.value)}
            />
          </Col>
          <Col xs={12} md={3}>
            <Button
              onClick={handleSave}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            // disabled={!isSubmitEnabled} 
            >
              Save
            </Button>
          </Col>
          <Col xs={12} md={2}>
            <Button
              variant="secondary"
              onClick={handleBack}
              style={{ backgroundColor: 'gray', marginLeft: '-50px' }}
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
