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
  salesTaxableAmount,
  updatedOldItemsAmount,
  netPayAmount,
  discount,
  handleDiscountChange,
  refreshSalesData
}) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Retrieve payment details from localStorage
    const storedPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails')) || {};

    setPaymentDetails((prev) => ({
      ...prev,
      cash_amount: storedPaymentDetails.cash_amount ?? location.state?.cash_amount ?? netPayAmount,
      card_amt: storedPaymentDetails.card_amt ?? location.state?.card_amt ?? prev.card_amt,
      chq_amt: storedPaymentDetails.chq_amt ?? location.state?.chq_amt ?? prev.chq_amt,
      online_amt: storedPaymentDetails.online_amt ?? location.state?.online_amt ?? prev.online_amt,
    }));
  }, [location.state, netPayAmount]);

  useEffect(() => {
    // Update localStorage whenever netPayAmount changes
    if (netPayAmount) {
      setPaymentDetails((prev) => {
        const updatedDetails = { 
          ...prev, 
          cash_amount: parseFloat(netPayAmount).toFixed(2) // Fix to two decimal places
        };
        localStorage.setItem('paymentDetails', JSON.stringify(updatedDetails));
        return updatedDetails;
      });
    }
  }, [netPayAmount]);
  

  useEffect(() => {
    // Sum of all payment details
    const totalEnteredAmount =
      parseFloat(paymentDetails.cash_amount || 0) +
      parseFloat(paymentDetails.card_amt || 0) +
      parseFloat(paymentDetails.chq_amt || 0) +
      parseFloat(paymentDetails.online_amt || 0);

    const tolerance = 0.01; // Small tolerance for floating point precision issues

    setIsSubmitEnabled(Math.abs(totalEnteredAmount - parseFloat(totalPrice || 0)) < tolerance);
  }, [paymentDetails, totalPrice]);

  const handlePaymentChange = (field, value) => {
    const newValue = parseFloat(value) || 0;

    const totalAmount =
      (field === 'cash_amount' ? newValue : parseFloat(paymentDetails.cash_amount || 0)) +
      (field === 'card_amt' ? newValue : parseFloat(paymentDetails.card_amt || 0)) +
      (field === 'chq_amt' ? newValue : parseFloat(paymentDetails.chq_amt || 0)) +
      (field === 'online_amt' ? newValue : parseFloat(paymentDetails.online_amt || 0));

    if (totalAmount > netPayAmount) {
      alert('Total payment amount cannot exceed Net Payable Amount.');
      return;
    }

    const updatedDetails = { ...paymentDetails, [field]: newValue };
    setPaymentDetails(updatedDetails);
    localStorage.setItem('paymentDetails', JSON.stringify(updatedDetails)); // Update localStorage on change
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
              <td colSpan="16" className="text-right">Special Discount</td>
              {/* <td colSpan="4">{taxableAmount.toFixed(2)}</td> */}
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
              <td colSpan="4">{oldItemsAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="16" className="text-right">Scheme Amount</td>
              <td colSpan="4">{schemeAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="16" className="text-right">Sale Return Amount</td>
              <td colSpan="4">{salesNetAmount.toFixed(2)}</td>
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
              onChange={(e) => handlePaymentChange('cash_amount', e.target.value)}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputField
              label="Card Amt"
              name="card_amt"
              value={paymentDetails.card_amt}
              onChange={(e) => handlePaymentChange('card_amt', e.target.value)}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputField
              label="Cheque Amt"
              name="chq_amt"
              value={paymentDetails.chq_amt}
              onChange={(e) => handlePaymentChange('chq_amt', e.target.value)}
            />
          </Col>
          <Col xs={12} md={4}>
            <InputField
              label="Online Amt"
              name="online_amt"
              value={paymentDetails.online_amt}
              onChange={(e) => handlePaymentChange('online_amt', e.target.value)}
            />
          </Col>
          <Col xs={12} md={3}>
            <Button
              onClick={handleSave}
              style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
              
            >
              Save
            </Button>
          </Col>
          <Col xs={12} md={2}>
            <Button
              variant="secondary"
              onClick={handleBack}
              style={{ backgroundColor: 'gray', marginLeft: '-40px' }}
            >
              Cancel
            </Button>
          </Col>
          {/* <Col xs={12} md={2}>
            <Button
              variant="secondary"
              onClick={refreshSalesData}
              style={{ backgroundColor: 'gray', marginLeft: '-30px' }}
            >
              Clear
            </Button>
          </Col> */}
        </Row>
      </Col>
    </div>
  );
};

export default PaymentDetails;
