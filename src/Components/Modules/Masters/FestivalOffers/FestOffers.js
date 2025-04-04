import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "../../../Pages/InputField/InputField";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL"; // Make sure this is something like: http://localhost:5000

function FestOffers() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { subcategory_id } = state || {};

  const [formData, setFormData] = useState({
    offer_name: "",
    discount_on: "",
    discount_percentage: "",
    valid_from: "",
    valid_to: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST to your backend API
      const response = await axios.post(`${baseURL}/api/offers`, formData);
      alert("Offer saved successfully!");
      navigate("/festofferstable");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save offer.");
    }
  };

  const handleBack = () => {
    navigate("/festofferstable");
  };

  return (
    <div className="main-container">
      <div className="customer-master-container">
        <h2>{subcategory_id ? "Edit Fest Offers" : "Add Fest Offers"}</h2>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <InputField
                label="Offer Name"
                name="offer_name"
                type="text"
                value={formData.offer_name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Discount On"
                name="discount_on"
                type="select"
                value={formData.discount_on}
                onChange={handleChange}
                options={[
                  { value: "Making Charge", label: "Making Charge" },
                  { value: "Total amount", label: "Total amount" },
                ]}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Discount %"
                name="discount_percentage"
                type="number"
                value={formData.discount_percentage}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Valid From"
                name="valid_from"
                type="date"
                value={formData.valid_from}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Valid To"
                name="valid_to"
                type="date"
                value={formData.valid_to}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <div className="sup-button-container">
            <button type="button" className="cus-back-btn" onClick={handleBack}>
              Close
            </button>
            <button type="submit" className="cus-submit-btn">
              {subcategory_id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FestOffers;
