import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import InputField from "../../../../Pages/InputField/InputField";

const PaymentSection = ({ paymentDetails, handleSave, handleBack ,setPaymentDetails}) => {
  return (
    <div className="sales-form-fourth">
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
                        <InputField label="Card Amt" name="card_amt"
                          value={paymentDetails.card_amt}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, card_amt: e.target.value })
                          } />
                      </Col>                      
                      <Col xs={12} md={4}>
                        <InputField label="Cheque Amt" name="chq_amt"
                          value={paymentDetails.chq_amt}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, chq_amt: e.target.value })
                          } />
                      </Col>                     
                      <Col xs={12} md={4}>
                        <InputField label="Online Amt" name="online_amt"
                          value={paymentDetails.online_amt}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, online_amt: e.target.value })
                          } />
                      </Col>
                      <Col xs={12} md={2}>
                        <Button onClick={handleSave} style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Save</Button>
                      </Col>
                      <Col xs={12} md={2}>
                <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Print</Button>
                </Col>
                <Col xs={12} md={2}>
                <Button
            type="button"
            className="cus-back-btn"
            variant="secondary"
            onClick={handleBack} style={{ backgroundColor: 'gray', marginRight: '10px' }}
          >
            cancel
          </Button>
                </Col>
                    </Row>
      </Col>
    </div>
  );
};

export default PaymentSection;