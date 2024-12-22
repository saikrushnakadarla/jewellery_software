import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from './../../../../../Url/NodeBaseURL';

const useProductHandlers = () => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [isQtyEditable, setIsQtyEditable] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: "value001",
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
    transaction_status: "Sales",
    qty: "",
  });

  // Fetch products and tags data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, tagsResponse] = await Promise.all([
          fetch(`${baseURL}/get/products`),
          fetch(`${baseURL}/get/opening-tags-entry`)
        ]);

        if (!productsResponse.ok || !tagsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsResponse.json();
        const tagsData = await tagsResponse.json();

        setProducts(productsData);
        setData(tagsData.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBarcodeChange = async (code) => {
    try {
      const product = products.find(prod => String(prod.rbarcode) === String(code));
      
      if (product) {
        setFormData(prevData => ({
          ...prevData,
          code: product.rbarcode,
          product_id: product.product_id,
          product_name: product.product_name,
          metal_type: product.Category,
          design_name: product.design_master,
          purity: product.purity,
          gross_weight: "",
          stone_weight: "",
          stone_price: "",
          weight_bw: "",
          va_on: "",
          va_percent: "",
          wastage_weight: "",
          total_weight_aw: "",
          mc_on: "",
          mc_per_gram: "",
          making_charges: "",
          tax_percent: product.tax_slab,
          qty: 1,
        }));
        setIsQtyEditable(false);
      } else {
        const tag = data.find(tag => String(tag.PCode_BarCode) === String(code));
        handleTagData(tag);
      }
    } catch (error) {
      console.error("Error handling barcode change:", error);
    }
  };

  const handleTagData = (tag) => {
    if (tag) {
      const productDetails = products.find(prod => String(prod.product_id) === String(tag.product_id));
      setFormData(prevData => ({
        ...prevData,
        code: tag.PCode_BarCode || "",
        product_id: tag.product_id || "",
        product_name: productDetails?.product_name || "",
        metal_type: productDetails?.Category || "",
        design_name: productDetails?.design_master || "",
        purity: productDetails?.purity || "",
        gross_weight: tag.Gross_Weight || "",
        stone_weight: tag.Stones_Weight || "",
        stone_price: tag.Stones_Price || "",
        weight_bw: tag.Weight_BW || "",
        va_on: tag.Wastage_On || "",
        va_percent: tag.Wastage_Percentage || "",
        wastage_weight: tag.WastageWeight || "",
        total_weight_aw: tag.TotalWeight_AW || "",
        mc_on: tag.Making_Charges_On || "",
        mc_per_gram: tag.MC_Per_Gram || "",
        making_charges: tag.Making_Charges || "",
        tax_percent: productDetails?.tax_slab || "",
        qty: 1,
      }));
      setIsQtyEditable(true);
    } else {
      resetFormData();
    }
  };

  const resetFormData = () => {
    setFormData(prevData => ({
      ...prevData,
      code: "",
      product_id: "",
      product_name: "",
      metal_type: "",
      design_name: "",
      purity: "",
      gross_weight: "",
      stone_weight: "",
      stone_price: "",
      weight_bw: "",
      va_on: "",
      va_percent: "",
      wastage_weight: "",
      total_weight_aw: "",
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
    setIsQtyEditable(true);
  };

  const handleProductChange = (productId) => {
    const product = products.find(prod => String(prod.product_id) === String(productId));
    const tag = data.find(tag => String(tag.product_id) === String(productId));
    
    if (product) {
      if (tag) {
        handleTagData(tag);
      } else {
        setFormData(prevData => ({
          ...prevData,
          code: product.rbarcode,
          product_id: product.product_id,
          product_name: product.product_name,
          metal_type: product.Category,
          design_name: product.design_master,
          purity: product.purity,
          gross_weight: "",
          stone_weight: "",
          stone_price: "",
          weight_bw: "",
          va_on: "",
          va_percent: "",
          wastage_weight: "",
          total_weight_aw: "",
          mc_on: "",
          mc_per_gram: "",
          making_charges: "",
        }));
      }
    } else {
      resetFormData();
    }
  };

  const handleProductNameChange = (productName) => {
    const product = products.find(prod => String(prod.product_name) === String(productName));
    if (product) {
      handleProductChange(product.product_id);
    }
  };

  const handleMetalTypeChange = (metalType) => {
    const product = products.find(prod => String(prod.Category) === String(metalType));
    if (product) {
      handleProductChange(product.product_id);
    }
  };

  const handleDesignNameChange = (designName) => {
    const product = products.find(prod => String(prod.design_master) === String(designName));
    if (product) {
      handleProductChange(product.product_id);
    }
  };

  return {
    formData,
    setFormData,
    products,
    isQtyEditable,
    handleChange,
    handleBarcodeChange,
    handleProductChange,
    handleProductNameChange,
    handleMetalTypeChange,
    handleDesignNameChange,
  };
};

export default useProductHandlers;