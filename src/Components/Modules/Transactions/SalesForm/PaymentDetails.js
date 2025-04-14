import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Table, Modal } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import baseURL from "../../../../Url/NodeBaseURL";

const PaymentDetails = ({
  paymentDetails,
  setPaymentDetails,
  handleSave,
  handleBack,
  repairDetails,
  setRepairDetails,
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
  refreshSalesData,
  offers,
  loading,
  festivalShowModal,
  handleFestivalShowModal,
  handleFestivalCloseModal,
  appliedOffers,
  setAppliedOffers,
  festivalDiscountAmt,
  tabId
}) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const location = useLocation();
  const [appliedOfferKey, setAppliedOfferKey] = useState(null);


  const handleApply = (selectedOffer, offerIndex) => {
    const storedRepairDetails = JSON.parse(localStorage.getItem(`repairDetails_${tabId}`)) || [];
    const currentOfferKey = `${selectedOffer._id}_${offerIndex}`;
    const isAlreadyApplied = appliedOffers[currentOfferKey];
  
    let updatedRepairDetails = [...storedRepairDetails];
  
    // First, reset all offers (revert to original state)
    updatedRepairDetails = updatedRepairDetails.map((item) => {
      const taxPercent = parseFloat(item.tax_percent) || 1;
      const pieceCost = parseFloat(item.pieace_cost) || 0;
      const qty = parseFloat(item.qty) || 1;
      const discountAmt = parseFloat(item.disscount) || 0;
      const pricingType = item.pricing;
      const rateAmt = parseFloat(item.rate_amt) || 0;
      const stonePrice = parseFloat(item.stone_price) || 0;
      const makingCharges = parseFloat(item.making_charges) || 0;
      const hmCharges = parseFloat(item.hm_charges) || 0;
  
      if (pricingType === "By fixed") {
        const pieceTaxableAmt = pieceCost * qty;
        const originalPieceTaxableAmt = item.original_piece_taxable_amt
          ? parseFloat(item.original_piece_taxable_amt)
          : pieceTaxableAmt;
        const taxAmt = (taxPercent * originalPieceTaxableAmt) / 100;
        const totalPrice = originalPieceTaxableAmt + taxAmt;
  
        return {
          ...item,
          piece_taxable_amt: originalPieceTaxableAmt.toFixed(2),
          tax_amt: taxAmt.toFixed(2),
          total_price: totalPrice.toFixed(2),
          festival_discount: 0,
          festival_discount_percentage: 0,
          festival_discount_on_rate: 0,
        };
      } else {
        const originalTotalPrice = item.original_total_price
          ? parseFloat(item.original_total_price)
          : parseFloat(item.total_price);
          const totalBeforeTax =
          rateAmt + stonePrice + makingCharges + hmCharges - discountAmt;
          
        const taxAmt = (totalBeforeTax * taxPercent) / 100;
        const updatedTotalPrice = totalBeforeTax + taxAmt;
          console.log("originalTotalPrice=",originalTotalPrice)
        // const taxAmt = (taxPercent * originalTotalPrice) / (100 + taxPercent); 
        console.log("taxAmt=",taxAmt)
  
        return {
          ...item,
          total_price: updatedTotalPrice.toFixed(2),
          tax_amt: taxAmt.toFixed(2),
          festival_discount: 0,
          festival_discount_percentage: 0,
          festival_discount_on_rate: 0,
        };
      }
    });
  
    // If already applied, just reset state and exit
    if (isAlreadyApplied) {
      setRepairDetails(updatedRepairDetails);
      localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedRepairDetails));
      setAppliedOffers({});
      return;
    }
  
    // Else apply the new offer
    const updatedWithNewOffer = updatedRepairDetails.map((item) => {
      const makingCharges = parseFloat(item.making_charges) || 0;
      const pieceCost = parseFloat(item.pieace_cost) || 0;
      const qty = parseFloat(item.qty) || 1;
      const taxPercent = parseFloat(item.tax_percent) || 1;
      const pieceTaxableAmt = parseFloat(item.piece_taxable_amt) || 0;
      const rateAmt = parseFloat(item.rate_amt) || 0;
      const stonePrice = parseFloat(item.stone_price) || 0;
      const discountAmt = parseFloat(item.disscount) || 0;
      const hmCharges = parseFloat(item.hm_charges) || 0;
      const pricingType = item.pricing;
      const grossWeight = parseFloat(item.gross_weight) || 0;
  
      const percentageDiscount = parseFloat(selectedOffer.discount_percentage) || 0;
      const rateDiscount = parseFloat(selectedOffer.discount_on_rate) || 0;
      const fixedPercentageDiscount = parseFloat(selectedOffer.discount_percent_fixed) || 0;
      const weightBasedDiscount = (rateDiscount / 10) * grossWeight;
      const totalDiscountValue =
        pricingType === "By fixed"
          ? fixedPercentageDiscount
          : percentageDiscount + weightBasedDiscount;
  
      let calculatedDiscount = 0;
  
      if (pricingType === "By fixed") {
        const pieceTaxableAmt = pieceCost * qty;
        const originalPieceTaxableAmt = item.original_piece_taxable_amt
          ? parseFloat(item.original_piece_taxable_amt)
          : pieceTaxableAmt;
  
        calculatedDiscount = (pieceTaxableAmt * totalDiscountValue) / 100;
        const updatedPieceTaxableAmt = originalPieceTaxableAmt - calculatedDiscount - discountAmt;
        const taxAmt = (taxPercent * updatedPieceTaxableAmt) / 100;
        const totalPrice = updatedPieceTaxableAmt + taxAmt;
  
        return {
          ...item,
          original_piece_taxable_amt: originalPieceTaxableAmt.toFixed(2),
          festival_discount: calculatedDiscount.toFixed(2),
          festival_discount_percentage: percentageDiscount.toFixed(2),
          festival_discount_on_rate: rateDiscount.toFixed(2),
          piece_taxable_amt: updatedPieceTaxableAmt.toFixed(2),
          tax_amt: taxAmt.toFixed(2),
          total_price: totalPrice.toFixed(2),
        };
      } else {
        calculatedDiscount =
          (makingCharges * percentageDiscount) / 100 +
          (rateDiscount / 10) * grossWeight;
        const totalBeforeTax =
          rateAmt + stonePrice + makingCharges + hmCharges - calculatedDiscount - discountAmt;
          
        const taxAmt = (totalBeforeTax * taxPercent) / 100;
        const updatedTotalPrice = totalBeforeTax + taxAmt;
  
        return {
          ...item,
          original_total_price: item.original_total_price
            ? item.original_total_price
            : parseFloat(item.total_price).toFixed(2),
          festival_discount: calculatedDiscount.toFixed(2),
          festival_discount_percentage: percentageDiscount.toFixed(2),
          festival_discount_on_rate: rateDiscount.toFixed(2),
          tax_amt: taxAmt.toFixed(2),
          total_price: updatedTotalPrice.toFixed(2),
        };
      }
    });
  
    setRepairDetails(updatedWithNewOffer);
    localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedWithNewOffer));
  
    // Set the only applied offer key
    setAppliedOffers({
      [currentOfferKey]: true,
    });
  };
  
  

