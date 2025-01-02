import React, { useState } from "react";
import "./BarCodePrinting.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";


const RepairForm = () => {
  const navigate = useNavigate();

  const staticEntries = [
    { pCode: "P001", nameValue: "Gold Ring", weight: "10g" },
    { pCode: "P002", nameValue: "Silver Chain", weight: "20g" },
    { pCode: "P003", nameValue: "Platinum Bracelet", weight: "15g" },
  ];


  return (
    <div className="main-container">
    <Container className="barcode-form-container">
      <form className="barcode-form">
        {/* Left Section */}
        <div className="barcode-form-left">
          {/* Customer Details */}
          <Col className="form-section">
            
            <Row >
              <InputField label="Date" type="date"/>
            </Row>
            {/* <Row >
              <InputField label="P Code" />
            </Row> */}
            <Row >
              <InputField label="Product Name" />
            </Row>
            <Row >
              <InputField label="Weight" />
            </Row>
            <Row>
            <div className="form-buttons">   
                <Button type="submit" variant="primary">ADD</Button>
            </div>
            </Row>
            </Col>
             {/* Buttons */}
        
         
        </div>
        {/* Right Section */}
        <div className="barcode-form-right">
          <Col className="form-section">
          <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>P Code</th>
                    <th>Name Value</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {staticEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.pCode}</td>
                      <td>{entry.nameValue}</td>
                      <td>{entry.weight}</td>
                    </tr>
                  ))}
                </tbody>
            </Table>
          </Col>
        </div>
      </form>

          
       
      </Container>
      </div>
  );
};

export default RepairForm;
