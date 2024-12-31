import React, { useState, useEffect } from "react";
import "./Estimate.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button,Table } from "react-bootstrap";
import axios from "axios";
import DataTable from "../../../Pages/InputField/TableLayout";
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
    code:"",
    product_id: "",
    product_name: "",
    metal_type:"",
    design_master:"",
    purity:"",
    gross_weight: "",
    stones_weight: "",
    stones_price: "",
    weight_bw: "",
    wastage_on: "",
    wastage_percent: "",
    wastage_weight: "",
    total_weight: "",
    making_charges_on: "",
    mc_per_gram: "",
    total_mc: "",
    rate: "",
    rate_amt: "",
    tax_percent: "",
    tax_vat_amount: "",
    total_rs: "",
    total_amount:"0.00",
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

  
  // Determine the current rate based on purity
  useEffect(() => {
    const currentRate = 
      formData.purity === "24K" ? rates.rate_24crt :
      formData.purity === "22K" ? rates.rate_22crt :
      formData.purity === "18K" ? rates.rate_18crt :
      formData.purity === "16K" ? rates.rate_16crt :
      "";

    setFormData((prevData) => ({
      ...prevData,
      rate: currentRate
    }));
  }, [formData.purity, rates]);

  // Fetch rates on mount
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

  useEffect(() => {
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
          throw new Error('Failed to fetch tags');
        }
        const result = await response.json();
        setData(result.result);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchProducts();
    fetchTags();
  }, []);

  const handleMetalTypeChange = (metalType) => {
    const product = products.find((prod) => String(prod.Category) === String(metalType));

    if (product) {
      setFormData((prevData) => ({
        ...prevData,
        code: product.rbarcode || "",
        product_id: product.product_id || "",
        product_name: product.product_name || "",
        metal_type: product.Category || "",
        design_master: product.design_master || "",
        purity: product.purity || "",
        hsn: product.hsn_code || "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        code: "",
        product_id: "",
        product_name: "",
        metal_type: "",
        design_master: "",
        purity: "",
        hsn:"",
      }));
    }
  };

  const handleDesignNameChange = (designName) => {
    const product = products.find((prod) => String(prod.design_master) === String(designName));

    if (product) {
      setFormData((prevData) => ({
        ...prevData,
        code: product.rbarcode || "",
        product_id: product.product_id || "",
        product_name: product.product_name || "",
        metal_type: product.Category || "",
        design_master: product.design_master || "",
        purity: product.purity || "",
        hsn: product.hsn_code || "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        code: "",
        product_id: "",
        product_name: "",
        metal_type: "",
        design_master: "",
        purity: "",
        hsn:"",
      }));
    }
  };
  
  const handleProductNameChange = (productName) => {
    const product = products.find((prod) => String(prod.product_name) === String(productName));

    if (product) {
      setFormData((prevData) => ({
        ...prevData,

        code: product.rbarcode,

        product_id: product.product_id || "",
        product_name: product.product_name || "",
        metal_type: product.Category || "",
        design_master: product.design_master || "",
        purity: product.purity || "",
        hsn: product.hsn_code || "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        code: "",
        product_id: "",
        product_name: "",
        metal_type: "",
        design_master: "",
        purity: "",
        hsn:"",
      }));
    }
  };

  const handleProductChange = (productId) => {
    const product = products.find((prod) => String(prod.product_id) === String(productId));
  
    if (product) {
      // Find the corresponding tag entry from the open-tags-entry
      const tag = data.find((tag) => String(tag.product_id) === String(productId));
      
      // If tag is found, populate the form with the tag's details
      if (tag) {
        setFormData((prevData) => ({
          ...prevData,
          code: product.rbarcode, // Priority to tag code if available
          product_id: product.product_id,
          product_name: product.product_name,
          metal_type: product.Category,
          design_master: product.design_master,
          purity: product.purity,
          gross_weight: "", // Use tag's gross weight
          stones_weight: "",
          stones_price:"",
          weight_bw: "",
          wastage_on: "",
          wastage_percent:  "",
          wastage_weight: "",
          total_weight_aw: "",
          making_charges_on: "",
          mc_per_gram: "",
          making_charges: "",
        }));
      } else {
        // If no tag is found, just fill product details
        setFormData((prevData) => ({
          ...prevData,
          code: product.rbarcode,
          product_id: product.product_id,
          product_name: product.product_name,
          metal_type: product.Category,
          design_master: product.design_master,
          purity: product.purity,
          hsn: product.hsn_code || "",
          gross_weight: "",
          stones_weight: "",
          stones_price: "",
          weight_bw: "",
          wastage_on: "",
          wastage_percent: "",
          wastage_weight: "",
          total_weight_aw: "",
          making_charges_on: "",
          mc_per_gram: "",
          making_charges: "",
        }));
      }
    } else {
      // Reset form data if no product is selected
      setFormData((prevData) => ({
        ...prevData,
        code: "",
        product_id: "",
        product_name: "",
        metal_type: "",
        design_master: "",
        purity: "",
        hsn:"",
        gross_weight: "",
        stones_weight: "",
        stones_price: "",
        weight_bw: "",
        wastage_on: "",
        wastage_percent: "",
        wastage_weight: "",
        total_weight_aw: "",
        making_charges_on: "",
        mc_per_gram: "",
        making_charges: "",
        rate: "",
        rate_amt: "",
        tax_percent: "",
        tax_amt: "",
        total_price: "",
      }));
    }
  };
  
  const handleBarcodeChange = async (code) => {
    try {
      // Check for product by code
      const product = products.find((prod) => String(prod.rbarcode) === String(code));
  
      if (product) {
        // If product found by code, populate the form
        setFormData((prevData) => ({
          ...prevData,
          code: product.rbarcode,
          product_id: product.product_id,
          product_name: product.product_name,
          metal_type: product.Category,
          design_master: product.design_master,
          purity: product.purity,
          hsn: product.hsn_code || "",
          gross_weight: "",
          stones_weight: "",
          stones_price: "",
          weight_bw: "",
          wastage_on: "",
          wastage_percent: "",
          wastage_weight: "",
          total_weight_aw: "",
          making_charges_on: "",
          mc_per_gram: "",
          making_charges: "",
          tax_percent:product.tax_slab ,
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
            code: tag.PCode_BarCode || "",
            product_id: tag.product_id || "",
            product_name: productDetails?.product_name || "",
            metal_type: productDetails?.Category || "",
            design_master: productDetails?.design_master || "",
            purity: productDetails?.purity || "",
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
            making_charges: tag.Making_Charges || "",
            tax_percent:productDetails?.tax_slab || "",
            qty: 1, // Allow qty to be editable for tag
          }));
          setIsQtyEditable(true); // Allow editing of qty
        } else {
          // Reset form if no tag is found
          setFormData((prevData) => ({
            ...prevData,
            code: "",
            product_id: "",
            product_name: "",
            metal_type: "",
            design_master: "",
            purity: "",
            hsn:"",
            gross_weight: "",
            stones_weight: "",
            stones_price: "",
            weight_bw: "",
            wastage_on: "",
            wastage_percent: "",
            wastage_weight: "",
            total_weight_aw: "",
            making_charges_on: "",
            mc_per_gram: "",
            making_charges: "",
            rate: "",
            rate_amt: "",
            tax_percent: "",
            tax_amt: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  
      // Save to the database
      await Promise.all(
        entries.map((entry) =>
          axios.post(`${baseURL}/add/estimate`, {
            ...entry,
            total_amount: totalAmount,
          })
        )
      );
  
      // Generate PDF
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
      saveAs(blob, `estimate_${Date.now()}.pdf`);
  
      alert("Estimates saved and PDF generated successfully!");
      setEntries([]);
      setFormData(initialFormData);
      navigate("/estimatetable"); // Redirect to another page if needed
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
      weight_bw: weightBW.toFixed(2),
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
      wastage_weight: wastageWeight.toFixed(2),
      total_weight: totalWeight.toFixed(2),
    }));
  }, [formData.wastage_on, formData.wastage_percent, formData.gross_weight, formData.weight_bw]);

  useEffect(() => {
    const totalWeight = parseFloat(formData.total_weight) || 0;
    const mcPerGram = parseFloat(formData.mc_per_gram) || 0;
    const makingCharges = parseFloat(formData.total_mc) || 0;

    if (formData.making_charges_on === "By Weight") {
      const calculatedMakingCharges = totalWeight * mcPerGram;
      setFormData((prev) => ({
        ...prev,
        total_mc: calculatedMakingCharges.toFixed(2),
      }));
    } else if (formData.making_charges_on === "Fixed") {
      if (totalWeight > 0) {
        const calculatedMcPerGram = makingCharges / totalWeight;
        setFormData((prev) => ({
          ...prev,
          mc_per_gram: calculatedMcPerGram.toFixed(2),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          mc_per_gram: "0.00",
        }));
      }
    }
  }, [formData.making_charges_on, formData.mc_per_gram, formData.total_mc, formData.total_weight]);

  useEffect(() => {
    const rate = parseFloat(formData.rate) || 0;
    const totalWeight = parseFloat(formData.total_weight) || 0;

    const rateAmt = rate * totalWeight;

    setFormData((prev) => ({
      ...prev,
      rate_amt: rateAmt.toFixed(2),
    }));
  }, [formData.rate, formData.total_weight]);

  useEffect(() => {
    const taxPercent = parseFloat(formData.tax_percent) || 0;
    const rateAmt = parseFloat(formData.rate_amt) || 0;

    const taxAmt = (rateAmt * taxPercent) / 100;

    setFormData((prev) => ({
      ...prev,
      tax_vat_amount: taxAmt.toFixed(2),
    }));
  }, [formData.tax_percent, formData.rate_amt]);

  useEffect(() => {
    const rateAmt = parseFloat(formData.rate_amt) || 0;
    const taxAmt = parseFloat(formData.tax_vat_amount) || 0;
    const stonesPrice = parseFloat(formData.stones_price) || 0;
    const totalMC = parseFloat(formData.total_mc) || 0;

    const totalRs = rateAmt + taxAmt + stonesPrice + totalMC;

    setFormData((prev) => ({
      ...prev,
      total_rs: totalRs.toFixed(2),
    }));
  }, [formData.rate_amt, formData.tax_vat_amount, formData.stones_price, formData.total_mc]);

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
  
  return (
    <div className="main-container">
      <Container className="estimate-form-container">
        <Row className="estimate-form-section">
          <h2>Estimate</h2>

          <Col xs={12} md={2}>
            <InputField label="Date:" name="date" value={formData.date} type="date" onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Estimate Number:" name="estimate_number" value={formData.estimate_number} onChange={handleInputChange} readOnly />
          </Col>

          <Col xs={12} md={2}>
                <InputField
                  label="BarCode/Rbarcode"
                  name="code"
                  value={formData.code}
                  onChange={(e) => handleBarcodeChange(e.target.value)}
                  type="select"
                  options={
                    !formData.product_id
                      ? [
                          ...products.map((product) => ({
                            value: product.rbarcode,
                            label: product.rbarcode,
                          })),
                          ...data.map((tag) => ({
                            value: tag.PCode_BarCode,
                            label: tag.PCode_BarCode,
                          })),
                        ]
                      : [
                          ...products
                            .filter((product) => String(product.product_id) === String(formData.product_id))
                            .map((product) => ({
                              value: product.rbarcode,
                              label: product.rbarcode,
                            })),
                          ...data
                            .filter((tag) => String(tag.product_id) === String(formData.product_id))
                            .map((tag) => ({
                              value: tag.PCode_BarCode,
                              label: tag.PCode_BarCode,
                            })),
                        ]
                  }
                />
              </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="P ID"
                    name="product_id"
                    value={formData.product_id}
                    onChange={(e) => handleProductChange(e.target.value)}
                    type="select"
                    options={products.map((product) => ({
                      value: product.product_id,
                      label: product.product_id,
                    }))}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Product Name"
                    name="product_name"
                    value={formData.product_name}
                    onChange={(e) => handleProductNameChange(e.target.value)}
                    type="select"
                    options={products.map((product) => ({
                      value: product.product_name,
                      label: product.product_name,
                    }))}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Metal Type"
                    name="metal_type"
                    value={formData.metal_type}
                    onChange={(e) => handleMetalTypeChange(e.target.value)}                    
                    type="select"
                    options={products.map((product) => ({
                      value: product.Category,
                      label: product.Category,
                    }))}                    
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Design Name"
                    name="design_master"
                    value={formData.design_master}
                    onChange={(e) => handleDesignNameChange(e.target.value)}
                    type="select"
                    options={products.map((product) => ({
                      value: product.design_master,
                      label: product.design_master,
                    }))}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Purity"
                    name="purity"
                    value={formData.purity}
                    onChange={handleInputChange}
                    readOnly
                  />
                </Col>
          <Col xs={12} md={2}>
            <InputField label="Gross Weight:" name="gross_weight" value={formData.gross_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Stones Weight:" name="stones_weight" value={formData.stones_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Stones Price:" name="stones_price" value={formData.stones_price} onChange={handleInputChange} />
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
            <InputField label="Wastage %:" name="wastage_percent" value={formData.wastage_percent} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Wastage Weight:" name="wastage_weight" value={formData.wastage_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total Weight:" name="total_weight" value={formData.total_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
                  <InputField
                    label="MC On"
                    name="making_charges_on"
                    type="select"
                    value={formData.making_charges_on || ""} // Default to "By Weight"
                    onChange={handleInputChange}
                    options={[
                      { value: "By Weight", label: "By Weight" },
                      { value: "Fixed", label: "Fixed" },
                      ...(formData.making_charges_on &&
                      !["By Weight", "Fixed"].includes(formData.making_charges_on)
                        ? [{ value: formData.making_charges_on, label: formData.making_charges_on }]
                        : []),
                    ]}
                  />
                </Col>

          <Col xs={12} md={2}>
            <InputField label="MC Per Gram:" name="mc_per_gram" value={formData.mc_per_gram} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total MC:" name="total_mc" value={formData.total_mc} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Rate:" name="rate" value={formData.rate} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
                <InputField
                  label="Amount"
                  name="rate_amt"
                  value={formData.rate_amt || "0.00"} 
                  onChange={handleInputChange} 
                  readOnly
                />
                </Col>
          <Col xs={12} md={2}>
            <InputField label="Tax %" name="tax_percent" value={formData.tax_percent} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Tax VAT Amt:" name="tax_vat_amount" value={formData.tax_vat_amount} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total Rs:" name="total_rs" value={formData.total_rs} onChange={handleInputChange} />
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
      <th>Product Name</th>
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
          <td>{entry.product_name}</td>
          <td>{entry.gross_weight}</td>
          <td>{entry.stones_weight}</td>
          <td>{entry.total_weight}</td>
          <td>{entry.rate}</td>
          <td>{entry.total_rs}</td>
          <td>
            <div className="d-flex align-items-center">
              <FaEdit
                className="action-icon edit-icon"
                onClick={() => handleEdit(index)}
                style={{ cursor: 'pointer', marginRight: 10 }}
              />
              <FaTrash
                className="action-icon delete-icon"
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
      <tr style={{fontWeight:'bold'}}>
        <td colSpan="6" className="text-end" > 
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
            <Button
              style={{ backgroundColor: "#a36e29", borderColor: "#a36e29",  }}
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
