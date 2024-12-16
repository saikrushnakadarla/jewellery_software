import React, { useState, useEffect } from "react";
import "./Estimate.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import DataTable from '../../../Pages/InputField/TableLayout';
import baseURL from "../../../../Url/NodeBaseURL";

const RepairForm = () => {
  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split('T')[0];

  const initialFormData = {
    date: today,  // Set default date to today's date
    pcode: "",
    estimate_number: "",
    product_id: "",
    product_name: "",
    gross_weight: "",
    stones_weight: "",
    stones_price: "",
    weight_bw: "",
    wastage_on: "",
    wastage_percent: "",
    wastage_weight: "",
    total_weight: "",
    making_charges_on: "",
    mc_per_gram: "",
    total_mc: "",
    rate: "",
    tax_percent: "",
    tax_vat_amount: "",
    total_rs: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [estimates, setEstimates] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission and send data to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/add/estimate`, formData);
      if (response.status === 200) {
        alert("Estimate added successfully!");
        setFormData(initialFormData); // Clear the form after successful submission
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to add estimate. Please try again.");
    }
  };

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/estimates`);
        setEstimates(response.data); // Set the fetched estimates in state
      } catch (error) {
        console.error("Error fetching estimates:", error);
      }
    };

    fetchEstimates(); // Call function to fetch estimates
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Sr. No.", Cell: ({ row }) => row.index + 1 },
      { Header: "Date", accessor: "date", Cell: ({ value }) => new Date(value).toLocaleDateString('en-GB') },
      { Header: "P Code", accessor: "pcode" },
      { Header: "Estimate Number", accessor: "estimate_number" },
      { Header: "Product ID", accessor: "product_id" },
      { Header: "Product Name", accessor: "product_name" },
      { Header: "Gross Weight", accessor: "gross_weight" },
      { Header: "Stones Weight", accessor: "stones_weight" },
      { Header: "Stones Price", accessor: "stones_price" },
      { Header: "Weight BW", accessor: "weight_bw" },
      { Header: "Wastage On", accessor: "wastage_on" },
      { Header: "Wastage %", accessor: "wastage_percent" },
      { Header: "Wastage Weight", accessor: "wastage_weight" },
      { Header: "Total Weight", accessor: "total_weight" },
      { Header: "Making Charges On", accessor: "making_charges_on" },
      { Header: "MC Per Gram", accessor: "mc_per_gram" },
      { Header: "Total MC", accessor: "total_mc" },
      { Header: "Rate", accessor: "rate" },
      { Header: "Tax %", accessor: "tax_percent" },
      { Header: "Tax VAT Amount", accessor: "tax_vat_amount" },
      { Header: "Total Rs", accessor: "total_rs" }
    ],
    [estimates]
  );
  
  
  

  return (
    <div className="main-container">
      <Container className="estimate-form-container">
        <Row className="estimate-form-section">
          <h2>Estimate</h2>

          <Col xs={12} md={2}>
            <InputField label="Date:" name="date" value={formData.date} type="date" onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Estimate Number:" name="estimate_number" value={formData.estimate_number} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="P ID:" name="pcode" value={formData.pcode} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Product Name:" name="product_name" value={formData.product_name} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Gross Weight:" name="gross_weight" value={formData.gross_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Stones Weight:" name="stones_weight" value={formData.stones_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Stones Price:" name="stones_price" value={formData.stones_price} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Weight BW:" name="weight_bw" value={formData.weight_bw} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Wastage On:" name="wastage_on" type="select" value={formData.wastage_on} onChange={handleInputChange} options={[
              { value: "Gross Weight", label: "Gross Weight" },
              { value: "Weight WW", label: "Weight WW" },
            ]} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Wastage %:" name="wastage_percent" value={formData.wastage_percent} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Wastage Weight:" name="wastage_weight" value={formData.wastage_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total Weight:" name="total_weight" value={formData.total_weight} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Making Charges On:" name="making_charges_on" type="select" value={formData.making_charges_on} onChange={handleInputChange} options={[
              { value: "Gross Weight", label: "Gross Weight" },
              { value: "Weight WW", label: "Weight WW" },
            ]} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="MC Per Gram:" name="mc_per_gram" value={formData.mc_per_gram} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total MC:" name="total_mc" value={formData.total_mc} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Rate:" name="rate" value={formData.rate} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={1}>
            <InputField label="Tax %" name="tax_percent" value={formData.tax_percent} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Tax VAT Amount:" name="tax_vat_amount" value={formData.tax_vat_amount} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total Rs:" name="total_rs" value={formData.total_rs} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }} onClick={handleSubmit}>
              Add
            </Button>
          </Col>
        </Row>

        <Row className="estimate-form-section2">
        <DataTable columns={columns} data={estimates} />
        </Row>
      </Container>
    </div>
  );
};

export default RepairForm;
