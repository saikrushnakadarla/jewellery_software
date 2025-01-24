import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../Pages/InputField/InputField";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL"; // Ensure this is correctly set

function SubCategory() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL

  // Form state
  const [formData, setFormData] = useState({
    category_id: "",
    metal_type: "",
    category: "",
    sub_category_name: "",
    prefix: "",
  });

  // State for dropdown options
  const [metalOptions, setMetalOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Fetch Metal Types
  useEffect(() => {
    const fetchMetalTypes = async () => {
      try {
        const response = await axios.get(`${baseURL}/metaltype`);
        const metalTypes = response.data.map((item) => ({
          value: item.metal_name,
          label: item.metal_name,
          id: item.metal_type_id,
        }));
        setMetalOptions(metalTypes);
      } catch (error) {
        console.error("Error fetching metal types:", error);
      }
    };
    fetchMetalTypes();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get/products");
        const categories = response.data.map((item) => ({
          value: item.product_name,
          label: item.product_name,
          id: item.product_id, // Store category ID
        }));
        setCategoryOptions(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      // Find the selected category and update both name and id
      const selectedCategory = categoryOptions.find((option) => option.value === value);
      setFormData((prevData) => ({
        ...prevData,
        category: selectedCategory?.value || "",
        category_id: selectedCategory?.id || "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recordWithTimestamp = { ...formData, created_at: new Date().toISOString() };
      const response = await axios.post(`${baseURL}/subcategory`, recordWithTimestamp);
      if (response.status === 201) {
        alert("Sub Category saved successfully!");
        navigate("/subcategorytable");
      }
    } catch (error) {
      console.error("Error saving subcategory:", error);
      alert("Failed to save subcategory. Please try again.");
    }
  };

  // Handle back/close button
  const handleBack = () => {
    navigate("/subcategorytable");
  };

  return (
    <div className="main-container">
      <div className="customer-master-container">
        <h2>{id ? "Edit Sub Category" : "Add Sub Category"}</h2>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <Row>
            <Col md={4}>
              <InputField
                label="Metal Type:"
                name="metal_type"
                type="select"
                value={formData.metal_type}
                onChange={handleChange}
                options={metalOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Category:"
                name="category"
                type="select"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Sub Category:"
                name="sub_category_name"
                value={formData.sub_category_name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Prefix:"
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          {/* Buttons */}
          <div className="sup-button-container">
            <button
              type="button"
              className="cus-back-btn"
              onClick={handleBack}
            >
              Close
            </button>
            <button type="submit" className="cus-submit-btn">
              {id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubCategory;
