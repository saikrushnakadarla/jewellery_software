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
  refreshSalesData
}) => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [appliedOffers, setAppliedOffers] = useState({});// Keyed by offer ID or offer_name



  const handleApply = (selectedOffer) => {
    const discountValue = parseFloat(selectedOffer.discount_percentage) || 0;
    const storedRepairDetails = JSON.parse(localStorage.getItem("repairDetails")) || [];

    const isAlreadyApplied = appliedOffers[selectedOffer._id];

    const updatedRepairDetails = storedRepairDetails.map((item) => {
      const makingCharges = parseFloat(item.making_charges) || 0;
      const pieceCost = parseFloat(item.pieace_cost) || 0;
      const qty = parseFloat(item.qty) || 1;
      const taxPercent = parseFloat(item.tax_percent) || 1;
      const piece_taxable_amt = parseFloat(item.piece_taxable_amt) || 0;
      const rateAmt = parseFloat(item.rate_amt) || 0;
      const stonePrice = parseFloat(item.stone_price) || 0;
      const discountAmt = parseFloat(item.disscount) || 0;
      const hmCharges = parseFloat(item.hm_charges) || 0;
      const pricingType = item.pricing;

      let calculatedDiscount = 0;

      if (pricingType === "By fixed") {
        const pieceTaxableAmt = pieceCost * qty;
        const originalPieceTaxableAmt = item.original_piece_taxable_amt
          ? parseFloat(item.original_piece_taxable_amt)
          : pieceTaxableAmt;

        if (isAlreadyApplied) {
          // Revert
          const taxAmt = (taxPercent * originalPieceTaxableAmt) / 100;
          const totalPrice = originalPieceTaxableAmt + taxAmt;

          return {
            ...item,
            piece_taxable_amt: originalPieceTaxableAmt.toFixed(2),
            tax_amt: taxAmt.toFixed(2),
            total_price: totalPrice.toFixed(2),
            festival_discount: 0,
            festival_discount_percentage: 0,
          };
        } else {
          calculatedDiscount = (pieceTaxableAmt * discountValue) / 100;
          const updatedPieceTaxableAmt = originalPieceTaxableAmt - calculatedDiscount;
          const taxAmt = (taxPercent * updatedPieceTaxableAmt) / 100;
          const totalPrice = updatedPieceTaxableAmt + taxAmt;

          return {
            ...item,
            original_piece_taxable_amt: originalPieceTaxableAmt.toFixed(2),
            festival_discount: calculatedDiscount.toFixed(2),
            festival_discount_percentage: discountValue,
            piece_taxable_amt: updatedPieceTaxableAmt.toFixed(2),
            tax_amt: taxAmt.toFixed(2),
            total_price: totalPrice.toFixed(2),
          };
        }
      } else {
        const originalTotalPrice = item.original_total_price
          ? parseFloat(item.original_total_price)
          : parseFloat(item.total_price) || 0;

        if (isAlreadyApplied) {
          return {
            ...item,
            total_price: originalTotalPrice.toFixed(2),
            festival_discount: 0,
            festival_discount_percentage: 0,
          };
        } else {
          calculatedDiscount = (makingCharges * discountValue) / 100;
          const totalBeforeTax = rateAmt + stonePrice + makingCharges + hmCharges - calculatedDiscount;
          const taxAmt = (totalBeforeTax * taxPercent) / 100;
          const updatedTotalPrice = totalBeforeTax + taxAmt;

          return {
            ...item,
            original_total_price: originalTotalPrice.toFixed(2),
            festival_discount: calculatedDiscount.toFixed(2),
            // festival_discount_percentage: discountValue,
            total_price: updatedTotalPrice.toFixed(2),
          };
        }
      }
    });

    setRepairDetails(updatedRepairDetails);
    localStorage.setItem("repairDetails", JSON.stringify(updatedRepairDetails));

    // Toggle applied state for this offer
    setAppliedOffers((prev) => ({
      ...prev,
      [selectedOffer._id]: !prev[selectedOffer._id] // ✅ toggles only for the clicked row
    }));

  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/offers`);
        setOffers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                    onClick={handleShowModal}
                  >Apply</Button>
                </td>
                <td colSpan="4"></td>
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
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
                  <th>Valid From</th>
                  <th>Valid To</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer, index) => {
                  const formatDate = (dateString) => {
                    const date = new Date(dateString);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                  };

                  const isApplied = appliedOffers[offer._id] || false;

                  return (
                    <tr key={offer._id}> {/* ✅ Use unique ID as key */}
                      <td>{index + 1}</td>
                      <td>{offer.offer_name}</td>
                      <td>{offer.discount_on_rate}</td>
                      <td>{offer.discount_percentage}</td>
                      <td>{formatDate(offer.valid_from)}</td>
                      <td>{formatDate(offer.valid_to)}</td>
                      <td>
                        <Button
                          variant={isApplied ? "secondary" : "success"}
                          size="sm"
                          onClick={() => handleApply(offer)}
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentDetails;
