import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';

const PaymentDetails = ({
  paymentDetails,
  setPaymentDetails,
  handleSave,
  handleBack,
  totalPrice, // Assuming total price is passed as a prop
}) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

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
            disabled={!isSubmitEnabled} // Disable if not enabled
          >
            Check Out
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
            style={{ backgroundColor: 'gray', marginRight: '10px' }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default PaymentDetails;
