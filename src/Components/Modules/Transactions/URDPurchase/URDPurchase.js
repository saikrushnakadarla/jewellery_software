import React, { useState, useEffect } from "react";
import "./URDPurchase.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button,Table, Form } from "react-bootstrap";
import { renderMatches, useNavigate } from 'react-router-dom';
import baseURL from "../../../../Url/NodeBaseURL";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const URDPurchase = () => {

    const [metal, setMetal] = useState("");
    const [type, setType] = useState("");
    const [purity, setPurity] = useState("");
    const [product, setProduct] = useState("");
 
    const [gross, setGross] = useState(0);
    const [dust, setDust] = useState(0);

    const [rate, setRate] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState(
      JSON.parse(localStorage.getItem("purchaseItems")) || []
    );
    const [formData, setFormData] = useState({
      customer_id: "",
      account_name: "",
      mobile: "",
      email: "",
      address1: "",
      address2: "",
      address3: "",
      city: "",
      state: "",
          state_code: "",
          aadhar_card: "",
          gst_in: "",
          pan_card: "",
          date: "",
          puchase_number: "",

      
    });
    const [productDetails, setProductDetails] = useState({
      product_id: "",
      product_name: "",
      metal: "",
      purity: "",
      hsn_code: "",
      gross: 0,
      dust: 0,
      touch_percent: 0,
      ml_percent: 0,
      eqt_wt: 0,
      remarks: "",
      rate: 0,
      total_amount: 0,
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
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
          date: "",
          purchase_number: "",
        });
      }
    };
    const handleBack = () => {
        navigate('/urdpurchasetable');
    };

    const handleAddCustomer = () => {
      navigate("/customermaster", { state: { from: "/urd_purchase" } });
    };

    useEffect(() => {
      localStorage.setItem("purchaseItems", JSON.stringify(items));
    }, [items]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleAddItem = () => {
      // Ensure product_name and metal are selected before adding the item
      if (productDetails.product_name && productDetails.metal) {
        // Create a new item with the current productDetails
        const newItem = { ...productDetails };
    
        // Update the items array with the new item
        setItems([...items, newItem]);
    
        // Clear the productDetails state after adding the item
        setProductDetails({
          product_id: "",
          product_name: "",
          metal: "",
          purity: "",
          hsn_code: "",
          gross: 0,
          dust: 0,
          touch_percent: 0,
          ml_percent: 0,
          eqt_wt: 0,
          remarks: "",
          rate: 0,
          total_amount: 0,
        });
      }
    };
    
  
    const handleSubmit = async () => {
      const payload = {
        customerDetails: formData,
        items: items,
      };
  
      try {
        await axios.post("http://localhost:5000/save-purchase", payload);
        alert("Purchase saved successfully!");
        localStorage.removeItem("purchaseItems");
        setItems([]);
        navigate("/urdpurchasetable");
      } catch (error) {
        console.error("Error saving purchase:", error);
      }
    };

  return (
    <div className="main-container">
    <div className="urdpurchase-form-container">
      <Form>
        <div className="urdpurchase-form">
        {/* Left Section */}
        <div className="urdpurchase-form-left">
          {/* Customer Details */}
          <Col className="urd-form-section">
            <h4 className="mb-3">Customer Details</h4>
            <Row>
            <Col xs={12} md={2} className="d-flex align-items-center">
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
                <Col xs={12} md={2}>
                <InputField
                    label="Customer Name:"
                    name="account_name"
                    value={formData.account_name}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                <InputField
                    label="Email:"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                <InputField
                    label="Address1:"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                <InputField
                    label="Address2:"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField 
                  label="PinCode" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="State:"  name="state" value={formData.state} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="State Code:"  name="state_code" value={formData.state_code} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Aadhar" name="aadhar_card" value={formData.aadhar_card} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="GSTIN"name="gst_in" value={formData.gst_in} onChange={handleChange} readOnly />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="PAN" name="pan_card" value={formData.pan_card} onChange={handleChange} readOnly />
                </Col>
                
              </Row>
            
          </Col> 
        </div>
        {/* Right Section */}
        <div className="urdpurchase-form-right">
          <div className="urd-form-section">
            <Row className="mt-5">  
              <InputField label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
            </Row>
            <Row>
              <InputField label="URD Purchase No" name="purchase_number"  value={formData.purchase_number} onChange={handleChange}/>
            </Row> 
            
          </div>
        </div>
      </div>
       
      <div className="urd-form-section">
      <h4>Purchase Details</h4>
      <Row>
        <Col xs={12} md={2}>
          <InputField
            label="P ID"
            name="product_id"
            value={productDetails.product_id}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Product"
            type="select"
            name="product_name"
            value={productDetails.product_name}
            onChange={handleInputChange}
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
            label="Metal"
            type="select"
            name="metal"
            value={productDetails.metal}
            onChange={handleInputChange}
            options={[
              { value: "GOLD", label: "Gold" },
              { value: "SILVER", label: "Silver" },
              { value: "PLATINUM", label: "Platinum" },
            ]}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Purity"
            type="select"
            name="purity"
            value={productDetails.purity}
            onChange={handleInputChange}
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
        <Col xs={12} md={2}>
          <InputField
            label="HSN Code"
            type="text"
            name="hsn_code"
            value={productDetails.hsn_code}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Gross"
            type="number"
            name="gross"
            value={productDetails.gross}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Dust"
            type="number"
            name="dust"
            value={productDetails.dust}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Touch %"
            type="number"
            name="touch_percent"
            value={productDetails.touch_percent}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="ML %"
            type="number"
            name="ml_percent"
            value={productDetails.ml_percent}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Eqv WT"
            type="number"
            name="eqt_wt"
            value={productDetails.eqt_wt}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Remarks"
            type="text"
            name="remarks"
            value={productDetails.remarks}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Rate"
            type="number"
            name="rate"
            value={productDetails.rate}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Value"
            type="number"
            name="total_amount"
            value={productDetails.total_amount}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <Button
            style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
            onClick={handleAddItem}
          >
            Add
          </Button>
        </Col>
      </Row>
    </div>
        <div className="urd-form-section">
          <h4>Item Details</h4>
          
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>S.No</th>
                <th>product ID</th>
                <th>Product Name</th>
                <th>Metal</th>
                <th>Purity</th>
              
                <th>HSN</th>
                <th>Gross</th>
                <th>Dust</th>
                <th>Touch%</th>
                <th>ML%</th>
                <th>Eqv WT</th>
                <th>Remark</th>
                <th>Rate</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
            {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.product_id}</td>
              <td>{item.product_name}</td>
              <td>{item.metal}</td>
              <td>{item.purity}</td>
              <td>{item.hsn_code}</td>
              <td>{item.gross}</td>
              <td>{item.dust}</td>
              <td>{item.touch_percent}</td>
              <td>{item.ml_percent}</td>
              <td>{item.eqt_wt}</td>
              <td>{item.remarks}</td>
              <td>{item.rate}</td>
              <td>{item.total_amount}</td>
            </tr>
          ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between px-2 mt-2">
    <h5>Total Amount:</h5>
    <h5>
      ₹{" "}
      {items
        .reduce((sum, item) => sum + parseFloat(item.total_amount || 0), 0)
        .toFixed(2)}
    </h5>
  </div>
        </div>
        <div className="form-buttons">
          <Button type="submit" variant="success" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }} onClick={handleSubmit}>Save</Button>
          <Button type="submit" variant="success" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Print</Button>
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
