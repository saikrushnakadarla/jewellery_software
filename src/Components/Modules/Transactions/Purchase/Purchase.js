import React, { useState, useEffect } from "react";
import "./Purchase.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import baseURL from "../../../../Url/NodeBaseURL";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const URDPurchase = () => {
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [product, setProduct] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState(
    {
      account_name: "",
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
      terms:"Cash",
      indent: "",
      bill_no: "",
      type: "",
      rate_cut: "",
      date: new Date().toISOString().split("T")[0],
      bill_date: "",
      due_date: "",
      Purchase_rate: "",
      product_id: "",
      product_name: "",
      metal_type: "",
      design_name: "",
      purity: "916 HM",
      hsn: "",
      product_type: "",
      stock_type: "",
      pcs: "",
      gross_weight: "",
      stone_weight: "",
      net_weight: "",
      unit_weight: "",
      waste_percentage: "",
      waste_amount: "",
      pure_weight: "",
      alloy: "",
      cost: "",
      total_weight: "",
      wt_rate_amount: "",
      mc_per_gram: "",
      mc: "",
      stone_amount: "",
      total_amount: "",
      stone: "",
      stone_pcs: "",
      stone_ct: "",
      cwp: "",
      gms: "",
      stone_rate: "",
      clarity: "",
      rate: "",
      clear: "",
      class: "",
      cut: "",
    });

  const [tableData, setTableData] = useState([]);
    const [isQtyEditable, setIsQtyEditable] = useState(false);
     const [products, setProducts] = useState([]);
      const [data, setData] = useState([]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    setTableData((prev) => [...prev, formData]);
    setFormData((prev) => ({
      ...prev,
      product_id: "",
      product_name: "",
      metal_type: "",
      design_name: "",
      purity: "",
      hsn: "",
      product_type: "",
      stock_type: "",
      pcs: "",
      gross_weight: "",
      stone_weight: "",
      net_weight: "",
      unit_weight: "",
      waste_percentage: "",
      waste_amount: "",
      pure_weight: "",
      alloy: "",
      cost: "",
      total_weight: "",
      wt_rate_amount: "",
      mc_per_gram: "",
      mc: "",
      stone_amount: "",
      total_amount: "",
      stone: "",
      stone_pcs: "",
      stone_ct: "",
      cwp: "",
      gms: "",
      stone_rate: "",
      clarity: "",
      rate: "",
      clear: "",
      class: "",
      cut: "",
    }));
  };


  const handleSave = async () => {
    try {
      const dataToSave = {
        formData,
        tableData,
      };

      const response = await axios.post(`${baseURL}/post/purchase`, dataToSave);

      if (response.status === 201) {
        alert(response.data.message);

        // Reset formData and tableData
        setFormData({
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
          terms:"Cash",
          indent: "",
          bill_no: "",
          type: "",
          rate_cut: "",
          date: "",
          bill_date: "",
          due_date: "",
          Purchase_rate: "",
        });

        setTableData([]);
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error);
      alert("Failed to save data.");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/account-details`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        // Filter only suppliers
        const customers = result.filter(
          (item) => item.account_group === 'CUSTOMERS'
        );

        setCustomers(customers);
        // setLoading(false);
        console.log("Customers=", customers)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    fetchProducts();
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
        design_name: product.design_master || "",
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
        design_name: "",
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
        design_name: product.design_master || "",
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
        design_name: "",
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
        design_name: product.design_master || "",
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
        design_name: "",
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
          code: '', // Priority to tag code if available
          product_id: product.product_id,
          product_name: product.product_name,
          metal_type: product.Category,
          design_name: product.design_master,
          purity: product.purity,
          gross_weight: "", // Use tag's gross weight
          stone_weight: "",
          stone_price:"",
          weight_bw: "",
          va_on: "",
          va_percent:  "",
          wastage_weight: "",
          total_weight_aw: "",
          mc_on: "",
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
          design_name: product.design_master,
          purity: product.purity,
          hsn: product.hsn_code || "",
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
      // Reset form data if no product is selected
      setFormData((prevData) => ({
        ...prevData,
        code: "",
        product_id: "",
        product_name: "",
        metal_type: "",
        design_name: "",
        purity: "",
        hsn:"",
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
          design_name: product.design_master,
          purity: product.purity,
          hsn: product.hsn_code || "",
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
            design_name: "",
            purity: "",
            hsn:"",
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
            qty: "", // Reset qty
          }));
          setIsQtyEditable(true); // Default to editable
        }
      }
    } catch (error) {
      console.error("Error handling code change:", error);
    }
  };

  const handleBack = () => {
    navigate('/purchasetable');
  };

  const handleAddCustomer = () => {
    navigate("/customermaster", { state: { from: "/purchase" } });
  };

  return (
    <div className="main-container">
      <div className="purchase-form-container">
        <Form>
          <div className="purchase-form">
            <div className="purchase-form-left">
              {/* Customer Details */}
              <Col className="urd-form-section">
                <h4 className="mb-4">Customer Details</h4>
                <Row>
                  <Col xs={12} md={3} className="d-flex align-items-center">
                    <div style={{ flex: 1 }}>
                      <InputField
                        label="Mobile"
                        name="mobile"
                        type="select"
                        value={formData.customer_id || ""} // Use customer_id to match selected value
                        onChange={(e) => handleCustomerChange(e.target.value)}
                        options={[
                          ...customers.map((customer) => ({
                            value: customer.account_id, // Use account_id as the value
                            label: customer.mobile, // Display mobile as the label
                          })),
                        ]}
                      />
                    </div>
                    <AiOutlinePlus
                      size={20}
                      color="black"
                      onClick={handleAddCustomer}
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        marginBottom: "20px",
                      }}
                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="Customer Name:"
                      name="account_name"
                      type="select"
                        value={formData.customer_id || ""} // Use customer_id to match selected value
                        onChange={(e) => handleCustomerChange(e.target.value)}
                        options={[
                          ...customers.map((customer) => ({
                            value: customer.account_id, // Use account_id as the value
                            label: customer.account_name, // Display mobile as the label
                          })),
                        ]}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="Email:"

                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="Address1:"
                      value={formData.address1}
                      onChange={(e) => handleChange("address1", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="Address2:"
                      value={formData.address2}
                      onChange={(e) => handleChange("address2", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="PinCode"
                      value={formData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="State:" value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="State Code:" value={formData.state_code}
                      onChange={(e) => handleChange("state_code", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="Aadhar" value={formData.aadhar_card}
                      onChange={(e) => handleChange("aadhar_card", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="GSTIN" value={formData.gst_in}
                      onChange={(e) => handleChange("gst_in", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="PAN" value={formData.pan_card}
                      onChange={(e) => handleChange("pan_card", e.target.value)} />
                  </Col>

                </Row>

              </Col>
            </div>
            <div className="purchase-form-right">
              <Col className="urd-form-section">
                <Row>
                <Col xs={12} md={4}>
                <InputField label="Terms" type="select" value={formData.terms}
                  onChange={(e) => handleChange("terms", e.target.value)}
                  options={[
                    { value: "Cash", label: "Cash" },
                    { value: "Credit", label: "Credit" },
                  ]}
                   />
              </Col>
                  <Col xs={12} md={4} >
                    <InputField label="Indent" value={formData.indent}
                      onChange={(e) => handleChange("indent", e.target.value)} />
                  </Col>
                  <Col xs={12} md={4} >
                    <InputField label="Bill No" value={formData.bill_no}
                      onChange={(e) => handleChange("bill_no", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Type" value={formData.type}
                      onChange={(e) => handleChange("type", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Rate-Cut" value={formData.rate_cut}
                      onChange={(e) => handleChange("rate_cut", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6}>
                    <InputField
                      label="Date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Bill Date" type="date" value={formData.bill_date}
                      onChange={(e) => handleChange("bill_date", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Due Date" type="date" value={formData.due_date}
                      onChange={(e) => handleChange("due_date", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Rate" value={formData.Purchase_rate}
                      onChange={(e) => handleChange("Purchase_rate", e.target.value)} />
                  </Col>

                </Row>


              </Col>
            </div>
          </div>

          <div className="urd-form-section">
            {/* <h4>Purchase Details</h4> */}
            <Row>
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
                {/* <Col xs={12} md={2}>
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
                </Col> */}
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
                    name="design_name"
                    value={formData.design_name}
                    onChange={(e) => handleDesignNameChange(e.target.value)}
                    type="select"
                    options={products.map((product) => ({
                      value: product.design_master,
                      label: product.design_master,
                    }))}
                  />
                </Col>
              {/* <Col xs={12} md={2}>
                <InputField
                  label="Purity:"
                  type="select"
                  value={formData.purity}
                  onChange={(e) => handleChange('purity', e.target.value)}
                  options={[
                    { value: "24K", label: "24K" },
                    { value: "22K", label: "22K (916)" },
                    { value: "22KHM", label: "22K (916HM)" },
                    { value: "18K", label: "18K (750)" },
                    { value: "14K", label: "14K (585)" },
                    { value: "10K", label: "10K (417)" },
                    { value: "9K", label: "9K (375)" },
                  ]}
                />
              </Col> */}
              
              <Col xs={12} md={1}>
                <InputField label="HSN" type="text" value={formData.hsn}
                  onChange={(e) => handleChange("hsn", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Type" type="text" value={formData.product_type}
                  onChange={(e) => handleChange("product_type", e.target.value)} />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="Stock Type" type="text" value={formData.stock_type}
                  onChange={(e) => handleChange("stock_type", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="PCs" type="text" value={formData.pcs}
                  onChange={(e) => handleChange("pcs", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Gross" type="number" value={formData.gross_weight}
                  onChange={(e) => handleChange("gross_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Stone" type="number" value={formData.stone_weight}
                  onChange={(e) => handleChange("stone_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Net" type="number" value={formData.net_weight}
                  onChange={(e) => handleChange("net_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={2}>
                  <InputField
                    label="Purity"
                    name="purity"
                    value={formData.purity}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={1}>
                <InputField label="Pure Wt" type="number" value={formData.pure_weight}
                  onChange={(e) => handleChange("pure_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Rate" type="number" value={formData.stone_rate}
                  onChange={(e) => handleChange("stone_rate", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Unit" type="number" value={formData.unit_weight}
                  onChange={(e) => handleChange("unit_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="W%" type="number" value={formData.waste_percentage}
                  onChange={(e) => handleChange("waste_percentage", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Waste" type="number" value={formData.waste_amount}
                  onChange={(e) => handleChange("waste_amount", e.target.value)} />
              </Col>
              
              <Col xs={12} md={1}>
                <InputField label="Alloy" value={formData.alloy}
                  onChange={(e) => handleChange("alloy", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Cost" type="number" value={formData.cost}
                  onChange={(e) => handleChange("cost", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Total Wt" type="number" value={formData.total_weight}
                  onChange={(e) => handleChange("total_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="WT*Rate Amt" type="number" value={formData.wt_rate_amount}
                  onChange={(e) => handleChange("wt_rate_amount", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="MC/Gm" type="number" value={formData.mc_per_gram}
                  onChange={(e) => handleChange("mc_per_gram", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="MC" type="number" value={formData.mc}
                  onChange={(e) => handleChange("mc", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Total" type="number" value={formData.total_amount}
                  onChange={(e) => handleChange("total_amount", e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={2}>
                <InputField label="Stone" value={formData.stone}
                  onChange={(e) => handleChange("stone", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="PCs" type="number" value={formData.stone_pcs}
                  onChange={(e) => handleChange("stone_pcs", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="CT" type="number" value={formData.stone_ct}
                  onChange={(e) => handleChange("stone_ct", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Gms" type="number" value={formData.gms}
                  onChange={(e) => handleChange("gms", e.target.value)} />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="CWP" type="select" value={formData.cwp}
                  onChange={(e) => handleChange("cwp", e.target.value)}
                  options={[
                    { value: "ct", label: "ct" },
                    { value: "weight", label: "weight" },
                    { value: "piece", label: "piece" },
                  ]}
                   />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Rate" type="number" value={formData.rate}
                  onChange={(e) => handleChange("rate", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Stn.Amt" type="number" value={formData.stone_amount}
                  onChange={(e) => handleChange("stone_amount", e.target.value)} />
              </Col>
              {/* <Col xs={12} md={1}>
                <InputField label="Clear" value={formData.clear}
                  onChange={(e) => handleChange("clear", e.target.value)} />
              </Col> */}
              <Col xs={12} md={1}>
                <InputField label="Clarity" value={formData.clarity}
                  onChange={(e) => handleChange("clarity", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Colour" value={formData.class}
                  onChange={(e) => handleChange("class", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Cut" value={formData.cut}
                  onChange={(e) => handleChange("cut", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="CT" type="number" value={formData.stone_ct}
                  onChange={(e) => handleChange("stone_ct", e.target.value)} />
              </Col>
             
              <Col xs={12} md={1}>
                <Button
                  style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <div style={{ overflowX: "scroll" }}>
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                  <th>BarCode/Rbarcode</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Metal Type</th>
                    <th>Design Name</th>
                    <th>Purity</th>
                    <th>HSN</th>
                    <th>Product Type</th>
                    <th>Stock Type</th>
                    <th>Pieces</th>
                    <th>Gross Weight</th>
                    <th>Stone Weight</th>
                    <th>Net Weight</th>
                    <th>Unit Weight</th>
                    <th>Waste Percentage</th>
                    <th>Waste Amount</th>
                    <th>Pure Weight</th>
                    <th>Alloy</th>
                    <th>Cost</th>
                    <th>Total Weight</th>
                    <th>Weight Rate Amount</th>
                    <th>MC Per Gram</th>
                    <th>Making Charges</th>
                    <th>Stone Amount</th>
                    <th>Total Amount</th>
                    <th>Stone</th>
                    <th>Stone Pieces</th>
                    <th>Stone Carat</th>
                    <th>CWP</th>
                    <th>GMS</th>
                    <th>Stone Rate</th>
                    <th>Clarity</th>
                    <th>Rate</th>
                    <th>Clear</th>
                    <th>Class</th>
                    <th>Cut</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.code}</td>
                      <td>{data.product_id}</td>
                      <td>{data.product_name}</td>
                      <td>{data.metal_type}</td>
                      <td>{data.design_name}</td>
                      <td>{data.purity}</td>
                      <td>{data.hsn}</td>
                      <td>{data.product_type}</td>
                      <td>{data.stock_type}</td>
                      <td>{data.pcs}</td>
                      <td>{data.gross_weight}</td>
                      <td>{data.stone_weight}</td>
                      <td>{data.net_weight}</td>
                      <td>{data.unit_weight}</td>
                      <td>{data.waste_percentage}</td>
                      <td>{data.waste_amount}</td>
                      <td>{data.pure_weight}</td>
                      <td>{data.alloy}</td>
                      <td>{data.cost}</td>
                      <td>{data.total_weight}</td>
                      <td>{data.wt_rate_amount}</td>
                      <td>{data.mc_per_gram}</td>
                      <td>{data.mc}</td>
                      <td>{data.stone_amount}</td>
                      <td>{data.total_amount}</td>
                      <td>{data.stone}</td>
                      <td>{data.stone_pcs}</td>
                      <td>{data.stone_ct}</td>
                      <td>{data.cwp}</td>
                      <td>{data.gms}</td>
                      <td>{data.stone_rate}</td>
                      <td>{data.clarity}</td>
                      <td>{data.rate}</td>
                      <td>{data.clear}</td>
                      <td>{data.class}</td>
                      <td>{data.cut}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="form-buttons">
            <Button type="submit" variant="success" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }} onClick={handleSave}>Save</Button>

            <Button
              variant="secondary"
              onClick={handleBack} style={{ backgroundColor: 'gray', marginRight: '10px' }}
            >
              cancel
            </Button>

          </div>
        </Form>
      </div>
    </div>
  );
};

export default URDPurchase;
