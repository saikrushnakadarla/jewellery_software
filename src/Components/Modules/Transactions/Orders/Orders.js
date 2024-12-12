import React, { useState, useEffect } from "react";
import "./Orders.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table ,Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import baseURL from "../../../../Url/NodeBaseURL";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const RepairForm = () => {
  const [metal, setMetal] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    
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
        mobile: customer.phone || "",
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
    navigate('/salestable');
  };

  const handleAddCustomer = () => {
    navigate("/customermaster", { state: { from: "/sales" } });
  };

  return (
    <div className="main-container">
      <Container className="sales-form-container">
        <Form>

        <div className="sales-form">
          <div className="sales-form-left">
            <Col className="sales-form-section">
              <Row>
                <Col xs={12} md={2}  className="d-flex align-items-center">
                  <div style={{ flex: 1 }}>
                  <InputField
                  label="Mobile:"
                  name="customer_id"
                  type="select"
                  value={formData.mobile || ""}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  options={[
                    ...customers.map((customer) => ({
                      value: customer.account_id,
                      label: customer.mobile, // Use account_name or your preferred field
                    })),
                  ]}
                />
                </div>
                <AiOutlinePlus
                  size={20}
                  color="black"
                  onClick={handleAddCustomer}
                  style={{ marginLeft: '10px', cursor: 'pointer', marginBottom:'20px' }}
                />
                </Col>
                <Col xs={12} md={2}>
                <InputField
                    label="Customer Name:"
                    name="name"
                    value={formData.name}
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
                <Col xs={12} md={1}>
                  <InputField 
                  label="PIN" 
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
                  <InputField label="State Code:"  name="state" value={formData.state_code} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={3}>
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
          <div className="sales-form-right">
          <Col className="sales-form-section">          
          <Row>
            <InputField label="Date:" type="date" />
          </Row> 
          <Row>
            <InputField label="Invoice Number:" />
          </Row>             
          </Col>
          
          </div>
        </div>
        <div className="sales-form-section"> 
        <Col >
              <Row>
                
                <Col xs={12} md={2}>
                  <InputField
                    label="BarCode/Rbarcode"
                    type="select"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    options={[
                      { value: "BarCode", label: "BarCode" },
                      { value: "Rbarcode", label: "Rbarcode" },
                      
                    ]}
                  />
                </Col>

                <Col xs={12} md={2}>
                  <InputField
                    label="P ID"
                    type="select"
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
                    options={[
                      { value: "916HM", label: "916HM" },
                      { value: "22k", label: "22k" },
                      { value: "18k", label: "18k" },
                    ]}
                  />
                </Col>
                
                <Col xs={12} md={3}>
                  <InputField
                    label="Product Name"
                    
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Metal Type"
                                       
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Design Name"
                    
                  />
                </Col>
                <Col xs={12} md={1}>
                  <InputField label="Purity" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Gross Weight" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Stone Weight" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Weight BW" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Stone Price" />
                </Col>
                
                <Col xs={12} md={1}>
                  <InputField label="VA On" />
                </Col>
                <Col xs={12} md={1}>
                  <InputField label="VA%" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage Weight" />
                </Col>
                
                <Col xs={12} md={2}>
                  <InputField label="Total Weight AW" />
                </Col>
                <Col xs={12} md={1}>
                  <InputField
                    label="MC on"                   
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="MC Per Gram"                   
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Making Charges"                   
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Rate" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Total Price" />
                </Col>
               
                {/* <Col xs={12} md={3}>
                  <InputField label="Rodium" />
                </Col>   */}
                <Col xs={12} md={1}>
                <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Add</Button>
                </Col>              
              </Row>
            </Col>
        </div>

        <div className="sales-form-section">
          <Table bordered hover responsive>
          <thead>
          <tr>            
            <th>Sadashri Jewels</th>
            <th>Code</th>
            <th>P ID</th>
            <th>Product Name</th>
            <th>Design Name</th>
            <th>Purity</th>
            <th>Gross Weight</th>
            <th>Stone Weight</th>
            <th>Stone Price</th>
            <th>Weight BW</th>
            <th>Wastage On</th>
            <th>VA%</th>
            <th>Wastage Weight</th>
            <th>Total Weight AW</th>
            <th>Making Charges on</th>
            <th>MC Per Gram</th>
            <th>Making Charges</th>
            <th>Rodium</th>
          </tr>
        </thead>
            <tbody>

            </tbody>
          </Table>
        </div>
        <div className="sales-form2">
          <div className="sales-form-third">
            <Col className="sales-form-section">
              <Row >
                <h4 className="mb-3">Old</h4>
                <Col xs={12} md={3}>
                  <InputField
                    label="Category"
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
                <Col xs={12} md={4}>
                  <InputField label="Item" />
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="Dust" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Purity"
                    type="select"
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
                    options={[
                      { value: "916HM", label: "916HM" },
                      { value: "22k", label: "22k" },
                      { value: "18k", label: "18k" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Touch %" />
                </Col>
                <Col xs={12} md={3}>
                  <InputField
                    label="Remark"
                    type="select"
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
                    options={[
                      { value: "916HM", label: "916HM" },
                      { value: "22k", label: "22k" },
                      { value: "18k", label: "18k" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="Rate" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="HSN"
                    type="select"
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
                    options={[
                      { value: "916HM", label: "916HM" },
                      { value: "22k", label: "22k" },
                      { value: "18k", label: "18k" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Amount" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Stone"
                    type="select"
                    value={metal}
                    onChange={(e) => setMetal(e.target.value)}
                    options={[
                      { value: "916HM", label: "916HM" },
                      { value: "22k", label: "22k" },
                      { value: "18k", label: "18k" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={1}>
                  <InputField label="PCs" />
                </Col>
                <Col xs={12} md={1}>
                  <InputField label="CT" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="R" />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="S.Amt" />
                </Col>
                <Col xs={12} md={1}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="cashCheckbox"
                      value="cash"
                    />
                    <label className="form-check-label" htmlFor="cashCheckbox">
                      Cash
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hallMarkCheckbox"
                      value="hallmark"
                    />
                    <label className="form-check-label" htmlFor="hallMarkCheckbox">
                      HallMark
                    </label>
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
          <div className="sales-form-fourth">
            <Col className="sales-form-section">
              <Row>
                <h4 className="mb-3">Payment Details</h4>
                <Col xs={12} md={4}>
                  <InputField label="Cash" />
                </Col>
                <Col xs={12} md={4}>
                  <InputField label="Card" />
                </Col>
                <Col xs={12} md={4}>
                  <InputField label="Amt" />
                </Col>
                <Col xs={12} md={4}>
                  <InputField label="Chq#" />
                </Col>
                <Col xs={12} md={4}>
                  <InputField label="Amt" />
                </Col>
                <Col xs={12} md={4}>
                  <InputField label="Online " />
                </Col>
                <Col xs={12} md={4}>
                  <InputField label="Amt" />
                </Col>
                <Col xs={12} md={2}>
                  <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Save</Button>
                </Col>
                <Col xs={12} md={2}>
                <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Print</Button>
                </Col>
                <Col xs={12} md={2}>
                <Button
            type="button"
            className="cus-back-btn"
            variant="secondary"
            onClick={handleBack} style={{ backgroundColor: 'gray', marginRight: '10px' }}
          >
            cancel
          </Button>
                </Col>
                
              </Row>
            </Col>
          </div>

        </div>

        {/* Buttons */}
                        
        </Form>
      </Container>
    </div>
  );
};

export default RepairForm;
