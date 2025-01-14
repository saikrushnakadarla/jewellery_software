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
  // const { mobile } = location.state || {};
 
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
  const [paymentDetails, setPaymentDetails] = useState(
    JSON.parse(localStorage.getItem('paymentDetails')) || {
      cash_amount: 0,
      card_amt: 0,
      chq: "",
      chq_amt: 0,
      online: "",
      online_amt: 0,
    }
  );

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
    isBarcodeSelected,
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
        const filteredCustomers = result.filter(item => item.account_group === 'CUSTOMERS');
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

  useEffect(() => {
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
  }, [paymentDetails]);

  // Handle customer change
  const handleCustomerChange = (customerId) => {
    const customer = customers.find((cust) => String(cust.account_id) === String(customerId));
  
    if (customer) {
      setFormData((prevData) => ({
        ...prevData,
        customer_id: customerId, // Update selected customer ID
        account_name: customer.account_name || "", // Update customer name
        mobile: customer.mobile || "", // Update mobile
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
    } else {
      // Reset the form if no customer matches
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
      }));
    }
  };
  

  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    setRepairDetails([...repairDetails, { ...formData }]);
    resetProductFields();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(repairDetails[index]); // Populate form with selected item
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
      category:"",
      sub_category:"",
      gross_weight: "",
      stone_weight: "",
      weight_bw: "",
      stone_price: "",
      va_on: "",
      va_percent: "",
      wastage_weight: "",
      total_weight_av: "",
      mc_on: "",
      mc_per_gram: "",
      making_charges: "",
      rate: "",
      rate_amt: "",
      tax_percent: "",
      tax_amt: "",
      total_price: "",
      qty: "",
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

  const handleBack = () => {
    navigate("/salestable");
  };

  const handleAddCustomer = () => {
    navigate("/customermaster", { state: { from: "/sales" } });
  };

  const taxableAmount = repairDetails.reduce((sum, item) => {
    const stonePrice = parseFloat(item.stone_price) || 0;
    const makingCharges = parseFloat(item.making_charges) || 0;
    const rateAmt = parseFloat(item.rate_amt) || 0;
    return sum + stonePrice + makingCharges + rateAmt;
  }, 0);
  console.log("Total Price=",taxableAmount)
  
  const taxAmount = repairDetails.reduce((sum, item) => sum + parseFloat(item.tax_amt || 0), 0);
  const netAmount = taxableAmount + taxAmount;
  console.log("Net Amount=",netAmount)

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
  const netPayableAmount = netAmount - (schemeAmount + oldItemsAmount);


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
    localStorage.removeItem('oldSalesData');
    localStorage.removeItem('schemeSalesData');
    localStorage.removeItem('repairDetails');
    localStorage.removeItem('paymentDetails');
    localStorage.removeItem('oldTableData'); // Explicitly remove oldTableData from local storage
    localStorage.removeItem('schemeTableData'); // Explicitly remove oldTableData from local storage
  
    console.log("Data cleared successfully");
  };
  
  

  const handleSave = async () => {
    // Include customer details in the data being saved
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
        card_amount: paymentDetails.card || 0,
        card_amt: paymentDetails.card_amt || 0,
        chq: paymentDetails.chq || "",
        chq_amt: paymentDetails.chq_amt || 0,
        online: paymentDetails.online || "",
        online_amt: paymentDetails.online_amt || 0,
      })),
      oldItems: oldSalesData,
      memberSchemes: schemeSalesData,
      oldItemsAmount: oldItemsAmount || 0, // Explicitly include value
      schemeAmount: schemeAmount || 0,    // Explicitly include value
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
          taxAmount={taxAmount}
          oldItemsAmount={oldItemsAmount}
          schemeAmount={schemeAmount}
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
      window.location.reload();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };
  

  return (
    <div className="main-container">
      <Container className="sales-form-container">
        <Form>
          <h3 style={{ marginTop: '-45px', marginBottom: '10px', textAlign: 'left', color: '#a36e29' }}>
            Sales
          </h3>
          <div className="sales-form">
            <div className="sales-form-left">
              <CustomerDetails 
                formData={formData}
                handleCustomerChange={handleCustomerChange}
                handleAddCustomer={handleAddCustomer}
                customers={customers}
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
              filteredMetalTypes={filteredMetalTypes}
              filteredPurityOptions={filteredPurityOptions}
              filteredDesignOptions={filteredDesignOptions}
              isBarcodeSelected={isBarcodeSelected}
              isQtyEditable={isQtyEditable}  
              handleUpdate={handleUpdate}
              isEditing={editIndex !== null}           
            />
          </div>

          <div className="sales-form-section">
            <ProductTable repairDetails={repairDetails} onEdit={handleEdit}  onDelete={handleDelete}/>
          </div>

          {/* <div className="sales-form2">
            <div className="sales-form-fourth">
              <PaymentDetails 
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
                handleSave={handleSave}
                handleBack={handleBack}
                totalPrice={totalPrice} // Pass totalPrice as a prop
              />
            </div>
          </div> */}


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
                taxableAmount={taxableAmount}
                taxAmount={taxAmount}
                netAmount={netAmount}
                oldItemsAmount={oldItemsAmount}
                schemeAmount={schemeAmount}
                netPayableAmount={netPayableAmount}
                oldSalesData={oldSalesData} schemeSalesData={schemeSalesData} 
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
