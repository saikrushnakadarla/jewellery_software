import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Table } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';

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
  totalAmount,
  discountAmt,
  taxAmount,
  oldItemsAmount,
  schemeAmount,
  netPayableAmount,
  netAmount // Assuming total price is passed as a prop
}) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  // const taxableAmount = repairDetails.reduce((sum, item) => {
  //   const stonePrice = parseFloat(item.stone_price) || 0;
  //   const makingCharges = parseFloat(item.making_charges) || 0;
  //   const rateAmt = parseFloat(item.rate_amt) || 0;
  //   return sum + stonePrice + makingCharges + rateAmt;
  // }, 0);
  // console.log("Total Price=",taxableAmount)

  // const taxAmount = repairDetails.reduce((sum, item) => sum + parseFloat(item.tax_amt || 0), 0);
  // const netAmount = taxableAmount + taxAmount;
  // console.log("Net Amount=",netAmount)

  // Calculate total entered amount
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

  return (
    <div>
      <Col className="sales-form-section">
              <Row>
                <h4 className="mb-3">Summary</h4>
        <Table bordered hover responsive>
        <tr>
              <td colSpan="20" className="text-right">Total Amount</td>
              <td colSpan="4">{totalAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="20" className="text-right">Discount Amount</td>
              <td colSpan="4">{discountAmt.toFixed(2)}</td>
            </tr>
          <tr>
            <td colSpan="20" className="text-right">Taxable Amount</td> {/* Adjusted colspan to 20 */}
            <td colSpan="4">{taxableAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="20" className="text-right">Tax Amount</td> {/* Adjusted colspan to 20 */}
            <td colSpan="4">{taxAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="20" className="text-right">Net Amount</td> {/* Adjusted colspan to 20 */}
            <td colSpan="4">{netAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="20" className="text-right">Old Items Amount</td>
            <td colSpan="4">{oldItemsAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="20" className="text-right">Scheme Amount</td>
            <td colSpan="4">{schemeAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="20" className="text-right">Net Payable Amount</td>
            <td colSpan="4">{netPayableAmount.toFixed(2)}</td>
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
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, cash_amount: e.target.value })
            }
          />
        </Col>
        <Col xs={12} md={4}>
          <InputField
            label="Card Amt"
            name="card_amt"
            value={paymentDetails.card_amt}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, card_amt: e.target.value })
            }
          />
        </Col>
        <Col xs={12} md={4}>
          <InputField
            label="Cheque Amt"
            name="chq_amt"
            value={paymentDetails.chq_amt}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, chq_amt: e.target.value })
            }
          />
        </Col>
        <Col xs={12} md={4}>
          <InputField
            label="Online Amt"
            name="online_amt"
            value={paymentDetails.online_amt}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, online_amt: e.target.value })
            }
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
        {/* <Col xs={12} md={2}>
          <Button
            type="submit"
            style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
            disabled={!isSubmitEnabled} // Disable if not enabled
          >
            Print
          </Button>
        </Col> */}
        <Col xs={12} md={2}>
          <Button
            type="button"
            className="cus-back-btn"
            variant="secondary"
            onClick={handleBack}
            style={{ backgroundColor: 'gray', marginLeft: '-60px' }}
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
