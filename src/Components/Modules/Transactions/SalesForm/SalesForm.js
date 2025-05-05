import React, { useState, useEffect, useRef } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerDetails from './CustomerDetails';
import InvoiceDetails from './InvoiceDetails';
import ProductDetails from './ProductDetails';
import ProductTable from './ProductTable';
import PaymentDetails from './PaymentDetails';
import useProductHandlers from './hooks/useProductHandlers';
import useCalculations from './hooks/useCalculations';
import './../Sales/SalesForm.css';
import baseURL from './../../../../Url/NodeBaseURL';
import SalesFormSection from "./SalesForm3Section";
import { pdf } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFLayout from './TaxInvoiceA4';
import { useLocation } from 'react-router-dom';
import { saveAs } from "file-saver";

const SalesForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPDFDownload, setShowPDFDownload] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [metal, setMetal] = useState("");

  const [oldSalesData, setOldSalesData] = useState(
    JSON.parse(localStorage.getItem('oldSalesData')) || []
  );

  const [schemeSalesData, setSchemeSalesData] = useState(
    JSON.parse(localStorage.getItem('schemeSalesData')) || []
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('oldSalesData', JSON.stringify(oldSalesData));
  }, [oldSalesData]);

  useEffect(() => {
    localStorage.setItem('schemeSalesData', JSON.stringify(schemeSalesData));
  }, [schemeSalesData]);


  // const [paymentDetails, setPaymentDetails] = useState(
  //   JSON.parse(localStorage.getItem('paymentDetails')) || {
  //     cash_amount: 0,
  //     card_amt: 0,
  //     chq: "",
  //     chq_amt: 0,
  //     online: "",
  //     online_amt: 0,
  //   }
  // );

  const {
    formData,
    setFormData,
    products,
    data,
    isQtyEditable,
    handleChange,
    handleBarcodeChange,
    handleProductChange,
    handleProductNameChange,
    handleMetalTypeChange,
    handleDesignNameChange,
    filteredDesignOptions,
    filteredPurityOptions,
    filteredMetalTypes,
    uniqueProducts,
    metaltypeOptions,
    purityOptions,
    categoryOptions,
    subcategoryOptions,
    designOptions,
    isBarcodeSelected,
    handleImageChange,
    image,
    fileInputRef,
    clearImage,
    captureImage,
    setShowWebcam,
    showWebcam,
    webcamRef,
    setShowOptions,
    showOptions,
    fetchCategory,
    fetchSubCategory,
    isManualTotalPriceChange,
    setIsManualTotalPriceChange,
    tabId,
    isTotalPriceCleared,
    setIsTotalPriceCleared,
    manualTotalPriceRef
  } = useProductHandlers();




  const [repairDetails, setRepairDetails] = useState(() => {
    const savedData = localStorage.getItem(`repairDetails_${tabId}`);
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(repairDetails));
  }, [repairDetails, tabId]);



  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${baseURL}/get/account-details`);
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const result = await response.json();
        const filteredCustomers = result.filter(item => item.account_group === 'CUSTOMERS' || item.account_group === 'SUPPLIERS');
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch last invoice number
  useEffect(() => {
    const fetchLastInvoiceNumber = async () => {
      try {
        const response = await axios.get(`${baseURL}/lastInvoiceNumber`);
        setFormData(prev => ({ ...prev, invoice_number: response.data.lastInvoiceNumber }));
      } catch (error) {
        console.error("Error fetching invoice number:", error);
      }
    };

    fetchLastInvoiceNumber();
  }, []);

  // Save data to localStorage whenever repairDetails or paymentDetails change
  // useEffect(() => {
  //   localStorage.setItem('repairDetails', JSON.stringify(repairDetails));
  // }, [repairDetails]);

  // useEffect(() => {
  //   localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
  // }, [paymentDetails]);

  const [selectedMobile, setSelectedMobile] = useState("");
  const [uniqueInvoice, setUniqueInvoice] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const [returnData, setReturnData] = useState({
    invoice_number: '',
  })

  useEffect(() => {
    // Set the default date value to the current date in dd-mm-yyyy format if not already set
    if (!returnData.date) {
      const currentDate = new Date();
      setReturnData({
        ...returnData,
        date: formatDate(currentDate),
      });
    }
  }, [returnData, setReturnData]);

  // Utility function to format date as dd-mm-yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Handle invoice number change
  const handleInvoiceChange = (e) => {
    const selectedInvoiceNumber = e.target.value;
    const selectedInvoice = filteredInvoices.find(
      (invoice) => invoice.invoice_number === selectedInvoiceNumber
    );

    if (selectedInvoice) {
      setReturnData({
        ...returnData,
        invoice_number: selectedInvoiceNumber,
        date: selectedInvoice.date ? formatDate(selectedInvoice.date) : "", // Format date
        terms: selectedInvoice.terms || "", // Set the terms from the selected invoice
      });
    } else {
      setReturnData({
        ...returnData,
        invoice_number: selectedInvoiceNumber,
        date: "",
        terms: "",
      });
    }
  };

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-unique-repair-details`);
        const filteredData = response.data.filter(item => item.transaction_status === 'Sales');
        setUniqueInvoice(filteredData);
        setFilteredInvoices(filteredData); // Initially, show all invoices
      } catch (error) {
        console.error('Error fetching repair details:', error);
      }
    };

    fetchRepairs();
  }, []);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      if (!returnData.invoice_number) {
        setInvoiceDetails([]); // Ensure it's an empty array, not null
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/getsales/${returnData.invoice_number}`);
        const filteredData = response.data.filter((invoice) => invoice.status !== "Sale Returned");

        setInvoiceDetails(filteredData || []); // Ensure it's always an array
        console.log("Fetched Invoice Details:", filteredData);
      } catch (error) {
        console.error(`Error fetching details for invoice ${returnData.invoice_number}:`, error);
        setInvoiceDetails([]); // Set empty array on error
      }
    };

    fetchInvoiceDetails();
  }, [returnData.invoice_number]);

  const handleCustomerChange = (customerId) => {
    const customer = customers.find((cust) => String(cust.account_id) === String(customerId));

    if (customer) {
      setFormData((prevData) => ({
        ...prevData,
        customer_id: customerId,
        account_name: customer.account_name || "",
        mobile: customer.mobile || "",
        email: customer.email || "",
        address1: customer.address1 || "",
        address2: customer.address2 || "",
        city: customer.city || "",
        pincode: customer.pincode || "",
        state: customer.state || "",
        state_code: customer.state_code || "",
        aadhar_card: customer.aadhar_card || "",
        gst_in: customer.gst_in || "",
        pan_card: customer.pan_card || "",
        // keep invoice_number untouched
        invoice_number: prevData.invoice_number || "",
      }));
      setSelectedMobile(customer.mobile || "");

      const filtered = uniqueInvoice.filter(
        (invoice) =>
          invoice.customer_name === customer.account_name ||
          invoice.mobile === customer.mobile
      );
      setFilteredInvoices(filtered);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        customer_id: "",
        account_name: "",
        mobile: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        state: "",
        state_code: "",
        aadhar_card: "",
        gst_in: "",
        pan_card: "",
        // preserve invoice_number
        invoice_number: prevData.invoice_number || "",
      }));
      setSelectedMobile("");
      setFilteredInvoices(uniqueInvoice);
    }
  };


  const [editIndex, setEditIndex] = useState(null);
  const [discount, setDiscount] = useState(() => {
    return parseFloat(localStorage.getItem(`discount_${tabId}`)) || ""; // Load discount from localStorage
  });
  const [isManualNetMode, setIsManualNetMode] = useState(false);

  useEffect(() => {
    localStorage.setItem(`discount_${tabId}`, discount); // Save to localStorage when discount changes
  }, [discount]);


  // const handleDiscountChange = (e) => {
  //   const discountValue = parseFloat(e.target.value) || ""; // Default to empty if invalid

  //   if (discountValue > 15) {
  //     alert("Discount cannot be greater than 15%");
  //     return;
  //   }

  //   setDiscount(discountValue);

  //   const storedRepairDetails = JSON.parse(localStorage.getItem(`repairDetails_${tabId}`)) || [];

  //   const updatedRepairDetails = storedRepairDetails.map((item) => {
  //     const makingCharges = parseFloat(item.making_charges) || 0;
  //     const pieceCost = parseFloat(item.pieace_cost) || 0;
  //     const qty = parseFloat(item.qty) || 1;
  //     const taxPercent = parseFloat(item.tax_percent) || 1;
  //     const piece_taxable_amt = parseFloat(item.piece_taxable_amt) || 0;
  //     const rateAmt = parseFloat(item.rate_amt) || 0;
  //     const stonePrice = parseFloat(item.stone_price) || 0;
  //     const discountAmt = parseFloat(item.disscount) || 0;
  //     const hmCharges = parseFloat(item.hm_charges) || 0;
  //     const pricingType = item.pricing;
  //     const festivalDiscount = parseFloat(item.festival_discount) || 0;


  //     let calculatedDiscount = 0;

  //     if (pricingType === "By fixed") {
  //       const pieceTaxableAmt = pieceCost * qty;
  //       calculatedDiscount = (pieceTaxableAmt * discountValue) / 100;

  //       const originalPieceTaxableAmt = item.original_piece_taxable_amt
  //         ? parseFloat(item.original_piece_taxable_amt)
  //         : pieceTaxableAmt;

  //       const updatedPieceTaxableAmt = originalPieceTaxableAmt - calculatedDiscount - festivalDiscount;
  //       const taxAmt = (taxPercent * updatedPieceTaxableAmt) / 100;
  //       const totalPrice = updatedPieceTaxableAmt + taxAmt;

  //       return {
  //         ...item,
  //         original_piece_taxable_amt: originalPieceTaxableAmt.toFixed(2),
  //         disscount: calculatedDiscount.toFixed(2),
  //         disscount_percentage: discountValue,
  //         piece_taxable_amt: updatedPieceTaxableAmt.toFixed(2),
  //         tax_amt: taxAmt.toFixed(2),
  //         total_price: totalPrice.toFixed(2),
  //       };
  //     } else {
  //       calculatedDiscount = (makingCharges * discountValue) / 100;

  //       const previousTotalPrice = parseFloat(item.total_price) || 0;
  //       const originalTotalPrice = item.original_total_price
  //         ? parseFloat(item.original_total_price)
  //         : previousTotalPrice;

  //       // Tax calculation
  //       const totalBeforeTax = rateAmt + stonePrice + makingCharges + hmCharges - calculatedDiscount - festivalDiscount;
  //       const taxAmt = (totalBeforeTax * taxPercent) / 100;
  //       const updatedTotalPrice = totalBeforeTax + taxAmt;

  //       return {
  //         ...item,
  //         original_total_price: originalTotalPrice.toFixed(2),
  //         disscount: calculatedDiscount.toFixed(2),
  //         disscount_percentage: discountValue,
  //         tax_amt: taxAmt.toFixed(2),
  //         total_price: updatedTotalPrice.toFixed(2),
  //       };
  //     }
  //   });

  //   setRepairDetails(updatedRepairDetails);
  //   localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedRepairDetails));
  // };

  const applyDiscountToRepairDetails = (discountValue) => {
    const storedRepairDetails = JSON.parse(localStorage.getItem(`repairDetails_${tabId}`)) || [];

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
      const festivalDiscount = parseFloat(item.festival_discount) || 0;

      let calculatedDiscount = 0;

      if (pricingType === "By fixed") {
        const pieceTaxableAmt = pieceCost * qty;
        calculatedDiscount = (pieceTaxableAmt * discountValue) / 100;

        const originalPieceTaxableAmt = item.original_piece_taxable_amt
          ? parseFloat(item.original_piece_taxable_amt)
          : pieceTaxableAmt;

        const updatedPieceTaxableAmt = originalPieceTaxableAmt - calculatedDiscount - festivalDiscount;
        const taxAmt = (taxPercent * updatedPieceTaxableAmt) / 100;
        const totalPrice = updatedPieceTaxableAmt + taxAmt;

        return {
          ...item,
          original_piece_taxable_amt: originalPieceTaxableAmt.toFixed(2),
          disscount: calculatedDiscount.toFixed(2),
          disscount_percentage: discountValue,
          piece_taxable_amt: updatedPieceTaxableAmt.toFixed(2),
          tax_amt: taxAmt.toFixed(2),
          total_price: totalPrice.toFixed(2),
        };
      } else {
        calculatedDiscount = (makingCharges * discountValue) / 100;

        const previousTotalPrice = parseFloat(item.total_price) || 0;
        const originalTotalPrice = item.original_total_price
          ? parseFloat(item.original_total_price)
          : previousTotalPrice;

        const totalBeforeTax = rateAmt + stonePrice + makingCharges + hmCharges - calculatedDiscount - festivalDiscount;
        const taxAmt = (totalBeforeTax * taxPercent) / 100;
        const updatedTotalPrice = totalBeforeTax + taxAmt;

        return {
          ...item,
          original_total_price: originalTotalPrice.toFixed(2),
          disscount: calculatedDiscount.toFixed(2),
          disscount_percentage: discountValue,
          tax_amt: taxAmt.toFixed(2),
          total_price: updatedTotalPrice.toFixed(2),
        };
      }
    });

    setRepairDetails(updatedRepairDetails);
    localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedRepairDetails));
  };


  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value) || "";

    if (discountValue > 15) {
      alert("Discount cannot be greater than 15%");
      return;
    }

    setDiscount(discountValue);
    setManualNetAmount(0); // Reset manualNetAmount to exit manual mode
    setIsManualNetMode(false); // Ensure we're in normal discount mode
    applyDiscountToRepairDetails(discountValue); // Recalculate with new discount
  };


  const [festivalShowModal, festivalSetShowModal] = useState(false);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFestivalShowModal = () => festivalSetShowModal(true);
  const handleFestivalCloseModal = () => festivalSetShowModal(false);
  const [appliedOffers, setAppliedOffers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/offers`);
        const allOffers = response.data;

        const today = new Date();
        const filteredOffers = allOffers.filter((offer) => {
          const validFrom = new Date(offer.valid_from);
          const validTo = new Date(offer.valid_to);

          // Compare dates - check if today is in between valid_from and valid_to
          return today >= validFrom && today <= validTo;
        });

        setOffers(filteredOffers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [isAnyOfferApplied, setIsAnyOfferApplied] = useState(false);

  // const handleApply = (selectedOffer, offerIndex) => {
  //   const storedRepairDetails = JSON.parse(localStorage.getItem(`repairDetails_${tabId}`)) || [];
  //   const currentOfferKey = `${selectedOffer._id}_${offerIndex}`;
  //   const isAlreadyApplied = appliedOffers[currentOfferKey] || isAnyOfferApplied;

  //   let updatedRepairDetails = [...storedRepairDetails];

  //   // First, reset all offers (revert to original state)
  //   updatedRepairDetails = updatedRepairDetails.map((item) => {
  //     const taxPercent = parseFloat(item.tax_percent) || 1;
  //     const pieceCost = parseFloat(item.pieace_cost) || 0;
  //     const qty = parseFloat(item.qty) || 1;
  //     const discountAmt = parseFloat(item.disscount) || 0;
  //     const pricingType = item.pricing;
  //     const rateAmt = parseFloat(item.rate_amt) || 0;
  //     const stonePrice = parseFloat(item.stone_price) || 0;
  //     const makingCharges = parseFloat(item.making_charges) || 0;
  //     const hmCharges = parseFloat(item.hm_charges) || 0;

  //     if (pricingType === "By fixed") {
  //       const pieceTaxableAmt = pieceCost * qty;
  //       const originalPieceTaxableAmt = item.original_piece_taxable_amt
  //         ? parseFloat(item.original_piece_taxable_amt)
  //         : pieceTaxableAmt;
  //       const taxAmt = (taxPercent * originalPieceTaxableAmt) / 100;
  //       const totalPrice = originalPieceTaxableAmt + taxAmt;

  //       return {
  //         ...item,
  //         piece_taxable_amt: originalPieceTaxableAmt.toFixed(2),
  //         tax_amt: taxAmt.toFixed(2),
  //         total_price: totalPrice.toFixed(2),
  //         festival_discount: 0,
  //         festival_discount_percentage: 0,
  //         festival_discount_on_rate: 0,
  //       };
  //     } else {
  //       const originalTotalPrice = item.original_total_price
  //         ? parseFloat(item.original_total_price)
  //         : parseFloat(item.total_price);
  //       const totalBeforeTax =
  //         rateAmt + stonePrice + makingCharges + hmCharges - discountAmt;

  //       const taxAmt = (totalBeforeTax * taxPercent) / 100;
  //       const updatedTotalPrice = totalBeforeTax + taxAmt;

  //       return {
  //         ...item,
  //         total_price: updatedTotalPrice.toFixed(2),
  //         tax_amt: taxAmt.toFixed(2),
  //         festival_discount: 0,
  //         festival_discount_percentage: 0,
  //         festival_discount_on_rate: 0,
  //       };
  //     }
  //   });
  //   setManualNetAmount(0); // Reset manualNetAmount to exit manual mode
  //   setIsManualNetMode(false);

  //   // If already applied, just reset state and exit
  //   if (isAlreadyApplied) {
  //     setRepairDetails(updatedRepairDetails);
  //     localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedRepairDetails));
  //     setAppliedOffers({});
  //     setIsAnyOfferApplied(false);
  //     setManualNetAmount(0); // Reset manualNetAmount to exit manual mode
  //     setIsManualNetMode(false); // Ensure we're in normal discount mode
  //     return;
  //   }

  //   // Else apply the new offer
  //   const updatedWithNewOffer = updatedRepairDetails.map((item) => {
  //     const makingCharges = parseFloat(item.making_charges) || 0;
  //     const pieceCost = parseFloat(item.pieace_cost) || 0;
  //     const qty = parseFloat(item.qty) || 1;
  //     const taxPercent = parseFloat(item.tax_percent) || 1;
  //     const pieceTaxableAmt = parseFloat(item.piece_taxable_amt) || 0;
  //     const rateAmt = parseFloat(item.rate_amt) || 0;
  //     const stonePrice = parseFloat(item.stone_price) || 0;
  //     const discountAmt = parseFloat(item.disscount) || 0;
  //     const hmCharges = parseFloat(item.hm_charges) || 0;
  //     const pricingType = item.pricing;
  //     const grossWeight = parseFloat(item.gross_weight) || 0;

  //     const percentageDiscount = parseFloat(selectedOffer.discount_percentage) || 0;
  //     const rateDiscount = parseFloat(selectedOffer.discount_on_rate) || 0;
  //     const fixedPercentageDiscount = parseFloat(selectedOffer.discount_percent_fixed) || 0;
  //     const weightBasedDiscount = (rateDiscount / 10) * grossWeight;
  //     const totalDiscountValue =
  //       pricingType === "By fixed"
  //         ? fixedPercentageDiscount
  //         : percentageDiscount + weightBasedDiscount;

  //     let calculatedDiscount = 0;

  //     if (pricingType === "By fixed") {
  //       const pieceTaxableAmt = pieceCost * qty;
  //       const originalPieceTaxableAmt = item.original_piece_taxable_amt
  //         ? parseFloat(item.original_piece_taxable_amt)
  //         : pieceTaxableAmt;

  //       calculatedDiscount = (pieceTaxableAmt * totalDiscountValue) / 100;
  //       const updatedPieceTaxableAmt = originalPieceTaxableAmt - calculatedDiscount - discountAmt;
  //       const taxAmt = (taxPercent * updatedPieceTaxableAmt) / 100;
  //       const totalPrice = updatedPieceTaxableAmt + taxAmt;

  //       return {
  //         ...item,
  //         original_piece_taxable_amt: originalPieceTaxableAmt.toFixed(2),
  //         festival_discount: calculatedDiscount.toFixed(2),
  //         festival_discount_percentage: percentageDiscount.toFixed(2),
  //         festival_discount_on_rate: rateDiscount.toFixed(2),
  //         piece_taxable_amt: updatedPieceTaxableAmt.toFixed(2),
  //         tax_amt: taxAmt.toFixed(2),
  //         total_price: totalPrice.toFixed(2),
  //       };
  //     } else {
  //       calculatedDiscount =
  //         (makingCharges * percentageDiscount) / 100 +
  //         (rateDiscount / 10) * grossWeight;
  //       const totalBeforeTax =
  //         rateAmt + stonePrice + makingCharges + hmCharges - calculatedDiscount - discountAmt;

  //       const taxAmt = (totalBeforeTax * taxPercent) / 100;
  //       const updatedTotalPrice = totalBeforeTax + taxAmt;

  //       return {
  //         ...item,
  //         original_total_price: item.original_total_price
  //           ? item.original_total_price
  //           : parseFloat(item.total_price).toFixed(2),
  //         festival_discount: calculatedDiscount.toFixed(2),
  //         festival_discount_percentage: percentageDiscount.toFixed(2),
  //         festival_discount_on_rate: rateDiscount.toFixed(2),
  //         tax_amt: taxAmt.toFixed(2),
  //         total_price: updatedTotalPrice.toFixed(2),
  //       };
  //     }
  //   });

  //   setRepairDetails(updatedWithNewOffer);
  //   localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedWithNewOffer));

  //   // Set the only applied offer key
  //   setAppliedOffers({
  //     [currentOfferKey]: true,
  //   });
  //   setIsAnyOfferApplied(true);
  // };

  const handleApply = (selectedOffer, offerIndex) => {
    const storedRepairDetails = JSON.parse(localStorage.getItem(`repairDetails_${tabId}`)) || [];
    const currentOfferKey = `${selectedOffer._id}_${offerIndex}`;
  
    // Don't reset existing discounts - just apply to all items
    let updatedRepairDetails = [...storedRepairDetails];
  
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
      const grossWeight = parseFloat(item.gross_weight) || 0;
  
      const percentageDiscount = parseFloat(selectedOffer.discount_percentage) || 0;
      const rateDiscount = parseFloat(selectedOffer.discount_on_rate) || 0;
      const fixedPercentageDiscount = parseFloat(selectedOffer.discount_percent_fixed) || 0;
      const weightBasedDiscount = (rateDiscount / 10) * grossWeight;
      const totalDiscountValue =
        pricingType === "By fixed"
          ? fixedPercentageDiscount
          : percentageDiscount + weightBasedDiscount;
  
      if (pricingType === "By fixed") {
        const pieceTaxableAmt = pieceCost * qty;
        const originalPieceTaxableAmt = item.original_piece_taxable_amt
          ? parseFloat(item.original_piece_taxable_amt)
          : pieceTaxableAmt;
  
        const calculatedDiscount = (pieceTaxableAmt * totalDiscountValue) / 100;
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
        const calculatedDiscount =
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
  
    setRepairDetails(updatedRepairDetails);
    localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedRepairDetails));
  
    // Mark the offer as applied
    setAppliedOffers({
      [currentOfferKey]: true,
    });
    setIsAnyOfferApplied(true);
  };

  const [estimate, setEstimate] = useState([]);
  const [selectedEstimate, setSelectedEstimate] = useState("");
  const [estimateDetails, setEstimateDetails] = useState(null);
  const [stock, setStock] = useState(null);
  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-unique-estimates`);
        setEstimate(response.data);
      } catch (error) {
        console.error('Error fetching estimate details:', error);
      }
    };
    fetchEstimate();
  }, []);

  useEffect(() => {
    fetch(`${baseURL}/get/opening-tags-entry`) // Correct URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stock entries");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Stock Data:", data); // Log the entire response to see its structure
        setStock(data.result); // Use data.result since the backend sends { result: [...] }
        console.log("Updated Stock State:", data.result); // Log the updated state value
      })
      .catch((error) => {
        console.error("Error fetching stock entries:", error);
      });
  }, []);

  const fetchEstimateDetails = async (estimate_number) => {
    if (!estimate_number) return;

    try {
      const response = await axios.get(`${baseURL}/get-estimates/${estimate_number}`);

      // First, update the state with the full estimate details
      setEstimateDetails(response.data);

      if (!stock) {
        console.warn("Stock data not yet available!");
        return;
      }

      // Filter only matching repeatedData items
      const filteredData = response.data.repeatedData
        .filter(item =>
          stock.some(stockItem => stockItem.PCode_BarCode === item.code && stockItem.Status === "Available")
        )
        .map(item => ({
          ...item,
          invoice_number: formData.invoice_number, // Add invoice_number from formData
          transaction_status: "Sales", // Add transaction_status as "Sales"
          date: formData.date,
        }));

      if (filteredData.length > 0) {
        // Store filtered data in localStorage
        localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(filteredData));

        // Update state with filtered data
        setRepairDetails(filteredData);

        // Immediately retrieve and log stored data
        const storedData = JSON.parse(localStorage.getItem(`repairDetails_${tabId}`));
        console.log("Stored repairDetails:", storedData);
      } else {
        // Clear localStorage if no matching data
        localStorage.removeItem(`repairDetails_${tabId}`);
        setRepairDetails([]); // Clear state
        console.log("No matching data found. LocalStorage cleared.");
      }
    } catch (error) {
      console.error('Error fetching selected estimate details:', error);
    }
  };

  const handleEstimateChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedEstimate(selectedValue);

    if (selectedValue) {
      fetchEstimateDetails(selectedValue);
    } else {
      setEstimateDetails(null);
      localStorage.removeItem(`repairDetails_${tabId}`);
      setRepairDetails([]);
    }
  };

  // const handleAdd = () => {
  //   const storedRepairDetails = JSON.parse(localStorage.getItem(`repairDetails_${tabId}`)) || [];

  //   // Check if the code already exists
  //   // const isDuplicate = storedRepairDetails.some(
  //   //   (item) => item.code === formData.code
  //   // );

  //   // if (isDuplicate) {
  //   //   alert("The product is already selected.");
  //   //   return;
  //   // }

  //   // Add new repair detail
  //   const updatedRepairDetails = [
  //     ...repairDetails,
  //     {
  //       ...formData,
  //       pieace_cost:
  //         formData.pieace_cost && parseFloat(formData.pieace_cost) > 0
  //           ? parseFloat(formData.pieace_cost).toFixed(2)
  //           : null, // Set to null if not greater than 0
  //       rate:
  //         formData.rate && parseFloat(formData.rate) > 0
  //           ? parseFloat(formData.rate).toFixed(2)
  //           : "",
  //       imagePreview: formData.imagePreview,
  //     },
  //   ];

  //   setRepairDetails(updatedRepairDetails);

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     disscount: "",
  //     disscount_percentage: "",
  //     pieace_cost: "",
  //     imagePreview: null,
  //     sale_status: "Delivered",
  //     piece_taxable_amt: "",
  //     festival_discount: "",
  //   }));

  //   resetProductFields();

  //   // Save updated data to localStorage
  //   localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedRepairDetails));
  // };

  const handleAdd = () => {
    const storedRepairDetails = JSON.parse(localStorage.getItem(`repairDetails_${tabId}`)) || [];

    // Add new repair detail
    const updatedRepairDetails = [
      ...repairDetails,
      {
        ...formData,
        pieace_cost:
          formData.pieace_cost && parseFloat(formData.pieace_cost) > 0
            ? parseFloat(formData.pieace_cost).toFixed(2)
            : null,
        rate:
          formData.rate && parseFloat(formData.rate) > 0
            ? parseFloat(formData.rate).toFixed(2)
            : "",
        imagePreview: formData.imagePreview,
      },
    ];

    setRepairDetails(updatedRepairDetails);
    localStorage.setItem(`repairDetails_${tabId}`, JSON.stringify(updatedRepairDetails));

    // Reset form data
    setFormData((prevData) => ({
      ...prevData,
      disscount: "",
      disscount_percentage: "",
      pieace_cost: "",
      imagePreview: null,
      sale_status: "Delivered",
      piece_taxable_amt: "",
      festival_discount: "",
    }));

    resetProductFields();

    // Automatically apply the first available offer every time (regardless of isAnyOfferApplied)
    // if (offers.length > 0) {
    //   handleApply(offers[0], 0); // Apply the first offer
    // }
  };
  
  const handleEdit = (index) => {
    setEditIndex(index);

    const item = repairDetails[index];
    const pieceCost = parseFloat(item.pieace_cost) || 0;
    const qty = parseFloat(item.qty) || 1;
    const pieceTaxableAmt = parseFloat(item.piece_taxable_amt).toFixed(2);

    setFormData((prevFormData) => ({
      ...prevFormData,
      ...item,
      pieace_cost: pieceCost > 0 ? pieceCost.toFixed(2) : "",
      rate: item.rate && parseFloat(item.rate) > 0
        ? parseFloat(item.rate).toFixed(2)
        : "",
      piece_taxable_amt: pieceTaxableAmt,
    }));
  };


  const handleUpdate = () => {
    const updatedDetails = repairDetails.map((item, index) =>
      index === editIndex ? { ...formData } : item
    );
    setRepairDetails(updatedDetails);
    setEditIndex(null);
    resetProductFields();
  };

  const handleDelete = (indexToDelete) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setRepairDetails(repairDetails.filter((_, index) => index !== indexToDelete));
      alert("Product deleted successfully");
    }
  };

  const resetProductFields = () => {
    setFormData(prev => ({
      ...prev,
      code: "",
      product_id: "",
      metal: "",
      product_name: "",
      metal_type: "",
      design_name: "",
      purity: "",
      selling_purity: "",
      printing_purity: "",
      category: "",
      sub_category: "",
      gross_weight: "",
      stone_weight: "",
      weight_bw: "",
      stone_price: "",
      va_on: "Gross Weight",
      va_percent: "",
      wastage_weight: "",
      total_weight_av: "",
      mc_on: "MC %",
      mc_per_gram: "",
      making_charges: "",
      disscount_percentage: "",
      disscount: "",
      rate: "",
      rate_amt: "",
      pricing: "By Weight",
      tax_percent: "",
      tax_amt: "",
      hm_charges: "60.00",
      total_price: "",
      qty: "",
      imagePreview: null,
      remarks: "",
      sale_status: "Delivered",
      piece_taxable_amt: "",
      festival_discount: "",
    }));
  };

  // Calculate totalPrice (sum of total_price from all repairDetails)
  const totalPrice = repairDetails.reduce((sum, item) => sum + parseFloat(item.total_price || 0), 0);

  const [oldTableData, setOldTableData] = useState(() => {
    const savedData = localStorage.getItem(`oldTableData_${tabId}`);
    return savedData ? JSON.parse(savedData) : [];
  });

  const [schemeTableData, setSchemeTableData] = useState(() => {
    const savedData = localStorage.getItem('schemeTableData');
    return savedData ? JSON.parse(savedData) : [];
  });

  const resetForm = () => {
    setFormData({
      customer_id: "",
      mobile: "",
      account_name: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      pincode: "",
      state: "",
      state_code: "",
      aadhar_card: "",
      gst_in: "",
      pan_card: "",
      date: "",
      invoice_number: "",
    });
    setPaymentDetails({
      cash_amount: 0,
      card_amt: 0,
      chq: "",
      chq_amt: 0,
      online: "",
      online_amt: 0,
    });
  };

  const resetSaleReturnForm = () => {
    setReturnData({
      invoice_number: "",
    });
  }

  const handleBack = () => {
    navigate("/salestable");
  };

  const handleAddCustomer = () => {
    navigate("/customermaster", { state: { from: `/sales?tabId=${tabId}` } });
  };

  // let totalAmount = 0;
  // let discountAmt = 0;
  // let festivalDiscountAmt = 0;
  // let taxableAmount = 0;
  // let taxAmount = 0;
  // let netAmount = 0;

  // repairDetails.forEach((item) => {
  //   const pricing = item.pricing;

  //   // Parse common discounts
  //   const itemDiscount = parseFloat(item.disscount) || 0;
  //   const itemFestivalDiscount = parseFloat(item.festival_discount) || 0;
  //   const itemTax = parseFloat(item.tax_amt) || 0;
  //   const itemTaxPercent = parseFloat(item.tax_percent) || 0;

  //   if (pricing === "By Weight") {
  //     const stonePrice = parseFloat(item.stone_price) || 0;
  //     const makingCharges = parseFloat(item.making_charges) || 0;
  //     const rateAmt = parseFloat(item.rate_amt) || 0;
  //     const hmCharges = parseFloat(item.hm_charges) || 0;

  //     const itemTotal = stonePrice + makingCharges + rateAmt + hmCharges;
  //     totalAmount += itemTotal;

  //     discountAmt += itemDiscount;
  //     festivalDiscountAmt += itemFestivalDiscount;

  //     const totalDiscount = itemDiscount + itemFestivalDiscount;
  //     const itemTaxable = itemTotal - totalDiscount;
  //     const taxAmt = (itemTaxable * itemTaxPercent) / 100;
  //     taxableAmount += itemTaxable;
  //     taxAmount += taxAmt;
  //     netAmount += itemTaxable + itemTax;

  //   } else {
  //     const pieceCost = parseFloat(item.pieace_cost) || 0;
  //     const qty = parseFloat(item.qty) || 0;

  //     const itemTotal = pieceCost * qty;
  //     totalAmount += itemTotal;
  //     discountAmt += itemDiscount;
  //     festivalDiscountAmt += itemFestivalDiscount;

  //     const totalDiscount = itemDiscount + itemFestivalDiscount;
  //     const itemTaxable = itemTotal - totalDiscount;

  //     taxableAmount += itemTaxable;
  //     taxAmount += itemTax;
  //     netAmount += itemTaxable + itemTax;
  //   }
  // });

  const [manualNetAmount, setManualNetAmount] = useState(0);
  const [manualNetPayAmount, setManualNetPayAmount] = useState(0);

  const oldItemsAmount = location.state?.old_exchange_amt
    ? parseFloat(location.state.old_exchange_amt)
    : oldSalesData.reduce((sum, item) => sum + parseFloat(item.total_amount || 0), 0);

  const schemeAmount = location.state?.scheme_amt
    ? parseFloat(location.state.scheme_amt)
    : schemeSalesData.reduce((sum, item) => sum + parseFloat(item.paid_amount || 0), 0);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleCheckboxChange = (event, index) => {
    if (!invoiceDetails.length) return;

    const isChecked = event.target.checked;
    let updatedSelectedRows = isChecked
      ? [...selectedRows, index]
      : selectedRows.filter((i) => i !== index);

    setSelectedRows(updatedSelectedRows);
    setIsAllSelected(updatedSelectedRows.length === invoiceDetails.length);
  };

  const handleSelectAllChange = (event) => {
    if (!invoiceDetails.length) return;

    const isChecked = event.target.checked;
    setSelectedRows(isChecked ? invoiceDetails.map((_, index) => index) : []);
    setIsAllSelected(isChecked);
  };

  const handleCheckout = async () => {
    if (!invoiceDetails.length || !selectedRows.length) {
      // alert("No invoices selected for sale return.");
      return;
    }

    try {
      const selectedInvoices = selectedRows.map((rowIndex) => invoiceDetails[rowIndex]);

      const repairDetailsUpdates = selectedInvoices.map((invoice) => ({
        id: invoice.id,
        status: "Sale Returned",
      }));

      const openTagsUpdates = selectedInvoices.map((invoice) => ({
        PCode_BarCode: invoice.code,
        Status: "Sale Returned",
      }));

      const productUpdates = selectedInvoices.map((invoice) => ({
        product_id: invoice.product_id,
        qty: invoice.qty,
        gross_weight: invoice.gross_weight,
      }));

      const codesForAvailableEntries = selectedInvoices.map((invoice) => invoice.code);

      // Execute all API calls in parallel
      const responses = await Promise.allSettled([
        axios.post(`${baseURL}/updateRepairDetails`, { updates: repairDetailsUpdates }),
        axios.post(`${baseURL}/updateOpenTags`, { updates: openTagsUpdates }),
        axios.post(`${baseURL}/updateProduct`, { updates: productUpdates }),
        axios.post(`${baseURL}/addAvailableEntry`, { codes: codesForAvailableEntries }),
      ]);

      // Check if any API failed
      const failedRequests = responses.filter(res => res.status === "rejected");
      if (failedRequests.length > 0) {
        console.error("Some API calls failed:", failedRequests);
        alert("Some updates failed. Please check console for details.");
      } else {
        alert("Sale Return added Successfully!");
      }

    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  const salesTaxableAmount = selectedRows.reduce((sum, rowIndex) => {
    const detail = invoiceDetails[rowIndex];
    const stonePrice = parseFloat(detail.stone_price) || 0;
    const makingCharges = parseFloat(detail.making_charges) || 0;
    const rateAmt = parseFloat(detail.rate_amt) || 0;
    const itemDiscount = parseFloat(detail.disscount) || 0;
    const itemFestivalDiscount = parseFloat(detail.festival_discount) || 0;
    return sum + stonePrice + makingCharges + rateAmt - itemDiscount - itemFestivalDiscount;
  }, 0);

  const salesTaxAmount = selectedRows.reduce((sum, rowIndex) => {
    const detail = invoiceDetails[rowIndex];
    return sum + parseFloat(detail.tax_amt || 0);
  }, 0);

  const salesNetAmount = salesTaxableAmount + salesTaxAmount;

  const isSameMonth = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };

  const allSelectedRowsAreThisMonth = selectedRows.every(rowIndex =>
    isSameMonth(invoiceDetails[rowIndex]?.date)
  );

  const salesAmountToPass = allSelectedRowsAreThisMonth ? salesNetAmount : salesTaxableAmount;

  let totalAmount = 0;
  let discountAmt = 0;
  let festivalDiscountAmt = 0;
  let taxableAmount = 0;
  let taxAmount = 0;
  let netAmount = 0;
  let discountPercent = 0;
  let totalMakingCharges = 0;
  let totalPieceCost = 0;
  let hasWeightBasedItems = false;

  if (isManualNetMode && typeof manualNetAmount !== "undefined" && manualNetAmount > 0) {
    // Step 1: Compute totalAmount, makingCharges, pieceCost
    repairDetails.forEach((item) => {
      const pricing = item.pricing;

      if (pricing === "By Weight") {
        const stonePrice = parseFloat(item.stone_price) || 0;
        const makingCharges = parseFloat(item.making_charges) || 0;
        const rateAmt = parseFloat(item.rate_amt) || 0;
        const hmCharges = parseFloat(item.hm_charges) || 0;
        totalAmount += stonePrice + makingCharges + rateAmt + hmCharges;
        totalMakingCharges += makingCharges;
        hasWeightBasedItems = true;
      } else {
        const pieceCost = parseFloat(item.pieace_cost) || 0;
        const qty = parseFloat(item.qty) || 0;
        const itemTotal = pieceCost * qty;
        totalAmount += itemTotal;
        totalPieceCost += itemTotal;
      }
    });

    // Step 2: Reverse tax and discount calculation from netAmount
    let cumulativeTaxable = 0;
    let cumulativeTax = 0;
    let totalFestivalDiscount = 0;

    repairDetails.forEach((item) => {
      const pricing = item.pricing;
      const itemTaxPercent = parseFloat(item.tax_percent) || 0;
      const itemFestivalDiscount = parseFloat(item.festival_discount) || 0;
      totalFestivalDiscount += itemFestivalDiscount;

      let itemTotal = 0;
      if (pricing === "By Weight") {
        const stonePrice = parseFloat(item.stone_price) || 0;
        const makingCharges = parseFloat(item.making_charges) || 0;
        const rateAmt = parseFloat(item.rate_amt) || 0;
        const hmCharges = parseFloat(item.hm_charges) || 0;
        itemTotal = stonePrice + makingCharges + rateAmt + hmCharges;
      } else {
        const pieceCost = parseFloat(item.pieace_cost) || 0;
        const qty = parseFloat(item.qty) || 0;
        itemTotal = pieceCost * qty;
      }

      const itemShare = itemTotal / totalAmount;
      const itemNet = manualNetAmount * itemShare;
      const itemTaxable = itemNet / (1 + itemTaxPercent / 100);
      const itemTax = itemNet - itemTaxable;

      cumulativeTaxable += itemTaxable;
      cumulativeTax += itemTax;
    });

    taxableAmount = cumulativeTaxable;
    taxAmount = cumulativeTax;
    netAmount = manualNetAmount;
    festivalDiscountAmt = totalFestivalDiscount;

    discountAmt = totalAmount - taxableAmount - totalFestivalDiscount;

    const discountBase = totalMakingCharges + totalPieceCost;
    discountPercent = discountBase ? (discountAmt * 100) / discountBase : 0;


    const roundedDiscount = parseFloat(discountPercent.toFixed(2));

    if (roundedDiscount !== discount) {
      setDiscount(roundedDiscount);
      localStorage.setItem(`discount_${tabId}`, roundedDiscount.toString());
      applyDiscountToRepairDetails(roundedDiscount);
    }

  } else {
    // FORWARD CALCULATION
    repairDetails.forEach((item) => {
      const pricing = item.pricing;
      const itemDiscount = parseFloat(item.disscount) || 0;
      const itemFestivalDiscount = parseFloat(item.festival_discount) || 0;
      const itemTaxPercent = parseFloat(item.tax_percent) || 0;

      let itemTotal = 0;
      if (pricing === "By Weight") {
        const stonePrice = parseFloat(item.stone_price) || 0;
        const makingCharges = parseFloat(item.making_charges) || 0;
        const rateAmt = parseFloat(item.rate_amt) || 0;
        const hmCharges = parseFloat(item.hm_charges) || 0;

        itemTotal = stonePrice + makingCharges + rateAmt + hmCharges;
        totalAmount += itemTotal;
        totalMakingCharges += makingCharges;
        hasWeightBasedItems = true;
      } else {
        const pieceCost = parseFloat(item.pieace_cost) || 0;
        const qty = parseFloat(item.qty) || 0;

        itemTotal = pieceCost * qty;
        totalAmount += itemTotal;
        totalPieceCost += itemTotal;
      }

      const totalDiscount = itemDiscount + itemFestivalDiscount;
      const itemTaxable = itemTotal - totalDiscount;
      const taxAmt = (itemTaxable * itemTaxPercent) / 100;

      discountAmt += itemDiscount;
      festivalDiscountAmt += itemFestivalDiscount;

      taxableAmount += itemTaxable;
      taxAmount += taxAmt;
      netAmount += itemTaxable + taxAmt;
    });

    const discountBase = totalMakingCharges + totalPieceCost;
    discountPercent = discountBase ? (discountAmt * 100) / discountBase : 0;

  }

  const handleManualNetAmountChange = (value) => {
    setManualNetAmount(value);
    setIsManualNetMode(true); // Enter manual net amount mode
  };



  const handleManualNetPayAmountChange = (value) => {
    setManualNetPayAmount(value);
    setIsManualNetMode(true);

    // Calculate total amount without any discounts
    let totalAmountWithoutDiscounts = 0;
    let totalMakingCharges = 0;
    let totalPieceCost = 0;

    repairDetails.forEach((item) => {
      const pricing = item.pricing;
      const itemFestivalDiscount = parseFloat(item.festival_discount) || 0;

      if (pricing === "By Weight") {
        const stonePrice = parseFloat(item.stone_price) || 0;
        const makingCharges = parseFloat(item.making_charges) || 0;
        const rateAmt = parseFloat(item.rate_amt) || 0;
        const hmCharges = parseFloat(item.hm_charges) || 0;
        totalAmountWithoutDiscounts += stonePrice + makingCharges + rateAmt + hmCharges;
        totalMakingCharges += makingCharges;
      } else {
        const pieceCost = parseFloat(item.pieace_cost) || 0;
        const qty = parseFloat(item.qty) || 0;
        const itemTotal = pieceCost * qty;
        totalAmountWithoutDiscounts += itemTotal;
        totalPieceCost += itemTotal;
      }
    });

    // Calculate what the netAmount should be to achieve this netPayAmount
    const calculatedNetAmount = value + schemeAmount + oldItemsAmount + salesNetAmount;

    // Calculate the required taxable amount after preserving festival discount
    let totalTaxableAmount = 0;
    let totalTaxAmount = 0;

    repairDetails.forEach((item) => {
      const pricing = item.pricing;
      const itemTaxPercent = parseFloat(item.tax_percent) || 0;
      const itemFestivalDiscount = parseFloat(item.festival_discount) || 0;

      let itemTotal = 0;
      if (pricing === "By Weight") {
        const stonePrice = parseFloat(item.stone_price) || 0;
        const makingCharges = parseFloat(item.making_charges) || 0;
        const rateAmt = parseFloat(item.rate_amt) || 0;
        const hmCharges = parseFloat(item.hm_charges) || 0;
        itemTotal = stonePrice + makingCharges + rateAmt + hmCharges;
      } else {
        const pieceCost = parseFloat(item.pieace_cost) || 0;
        const qty = parseFloat(item.qty) || 0;
        itemTotal = pieceCost * qty;
      }

      // Calculate item's share of the total amount
      const itemShare = itemTotal / totalAmountWithoutDiscounts;

      // Calculate item's net amount based on the calculatedNetAmount
      const itemNet = calculatedNetAmount * itemShare;

      // Calculate taxable amount after subtracting festival discount
      const itemTaxableBeforeFestival = itemNet / (1 + itemTaxPercent / 100);
      const itemTaxable = Math.max(0, itemTaxableBeforeFestival - itemFestivalDiscount);
      const itemTax = itemTaxable * (itemTaxPercent / 100);

      totalTaxableAmount += itemTaxable;
      totalTaxAmount += itemTax;
    });

    // Now calculate the required discount amount (excluding festival discount)
    const totalAfterFestivalDiscount = totalAmountWithoutDiscounts - festivalDiscountAmt;
    const requiredDiscountAmount = totalAfterFestivalDiscount - totalTaxableAmount;

    // Calculate discount percentage based on making charges and piece cost only
    const discountBase = totalMakingCharges + totalPieceCost;
    const discountPercent = discountBase ? (requiredDiscountAmount * 100) / discountBase : 0;

    const roundedDiscount = parseFloat(discountPercent.toFixed(2));

    if (roundedDiscount !== discount) {
      setDiscount(roundedDiscount);
      localStorage.setItem(`discount_${tabId}`, roundedDiscount.toString());
      applyDiscountToRepairDetails(roundedDiscount, true); // Pass true to preserve festival discount
    }

    setManualNetAmount(calculatedNetAmount);
  };

  // Update the payableAmount calculation
  const payableAmount = isManualNetMode
    ? manualNetPayAmount
    : netAmount - (schemeAmount + oldItemsAmount + salesNetAmount);

  const netPayableAmount = payableAmount;
  const updatedOldItemsAmount = oldItemsAmount + salesNetAmount;
  const netPayAmount = netPayableAmount






  const [paymentDetails, setPaymentDetails] = useState({
    cash_amount: "", // Fix to two decimal places
    card_amt: "",
    chq_amt: "",
    online_amt: "",
  });


  // Save payment details to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`paymentDetails_${tabId}`, JSON.stringify(paymentDetails));
  }, [paymentDetails]);

  useEffect(() => {
    // Retrieve payment details from localStorage on component mount
    const storedPaymentDetails = localStorage.getItem(`paymentDetails_${tabId}`);
    if (storedPaymentDetails) {
      setPaymentDetails(JSON.parse(storedPaymentDetails));
    }
  }, []);

  const clearData = () => {
    setOldSalesData([]);
    setSchemeSalesData([]);
    setRepairDetails([]);
    setPaymentDetails({
      cash_amount: 0,
      card_amt: 0,
      chq: "",
      chq_amt: 0,
      online: "",
      online_amt: 0,
    });
    setOldTableData([]); // Clear the oldTableData state
    setSchemeTableData([])
    setDiscount(0);
    localStorage.removeItem('oldSalesData');
    localStorage.removeItem('schemeSalesData');
    localStorage.removeItem(`repairDetails_${tabId}`);
    localStorage.removeItem(`paymentDetails_${tabId}`);
    localStorage.removeItem(`oldTableData_${tabId}`);
    localStorage.removeItem('schemeTableData');
    localStorage.removeItem(`discount_${tabId}`);
    localStorage.removeItem(`saleFormData_${tabId}`);
    console.log("Data cleared successfully");
  };

  const handleSave = async () => {
    if (!formData.account_name || !formData.mobile) {
      alert("Please select the Customer or enter the Customer Mobile Number");
      return;
    }

    try {
      // Fetch tags first (or ensure they're already loaded in `data`)
      const tagResponse = await fetch(`${baseURL}/get/opening-tags-entry`);
      const tagResult = await tagResponse.json();
      const tagData = tagResult.result || [];

      // Check if any item in repairDetails is already sold
      const soldItem = repairDetails.find((item) => {
        const matchedTag = tagData.find(
          (data) => data.PCode_BarCode === item.code && data.Status === "Sold"
        );
        return matchedTag !== undefined;
      });

      // if (soldItem) {
      //   alert(`Item with code "${soldItem.code}" is already sold out.`);
      //   return;
      // }

      // Check if all items are new
      const allItemsAreNew = repairDetails.every(item => item.id === "");

      let updatedFormData = { ...formData };

      if (allItemsAreNew) {
        const response = await axios.get(`${baseURL}/lastInvoiceNumber`);
        const latestInvoiceNumber = response.data.lastInvoiceNumber;

        updatedFormData = {
          ...formData,
          invoice_number: latestInvoiceNumber,
        };

        setFormData(updatedFormData);
      }

      const dataToSave = {
        repairDetails: repairDetails.map(item => ({
          ...item,
          invoice_number: updatedFormData.invoice_number,
          customer_id: updatedFormData.customer_id,
          mobile: updatedFormData.mobile,
          account_name: updatedFormData.account_name,
          email: updatedFormData.email,
          address1: updatedFormData.address1,
          address2: updatedFormData.address2,
          city: updatedFormData.city,
          pincode: updatedFormData.pincode,
          state: updatedFormData.state,
          state_code: updatedFormData.state_code,
          aadhar_card: updatedFormData.aadhar_card,
          gst_in: updatedFormData.gst_in,
          pan_card: updatedFormData.pan_card,
          terms: updatedFormData.terms,
          cash_amount: paymentDetails.cash_amount || 0,
          card_amt: paymentDetails.card_amt || 0,
          chq_amt: paymentDetails.chq_amt || 0,
          online_amt: paymentDetails.online_amt || 0,
        })),
        oldItems: oldSalesData,
        memberSchemes: schemeSalesData,
        oldItemsAmount: oldItemsAmount || 0,
        schemeAmount: schemeAmount || 0,
        salesNetAmount: salesNetAmount || 0,
        salesTaxableAmount: salesTaxableAmount || 0,
      };

      console.log("Payload to be sent:", JSON.stringify(dataToSave, null, 2));

      await axios.post(`${baseURL}/save-repair-details`, dataToSave);
      alert("Sales added successfully");

      const pdfDoc = (
        <PDFLayout
          formData={updatedFormData}
          repairDetails={repairDetails}
          cash_amount={paymentDetails.cash_amount || 0}
          card_amt={paymentDetails.card_amt || 0}
          chq_amt={paymentDetails.chq_amt || 0}
          online_amt={paymentDetails.online_amt || 0}
          taxableAmount={taxableAmount}
          taxAmount={taxAmount}
          discountAmt={discountAmt}
          festivalDiscountAmt={festivalDiscountAmt}
          oldItemsAmount={oldItemsAmount}
          schemeAmount={schemeAmount}
          salesNetAmount={salesNetAmount}
          salesTaxableAmount={salesTaxableAmount}
          netAmount={netAmount}
          netPayableAmount={netPayableAmount}
        />
      );

      const pdfBlob = await pdf(pdfDoc).toBlob();
      saveAs(pdfBlob, `${updatedFormData.invoice_number}.pdf`);
      await handleSavePDFToServer(pdfBlob, updatedFormData.invoice_number);

      clearData();
      resetForm();
      navigate("/salestable");
      window.location.reload();
      await handleCheckout();

    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };


  const handleSavePDFToServer = async (pdfBlob, invoiceNumber) => {
    const formData = new FormData();
    formData.append("invoice", pdfBlob, `${invoiceNumber}.pdf`);

    try {
      const response = await fetch(`${baseURL}/upload-invoice`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload invoice");
      }

      console.log(`Invoice ${invoiceNumber} saved on server`);
    } catch (error) {
      console.error("Error uploading invoice:", error);
    }
  };


  // const handleSave = async () => { 
  //   if (!formData.account_name || !formData.mobile) {
  //     alert("Please select the Customer or enter the Customer Mobile Number");
  //     return;
  //   }
  //   const dataToSave = {
  //     repairDetails: repairDetails.map(item => ({
  //       ...item,
  //       customer_id: formData.customer_id,
  //       mobile: formData.mobile,
  //       account_name: formData.account_name,
  //       email: formData.email,
  //       address1: formData.address1,
  //       address2: formData.address2,
  //       city: formData.city,
  //       pincode: formData.pincode,
  //       state: formData.state,
  //       state_code: formData.state_code,
  //       aadhar_card: formData.aadhar_card,
  //       gst_in: formData.gst_in,
  //       pan_card: formData.pan_card,
  //       terms: formData.terms,
  //       cash_amount: paymentDetails.cash_amount || 0,
  //       card_amt: paymentDetails.card_amt || 0,
  //       chq_amt: paymentDetails.chq_amt || 0,
  //       online_amt: paymentDetails.online_amt || 0,
  //     })),
  //     oldItems: oldSalesData,
  //     memberSchemes: schemeSalesData,
  //     oldItemsAmount: oldItemsAmount || 0, // Explicitly include value
  //     schemeAmount: schemeAmount || 0,    // Explicitly include value
  //     salesNetAmount: salesAmountToPass || 0,
  //   };

  //   console.log("Payload to be sent:", JSON.stringify(dataToSave, null, 2));

  //   console.log("Saving data:", dataToSave);

  //   try {
  //     await axios.post(`${baseURL}/save-repair-details`, dataToSave);
  //     alert("Sales added successfully");

  //     // Generate PDF Blob
  //     const pdfDoc = (
  //       <PDFLayout
  //         formData={formData}
  //         repairDetails={repairDetails}
  //         cash_amount={paymentDetails.cash_amount || 0}
  //         card_amt={paymentDetails.card_amt || 0}
  //         chq_amt={paymentDetails.chq_amt || 0}
  //         online_amt={paymentDetails.online_amt || 0}
  //         taxableAmount={taxableAmount}
  //         taxAmount={taxAmount}
  //         discountAmt={discountAmt}
  //         oldItemsAmount={oldItemsAmount}
  //         schemeAmount={schemeAmount}
  //         salesNetAmount={salesAmountToPass}
  //         netAmount={netAmount}
  //         netPayableAmount={netPayableAmount}
  //       />
  //     );

  //     const pdfBlob = await pdf(pdfDoc).toBlob();

  //     // Create a download link and trigger it
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(pdfBlob);
  //     link.download = `invoice-${formData.invoice_number}.pdf`;
  //     link.click();

  //     // Clean up
  //     URL.revokeObjectURL(link.href);

  //     // Clear all data after saving
  //     clearData();

  //     // Reset the form and reload the page if necessary
  //     resetForm();
  //     navigate("/salestable");
  //     window.location.reload();
  //     await handleCheckout();
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //     alert("Error saving data");
  //   }
  // };

  const refreshSalesData = () => {
    setOldSalesData([]);
    setSchemeSalesData([]);
    setRepairDetails([]);
    setPaymentDetails({
      cash_amount: 0,
      card_amt: 0,
      chq: "",
      chq_amt: 0,
      online: "",
      online_amt: 0,
    });
    setOldTableData([]); // Clear the oldTableData state
    setSchemeTableData([])
    setDiscount(0);
    localStorage.removeItem('oldSalesData');
    localStorage.removeItem('schemeSalesData');
    localStorage.removeItem(`repairDetails_${tabId}`);
    localStorage.removeItem(`paymentDetails_${tabId}`);
    localStorage.removeItem(`oldTableData_${tabId}`);
    localStorage.removeItem('schemeTableData');
    localStorage.removeItem(`discount_${tabId}`);
    console.log("Data cleared successfully");
    window.location.reload();
  };

  const mobileRef = useRef(null); // Reference to Mobile input field in CustomerDetails

  useEffect(() => {
    if (formData.code) {
      mobileRef.current?.focus(); // Move focus to Mobile when BarCode is entered
    }
  }, [formData.code]);

    // Apply calculations
    // useCalculations(formData, setFormData, offers,  isManualTotalPriceChange,
    //   setIsManualTotalPriceChange, isTotalPriceCleared);

  return (
    <div className="main-container">
      <Container className="sales-form-container">
        <Form>
          {/* <h3 style={{ marginTop: '-45px', marginBottom: '10px', textAlign: 'left', color: '#a36e29' }}>
            Sales
          </h3> */}
          <div className="sales-form" style={{ marginTop: '-40px' }}>
            <div className="sales-form-left">
              <CustomerDetails
                formData={formData}
                setFormData={setFormData}
                handleCustomerChange={handleCustomerChange}
                handleAddCustomer={handleAddCustomer}
                customers={customers}
                setSelectedMobile={setSelectedMobile} // Pass the setSelectedMobile function here
                mobileRef={mobileRef}
                tabId={tabId}
              />

            </div>
            <div className="sales-form-right">
              <InvoiceDetails
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
          <div className="sales-form-section" style={{ marginTop: '-20px', marginBottom: "5px" }}>
            <ProductDetails
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              handleBarcodeChange={handleBarcodeChange}
              handleProductChange={handleProductChange}
              handleProductNameChange={handleProductNameChange}
              handleMetalTypeChange={handleMetalTypeChange}
              handleDesignNameChange={handleDesignNameChange}
              handleAdd={handleAdd}
              products={products}
              data={data}
              uniqueProducts={uniqueProducts}
              categoryOptions={categoryOptions}
              subcategoryOptions={subcategoryOptions}
              purityOptions={purityOptions}
              designOptions={designOptions}
              metaltypeOptions={metaltypeOptions}
              filteredMetalTypes={filteredMetalTypes}
              filteredPurityOptions={filteredPurityOptions}
              filteredDesignOptions={filteredDesignOptions}
              isBarcodeSelected={isBarcodeSelected}
              isQtyEditable={isQtyEditable}
              handleUpdate={handleUpdate}
              isEditing={editIndex !== null}
              handleImageChange={handleImageChange}
              image={image}
              fileInputRef={fileInputRef}
              clearImage={clearImage}
              captureImage={captureImage}
              setShowWebcam={setShowWebcam}
              showWebcam={showWebcam}
              webcamRef={webcamRef}
              setShowOptions={setShowOptions}
              showOptions={showOptions}
              estimate={estimate}
              selectedEstimate={selectedEstimate}
              handleEstimateChange={handleEstimateChange}
              refreshSalesData={refreshSalesData}
              fetchCategory={fetchCategory}
              fetchSubCategory={fetchSubCategory}
              taxableAmount={taxableAmount}
              tabId={tabId}
              offers={offers}
              isTotalPriceCleared={isTotalPriceCleared}
              setIsTotalPriceCleared={setIsTotalPriceCleared}
              isManualTotalPriceChange={isManualTotalPriceChange} 
              setIsManualTotalPriceChange={setIsManualTotalPriceChange}
              manualTotalPriceRef={manualTotalPriceRef}
            />
          </div>

          <div className="sales-form-section">
            <ProductTable repairDetails={repairDetails} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
          <div className="sales-form2">
            <div className="sales-form-third">
              <SalesFormSection metal={metal}
                setMetal={setMetal}
                setOldSalesData={setOldSalesData}
                oldTableData={oldTableData}
                setOldTableData={setOldTableData}
                setSchemeSalesData={setSchemeSalesData}
                schemeTableData={schemeTableData}
                setSchemeTableData={setSchemeTableData}
                filteredInvoices={filteredInvoices}
                setFilteredInvoices={setFilteredInvoices}
                uniqueInvoice={uniqueInvoice}
                setUniqueInvoice={setUniqueInvoice}
                invoiceDetails={invoiceDetails}
                setInvoiceDetails={setInvoiceDetails}
                handleInvoiceChange={handleInvoiceChange}
                returnData={returnData}
                setReturnData={setReturnData}
                selectedMobile={formData.mobile}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                isAllSelected={isAllSelected}
                setIsAllSelected={setIsAllSelected}
                handleCheckboxChange={handleCheckboxChange}
                handleSelectAllChange={handleSelectAllChange}
                salesTaxableAmount={salesTaxableAmount}
                salesTaxAmount={salesTaxAmount}
                salesNetAmount={salesNetAmount}
                repairDetails={repairDetails}
                resetSaleReturnForm={resetSaleReturnForm}
                handleCheckout={handleCheckout}
                tabId={tabId}
              />
            </div>
            <div className="sales-form-fourth">
              <PaymentDetails
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
                handleSave={handleSave}
                handleBack={handleBack}
                totalPrice={totalPrice}
                repairDetails={repairDetails}
                setRepairDetails={setRepairDetails}
                taxableAmount={taxableAmount}
                discountAmt={discountAmt}
                totalAmount={totalAmount}
                taxAmount={taxAmount}
                netAmount={netAmount}
                oldItemsAmount={oldItemsAmount}
                schemeAmount={schemeAmount}
                netPayableAmount={netPayableAmount}
                salesNetAmount={salesNetAmount}
                salesAmountToPass={salesAmountToPass}
                salesTaxableAmount={salesTaxableAmount}
                updatedOldItemsAmount={updatedOldItemsAmount}
                netPayAmount={netPayAmount}
                oldSalesData={oldSalesData} schemeSalesData={schemeSalesData}
                discount={discount}
                handleDiscountChange={handleDiscountChange}
                refreshSalesData={refreshSalesData}
                setOffers={setOffers}
                offers={offers}
                loading={loading}
                festivalShowModal={festivalShowModal}
                // handleApply={handleApply}
                handleFestivalShowModal={handleFestivalShowModal}
                handleFestivalCloseModal={handleFestivalCloseModal}
                appliedOffers={appliedOffers}
                setAppliedOffers={setAppliedOffers}
                festivalDiscountAmt={festivalDiscountAmt}
                tabId={tabId}
                manualNetAmount={manualNetAmount}
                setManualNetAmount={setManualNetAmount}
                handleManualNetAmountChange={handleManualNetAmountChange}
                isManualNetMode={isManualNetMode}
                setIsManualNetMode={setIsManualNetMode}
                handleManualNetPayAmountChange={handleManualNetPayAmountChange}
                manualNetPayAmount={manualNetPayAmount}
                handleApply={handleApply}
                isAnyOfferApplied={isAnyOfferApplied}
              />
            </div>
          </div>
          {showPDFDownload && (
            <PDFDownloadLink
              document={
                <PDFLayout
                  formData={formData}
                  repairDetails={repairDetails}
                  paymentDetails={paymentDetails}
                />
              }
              fileName={`invoice-${formData.invoice_number}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generating PDF..." : "Download Invoice PDF"
              }
            </PDFDownloadLink>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default SalesForm;
