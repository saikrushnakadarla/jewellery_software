import React, { useState, useEffect } from "react";
import "./Estimate.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EstimateTable from "./EstimateTable"; 

const RepairForm = () => {
  const { product_id } = useParams(); // Get product_id from URL (for edit mode)
  const navigate = useNavigate();
  
  const initialFormData = {
    pcode: "",
    product_name: "",
    gross_weight: "",
    stones_weight: "",
    stones_price: "",
    weight_ww: "",
    wastage_percent: "",
    wastage: "",
    nett_weight: "",
    rate_av: "",
    rate_10g: "",
    rate_1g: "",
    mc_per_gram: "",
    total_b4_tax: "",
    total_mc: "",
    tax_percent: "",
    tax_vat_amount: "",
    total_rs: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log('Product ID for editing:', product_id); // Log the product_id
    axios
      .get(`http://localhost:4000/get-estimate/${product_id}`)
      .then((response) => {
        setFormData(response.data);
        console.log('Fetched data for the estimate:', response.data); // Log the fetched data
      })
      .catch((error) => {
        console.error('Error fetching estimate:', error);
      });
  }, [product_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pcode || !formData.product_name || !formData.gross_weight) {
      alert("Please fill out all required fields.");
      return;
    }
    try {
      // Submit the form (either POST for new or PUT for update)
      if (product_id) {
        const response = await axios.put(
          `http://localhost:4000/update-estimate/${product_id}`,
          formData
        );
        alert(response.data.message || "Estimate updated successfully.");
      } else {
        const response = await axios.post(
          "http://localhost:4000/add-estimate",
          formData
        );
        alert(response.data.message || "Estimate added successfully.");
      }
      setFormData(initialFormData);
      // navigate("/estimatetable"); 
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="main-container">
      <Container className="estimate-form-container">
        
        <Row className="estimate-form-section">
          {/* <h2>{product_id ? "Edit Estimate" : "Create Estimate"}</h2> */}
          <Col xs={12} md={2}>
            <InputField label="PCODE:" name="pcode" value={formData.pcode} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Product Name:" name="product_name"  value={formData.product_name}  onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Gross Weight:" name="gross_weight" value={formData.gross_weight} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Stones Weight:" name="stones_weight" value={formData.stones_weight} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Stones Price:" name="stones_price" value={formData.stones_price} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Weight WW:" name="weight_ww" value={formData.weight_ww} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <div className="input-with-suffix">
              <InputField label="Wastage:" name="wastage_percent" value={formData.wastage_percent} onChange={handleInputChange}/>
              <span className="suffix">%</span>
            </div>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Wastage:" name="wastage" value={formData.wastage} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Nett Weight:" name="nett_weight" value={formData.nett_weight} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Rate AV:" name="rate_av" value={formData.rate_av} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Rate/10Gms:" name="rate_10g" value={formData.rate_10g} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Rate/1Gms:" name="rate_1g" value={formData.rate_1g} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="MC Per Gram:" name="mc_per_gram" value={formData.mc_per_gram} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total B4 Tax:" name="total_b4_tax" value={formData.total_b4_tax} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total MC:" name="total_mc" value={formData.total_mc} onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={1}>
            <InputField label="Tax %" name="tax_percent" value={formData.tax_percent} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Tax VAT Amount:" name="tax_vat_amount" value={formData.tax_vat_amount} onChange={handleInputChange}/>
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total Rs:" name="total_rs" value={formData.total_rs} onChange={handleInputChange}/>
          </Col>
        </Row>
        <Row className="estimate-form-section">
        <EstimateTable />
        </Row>

        <Row>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              {product_id ? "Update" : "Print"}
            </Button>
            <Button variant="secondary" type="button" onClick={() => navigate("/estimatetable")}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RepairForm;
