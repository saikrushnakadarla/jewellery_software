import React, { useState, useEffect } from "react";
import "./Repairs.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import baseURL from "../../../../Url/NodeBaseURL";

const RepairForm = () => {
  const navigate = useNavigate();
  const [metal, setMetal] = useState("");
  const [type, setType] = useState("");
  const [purity, setPurity] = useState("");
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [customers, setCustomers] = useState([]); // State to store customers
  const [selectedCustomer, setSelectedCustomer] = useState(""); // State for selected customer
  const [customerDetails, setCustomerDetails] = useState({
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/supplier-and-customer`);
        const result = await response.json();

        // Filter only customers
        const customers = result.filter(
          (item) => item.account_group && item.account_group.toLowerCase() === "customer"
        );

        setCustomers(customers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);
    console.log("Selected Customer ID:", customerId);


  
    // Ensure type consistency for comparison
    const customer = customers.find((cust) => String(cust.id) === String(customerId));
    console.log("Selected Customer Data:", customers.find((cust) => String(cust.id) === String(customerId)));
  
    if (customer) {
      setCustomerDetails({
        mobile: customer.phone || "",
        email: customer.email || "",
        address1: customer.address1 || "",
        address2: customer.address2 || "",
        city: customer.city || "",
      });
    } else {
      // Reset fields if no customer found
      setCustomerDetails({
        mobile: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
      });
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image as the source
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="main-container">
    <Container className="repair-form-container">
      <form className="repair-form">
        {/* Left Section */}
        <div className="repair-form-left">
          {/* Customer Details */}
          <Col className="form-section">
            <h4 className="mb-4">Customer Details</h4>
            <Row>
            <Col xs={12} md={4}>
                  <InputField
                    label="Customer:"
                    type="select"
                    value={selectedCustomer}
                    onChange={(e) => handleCustomerChange(e.target.value)}
                    options={[
                      { value: "", label: loading ? "Loading..." : "Select Customer" },
                      ...customers.map((customer) => ({
                        value: customer.id,
                        label: customer.account_name,
                      })),
                    ]}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <InputField
                    label="Mobile:"
                    value={customerDetails.mobile}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={4}>
                  <InputField
                    label="Email:"
                    type="email"
                    value={customerDetails.email}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={4}>
                  <InputField
                    label="Address1:"
                    value={customerDetails.address1}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={4}>
                  <InputField
                    label="Address2:"
                    value={customerDetails.address2}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={4}>
                  <InputField
                    label="City:"
                    value={customerDetails.city}
                    readOnly
                  />
                </Col>
            
            </Row>
            </Col>
         
        </div>
        {/* Right Section */}
        <div className="repair-form-right">
          <Col className="form-section">
          
            <Row >
            <InputField label="Entry Type:" value="REPAIR" readOnly />
            </Row>
            <Row>  
              <InputField label="Repair No:" />
            </Row>
            <Row>
            <InputField label="Date:" type="date" />

            </Row>
            
          </Col>
        </div>
      </form>
      <Row className="form-section pt-4">
      <Col xs={12} md={2}>
            <InputField label="Staff:" />
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Delivery Date:" type="date" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Place:" />
            </Col>
            <Col xs={12} md={2}>
            <InputField
                label="Metal:"
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
            <Col xs={12} md={3}>
            <InputField label="Counter:" placeholder="Counter Name" />
            </Col>
      </Row>

      <form className="repair-form2">      
        <div className="repair-form-left">
        <Col className="form-section">
          <h4>Repair Item Details</h4>
          <Row>
          <Col xs={12} md={2}>
                  
              <InputField
              label="Type:"
              type="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "ORDER PURPOSE", label: "Order Purpose" },
                { value: "REPAIR PURPOSE", label: "Repair Purpose" },
              ]}
            />
           </Col>
            <Col xs={12} md={4}>
            <InputField label="Item:" placeholder="Item Name" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Tag No:" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Description:" placeholder="Description" />
            </Col>
            <Col xs={12} md={2}>
            <InputField
              label="Purity:"
              type="select"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              options={[
                { value: "916HM", label: "916HM" },
                { value: "22K", label: "22K" },
                { value: "18K", label: "18K" },
              ]}
            />
            </Col>
            </Row>
        </Col>
        </div>
        <div className="repair-form-right">
        <Col className="form-section">
        <h4>Upload Image</h4>
              <Row>
                <Col xs={12} md={4}>
                  <div className="image-upload-container">
                    <label htmlFor="image-upload" className="upload-button">
                      Upload
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      
                    />  
                    {image && (
                      <div className="image-preview">
                        <img src={image} alt="Uploaded" className="img-thumbnail" />
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
        </Col>
        </div>
        </form>
      
        {/* Extra Charges */}
        <Row className="form-section">
          <h4>Extra Charges</h4> 
          <Col xs={12} md={2}>
              <InputField label="Extra Weight:" />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Stone Value:" />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Making Charge (MC):" />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Handling Charge (HC):" />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Total:" />
            </Col>
          </Row>
          
        {/* Buttons */}
        <div className="form-buttons">
          <Button type="submit" className="cus-back-btn" variant="secondary" onClick={() => navigate("/repairstable")}>cancel</Button>
          <Button type="submit" variant="primary" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Save</Button>
        </div>
      </Container>
      </div>
  );
};

export default RepairForm;
