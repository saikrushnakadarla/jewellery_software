import React, { useState, useEffect } from "react";
import "./Purchase.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button,Table,Form } from "react-bootstrap";
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
    const [formData, setFormData] = useState({
      mobile: "",
      customer_name: "",
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
      indent: "",
      bill_no: "",
      type: "",
      rate_cut: "",
      date: "",
      bill_date: "",
      due_date: "",
      Purchase_rate: "",
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
      stone_gms: "",
      cwp: "",
      gms: "",
      stone_rate: "",
      clarity: "",
      rate: "",
      clear: "",
      class: "",
      cut: "",
    });
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
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
          console.log("Customers=",customers)
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
      console.log("Customer Id=",customer)
    
      if (customer) {
        setFormData({
          ...formData,
          customer_id: customerId, // Ensure this is correctly set
          name: customer.account_name, // Set the name field to the selected customer
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
          name: "",
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
    const handleBack = () => {
        navigate('/urdpurchasetable');
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
                  { value: "", label: "Select" }, // Placeholder option
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                <InputField
                    label="Email:"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                <InputField
                    label="Address1:"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                <InputField
                    label="Address2:"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                  <InputField 
                  label="PinCode" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="State:"  name="state" value={formData.state} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="State Code:"  name="state_code" value={formData.state_code} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="Aadhar" name="aadhar_card" value={formData.aadhar_card} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="GSTIN"name="gst_in" value={formData.gst_in} onChange={handleChange} readOnly />
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="PAN" name="pan_card" value={formData.pan_card} onChange={handleChange} readOnly />
                </Col>
                
              </Row>
            
          </Col> 
        </div>
        <div className="purchase-form-right">
          <Col className="urd-form-section">
          <Row>
          <Col xs={12} md={6} >  
              <InputField label="Indent" />
            </Col>
            <Col xs={12} md={6} >
              <InputField label="Bill No" />
            </Col> 
            <Col xs={12} md={6} >
              <InputField label="Type" />
            </Col> 
            <Col xs={12} md={6} >
              <InputField label="Rate-Cut" />
            </Col> 
            <Col xs={12} md={6} >
              <InputField label="Date" type="date"  />
            </Col> 
            <Col xs={12} md={6} >
              <InputField label="Bill Date" type="date"  />
            </Col> 
            <Col xs={12} md={6} >
              <InputField label="Due Date" type="date" />
            </Col> 
            <Col xs={12} md={6} >
              <InputField label="Rate" />
            </Col> 
           
          </Row>
           
            
          </Col>
        </div>
      </div>

      <div className="urd-form-section">
        {/* <h4>Purchase Details</h4> */}
        <Row>
        <Col xs={12} md={1}>
        <InputField label="P ID" />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Product Name "
            type="select"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            options={[
              { value: "PRODUCT1", label: "Product1" },
              { value: "PRODUCT2", label: "Product2" },
              { value: "PRODUCT3", label: "Product3" },
              { value: "PRODUCT4", label: "Product4" },
            ]}
          />
          </Col>
          <Col xs={12} md={2}>
          <InputField
            label="Metal Type"
            type="select"
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
            options={[
              { value: "GOLD", label: "Gold" },
              { value: "SILVER", label: "Silver" },
              { value: "PLATINUM", label: "Platinum" },
            ]}
          />
          </Col>
          <Col xs={12} md={2}>
          <InputField
            label="Design Name"
            type="select"
            value={metal}
            onChange={(e) => setMetal(e.target.value)}
            options={[
              { value: "GOLD", label: "Gold" },
              { value: "SILVER", label: "Silver" },
              { value: "PLATINUM", label: "Platinum" },
            ]}
          />
          </Col>
          <Col xs={12} md={1}>
          <InputField
            label="Purity:"
            type="select"
            value={purity}
            onChange={(e) => setPurity(e.target.value)}
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
          </Col>          
          <Col xs={12} md={1}>
          <InputField label="HSN" type="text" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Type" type="text" />
          </Col>
          <Col xs={12} md={2}>
          <InputField label="Stock Type" type="text" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="PCs" type="text" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Gross" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Stone" type="number" />
          </Col> 
          <Col xs={12} md={1}>
          <InputField label="Net" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Rate" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Unit" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="W%" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Waste" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Pure Wt" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Alloy" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Cost" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Total Wt" type="number" />
          </Col>
          <Col xs={12} md={2}>
          <InputField label="WT*Rate Amt" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="MC/Gm" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="MC" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Stn.Amt" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Total" type="number" />
          </Col>
          </Row>
          <Row>
          <Col xs={12} md={2}>
          <InputField label="Stone"/>
          </Col>
          <Col xs={12} md={1}>
          <InputField label="PCs" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="CT" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Gms" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="CWP" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Rate" type="number" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Clear"/>
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Class" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Cut" />
          </Col>
          <Col xs={12} md={1}>
          <InputField label="Clarity"/>
          </Col>
          <Col xs={12} md={1}>
            <Button style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Add</Button>
          </Col>
          </Row>
      </div>

        <div className="form-buttons">
          <Button type="submit" variant="success" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Save</Button>

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
