import React, { useState, useEffect } from "react";
import "./Repairs.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import baseURL from "../../../../Url/NodeBaseURL";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const RepairForm = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    customer_id:"",
    account_name: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    staff: "",
    delivery_date: "",
    place: "",
    metal: "",
    counter: "",
    entry_type: "Repair",
    receipt_no: "",
    repair_no: "",
    date: today,
    metal_type: "",
    item: "",
    tag_no: "",
    description: "",
    purity: "",
    extra_weight: "",
    stone_value: "",
    making_charge: "",
    handling_charge: "",
    total: "",
    status: "Pending",
  });

  const [customers, setCustomers] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [purityData, setPurityData] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPurity = async () => {
      try {
        const response = await axios.get(`${baseURL}/purity`);
        setPurityData(response.data);
      } catch (error) {
        console.error("Error fetching purity data:", error);
      }
    };

    fetchPurity();
  }, []);

  useEffect(() => {
    const fetchMetalTypes = async () => {
      try {
        const response = await axios.get(`${baseURL}/metaltype`);
        setMetalTypes(response.data);
        console.log("Metal Type=", response.data)
      } catch (error) {
        console.error("Error fetching metal types:", error);
      }
    };
    fetchMetalTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchRepairDetails = async () => {
        try {
          const response = await axios.get(`${baseURL}/get/repairs/${id}`);
          if (response.status === 200) {
            const repairData = response.data;
  
            const parseDate = (dateString) => {
              if (!dateString) return '';
              const date = new Date(dateString);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              return `${year}-${month}-${day}`;
            };
  
            setFormData((prev) => ({
              ...prev,
              ...repairData,
              date: parseDate(repairData.date),
              delivery_date: parseDate(repairData.delivery_date),
              repair_no: repairData.repair_no, // Ensure repair_no is set correctly
            }));
  
            if (repairData.customer_id) {
              handleCustomerChange(repairData.customer_id);
            }
          }
        } catch (error) {
          console.error("Error fetching repair details:", error);
        }
      };
  
      fetchRepairDetails();
    }
  }, [id]);
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      image,
    };

    try {
      if (id) {
        // Update existing repair record
        const response = await axios.put(`${baseURL}/update/repairs/${id}`, updatedFormData);
        if (response.status === 200) {
          alert("Repair entry updated successfully!");
        }
      } else {
        // Create a new repair record
        const response = await axios.post(`${baseURL}/add/repairs`, updatedFormData);
        if (response.status === 201) {
          alert("Repair entry added successfully!");
        }
      }
      navigate("/repairstable");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the repair entry");
    }
  };


  const handleAddCustomer = () => {
    navigate("/customermaster", { state: { from: "/repairs" } });
  };

  const handleBack = () => {
    navigate("/repairstable");
  };

  useEffect(() => {
    if (!id) {
      const fetchLastRPNNumber = async () => {
        try {
          const response = await axios.get(`${baseURL}/lastRPNNumber`);
          setFormData((prev) => ({
            ...prev,
            repair_no: response.data.lastRPNNumber, // Only set repair_no when creating a new repair
          }));
        } catch (error) {
          console.error('Error fetching RPN number:', error);
        }
      };
  
      fetchLastRPNNumber();
    }
  }, [id]);
  

  return (
    <div className="main-container">
      <Container className="repair-form-container">
        <Form onSubmit={handleSubmit}>
          <div className="repair-form" >
            {/* Left Section */}
            <div className="repair-form-left">
              <Col className="form-section">
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
                      label="City:"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      readOnly
                    />
                  </Col>
                </Row>
              </Col>
            </div>
            <div className="repair-form-right">
              <Col className="form-section">
                <Row>
                  <InputField
                    label="Entry Type:"
                    name="entry_type"
                    type="select"
                    value={formData.entry_type}
                    onChange={handleChange}
                    options={[
                      { value: "Repair", label: "Repair" },
                      { value: "Poolish", label: "Poolish" },
                      { value: "Other", label: "Other" }
                    ]}
                  />
                </Row>
                <Row>
                <InputField
  label="Repair No:"
  name="repair_no"
  value={formData.repair_no}
  onChange={handleChange}
  readOnly
/>

                </Row>
                <Row>
                  <InputField label="Date:" name="date" type="date" value={formData.date} onChange={handleChange} />
                </Row>
              </Col>
            </div>
          </div>
          <Row className="form-section pt-4">
            <Col xs={12} md={2}>
              <InputField label="Staff:" name="staff" value={formData.staff} onChange={handleChange} />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Delivery Date:" type="date" name="delivery_date" value={formData.delivery_date} onChange={handleChange} />
            </Col>
            <Col xs={12} md={3}>
              <InputField label="Place:" name="place" value={formData.place} onChange={handleChange} />
            </Col>

            <Col xs={12} md={3}>
              <InputField label="Counter:" name="counter" value={formData.counter} onChange={handleChange} />
            </Col>
          </Row>
          <div className="repair-form2">
            <div className="repair-form-left">
              <Col className="form-section">
                <h4>Repair Item Details</h4>
                <Row>
                  <Col xs={12} md={2}>
                    <InputField
                      label="Metal Type:"
                      name="metal_type"
                      type="select"
                      value={formData.metal_type}
                      onChange={handleChange}
                      options={[
                        ...metalTypes.map((metal) => ({
                          value: metal.metal_name,
                          label: metal.metal_name
                        }))
                      ]}
                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="Item:" name="item" value={formData.item} onChange={handleChange} />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField label="Tag No:" name="tag_no" value={formData.tag_no} onChange={handleChange} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="Description:" name="description" value={formData.description} onChange={handleChange} />
                  </Col>
                  <Col xs={12} md={2}>
                  <InputField
                    label="Purity:"
                    name="purity"
                    type="select"
                    value={formData.purity}
                    onChange={handleChange}
                    options={
                      purityData.map((item) => ({
                        value: item.name,
                        label: item.name,
                      }))
                    }
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
                      <label htmlFor="image-upload" className="upload-button">Upload</label>
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
          </div>
          <div className="form-buttons">
            <Button className="cus-back-btn" variant="secondary" onClick={handleBack}>cancel</Button>
            <Button
              type="submit"
              variant="primary"
              style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
            >
              {id ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default RepairForm;
