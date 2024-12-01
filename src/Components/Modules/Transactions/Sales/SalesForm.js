import React, { useState } from "react";
import "./SalesForm.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

const RepairForm = () => {
  const [metal, setMetal] = useState("");

  return (
    <div className="main-container">
    <Container className="sales-form-container">
      <form className="sales-form">
        <div className="sales-form-left">
          <Col className="sales-form-section">
            {/* <h4 className="mb-2">Customer Details</h4> */}
            <Row>
            <Col xs={12} md={5}>
              <InputField label="Name" />
            </Col>
            <Col xs={12} md={4}>
              <InputField label="Mobile" />
            </Col>
            <Col xs={12} md={3}>
            <InputField
                label="Category"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "GOLD", label: "Gold" },
                  { value: "SILVER", label: "Silver" },
                  { value: "PLATINUM", label: "Platinum" },
                ]}
              />
              </Col>
            <Col xs={12} md={6}>
              <InputField label="Street:"  />
            </Col>
            <Col xs={12} md={6}>
            <InputField label="Address:" />
            </Col>
            <Col xs={12} md={4}>
            <InputField
                label="Area"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "Area1", label: "Area1" },
                  { value: "Area2", label: "Area2" },
                  { value: "Area3", label: "Area3" },
                ]}
              />
              </Col>
            <Col xs={12} md={4}>
            <InputField label="PIN" />
            </Col>
            <Col xs={12} md={4}>
            <InputField label="Place" />
            </Col>
            <Col xs={12} md={3}>
            <InputField label="State:" />
            </Col>
            <Col xs={12} md={5}>
            <InputField label="Aadhar" type="number"/>
            </Col>
            <Col xs={12} md={4}>
            <InputField label="GSTIN" />
            </Col>
            <Col xs={12} md={5}>
            <InputField label="PAN" />
            </Col>
            <Col xs={12} md={2}>
            <InputField
                // label="Metal:"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "GOLD", label: "Gold" },
                  { value: "SILVER", label: "Silver" },
                  { value: "PLATINUM", label: "Platinum" },
                ]}
              />
            </Col>
            
            </Row>
            </Col>
        </div>
        {/* Right Section */}
        <div className="sales-form-right"> 
          <Col className="sales-form-section">
          <Row>
          <Col xs={12} md={3}>
            <InputField
                label="SGJ"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "916HM", label: "916HM" },
                  { value: "22k", label: "22k" },
                  { value: "18k", label: "18k" },
                ]}
              />
              </Col>
           
            <Col xs={12} md={3}>
            <InputField
                label="Floor"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "916HM", label: "916HM" },
                  { value: "22k", label: "22k" },
                  { value: "18k", label: "18k" },
                ]}
              />
              </Col>
            <Col xs={12} md={3}>
                <InputField label="T" />
            </Col>
            <Col xs={12} md={3}>
            <InputField
                label="PEARLS"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "916HM", label: "916HM" },
                  { value: "22k", label: "22k" },
                  { value: "18k", label: "18k" },
                ]}
              />
            </Col>
            <Col xs={12} md={4}>
            <InputField
                label="ItemType"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "916HM", label: "916HM" },
                  { value: "22k", label: "22k" },
                  { value: "18k", label: "18k" },
                ]}
              />
            </Col>
            <Col xs={12} md={6}>
            <InputField
                label="Design Name"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "916HM", label: "916HM" },
                  { value: "22k", label: "22k" },
                  { value: "18k", label: "18k" },
                ]}
              />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="Q" />
            </Col>
            <Col xs={12} md={3}>
                <InputField label="G" />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="S" />
            </Col>
            <Col xs={12} md={3}>
                <InputField label="N" />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="VA%" />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="W" />
            </Col>
            <Col xs={12} md={3}>
                <InputField label="T" />
            </Col>
            <Col xs={12} md={4}>
            <InputField
                label="MC"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "MC/GM", label: "MC" },
                  
                ]}
              />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="HC/ct" />
            </Col>
            <Col xs={12} md={3}>
                <InputField label="H.C." />
            </Col>
            <Col xs={12} md={3}>
                <InputField label="Rodium" />
            </Col>
            <Col xs={12} md={4}>
                <InputField label="Note" />
            </Col>                
            </Row>    
          </Col>
        </div>
      </form>
      <form className="sales-form2">
        <div className="sales-form-third">
          <Col className="sales-form-section">
            <Row >
            <h4 className="mb-3">Old</h4>
            <Col xs={12} md={3}>
                <InputField
                label="Category"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                    { value: "GOLD", label: "Gold" },
                    { value: "SILVER", label: "Silver" },
                    { value: "PLATINUM", label: "Platinum" },
                ]}
                />
            </Col>
            <Col xs={12} md={4}>
                <InputField label="Item" />
            </Col>
            <Col xs={12} md={3}>
                <InputField label="Dust" />
            </Col>
            <Col xs={12} md={2}>
                <InputField
                label="Purity"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                    { value: "916HM", label: "916HM" },
                    { value: "22k", label: "22k" },
                    { value: "18k", label: "18k" },
                ]}
                />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="Touch %" />
            </Col>
            <Col xs={12} md={3}>
                <InputField
                label="Remark"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                    { value: "916HM", label: "916HM" },
                    { value: "22k", label: "22k" },
                    { value: "18k", label: "18k" },
                ]}
                />
            </Col>
            <Col xs={12} md={3}>
                <InputField label="Rate" />
            </Col>
            <Col xs={12} md={2}>
                <InputField
                label="HSN"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                    { value: "916HM", label: "916HM" },
                    { value: "22k", label: "22k" },
                    { value: "18k", label: "18k" },
                ]}
                />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="Amount" />
            </Col>
            <Col xs={12} md={2}>
                <InputField
                label="Stone"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                    { value: "916HM", label: "916HM" },
                    { value: "22k", label: "22k" },
                    { value: "18k", label: "18k" },
                ]}
                />
            </Col>
            <Col xs={12} md={1}>
                <InputField label="PCs" />
            </Col>
            <Col xs={12} md={1}>
                <InputField label="CT" />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="R" />
            </Col>
            <Col xs={12} md={2}>
                <InputField label="S.Amt" />
            </Col>
            <Col xs={12} md={1}>
                <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="cashCheckbox"
                    value="cash"
                />
                <label className="form-check-label" htmlFor="cashCheckbox">
                    Cash
                </label>
                </div>
                <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="hallMarkCheckbox"
                    value="hallmark"
                />
                <label className="form-check-label" htmlFor="hallMarkCheckbox">
                    HallMark
                </label>
                </div>
            </Col>
            </Row>
            </Col>
        </div>
        <div className="sales-form-fourth"> 
          <Col className="sales-form-section">
          <Row>
          <h4 className="mb-3">Payment Details</h4>
         
            <Col xs={12} md={4}>
                <InputField label="Walkin" />
            </Col>
            
            
            <Col xs={12} md={4}>
                <InputField label="Cash" />
            </Col>
            <Col xs={12} md={4}>
                <InputField label="Card" />
            </Col>
            <Col xs={12} md={4}>
                <InputField label="Amt" />
            </Col>
            <Col xs={12} md={4}>
                <InputField label="Chq#" />
            </Col>
            <Col xs={12} md={4}>
                <InputField label="Amt" />
            </Col>
            <Col xs={12} md={4}>
                <InputField label="Online " />
            </Col>
            <Col xs={12} md={4}>
                <InputField label="Amt" />
            </Col>
            <Col xs={12} md={4}>
            <Button type="submit" variant="primary">Save</Button>
            </Col>
                        
            </Row>    
          </Col>
        </div>
        
      </form>


<Row className="sales-form-section">
<Table bordered hover responsive>
            <thead>
              <tr>
                <th>SI</th>
                <th>Tagno</th>
                <th>Pc</th>
                <th>Item</th>
                <th>Design</th>
                <th>Purity</th>
                <th>Gross</th>
                <th>Stone</th>
                <th>Net</th>
                <th>W%</th>
                <th>Total[Gms]</th>
                <th>Rate</th>
                <th>Amount[M]</th>
                <th>MC/G</th>
                <th>MC</th>
                <th>SLAmt</th>
                <th>HC</th>
                <th>Total Amt</th>
                <th>Staff</th>
                <th>OF</th>
                <th>Tax%</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </Table>

</Row>

          
       

        {/* Buttons */}
        <div className="form-buttons">
          <Button type="submit" variant="secondary">cancel</Button>
          <Button type="submit" variant="primary">Print</Button>
        </div>
      </Container>
      </div>
  );
};

export default RepairForm;