useEffect(() => {
  const storedPaymentDetails = JSON.parse(localStorage.getItem(`paymentDetails_${tabId}`)) || {};

  const cashAmount =
    location.state?.cash_amount ??
    storedPaymentDetails.cash_amount ??
    netPayAmount;

  const cardAmt =
    location.state?.card_amt ??
    storedPaymentDetails.card_amt ??
    0;

  const chqAmt =
    location.state?.chq_amt ??
    storedPaymentDetails.chq_amt ??
    0;

  const onlineAmt =
    location.state?.online_amt ??
    storedPaymentDetails.online_amt ??
    0;

  setPaymentDetails({
    cash_amount: cashAmount,
    card_amt: cardAmt,
    chq_amt: chqAmt,
    online_amt: onlineAmt,
  });
}, [location.state, netPayAmount, tabId]);


  // useEffect(() => {
  //   setPaymentDetails((prev) => ({
  //     ...prev,
  //     cash_amount: location.state?.cash_amount ?? netPayAmount,
  //     card_amt: location.state?.card_amt ?? prev.card_amt,
  //     chq_amt: location.state?.chq_amt ?? prev.chq_amt,
  //     online_amt: location.state?.online_amt ?? prev.online_amt,
  //   }));
  // }, [location.state, netPayAmount]);

  useEffect(() => {
    // Only update if cash_amount is NOT provided from location.state
    if (netPayAmount && location.state?.cash_amount === undefined) {
      setPaymentDetails((prev) => {
        const updatedDetails = {
          ...prev,
          cash_amount: parseFloat(netPayAmount).toFixed(2), // Fixed to two decimal places
        };
        localStorage.setItem(`paymentDetails_${tabId}`, JSON.stringify(updatedDetails));
        return updatedDetails;
      });
    }
  }, [netPayAmount, location.state, tabId]);
  

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
    localStorage.setItem(`paymentDetails_${tabId}`, JSON.stringify(updatedDetails)); // Update localStorage on change
  };

  return (
    <>
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
                <td colSpan="12" className="text-right">Festival Offer</td>
                <td colSpan="4"> &ensp;&ensp;
                  <Button
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={handleFestivalShowModal}
                  >Apply</Button>
                </td>
                <td colSpan="4">{festivalDiscountAmt.toFixed(2)}</td>
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
          </Row>
        </Col>

      </div>

      <Modal show={festivalShowModal} onHide={handleFestivalCloseModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Available Offers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading offers...</p>
          ) : offers.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Offer Name</th>
                  <th>Discount On Rate</th>
                  <th>Discount % on MC</th>
                  <th>Discount % for Fixed</th>
                  <th>Valid From</th>
                  <th>Valid To</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer, index) => {
                  const offerKey = `${offer._id}_${index}`;
                  const isApplied = appliedOffers[offerKey] || false;

                  const formatDate = (dateStr) => {
                    const date = new Date(dateStr);
                    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}-${date.getFullYear()}`;
                  };

                  return (
                    <tr key={offer._id}>
                      <td>{index + 1}</td>
                      <td>{offer.offer_name}</td>
                      <td>{offer.discount_on_rate}</td>
                      <td>{offer.discount_percentage}</td>
                      <td>{offer.discount_percent_fixed}</td>
                      <td>{formatDate(offer.valid_from)}</td>
                      <td>{formatDate(offer.valid_to)}</td>
                      <td>
                        <Button
                          variant={isApplied ? "secondary" : "success"}
                          size="sm"
                          onClick={() => handleApply(offer, index)}
                        >
                          {isApplied ? "Applied" : "Apply"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p>No offers available at the moment.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFestivalCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
};

export default PaymentDetails;