import React, { useState, useEffect } from "react";
import "./Estimate.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button,Table } from "react-bootstrap";
import axios from "axios";
import DataTable from "../../../Pages/InputField/TableLayout";
import baseURL from "../../../../Url/NodeBaseURL";
import { FaEdit, FaTrash } from 'react-icons/fa';

const RepairForm = () => {
  const today = new Date().toISOString().split("T")[0];

  const initialFormData = {
    date: today,
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
    rate_amt: "",
    tax_percent: "",
    tax_vat_amount: "",
    total_rs: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    if (isEditing) {
      // Update the entry being edited
      const updatedEntries = entries.map((entry, index) =>
        index === editIndex ? formData : entry
      );
      setEntries(updatedEntries);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new entry
      setEntries([...entries, formData]);
    }

    // Reset the form data
    setFormData((prev) => ({
      ...initialFormData,
      date: today,
      estimate_number: prev.estimate_number,
    }));
  };

  const handleEdit = (index) => {
    setFormData(entries[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  // const handlePrint = async () => {
  //   try {
  //     await Promise.all(
  //       entries.map((entry) => axios.post(`${baseURL}/add/estimate`, entry))
  //     );
  //     alert("All entries saved successfully!");
  //     setEntries([]);
  //     setFormData(initialFormData);
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //     alert("Failed to save entries. Please try again.");
  //   }
  // };

  const handlePrint = async () => {
    try {
      // Save entries to the database
      await Promise.all(
        entries.map((entry) => axios.post(`${baseURL}/add/estimate`, entry))
      );
  
      // Prepare table data for the new tab
      const tableHTML = `
        <html>
          <head>
            <title>Estimate Details</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h2>Estimate Details</h2>
            <table>
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Product Name</th>
                  <th>Gross Weight</th>
                  <th>Stones Weight</th>
                  <th>Total Weight</th>
                  <th>Rate</th>
                  <th>Total Rs</th>
                </tr>
              </thead>
              <tbody>
                ${entries
                  .map(
                    (entry, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${entry.product_name}</td>
                      <td>${entry.gross_weight}</td>
                      <td>${entry.stones_weight}</td>
                      <td>${entry.total_weight}</td>
                      <td>${entry.rate}</td>
                      <td>${entry.total_rs}</td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `;
  
      // Open new tab and display the table
      const newTab = window.open("", "_blank");
      newTab.document.write(tableHTML);
      newTab.document.close();
  
      alert("All entries saved successfully!");
      setEntries([]); // Clear entries after saving
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save entries. Please try again.");
    }
  };
  
  useEffect(() => {
    const fetchLastEstimateNumber = async () => {
      try {
        const response = await axios.get(`${baseURL}/lastEstimateNumber`);
        setFormData((prev) => ({
          ...prev,
          estimate_number: response.data.lastEstimateNumber,
        }));
      } catch (error) {
        console.error("Error fetching estimate number:", error);
      }
    };

    fetchLastEstimateNumber();
  }, []);

  useEffect(() => {
    const grossWeight = parseFloat(formData.gross_weight) || 0;
    const stonesWeight = parseFloat(formData.stones_weight) || 0;
    const weightBW = grossWeight - stonesWeight;

    setFormData((prev) => ({
      ...prev,
      weight_bw: weightBW.toFixed(2),
    }));
  }, [formData.gross_weight, formData.stones_weight]);

  useEffect(() => {
    const wastagePercentage = parseFloat(formData.wastage_percent) || 0;
    const grossWeight = parseFloat(formData.gross_weight) || 0;
    const weightBW = parseFloat(formData.weight_bw) || 0;

    let wastageWeight = 0;
    let totalWeight = 0;

    if (formData.wastage_on === "Gross Weight") {
      wastageWeight = (grossWeight * wastagePercentage) / 100;
      totalWeight = weightBW + wastageWeight;
    } else if (formData.wastage_on === "Weight BW") {
      wastageWeight = (weightBW * wastagePercentage) / 100;
      totalWeight = weightBW + wastageWeight;
    }

    setFormData((prev) => ({
      ...prev,
      wastage_weight: wastageWeight.toFixed(2),
      total_weight: totalWeight.toFixed(2),
    }));
  }, [formData.wastage_on, formData.wastage_percent, formData.gross_weight, formData.weight_bw]);

  useEffect(() => {
    const totalWeight = parseFloat(formData.total_weight) || 0;
    const mcPerGram = parseFloat(formData.mc_per_gram) || 0;
    const makingCharges = parseFloat(formData.total_mc) || 0;

    if (formData.making_charges_on === "By Weight") {
      const calculatedMakingCharges = totalWeight * mcPerGram;
      setFormData((prev) => ({
        ...prev,
        total_mc: calculatedMakingCharges.toFixed(2),
      }));
    } else if (formData.making_charges_on === "Fixed") {
      if (totalWeight > 0) {
        const calculatedMcPerGram = makingCharges / totalWeight;
        setFormData((prev) => ({
          ...prev,
          mc_per_gram: calculatedMcPerGram.toFixed(2),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          mc_per_gram: "0.00",
        }));
      }
    }
  }, [formData.making_charges_on, formData.mc_per_gram, formData.total_mc, formData.total_weight]);

  useEffect(() => {
    const rate = parseFloat(formData.rate) || 0;
    const totalWeight = parseFloat(formData.total_weight) || 0;

    const rateAmt = rate * totalWeight;

    setFormData((prev) => ({
      ...prev,
      rate_amt: rateAmt.toFixed(2),
    }));
  }, [formData.rate, formData.total_weight]);

  useEffect(() => {
    const taxPercent = parseFloat(formData.tax_percent) || 0;
    const rateAmt = parseFloat(formData.rate_amt) || 0;

    const taxAmt = (rateAmt * taxPercent) / 100;

    setFormData((prev) => ({
      ...prev,
      tax_vat_amount: taxAmt.toFixed(2),
    }));
  }, [formData.tax_percent, formData.rate_amt]);

  useEffect(() => {
    const rateAmt = parseFloat(formData.rate_amt) || 0;
    const taxAmt = parseFloat(formData.tax_vat_amount) || 0;
    const stonesPrice = parseFloat(formData.stones_price) || 0;
    const totalMC = parseFloat(formData.total_mc) || 0;

    const totalRs = rateAmt + taxAmt + stonesPrice + totalMC;

    setFormData((prev) => ({
      ...prev,
      total_rs: totalRs.toFixed(2),
    }));
  }, [formData.rate_amt, formData.tax_vat_amount, formData.stones_price, formData.total_mc]);

  useEffect(() => {
    const fetchLastEstimateNumber = async () => {
      try {
        const response = await axios.get(`${baseURL}/lastEstimateNumber`);
        setFormData((prev) => ({
          ...prev,
          estimate_number: response.data.lastEstimateNumber,
        }));
      } catch (error) {
        console.error("Error fetching estimate number:", error);
      }
    };

    fetchLastEstimateNumber();
  }, []);
  
  return (
    <div className="main-container">
      <Container className="estimate-form-container">
        <Row className="estimate-form-section">
          <h2>Estimate</h2>

          <Col xs={12} md={2}>
            <InputField label="Date:" name="date" value={formData.date} type="date" onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Estimate Number:" name="estimate_number" value={formData.estimate_number} onChange={handleInputChange} readOnly />
          </Col>
          {/* <Col xs={12} md={2}>
            <InputField label="P ID:" name="pcode" value={formData.pcode} onChange={handleInputChange} />
          </Col> */}
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
              { value: "Weight BW", label: "Weight BW" },
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
              { value: "By Weight", label: "By Weight" },
              { value: "Fixed", label: "Fixed" },
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
          <Col xs={12} md={2}>
                <InputField
                  label="Amount"
                  name="rate_amt"
                  value={formData.rate_amt || "0.00"} 
                  onChange={handleInputChange} 
                  readOnly
                />
                </Col>
          <Col xs={12} md={2}>
            <InputField label="Tax %" name="tax_percent" value={formData.tax_percent} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Tax VAT Amt:" name="tax_vat_amount" value={formData.tax_vat_amount} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
            <InputField label="Total Rs:" name="total_rs" value={formData.total_rs} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={2}>
          <Button
              style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}
              onClick={handleAdd}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </Col>
          
        </Row>
       
        <Row className="estimate-form-section2">
        <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>S No</th>
                <th>Product Name</th>
                <th>Gross Weight</th>
                <th>Stones Weight</th>
                <th>Total Weight</th>
                <th>Rate</th>
                <th>Total Rs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length > 0 ? (
                entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.product_name}</td>
                    <td>{entry.gross_weight}</td>
                    <td>{entry.stones_weight}</td>
                    <td>{entry.total_weight}</td>
                    <td>{entry.rate}</td>
                    <td>{entry.total_rs}</td>
                    <td>                      
                      <div className="d-flex align-items-center">
                        <FaEdit
                          className="action-icon edit-icon"
                          onClick={() => handleEdit(index)}
                          style={{ cursor: 'pointer', marginRight: 10 }}
                        />
                        <FaTrash
                          className="action-icon delete-icon"
                          onClick={() => handleDelete(index)}
                        />
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No entries added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Col xs={12} md={12} className="d-flex justify-content-end">
            <Button
              style={{ backgroundColor: "#a36e29", borderColor: "#a36e29",  }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RepairForm;
