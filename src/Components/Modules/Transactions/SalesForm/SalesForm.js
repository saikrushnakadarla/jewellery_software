import React, { useState, useEffect } from 'react';
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

  const [repairDetails, setRepairDetails] = useState(
    JSON.parse(localStorage.getItem('repairDetails')) || []
  );
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
  } = useProductHandlers();


  // Apply calculations
  useCalculations(formData, setFormData);


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
  useEffect(() => {
    localStorage.setItem('repairDetails', JSON.stringify(repairDetails));
  }, [repairDetails]);

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
      }));
      setSelectedMobile(customer.mobile || ""); // Update selectedMobile
      const filtered = uniqueInvoice.filter(
        (invoice) =>
          invoice.customer_name === customer.account_name || invoice.mobile === customer.mobile
      );
      setFilteredInvoices(filtered);
      // console.log("FilteredInvoices=",filtered)
    } else {
      setFormData({
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
      });
      setSelectedMobile(""); // Reset selectedMobile
      setFilteredInvoices(uniqueInvoice);
    }
  };

  const [editIndex, setEditIndex] = useState(null);
  const [discount, setDiscount] = useState(() => {
    return parseFloat(localStorage.getItem("discount")) || 0; // Load discount from localStorage
  });

  useEffect(() => {
    localStorage.setItem("discount", discount); // Save to localStorage when discount changes
  }, [discount]);

  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value) || 0; // Default to 0 if empty or NaN
    if (discountValue > 15) {
      alert("Discount cannot be greater than 15%");
      return; // Prevent further execution
    }
    setDiscount(discountValue);

    const storedRepairDetails = JSON.parse(localStorage.getItem("repairDetails")) || [];

    const updatedRepairDetails = storedRepairDetails.map((item) => {
      const makingCharges = parseFloat(item.making_charges) || 0;
      const calculatedDiscount = (makingCharges * discountValue) / 100;

      const previousTotalPrice = parseFloat(item.total_price) || 0;
      const originalTotalPrice = item.original_total_price
        ? parseFloat(item.original_total_price)
        : previousTotalPrice;

      const updatedTotalPrice = originalTotalPrice - calculatedDiscount;

      return {
        ...item,
        original_total_price: originalTotalPrice.toFixed(2),
        disscount: calculatedDiscount.toFixed(2),
        disscount_percentage: discountValue,
        total_price: updatedTotalPrice.toFixed(2),
      };
    });

    setRepairDetails(updatedRepairDetails);
    localStorage.setItem("repairDetails", JSON.stringify(updatedRepairDetails));
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
      const filteredData = response.data.repeatedData.filter(item =>
        stock.some(stockItem => stockItem.PCode_BarCode === item.code && stockItem.Status === "Available")
      );

      if (filteredData.length > 0) {
        // Store filtered data in localStorage
        localStorage.setItem("repairDetails", JSON.stringify(filteredData));

        // Update state with filtered data
        setRepairDetails(filteredData);

        // Immediately retrieve and log stored data
        const storedData = JSON.parse(localStorage.getItem("repairDetails"));
        console.log("Stored repairDetails:", storedData);
      } else {
        // Clear localStorage if no matching data
        localStorage.removeItem("repairDetails");
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
      localStorage.removeItem("repairDetails");
      setRepairDetails([]);
    }
  };


  const handleAdd = () => {
    const storedRepairDetails = JSON.parse(localStorage.getItem("repairDetails")) || [];

    // Check if the code already exists
    const isDuplicate = storedRepairDetails.some(
      (item) => item.code === formData.code
    );

    if (isDuplicate) {
      alert("The product is already selected.");
      return;
    }

    // Add new repair detail
    const updatedRepairDetails = [
      ...repairDetails,
      {
        ...formData,
        pieace_cost:
          formData.pieace_cost && parseFloat(formData.pieace_cost) > 0
            ? parseFloat(formData.pieace_cost).toFixed(2)
            : null, // Set to null if not greater than 0
        rate:
          formData.rate && parseFloat(formData.rate) > 0
            ? parseFloat(formData.rate).toFixed(2)
            : "",
        imagePreview: formData.imagePreview,
      },
    ];

    setRepairDetails(updatedRepairDetails);

    setFormData((prevData) => ({
      ...prevData,
      disscount: "",
      disscount_percentage: "",
      pieace_cost: "",
      imagePreview: null,
    }));

    resetProductFields();

    // Save updated data to localStorage
    localStorage.setItem("repairDetails", JSON.stringify(updatedRepairDetails));
  };

  const handleEdit = (index) => {
    setEditIndex(index);

    setFormData((prevFormData) => ({
      ...prevFormData,
      ...repairDetails[index],
      pieace_cost: repairDetails[index].pieace_cost && parseFloat(repairDetails[index].pieace_cost) > 0
        ? parseFloat(repairDetails[index].pieace_cost).toFixed(2)
        : "",
      rate: repairDetails[index].rate && parseFloat(repairDetails[index].rate) > 0
        ? parseFloat(repairDetails[index].rate).toFixed(2)
        : "",

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
      pricing: "",
      tax_percent: "",
      tax_amt: "",
      hm_charges: "60.00",
      total_price: "",
      qty: "",
      imagePreview: null,
      remarks: "",
    }));
  };

  // Calculate totalPrice (sum of total_price from all repairDetails)
  const totalPrice = repairDetails.reduce((sum, item) => sum + parseFloat(item.total_price || 0), 0);

  const [oldTableData, setOldTableData] = useState(() => {
    const savedData = localStorage.getItem('oldTableData');
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
    navigate("/customermaster", { state: { from: "/sales" } });
  };

  const totalAmount = repairDetails.reduce((sum, item) => {
    const stonePrice = parseFloat(item.stone_price) || 0;
    const makingCharges = parseFloat(item.making_charges) || 0;
    const rateAmt = parseFloat(item.rate_amt) || 0;
    const hmCharges = parseFloat(item.hm_charges) || 0;
    return sum + stonePrice + makingCharges + rateAmt + hmCharges;
  }, 0);

  const discountAmt = repairDetails.reduce((sum, item) => {
    const discountAmt = parseFloat(item.disscount) || 0;
    return sum + discountAmt;
  }, 0);

  const taxableAmount = totalAmount - discountAmt;
  const taxAmount = repairDetails.reduce((sum, item) => sum + parseFloat(item.tax_amt || 0), 0);
  const netAmount = taxableAmount + taxAmount;

  const oldItemsAmount = location.state?.old_exchange_amt
    ? parseFloat(location.state.old_exchange_amt)
    : oldSalesData.reduce(
      (sum, item) => sum + parseFloat(item.total_amount || 0),
      0
    );

  const schemeAmount = location.state?.scheme_amt
    ? parseFloat(location.state.scheme_amt)
    : schemeSalesData.reduce(
      (sum, item) => sum + parseFloat(item.paid_amount || 0),
      0
    );

  // Calculate Net Payable Amount
  const payableAmount = netAmount - (schemeAmount + oldItemsAmount);
  const netPayableAmount = Math.round(payableAmount);


  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false); // State to track "Check All" checkbox

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


  // Calculate taxable amount based on selected rows
  const salesTaxableAmount = selectedRows.reduce((sum, rowIndex) => {
    const detail = invoiceDetails[rowIndex];
    const stonePrice = parseFloat(detail.stone_price) || 0;
    const makingCharges = parseFloat(detail.making_charges) || 0;
    const rateAmt = parseFloat(detail.rate_amt) || 0;
    return sum + stonePrice + makingCharges + rateAmt;
  }, 0);

  const salesTaxAmount = selectedRows.reduce((sum, rowIndex) => {
    const detail = invoiceDetails[rowIndex];
    return sum + parseFloat(detail.tax_amt || 0);
  }, 0);

  const salesNetAmount = salesTaxableAmount + salesTaxAmount;
  const updatedOldItemsAmount = oldItemsAmount + salesNetAmount;
  const netPayAmount = netPayableAmount - salesNetAmount

  const [paymentDetails, setPaymentDetails] = useState({
    cash_amount: "", // Fix to two decimal places
    card_amt: "",
    chq_amt: "",
    online_amt: "",
  });


  // Save payment details to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
  }, [paymentDetails]);

  useEffect(() => {
    // Retrieve payment details from localStorage on component mount
    const storedPaymentDetails = localStorage.getItem('paymentDetails');
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
    localStorage.removeItem('repairDetails');
    localStorage.removeItem('paymentDetails');
    localStorage.removeItem('oldTableData'); // Explicitly remove oldTableData from local storage
    localStorage.removeItem('schemeTableData'); // Explicitly remove oldTableData from local storage
    localStorage.removeItem("discount");
    console.log("Data cleared successfully");
  };

  const handleSave = async () => {
    if (!formData.account_name || !formData.mobile) {
      alert("Please select the Customer or enter the Customer Mobile Number");
      return;
    }
    const dataToSave = {
      repairDetails: repairDetails.map(item => ({
        ...item,
        customer_id: formData.customer_id,
        mobile: formData.mobile,
        account_name: formData.account_name,
        email: formData.email,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
        state_code: formData.state_code,
        aadhar_card: formData.aadhar_card,
        gst_in: formData.gst_in,
        pan_card: formData.pan_card,
        terms: formData.terms,
        cash_amount: paymentDetails.cash_amount || 0,
        card_amt: paymentDetails.card_amt || 0,
        chq_amt: paymentDetails.chq_amt || 0,
        online_amt: paymentDetails.online_amt || 0,

      })),
      oldItems: oldSalesData,
      memberSchemes: schemeSalesData,
      oldItemsAmount: oldItemsAmount || 0, // Explicitly include value
      schemeAmount: schemeAmount || 0,    // Explicitly include value
      salesNetAmount: salesNetAmount || 0,
    };

    console.log("Payload to be sent:", JSON.stringify(dataToSave, null, 2));

    console.log("Saving data:", dataToSave);

    try {
      await axios.post(`${baseURL}/save-repair-details`, dataToSave);
      alert("Sales added successfully");

      // Generate PDF Blob
      const pdfDoc = (
        <PDFLayout
          formData={formData}
          repairDetails={repairDetails}
          cash_amount={paymentDetails.cash_amount || 0}
          card_amt={paymentDetails.card_amt || 0}
          chq_amt={paymentDetails.chq_amt || 0}
          online_amt={paymentDetails.online_amt || 0}
          taxableAmount={taxableAmount}
          taxAmount={taxAmount}
          discountAmt={discountAmt}
          oldItemsAmount={oldItemsAmount}
          schemeAmount={schemeAmount}
          netAmount={netAmount}
          netPayableAmount={netPayableAmount}
        />
      );

      const pdfBlob = await pdf(pdfDoc).toBlob();

      // Create a download link and trigger it
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `invoice-${formData.invoice_number}.pdf`;
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);

      // Clear all data after saving
      clearData();

      // Reset the form and reload the page if necessary
      resetForm();
      navigate("/salestable");
      window.location.reload();
      await handleCheckout();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };


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
                handleCustomerChange={handleCustomerChange}
                handleAddCustomer={handleAddCustomer}
                customers={customers}
                setSelectedMobile={setSelectedMobile} // Pass the setSelectedMobile function here
              />

            </div>
            <div className="sales-form-right">
              <InvoiceDetails
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>
          <div className="sales-form-section">
            <ProductDetails
              formData={formData}
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
              setShowOptions={webcamRef}
              showOptions={webcamRef}
              estimate={estimate}
              selectedEstimate={selectedEstimate}
              handleEstimateChange={handleEstimateChange}
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
                updatedOldItemsAmount={updatedOldItemsAmount}
                netPayAmount={netPayAmount}
                oldSalesData={oldSalesData} schemeSalesData={schemeSalesData}
                discount={discount}
                handleDiscountChange={handleDiscountChange}
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
