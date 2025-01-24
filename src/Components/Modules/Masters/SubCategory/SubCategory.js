import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InputField from "../../../Pages/InputField/InputField";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL"; // Ensure this is correctly set

function SubCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { subcategory_id, location } = state || {}; // Destructure state to get subcategory_id and location

  console.log("subcategory_id:", subcategory_id);  // This should log the passed subcategory_id
  console.log("User Location:", location); // Thi
  // Form state
  const [formData, setFormData] = useState({
    category_id: "",
    metal_type_id: "",
    metal_type: "Gold",
    category: "",
    sub_category_name: "",
    prefix: "",
  });

  // State for dropdown options
  const [metalOptions, setMetalOptions] = useState([]);
  const [allCategoryOptions, setAllCategoryOptions] = useState([]);
  const [filteredCategoryOptions, setFilteredCategoryOptions] = useState([]);

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

  // Fetch Categories (Products Table)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/products`);
        const categories = response.data.map((item) => ({
          value: item.product_name,
          label: item.product_name,
          id: item.product_id,
          metal_type: item.Category,
        }));
        setAllCategoryOptions(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Filter categories when metal type changes
  useEffect(() => {
    const filteredCategories = allCategoryOptions.filter(
      (category) => category.metal_type === formData.metal_type
    );
    setFilteredCategoryOptions(filteredCategories);
    setFormData((prevData) => ({
      ...prevData,
      category: "",
      category_id: "",
    }));
  }, [formData.metal_type, allCategoryOptions]);

  // Fetch subcategory data for editing
  useEffect(() => {
    const fetchSubcategoryData = async () => {
      if (subcategory_id) {
        console.log("Fetching data for subcategory_id:", subcategory_id); // Log the subcategory_id being fetched
        try {
          const response = await axios.get(`${baseURL}/subcategory/${subcategory_id}`);
          
          // Log the full response for debugging
          console.log("API Response:", response);
  
          if (response.data && response.data.data) {
            // Log the data being used to set the form state
            console.log("Subcategory Data:", response.data.data);
  
            setFormData({
              category_id: response.data.data.category_id || "",
              metal_type_id: response.data.data.metal_type_id || "",
              metal_type: response.data.data.metal_type || "",
              category: response.data.data.category || "",
              sub_category_name: response.data.data.sub_category_name || "",
              prefix: response.data.data.prefix || "",
            });
          } else {
            console.warn("Subcategory data is empty. Please verify the API response.");
          }
        } catch (error) {
          console.error(
            "Error fetching subcategory data:",
            error.response?.data || error.message
          );
          if (error.response?.status === 404) {
            alert("Subcategory not found. Please check the ID or try again later.");
          } else {
            alert("Failed to fetch subcategory data. Please try again.");
          }
        }
      } else {
        console.warn("No subcategory_id provided. Skipping fetch.");
      }
    };
  
    fetchSubcategoryData();
  }, [subcategory_id]);
  
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "metal_type") {
      const selectedMetal = metalOptions.find((option) => option.value === value);
      setFormData((prevData) => ({
        ...prevData,
        metal_type: selectedMetal?.value || "",
        metal_type_id: selectedMetal?.id || "",
        category: "",
        category_id: "",
      }));
    } else if (name === "category") {
      const selectedCategory = filteredCategoryOptions.find((option) => option.value === value);
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

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subcategory_id) {
        await axios.put(`${baseURL}/subcategory/${subcategory_id}`, formData);
        alert("Subcategory updated successfully!");
      } else {
        await axios.post(`${baseURL}/subcategory`, formData);
        alert("Subcategory created successfully!");
      }
      navigate("/subcategorytable");
    } catch (error) {
      console.error("Error saving subcategory:", error.message);
      alert("Failed to save subcategory. Please try again.");
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate("/subcategorytable");
  };

  return (
    <div className="main-container">
      <div className="customer-master-container">
        <h2>{subcategory_id ? "Edit Sub Category" : "Add Sub Category"}</h2>
        <form className="customer-master-form" onSubmit={handleSubmit}>
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
                options={filteredCategoryOptions.map((option) => ({
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

export default SubCategory;
