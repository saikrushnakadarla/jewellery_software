import React, { useState, useEffect } from "react";
import "./Estimate.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDFContent from "./EstimateReceipt";

const RepairForm = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const initialFormData = {
    date: today,
    pcode: "",
    estimate_number: "",
    code: "",
    product_id: "",
    product_name: "",
    metal_type: "",
    design_name: "",
    purity: "",
    category: "",
    sub_category: "",
    gross_weight: "",
    stones_weight: "",
    stones_price: "",
    weight_bw: "",
    wastage_on: "Gross Weight",
    wastage_percent: "",
    wastage_weight: "",
    total_weight: "",
    making_charges_on: "MC %",
    mc_per_gram: "",
    total_mc: "",
    disscount_percentage: "",
    disscount: "",
    rate: "",
    rate_amt: "",
    tax_percent: "03% GST",
    tax_vat_amount: "",
    hm_charges: "60.00",
    total_rs: "",
    total_amount: "0.00",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [isQtyEditable, setIsQtyEditable] = useState(false);
  const [rates, setRates] = useState({
    rate_24crt: "",
    rate_22crt: "",
    rate_18crt: "",
    rate_16crt: ""
  });
  const [metalTypes, setMetalTypes] = useState([]);
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [purity, setPurity] = useState([]);
  const [filteredMetalTypes, setFilteredMetalTypes] = useState([]);

  const [filteredDesignOptions, setFilteredDesignOptions] = useState([]);
  const [filteredPurityOptions, setFilteredPurityOptions] = useState([]);
  const [isBarcodeSelected, setIsBarcodeSelected] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [metaltypeOptions, setMetaltypeOptions] = useState([]);
  const [purityOptions, setpurityOptions] = useState([]);
  const [designOptions, setDesignOptions] = useState([]);

  useEffect(() => {
    let currentRate = "";

    if (formData.metal_type?.toLowerCase() === "gold" && formData.purity) {
      // Check if the purity value includes specific numbers
      if (formData.purity.includes("24")) {
        currentRate = rates.rate_24crt;
      } else if (formData.purity.includes("22")) {
        currentRate = rates.rate_22crt;
      } else if (formData.purity.includes("18")) {
        currentRate = rates.rate_18crt;
      } else if (formData.purity.includes("16")) {
        currentRate = rates.rate_16crt;
      }
    } else if (formData.metal_type?.toLowerCase() === "silver" && formData.purity) {
      currentRate = rates.silver_rate;
    }

    setFormData((prevData) => ({
      ...prevData,
      rate: currentRate,
    }));
  }, [formData.purity, formData.metal_type, rates]);

  useEffect(() => {
    const fetchCurrentRates = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/current-rates`);
        // console.log('API Response:', response.data);

        setRates({
          rate_24crt: response.data.rate_24crt || "",
          rate_22crt: response.data.rate_22crt || "",
          rate_18crt: response.data.rate_18crt || "",
          rate_16crt: response.data.rate_16crt || "",
        });
      } catch (error) {
        console.error('Error fetching current rates:', error);
      }
    };

    fetchCurrentRates();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseURL}/get/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${baseURL}/get/opening-tags-entry`);
      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }
      const result = await response.json();
      setData(result.result); // Set the full data

    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchTags();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let updatedData = {
        ...prevData,
        [name]: value,
      };

      if (name === "category" && value === "") {
        updatedData = {
          ...updatedData, // Keep other existing values
          code: "",
          product_id: "",
          product_name: "",
          metal_type: "",
          design_name: "",
          purity: "",
          category: "",
          sub_category: "",
          gross_weight: "",
          stones_weight: "",
          stones_price: "",
          weight_bw: "",
          wastage_on: "Gross Weight",
          wastage_percent: "",
          wastage_weight: "",
          total_weight: "",
          making_charges_on: "MC %",
          mc_per_gram: "",
          total_mc: "",
          rate: "",
          rate_amt: "",
          tax_percent: "03% GST",
          tax_vat_amount: "",
          total_rs: "",
          total_amount: "0.00",
        };
      }

      if (name === "disscount_percentage") {
        const discountPercentage = parseFloat(value) || 0;
        const makingCharges = parseFloat(formData.total_mc) || 0;
        const discountAmount = (discountPercentage / 100) * makingCharges;

        updatedData.disscount = discountAmount.toFixed(2);
      }

      // Reset `mc_per_gram` and `total_mc` when `making_charges_on` changes
      if (name === "making_charges_on") {
        updatedData.mc_per_gram = "";
        updatedData.total_mc = "";
      }

      // Trigger recalculation for Total MC when relevant fields are updated
      if (
        updatedData.metal_type?.toLowerCase() === "gold" &&
        (name === "mc_per_gram" || name === "rate_amt")
      ) {
        const updatedMcPercentage = parseFloat(
          name === "mc_per_gram" ? value : updatedData.mc_per_gram
        ) || 0;
        const updatedRateAmount = parseFloat(
          name === "rate_amt" ? value : updatedData.rate_amt
        ) || 0;

        const calculatedTotalMC = (updatedMcPercentage / 100) * updatedRateAmount;
        updatedData.total_mc = calculatedTotalMC.toFixed(2);
      }
      return updatedData;
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${baseURL}/get/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (result && Array.isArray(result)) {
          const formattedOptions = result.map((item) => ({
            label: item.product_name, // Display name
            value: item.product_name, // Unique value
          }));
          setCategoryOptions(formattedOptions);
        } else {
          console.error("Invalid API response format", result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await fetch(`${baseURL}/subcategory`); // Use the correct API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        if (result && result.data) {
          // If formData.metal_type is available, filter based on it, otherwise show all
          const filteredData = formData.category
            ? result.data.filter((item) => item.category === formData.category)
            : result.data;

          // Format the filtered options
          const formattedOptions = filteredData.map((item) => ({
            label: item.sub_category_name, // Display value
            value: item.sub_category_name, // Unique ID for value
          }));

          setSubcategoryOptions(formattedOptions);
        } else {
          console.error("Invalid API response format", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Run the function initially and when formData.metal_type changes
    fetchSubCategory();
  }, [formData.category]);

  const [allMetalTypes, setAllMetalTypes] = useState([]);

  useEffect(() => {
    const fetchMetalType = async () => {
      try {
        const response = await fetch(`${baseURL}/metaltype`);
        const data = await response.json();

        // Extract all metal types
        const allMetalTypes = Array.from(new Set(data.map((product) => product.metal_name)));

        // Store all metal types
        setAllMetalTypes(allMetalTypes);

        // Initially, show all metal types
        setMetaltypeOptions(allMetalTypes.map((category) => ({
          value: category,
          label: category,
        })));
      } catch (error) {
        console.error('Error fetching metal types:', error);
      }
    };

    fetchMetalType();
  }, []);

  useEffect(() => {
    if (!formData.category) {
      // Show all metal types if no category is selected
      setMetaltypeOptions(allMetalTypes.map((category) => ({
        value: category,
        label: category,
      })));
      return;
    }

    const fetchFilteredMetalTypes = async () => {
      try {
        const response = await fetch(`${baseURL}/get/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();

        // Find selected category object
        const selectedProduct = result.find((item) => item.product_name === formData.category);

        if (selectedProduct) {
          const filteredMetals = allMetalTypes.filter(
            (metal) => metal === selectedProduct.Category
          );

          const options = filteredMetals.map((category) => ({
            value: category,
            label: category,
          }));

          setMetaltypeOptions(options);

          // Auto-select the first option only when a category is selected
          if (formData.category && options.length > 0) {
            setFormData((prev) => ({ ...prev, metal_type: options[0].value }));
          }
        }
      } catch (error) {
        console.error("Error fetching filtered metal types:", error);
      }
    };

    fetchFilteredMetalTypes();
  }, [formData.category, allMetalTypes]);

  useEffect(() => {
    const fetchDesignName = async () => {
      try {
        const response = await fetch(`${baseURL}/designmaster`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (result && Array.isArray(result)) {
          const formattedOptions = result.map((item) => ({
            label: item.design_name, // Display name
            value: item.design_name, // Unique value
          }));
          setDesignOptions(formattedOptions);
        } else {
          console.error("Invalid API response format", result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchDesignName();
  }, []);

  useEffect(() => {
    const fetchPurity = async () => {
      try {
        const response = await fetch(`${baseURL}/purity`);
        const data = await response.json();

        let filteredData = data;

        // If metal_type is set, filter based on it; otherwise, show all
        if (formData.metal_type) {
          filteredData = data.filter((product) =>
            product.metal?.toLowerCase() === formData.metal_type.toLowerCase()
          );
        }

        const purities = Array.from(
          new Set(filteredData.map((product) => `${product.name} | ${product.purity}`))
        );

        const purityOptions = purities.map((purity) => ({
          value: purity,
          label: purity,
        }));

        setpurityOptions(purityOptions);

        // Set default purity only if metal_type is available
        if (formData.metal_type && purityOptions.length > 0) {
          const defaultPurity = purityOptions.find((option) =>
            /22/i.test(option.value)
          )?.value;

          setFormData((prevData) => ({
            ...prevData,
            purity: defaultPurity || "",
          }));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchPurity();
  }, [formData.metal_type]);

  const handleBarcodeChange = async (code) => {
    try {
      if (!code) {
        // If barcode is cleared, reset all related fields and set code to ""
        setIsBarcodeSelected(false);  // Reset the barcode selection flag
        setFormData((prevData) => ({
          ...prevData,
          code: "",  // Reset code when barcode is cleared
          product_id: "",
          product_name: "",
          metal_type: "",
          design_name: "",
          purity: "",
          category: "",
          sub_category: "",
          gross_weight: "",
          stones_weight: "",
          stones_price: "",
          weight_bw: "",
          wastage_on: "Gross Weight",
          wastage_percent: "",
          wastage_weight: "",
          total_weight_aw: "",
          making_charges_on: "MC %",
          mc_per_gram: "",
          total_mc: "",
          rate: "",
          rate_amt: "",
          tax_percent: "03% GST",
          tax_vat_amount: "",
          hm_charges: "60.00",
          total_price: "",
          qty: "", // Reset qty
        }));
        setIsQtyEditable(true); // Default to editable if barcode is cleared
        return; // Exit early
      }

      // Check for product by code
      const product = products.find((prod) => String(prod.rbarcode) === String(code));
      if (product) {
        setIsBarcodeSelected(true);

        // Find the default purity value that includes "22"
        const defaultPurity = purityOptions.find((option) =>
          /22/i.test(option.value)
        )?.value;  // Set the barcode as selected
        setFormData((prevData) => ({
          ...prevData,
          code: product.rbarcode,  // Retain the selected barcode
          product_id: product.product_id,
          product_name: "", // Make editable
          metal_type: product.Category,
          design_name: "", // Make editable
          purity: defaultPurity || "",
          category: product.product_name,
          sub_category: "",
          gross_weight: "",
          stones_weight: "",
          stones_price: "",
          weight_bw: "",
          wastage_on: "Gross Weight",
          wastage_percent: "",
          wastage_weight: "",
          total_weight_aw: "",
          making_charges_on: "MC %",
          mc_per_gram: "",
          total_mc: "",
          tax_percent: product.tax_slab,
          qty: 1, // Set qty to 1 for product
        }));
        setIsQtyEditable(false); // Set qty as read-only
      } else {
        // Check if tag exists by code
        const tag = data.find((tag) => String(tag.PCode_BarCode) === String(code));
        if (tag) {
          const productId = tag.product_id;
          const productDetails = products.find((prod) => String(prod.product_id) === String(productId));

          setFormData((prevData) => ({
            ...prevData,
            code: tag.PCode_BarCode || "", // Retain the barcode
            product_id: tag.product_id || "",
            opentag_id: tag.opentag_id || "",
            product_name: tag.sub_category || "", // Make editable
            metal_type: tag.metal_type || "",
            design_name: tag.design_master || "", // Make editable
            purity: tag.Purity || "",
            category: tag.category || "",
            sub_category: tag.sub_category || "",
            gross_weight: tag.Gross_Weight || "",
            stones_weight: tag.Stones_Weight || "",
            stones_price: tag.Stones_Price || "",
            weight_bw: tag.Weight_BW || "",
            wastage_on: tag.Wastage_On || "",
            wastage_percent: tag.Wastage_Percentage || "",
            wastage_weight: tag.WastageWeight || "",
            total_weight_aw: tag.TotalWeight_AW || "",
            making_charges_on: tag.Making_Charges_On || "",
            mc_per_gram: tag.MC_Per_Gram || "",
            total_mc: tag.Making_Charges || "",
            tax_percent: productDetails?.tax_slab || "",
            qty: 1, // Allow qty to be editable for tag
          }));
          setIsQtyEditable(true); // Allow editing of qty
        } else {
          // Reset form if no tag is found
          setFormData((prevData) => ({
            ...prevData,
            code: "", // Reset code
            product_id: "",
            product_name: "",
            metal_type: "",
            design_name: "",
            purity: "",
            category: "",
            sub_category: "",
            gross_weight: "",
            stones_weight: "",
            stones_price: "",
            weight_bw: "",
            wastage_on: "Gross Weight",
            wastage_percent: "",
            wastage_weight: "",
            total_weight_aw: "",
            making_charges_on: "MC %",
            mc_per_gram: "",
            total_mc: "",
            rate: "",
            rate_amt: "",
            tax_percent: "03% GST",
            tax_vat_amount: "",
            hm_charges: "60.00",
            total_price: "",
            qty: "", // Reset qty
          }));
          setIsQtyEditable(true); // Default to editable
        }
      }
    } catch (error) {
      console.error("Error handling code change:", error);
    }
  };

  const handleAdd = () => {
    if (isEditing) {
      // Update the entry being edited
      const updatedEntries = entries.map((entry, index) =>
        index === editIndex ? formData : entry
      );
      setEntries(updatedEntries);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new entry
      setEntries([...entries, formData]);
    }

    // Reset the form data
    setFormData((prev) => ({
      ...initialFormData,
      date: today,
      estimate_number: prev.estimate_number,
    }));
  };

  const handleEdit = (index) => {
    setFormData(entries[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handlePrint = async () => {
    try {
      const totalAmount = entries.reduce(
        (sum, entry) => sum + parseFloat(entry.total_rs || 0),
        0
      ).toFixed(2);

      await Promise.all(
        entries.map((entry) => {
          const requestData = {
            ...entry,
            total_amount: totalAmount,
          };
          return axios.post(`${baseURL}/add/estimate`, requestData);
        })
      );

      const pdfDoc = pdf(
        <PDFContent
          entries={entries}
          totalAmount={totalAmount}
          date={today}
          estimateNumber="02" // Replace with dynamic estimate number
          sellerName="Sadashri Jewels"
        />
      );

      const blob = await pdfDoc.toBlob();
      saveAs(blob, `estimate_${formData.estimate_number}.pdf`);

      alert("Estimates saved successfully!");
      setEntries([]);
      setFormData(initialFormData);
      navigate("/estimatetable");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save or generate PDF. Please try again.");
    }
  };


  useEffect(() => {
    const fetchLastEstimateNumber = async () => {
      try {
        const response = await axios.get(`${baseURL}/lastEstimateNumber`);
        setFormData((prev) => ({
          ...prev,
          estimate_number: response.data.lastEstimateNumber,
        }));
      } catch (error) {
        console.error("Error fetching estimate number:", error);
      }
    };

    fetchLastEstimateNumber();
  }, []);

  useEffect(() => {
    const grossWeight = parseFloat(formData.gross_weight) || 0;
    const stonesWeight = parseFloat(formData.stones_weight) || 0;
    const weightBW = grossWeight - stonesWeight;

    setFormData((prev) => ({
      ...prev,
      weight_bw: weightBW.toFixed(3),
    }));
  }, [formData.gross_weight, formData.stones_weight]);

  useEffect(() => {
    const wastagePercentage = parseFloat(formData.wastage_percent) || 0;
    const grossWeight = parseFloat(formData.gross_weight) || 0;
    const weightBW = parseFloat(formData.weight_bw) || 0;

    let wastageWeight = 0;
    let totalWeight = 0;

    if (formData.wastage_on === "Gross Weight") {
      wastageWeight = (grossWeight * wastagePercentage) / 100;
      totalWeight = weightBW + wastageWeight;
    } else if (formData.wastage_on === "Weight BW") {
      wastageWeight = (weightBW * wastagePercentage) / 100;
      totalWeight = weightBW + wastageWeight;
    }

    setFormData((prev) => ({
      ...prev,
      wastage_weight: wastageWeight.toFixed(3),
      total_weight: totalWeight.toFixed(3),
    }));
  }, [formData.wastage_on, formData.wastage_percent, formData.gross_weight, formData.weight_bw]);

  useEffect(() => {
    const totalWeight = parseFloat(formData.total_weight) || 0;
    const mcPerGram = parseFloat(formData.mc_per_gram) || 0;
    const makingCharges = parseFloat(formData.total_mc) || 0;
    const rateAmount = parseFloat(formData.rate_amt) || 0;

    if (formData.making_charges_on === "MC / Gram") {
      // Calculate total_mc as mcPerGram * totalWeight
      const calculatedMakingCharges = mcPerGram * totalWeight;
      setFormData((prev) => ({
        ...prev,
        total_mc: calculatedMakingCharges.toFixed(2),
      }));
    } else if (formData.making_charges_on === "MC %") {
      // Calculate total_mc as (mcPerGram * rateAmount) / 100
      const calculatedMakingCharges = (mcPerGram * rateAmount) / 100;
      setFormData((prev) => ({
        ...prev,
        total_mc: calculatedMakingCharges.toFixed(2),
      }));
    } else if (formData.making_charges_on === "MC / Piece") {
      // If total_mc is manually entered, calculate mc_per_gram
      if (makingCharges && totalWeight > 0) {
        const calculatedMcPerGram = makingCharges / totalWeight;
        setFormData((prev) => ({
          ...prev,
          mc_per_gram: calculatedMcPerGram.toFixed(2),
        }));
      }
    }
  }, [
    formData.making_charges_on,
    formData.mc_per_gram,
    formData.total_mc,
    formData.total_weight,
    formData.rate_amt,
  ]);

  useEffect(() => {
    const rate = parseFloat(formData.rate) || 0;
    const totalWeight = parseFloat(formData.total_weight) || 0;
    const qty = parseFloat(formData.qty) || 0;
    const pieceCost = parseFloat(formData.pieace_cost) || 0;
    let rateAmt = 0;

    if (formData.pricing === "By fixed") {
      rateAmt = pieceCost * qty;
    } else {
      rateAmt = rate * totalWeight;
    }

    setFormData((prev) => ({
      ...prev,
      rate_amt: rateAmt.toFixed(2),
    }));
  }, [formData.rate, formData.total_weight, formData.qty, formData.pricing, formData.pieace_cost]);

  useEffect(() => {
    const taxPercent = parseFloat(formData.tax_percent) || 0;
    const rateAmt = parseFloat(formData.rate_amt) || 0;
    const stonesPrice = parseFloat(formData.stones_price) || 0;
    const totalMC = parseFloat(formData.total_mc) || 0;
    const discountAmt = parseFloat(formData.disscount) || 0;
    const hmCharges = parseFloat(formData.hm_charges) || 0;

    // Ensure discount is subtracted before tax calculation
    const taxableAmount = rateAmt + stonesPrice + totalMC + hmCharges - discountAmt;
    const taxAmt = (taxableAmount * taxPercent) / 100;

    // Calculate Total Price
    const totalPrice = taxableAmount + taxAmt;

    setFormData((prev) => ({
      ...prev,
      tax_vat_amount: taxAmt.toFixed(2),
      total_rs: totalPrice.toFixed(2),
    }));
  }, [formData.tax_percent, formData.rate_amt, formData.stones_price, formData.total_mc, formData.disscount]);

  useEffect(() => {
    const fetchLastEstimateNumber = async () => {
      try {
        const response = await axios.get(`${baseURL}/lastEstimateNumber`);
        setFormData((prev) => ({
          ...prev,
          estimate_number: response.data.lastEstimateNumber,
        }));
      } catch (error) {
        console.error("Error fetching estimate number:", error);
      }
    };

    fetchLastEstimateNumber();
  }, []);

  const handleBack = () => {
    navigate("/estimatetable");
  };

  const defaultBarcode = formData.category
    ? products.find((product) => product.product_name === formData.category)?.rbarcode || ""
    : "";

  // Generate options list for barcode selection
  const barcodeOptions = [
    ...products
      .filter((product) => (formData.category ? product.product_name === formData.category : true))
      .map((product) => ({
        value: product.rbarcode,
        label: product.rbarcode,
      })),
    ...data
      .filter((tag) => (formData.category ? tag.category === formData.category : true))
      .map((tag) => ({
        value: tag.PCode_BarCode,
        label: tag.PCode_BarCode,
      })),
  ];

  // Ensure default barcode is included in options
  if (defaultBarcode && !barcodeOptions.some((option) => option.value === defaultBarcode)) {
    barcodeOptions.unshift({ value: defaultBarcode, label: defaultBarcode });
  }

  // Set default barcode only if formData.code is empty
  useEffect(() => {
    if (!formData.code && defaultBarcode) {
      handleBarcodeChange(defaultBarcode);
    }
  }, [formData.category, defaultBarcode]); 


  return (
    <div className="main-container">
      <Container className="estimate-form-container">
        <Row className="estimate-form-section">
          <h2>Estimate</h2>

          {/* First Row with Date and Estimate Number */}
          <Row className="d-flex justify-content-end align-items-center mb-3" style={{ marginLeft: '9px', marginTop: '-60px' }}>
            <Col xs={12} md={2}>
              <InputField
                label="Date:"
                name="date"
                value={formData.date}
                type="date"
                onChange={handleInputChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Estimate Number:"
                name="estimate_number"
                value={formData.estimate_number}
                onChange={handleInputChange}
                readOnly
              />
            </Col>
          </Row>

          <Col xs={12} md={2}>
            <InputField
              label="Category"
              name="category"
              value={formData.category || ""}
              type="select"
              onChange={handleInputChange}
              options={categoryOptions}
            />
          </Col>

          <Col xs={12} md={2}>
            <InputField
              label="BarCode/Rbarcode"
              name="code"
              value={formData.code} // Maintains user selection
              onChange={(e) => handleBarcodeChange(e.target.value)}
              type="select"
              options={barcodeOptions} // Provide valid options list
            />
          </Col>

          <Col xs={12} md={2}>
            <InputField
              label="Metal Type"
              name="metal_type"
              value={formData.metal_type || ""}
              onChange={handleInputChange}
              type="select"
              options={metaltypeOptions}
            />
          </Col>

          <Col xs={12} md={2}>
            <InputField
              label="Sub Category"
              name="sub_category"
              value={formData.sub_category || ""}
              onChange={handleInputChange}
              type="select"
              options={subcategoryOptions}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Product Design Name"
              name="design_name"
              value={formData.design_name}
              onChange={handleInputChange}
              type="select"
              options={designOptions}
            />
          </Col>

          <Col xs={12} md={2}>
            <InputField
              label="Pricing"
              name="pricing"
              type="select"
              value={formData.pricing || ""} // Default to "Gross Weight"
              onChange={handleInputChange}
              options={[
                { value: "By Weight", label: "By Weight" },
                { value: "By fixed", label: "By fixed" },
                ...(formData.pricing &&
                  !["By Weight", "By fixed"].includes(formData.pricing)
                  ? [{ value: formData.pricing, label: formData.pricing }]
                  : []),
              ]}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Purity"
              name="purity"
              value={formData.purity || ""}
              onChange={handleInputChange}
              type="select"
              options={purityOptions}
            />
          </Col>
          <Col xs={12} md={1}>
            <InputField label="Gross Wt" name="gross_weight" value={formData.gross_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={1}>
            <InputField label="Stones Wt" name="stones_weight" value={formData.stones_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={1}>
            <InputField label="St Price" name="stones_price" value={formData.stones_price} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Weight BW:" name="weight_bw" value={formData.weight_bw} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Wastage On"
              name="wastage_on"
              type="select"
              value={formData.wastage_on || ""} // Default to "Gross Weight"
              onChange={handleInputChange}
              options={[
                { value: "Gross Weight", label: "Gross Weight" },
                { value: "Weight BW", label: "Weight BW" },
                ...(formData.wastage_on &&
                  !["Gross Weight", "Weight BW"].includes(formData.wastage_on)
                  ? [{ value: formData.wastage_on, label: formData.wastage_on }]
                  : []),
              ]}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Wastage %" name="wastage_percent" value={formData.wastage_percent} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={1}>
            <InputField label="W.Wt" name="wastage_weight" value={formData.wastage_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total Weight AW" name="total_weight" value={formData.total_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={1}>
            <InputField label="Rate" name="rate" value={formData.rate} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={1}>
            {/* <InputField
              label="Amount"
              name="rate_amt"
              value={formData.rate_amt || "0.00"}
              onChange={handleInputChange}
              readOnly
            /> */}
            <InputField
              label="Amount"
              name="rate_amt"
              value={formData.rate_amt || "0.00"} // Default to "0.00" if undefined
              onChange={handleInputChange} // Trigger recalculation of Total MC
              readOnly // Ensure it's editable
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="MC On"
              name="making_charges_on"
              type="select"
              value={formData.making_charges_on || ""} // Default to "MC / Gram"
              onChange={handleInputChange}
              options={[
                { value: "MC / Gram", label: "MC / Gram" },
                { value: "MC / Piece", label: "MC / Piece" },
                { value: "MC %", label: "MC %" },
                ...(formData.making_charges_on &&
                  !["MC / Gram", "MC / Piece", "MC %"].includes(formData.making_charges_on)
                  ? [{ value: formData.making_charges_on, label: formData.making_charges_on }]
                  : []),
              ]}
            />
          </Col>

          <Col xs={12} md={1}>

            <InputField
              label={
                formData.making_charges_on === "MC %"
                  ? "MC %"
                  : "MC/Gm"
              }
              name="mc_per_gram"
              value={formData.mc_per_gram || ""} // Default value handling
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={1}>

            <InputField
              label="Total MC"
              name="total_mc"
              value={formData.total_mc || ""} // Display calculated Total MC
              onChange={handleInputChange}
            // readOnly // Make this field read-only, since it’s auto-calculated
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="Disscount %"
              name="disscount_percentage"
              value={formData.disscount_percentage || ""} // Display calculated Total MC
              onChange={handleInputChange}
            />
          </Col>

          <Col xs={12} md={2}>
            <InputField
              label="Total Disscount"
              name="disscount"
              value={formData.disscount || ""} // Display calculated Total MC
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={2}>
            <InputField
              label="HM Charges"
              name="hm_charges"
              value={formData.hm_charges || "0.00"} // Default to "0.00" if undefined
              onChange={handleInputChange} // Optional, since it's auto-calculated
            />
          </Col>

          <Col xs={12} md={1}>
            <InputField label="Tax %" name="tax_percent" value={formData.tax_percent} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={1}>
            <InputField label="Tax Amt" name="tax_vat_amount" value={formData.tax_vat_amount} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total Price" name="total_rs" value={formData.total_rs} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <Button
              style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
              onClick={handleAdd}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </Col>

        </Row>
        <Row className="estimate-form-section2">
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>S No</th>
                <th>Code</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Gross Weight</th>
                <th>Stones Weight</th>
                <th>Total Weight</th>
                <th>Rate</th>
                <th>Total Rs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length > 0 ? (
                entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.code}</td>
                    <td>{entry.category}</td>
                    <td>{entry.sub_category}</td>
                    <td>{entry.gross_weight}</td>
                    <td>{entry.stones_weight}</td>
                    <td>{entry.total_weight}</td>
                    <td>{entry.rate}</td>
                    <td>{entry.total_rs}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaEdit
                          style={{ cursor: 'pointer', marginLeft: '10px', color: 'blue' }}
                          onClick={() => handleEdit(index)}

                        />
                        <FaTrash
                          style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }}
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No entries added yet.
                  </td>
                </tr>
              )}

              {/* Total Row */}
              {entries.length > 0 && (
                <tr style={{ fontWeight: 'bold' }}>
                  <td colSpan="8" className="text-end" >
                    Total Amount
                  </td>
                  <td className="font-weight-bold">
                    {entries.reduce((sum, entry) => sum + parseFloat(entry.total_rs || 0), 0).toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </Table>

          <Col xs={12} md={12} className="d-flex justify-content-end">
            <Button className="cus-back-btn" variant="secondary" onClick={handleBack}>cancel</Button>
            <Button
              style={{ backgroundColor: "#a36e29", borderColor: "#a36e29", marginLeft: '15px' }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RepairForm;
