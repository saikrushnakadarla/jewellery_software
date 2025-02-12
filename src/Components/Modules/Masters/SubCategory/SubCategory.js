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

  const [formData, setFormData] = useState({
    category_id: "",
    metal_type_id: "",
    metal_type: "Gold",
    category: "",
    sub_category_name: "",
    prefix: "",
  });

  const [metalOptions, setMetalOptions] = useState([]);
  const [allCategoryOptions, setAllCategoryOptions] = useState([]);
  const [filteredCategoryOptions, setFilteredCategoryOptions] = useState([]);

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

  useEffect(() => {
    const filteredCategories = allCategoryOptions.filter(
      (category) => category.metal_type === formData.metal_type
    );
    setFilteredCategoryOptions(filteredCategories);
    console.log("filteredCategories:", filteredCategories);
    setFormData((prevData) => ({
      ...prevData,
      category: "",
      category_id: "",
    }));
  }, [formData.metal_type, allCategoryOptions]);

useEffect(() => {
  if (subcategory_id) {
    const fetchSubcategoryData = async () => {
      try {
        const response = await axios.get(`${baseURL}/subcategory/${subcategory_id}`);
        const subcategoryData = response.data;

        console.log("Sub Category Data =", subcategoryData);
        console.log("Fetched Category =", subcategoryData.category);

        setFormData((prevData) => ({
          ...prevData,
          ...subcategoryData,
          category: subcategoryData.category?.toUpperCase() || "", // Convert to uppercase
          category_id: subcategoryData.category_id || "", // Ensure category ID is set
        }));
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      }
    };
    fetchSubcategoryData();
  }
}, [subcategory_id]);


useEffect(() => {
  if (formData.category) {
    const matchedCategory = filteredCategoryOptions.find(
      (option) => option.value === formData.category
    );

    console.log("matchedCategory:", matchedCategory);

    if (!matchedCategory) {
      console.log("Category not found in filtered options:", formData.category);
      setFormData((prevData) => ({
        ...prevData,
        category: filteredCategoryOptions.length > 0 ? filteredCategoryOptions[0].value : "",
        category_id: filteredCategoryOptions.length > 0 ? filteredCategoryOptions[0].id : "",
      }));
    }
  }
}, [filteredCategoryOptions, formData.category]);




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
      console.log("filteredCategories", selectedCategory)
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
                value={filteredCategoryOptions.some((opt) => opt.value === formData.category)
                  ? formData.category
                  : ""}
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
