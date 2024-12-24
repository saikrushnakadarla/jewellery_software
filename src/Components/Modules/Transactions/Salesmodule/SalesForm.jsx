import React from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import InputField from "../../../Pages/InputField/InputField";
import useCustomerForm from './hooks/useCustomerForm';
import useProductForm from './hooks/useProductForm';
import usePaymentForm from './hooks/usePaymentForm';
import CustomerSection from './components/CustomerSection';
import InvoiceSection from './components/InvoiceSection';
import ProductSection from './components/ProductSection';
import ProductTable from './components/ProductTable';
import OldItemSection from './components/OldItemSection';
import PaymentSection from './components/PaymentSection';
import useCalculations from './../SalesForm/hooks/useCalculations';
import "./SalesForm.css";

const SalesForm = () => {
  const navigate = useNavigate();
  const { 
    formData, 
    setFormData,
    customers, 
    handleCustomerChange, 
    handleAddCustomer 
  } = useCustomerForm();
  useCalculations(formData, setFormData);
  const {
    products,
    data,
    repairDetails,
    isQtyEditable,
    handleBarcodeChange,
    handleProductChange,
    handleProductNameChange,
    handleMetalTypeChange,
    handleDesignNameChange,
    handleChange,
    handleAdd
  } = useProductForm();

  const {
    paymentDetails,
    handleSave
  } = usePaymentForm(repairDetails, formData);

  const handleBack = () => {
    navigate("/salestable");
  };

  return (
    <div className="main-container">
      <Container className="sales-form-container">
        <Form>
          <h3 style={{ marginTop: '-45px', marginBottom: '10px', textAlign: 'left', color: '#a36e29' }}>Sales</h3>
          
          <div className="sales-form">
            <CustomerSection 
              formData={formData}
              customers={customers}
              handleCustomerChange={handleCustomerChange}
              handleAddCustomer={handleAddCustomer}
            />
            <InvoiceSection formData={formData} />
          </div>

          <ProductSection 
            formData={formData}
            products={products}
            data={data}
            isQtyEditable={isQtyEditable}
            handleBarcodeChange={handleBarcodeChange}
            handleProductChange={handleProductChange}
            handleProductNameChange={handleProductNameChange}
            handleMetalTypeChange={handleMetalTypeChange}
            handleDesignNameChange={handleDesignNameChange}
            handleChange={handleChange}
            handleAdd={handleAdd}
          />

          <ProductTable repairDetails={repairDetails} />

          <div className="sales-form2">
            <OldItemSection />
            <PaymentSection 
              paymentDetails={paymentDetails}
              handleSave={handleSave}
              handleBack={handleBack}
            />
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SalesForm;