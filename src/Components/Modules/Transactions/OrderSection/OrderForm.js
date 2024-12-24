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

const SalesForm = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [metal, setMetal] = useState("");
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
    setFormData((prevData) => ({
      ...prevData,
      customer_id: customerId, // Ensure customer_id is correctly updated
    }));

    const customer = customers.find((cust) => String(cust.account_id) === String(customerId));
    console.log("Customer Id=", customer)

    if (customer) {
      setFormData({
        ...formData,
        customer_id: customerId, // Ensure this is correctly set
        account_name: customer.account_name, // Set the name field to the selected customer
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

      });
    } else {
      setFormData({
        ...formData,
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
    }
  };

  // Add product to repair details
  const handleAdd = () => {
    setRepairDetails([...repairDetails, { ...formData }]);
    resetProductFields();
    alert("Product added successfully");
  };

  // Handle product delete
  const handleDelete = (indexToDelete) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setRepairDetails(repairDetails.filter((_, index) => index !== indexToDelete));
      alert("Product deleted successfully");
    }
  };

  // Reset product fields
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

  const handleSave = async () => {
    const dataToSave = repairDetails.map(item => ({
      ...item,
      cash_amount: paymentDetails.cash_amount || 0,
      card_amount: paymentDetails.card || 0,
      card_amt: paymentDetails.card_amt || 0,
      chq: paymentDetails.chq || "",
      chq_amt: paymentDetails.chq_amt || 0,
      online: paymentDetails.online || "",
      online_amt: paymentDetails.online_amt || 0,
    }));

    try {
      await axios.post(`${baseURL}/save-repair-details`, { repairDetails: dataToSave });
      alert("Data saved successfully");
      setRepairDetails([]);
      resetForm();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

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
              isQtyEditable={isQtyEditable}             
            />
          </div>

          <div className="sales-form-section">
            <ProductTable repairDetails={repairDetails}  onDelete={handleDelete}/>
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
              <SalesFormSection metal={metal} setMetal={setMetal} />
            </div>

            <div className="sales-form-fourth">
              <PaymentDetails 
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
                handleSave={handleSave}
                handleBack={handleBack}
                totalPrice={totalPrice} // Pass totalPrice as a prop
              />
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SalesForm;
