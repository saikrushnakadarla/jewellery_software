import React, { useState, useEffect } from "react";
import "./SalesForm.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table ,Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import baseURL from "../../../../Url/NodeBaseURL";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const RepairForm = () => {
  const [metal, setMetal] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/get/account-details`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
  
        // Filter only suppliers
        const customers = result.filter(
          (item) => item.account_group === 'CUSTOMERS'
        );
  
        setCustomers(customers);
        // setLoading(false);
        console.log("Customers=",customers)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleCustomerChange = (customerId) => {
    setFormData((prevData) => ({
      ...prevData,
      customer_id: customerId, // Ensure customer_id is correctly updated
    }));
  
    const customer = customers.find((cust) => String(cust.account_id) === String(customerId));
    console.log("Customer Id=",customer)
  
    if (customer) {
      setFormData({
        ...formData,
        customer_id: customerId, // Ensure this is correctly set
        name: customer.account_name, // Set the name field to the selected customer
        mobile: customer.phone || "",
        email: customer.email || "",
        address1: customer.address1 || "",
        address2: customer.address2 || "",
        city: customer.city || "",
        pincode: customer.pincode || "",
        state: customer.state || "",
        state_code: customer.state_code || "",
        aadhar_card: customer.aadhar_card || "",
        gst_in: customer.gst_in || "",
        pan_card: customer.pan_card || "",

      });
    } else {
      setFormData({
        ...formData,
        customer_id: "",
        name: "",
        mobile: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        state: "",
        state_code: "",
        aadhar_card: "",
        gst_in: "",
        pan_card: "",
      });
    }
  };

  const handleBack = () => {
    navigate('/salestable');
  };

  const handleAddCustomer = () => {
    navigate("/customermaster", { state: { from: "/sales" } });
  };

  return (
    <div className="main-container">
      <Container className="sales-form-container">
        <Form>
        <div className="sales-form">
          <div className="sales-form-left">
            <Col className="sales-form-section">
              <Row>
                <Col xs={12} md={6}  className="d-flex align-items-center">
                  <div style={{ flex: 1 }}>
                  <InputField
                  label="Customer Name:"
                  name="customer_id"
                  type="select"
                  value={formData.customer_id || ""}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  options={[
                    ...customers.map((customer) => ({
                      value: customer.account_id,
                      label: customer.account_name, // Use account_name or your preferred field
                    })),
                  ]}
                />
                </div>
                <AiOutlinePlus
                  size={20}
                  color="black"
                  onClick={handleAddCustomer}
                  style={{ marginLeft: '10px', cursor: 'pointer', marginBottom:'20px' }}
                />
                </Col>
                <Col xs={12} md={6}>
                <InputField
                    label="Mobile:"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={6}>
                <InputField
                    label="Email:"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={6}>
                <InputField
                    label="Address1:"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={5}>
                <InputField
                    label="Address2:"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={4}>
                <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                  <InputField 
                  label="PinCode" 
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  readOnly
                  />
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="State:"  name="state" value={formData.state} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={3}>
                  <InputField label="State:"  name="state" value={formData.state_code} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={5}>
                  <InputField label="Aadhar" name="aadhar_card" value={formData.aadhar_card} onChange={handleChange} readOnly/>
                </Col>
                <Col xs={12} md={4}>
                  <InputField label="GSTIN"name="gst_in" value={formData.gst_in} onChange={handleChange} readOnly />
                </Col>
                <Col xs={12} md={5}>
                  <InputField label="PAN" name="pan_card" value={formData.pan_card} onChange={handleChange} readOnly />
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
                    label="Sadashri Jewels"
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
        </div>
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
        <div className="sales-form2">
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
                  <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Save</Button>
                </Col>

              </Row>
            </Col>
          </div>

        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <Button
            type="button"
            className="cus-back-btn"
            variant="secondary"
            onClick={handleBack} style={{ backgroundColor: 'gray', marginRight: '10px' }}
          >
            cancel
          </Button>
          <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Print</Button>
        </div>                  
        </Form>
      </Container>
    </div>
  );
};

export default RepairForm;
