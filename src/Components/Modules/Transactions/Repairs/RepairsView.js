import React, { useState, useEffect } from "react";
import "./Repairs.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import baseURL from "../../../../Url/NodeBaseURL";
import axios from "axios";

const RepairForm = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
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
    date: "",
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
    status:"Pending",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
          const data = response.data;
  
          // Format the date field
          const formattedDate = new Date(data.date).toLocaleDateString("en-GB"); // Formats to dd/mm/yyyy
          const formattedDeliveryDate = new Date(data.delivery_date).toLocaleDateString("en-GB");
  
          setFormData({
            ...data,
            date: formattedDate,
            delivery_date: formattedDeliveryDate,
          });
        } catch (error) {
          console.error("Error fetching repair details:", error);
        }
      };
  
      fetchRepairDetails();
    }
  }, [id]);
  

  return (
    <div className="main-container">
    <Container className="repair-form-container">
      <Form>
    <div className="repair-form" >
        <div className="repair-form-left">
          <Col className="form-section">
            <h4 className="mb-4">Customer Details</h4>
            <Row>
            <Col xs={12} md={3} >
            <InputField
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                readOnly
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
                  value={formData.entry_type}
                  onChange={handleChange}
                  readOnly
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
                <InputField label="Date:" name="date"  value={formData.date} onChange={handleChange} readOnly/>
              </Row>            
          </Col>
        </div>
      </div>
      <Row className="form-section pt-4">
      <Col xs={12} md={2}>
              <InputField label="Staff:" name="staff" value={formData.staff} onChange={handleChange} readOnly/>
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Delivery Date:" name="delivery_date" value={formData.delivery_date} onChange={handleChange} readOnly/>
            </Col>
            <Col xs={12} md={3}>
              <InputField label="Place:" name="place" value={formData.place} onChange={handleChange} readOnly/>
            </Col>           
            <Col xs={12} md={3}>
              <InputField label="Counter:" name="counter" value={formData.counter} onChange={handleChange} readOnly/>
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
                    value={formData.metal_type}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="Item:" name="item" value={formData.item} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Tag No:" name="tag_no" value={formData.tag_no} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="Description:" name="description" value={formData.description} onChange={handleChange} readOnly/>
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
        {/* Extra Charges */}
        {/* <Row className="form-section">
            <h4>Extra Charges</h4>
            <Col xs={12} md={2}>
              <InputField label="Extra Weight:" name="extra_weight" value={formData.extra_weight} onChange={handleChange} />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Stone Value:" name="stone_value" value={formData.stone_value} onChange={handleChange} />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Making Charge (MC):" name="making_charge" value={formData.making_charge} onChange={handleChange} />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Handling Charge (HC):" name="handling_charge" value={formData.handling_charge} onChange={handleChange} />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Total:" name="total" value={formData.total} onChange={handleChange} />
            </Col>
          </Row> */}
        </Form>
      </Container>
      </div>
  );
};

export default RepairForm;
