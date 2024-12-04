import React, { useState } from "react";
import "./Accounts.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const RepairForm = () => {
  const navigate = useNavigate();
  const [metal, setMetal] = useState("");
  const [type, setType] = useState("");
  const [purity, setPurity] = useState("");

  return (
    <div className="main-container">
    <Container className="accounts-form-container">

      <Row className="accounts-form-section">
          <h4 className="mb-4">Create Account</h4>
          <Col xs={12} md={4}> <InputField label="Account Name" /></Col>
          <Col xs={12} md={4}> <InputField label="Print Name" /></Col>
          <Col xs={12} md={4}>                  
              <InputField
              label="Group"
              type="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "Bank Accounts", label: "Bank Accounts" },
                { value: "Cheque", label: "Cheque" },
                { value: "Online", label: "Online" },
              ]}
            />
           </Col>
            <Col xs={12} md={2}>
            <InputField label="Op. Bal."/>
            </Col>
            <Col xs={12} md={1}>
            <InputField
              label="Dr/Cr"
              type="select"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              options={[
                { value: "Dr", label: "Dr." },
                { value: "Cr", label: "Cr." },
                
              ]}
            />
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Metal Balance" />
            </Col>
            
            <Col xs={12} md={3}>
            <InputField label="Address" />
            </Col>
            <Col xs={12} md={4}>
            <InputField label="Address2" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="City" />
            </Col>
            <Col xs={12} md={3}>
            <InputField
              label="Area"
              type="select"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              options={[
                { value: "Area1", label: "Area1." },
                { value: "Area2", label: "Area2" },
                
              ]}
            />
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Pincode" type='number'/>
            </Col>
            <Col xs={12} md={2}>
            <InputField label="State"/>
            </Col>
            <Col xs={12} md={2}>
            <InputField label="State Code" type='number'/>
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Phone" type='number'/>
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Mobile" type='number'/>
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Contact Person" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Email" type="email"/>
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Birthday On" type="date"/>
            </Col>
            <Col xs={12} md={2}>
            <InputField label="Anniversary" type='date'/>
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Bank Account No." />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Bank Name" />
            </Col>
            <Col xs={12} md={2}>
            <InputField label="IFSC Code" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="Branch" />
            </Col>
          
          
        </Row>

        <div className="form-buttons">
        <Button variant="secondary" type="button" className="cus-back-btn" onClick={() => navigate("/accountstable")}>
              Cancel
            </Button>
          <Button type="submit" variant="primary">Save</Button>
          {/* <Button type="button">Print</Button> */}
        </div>
      </Container>
      </div>
  );
};

export default RepairForm;
