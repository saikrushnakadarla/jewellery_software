// React Component
import React, { useState, useEffect } from "react";
import "./SalesForm.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";



const RepairForm = () => {
  const navigate = useNavigate();
  const [metal, setMetal] = useState("");

  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "value001",
    mobile: "",
    account_name: "",
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

    date: "",
    invoice_number: "",
    code: "",
    metal: "",
    product_name: "",
    metal_type: "",
    design_name: "",
    purity: "",
    gross_weight: "",
    stone_weight: "",
    weight_bw: "",
    stone_price: "",
    va_on: "",
    va_percent: "",
    wastage_weight: "",
    total_weight_av: "",
    mc_on: "",
    mc_per_gram: "",
    making_charges: "",
    rate: "",
    rate_amt: "",
    tax_percent: "",
    tax_amt: "",
    total_price: ""

  });
  const [paymentDetails, setPaymentDetails] = useState({
    cash: 0, card: 0,

    card_amt: 0,
    chq: "",
    chq_amt: 0,
    online: "",
    online_amt: 0,


  });
  const [repairDetails, setRepairDetails] = useState([]);

  useEffect(() => {
    // Fetch customer data
    axios.get("http://localhost:5000/get/account-details").then((response) => {
      const filteredCustomers = response.data.filter(
        (item) => item.account_group === "CUSTOMERS"
      );
      setCustomers(filteredCustomers);
    }).catch(error => console.error("Error fetching customers:", error));
  }, []);

  const handleCustomerChange = (customerId) => {
    const customer = customers.find(
      (cust) => String(cust.account_id) === String(customerId)
    );
    if (customer) {
      setFormData({
        ...formData,
        customer_id: customerId,
        mobile: customer.mobile,
        account_name: customer.account_name,
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
    }
  };

  const handleAdd = () => {
    setRepairDetails([...repairDetails, { ...formData }]);
    setFormData({
      customer_id: "",
      mobile: "",
      account_name: "",
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

      date: "",
      invoice_number: "",
      code: "",
      metal: "",
      product_name: "",
      metal_type: "",
      design_name: "",
      purity: "",
      gross_weight: "",
      stone_weight: "",
      weight_bw: "",
      stone_price: "",
      va_on: "",
      va_percent: "",
      wastage_weight: "",
      total_weight_av: "",
      mc_on: "",
      mc_per_gram: "",
      making_charges: "",
      rate: "",
      rate_amt: "",
      tax_percent: "",
      tax_amt: "",
      total_price: ""

    });
  };

  const handleSave = async () => {
    const dataToSave = repairDetails.map((item) => ({
      ...item,
      cash_amount: paymentDetails.cash,
      card_amount: paymentDetails.card,
      card_amt: paymentDetails.card_amt,
      chq: paymentDetails.chq,
      chq_amt: paymentDetails.card,
      online: paymentDetails.online,
      online_amt: paymentDetails.online_amt,
    }));

    try {
      await axios.post("http://localhost:5000/save-repair-details", {
        repairDetails: dataToSave,
      });
      alert("Data saved successfully");
      setRepairDetails([]);
      setPaymentDetails({
        cash: 0, card: 0, card_amt: 0,
        chq: "",
        chq_amt: 0,
        online: "",
        online_amt: 0,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };
  const handleBack = () => {
    navigate("/salestable");
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
                  <Col xs={12} md={2} className="d-flex align-items-center">
                    <div style={{ flex: 1 }}>
                      <InputField

                        label="Mobile"
                        name="customer_id"
                        type="select"
                        value={formData.customer_id}
                        onChange={(e) => handleCustomerChange(e.target.value)}
                        options={customers.map((customer) => ({
                          value: customer.account_id,
                          label: customer.mobile,
                        }))}
                      />
                    </div>
                    <AiOutlinePlus
                      size={20}
                      color="black"
                      onClick={handleAddCustomer}
                      style={{ marginLeft: '10px', cursor: 'pointer', marginBottom: '20px' }}
                    />

                  </Col>
                  <Col xs={12} md={2}>
                    <InputField
                      label="Customer Name"
                      name="account_name"
                      value={formData.account_name}
                      readOnly
                    />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField
                      label="Email:"
                      name="email"
                      type="email"
                      value={formData.email}

                      readOnly
                    />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField
                      label="Address1:"
                      name="address1"
                      value={formData.address1}

                      readOnly
                    />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField
                      label="Address2:"
                      name="address2"
                      value={formData.address2}

                      readOnly
                    />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField
                      label="City"
                      name="city"
                      value={formData.city}

                      readOnly
                    />
                  </Col>
                  <Col xs={12} md={1}>
                    <InputField
                      label="PIN"
                      name="pincode"
                      value={formData.pincode}

                      readOnly
                    />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField label="State:" name="state" value={formData.state} readOnly />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField label="State Code:" name="state" value={formData.state_code} readOnly />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="Aadhar" name="aadhar_card" value={formData.aadhar_card} readOnly />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField label="GSTIN" name="gst_in" value={formData.gst_in} readOnly />
                  </Col>
                  <Col xs={12} md={2}>
                    <InputField label="PAN" name="pan_card" value={formData.pan_card} readOnly />
                  </Col>

                </Row>
              </Col>
            </div>
            {/* Right Section */}
            <div className="sales-form-right">
              <Col className="sales-form-section">
                <Row>
                  <InputField
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </Row>
                <Row>

                  <InputField
                    label="Invoice Number"
                    name="invoice_number"
                    value={formData.invoice_number}
                    onChange={(e) =>
                      setFormData({ ...formData, invoice_number: e.target.value })
                    }
                  />
                </Row>
              </Col>

            </div>
            </div>
          <div className="sales-form-section">
            <Col >
              <Row>

                <Col xs={12} md={2}>
                  <InputField
                    label="Code"
                    name="code"
                    type="select"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    options={[
                      { value: "BarCode", label: "BarCode" },
                      { value: "Rbarcode", label: "Rbarcode" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Metal"
                    name="metal"
                    type="select"
                    value={formData.metal}
                    onChange={(e) =>
                      setFormData({ ...formData, metal: e.target.value })
                    }
                    options={[
                      { value: "916HM", label: "916HM" },
                      { value: "22k", label: "22k" },
                      { value: "18k", label: "18k" },
                    ]}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Product Name"
                    name="product_name"
                    value={formData.product_name}
                    onChange={(e) =>
                      setFormData({ ...formData, product_name: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Metal Type"
                    name="metal_type"
                    value={formData.metal_type}
                    onChange={(e) =>
                      setFormData({ ...formData, metal_type: e.target.value })
                    }


                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Design Name"
                    name="design_name"
                    value={formData.design_name}
                    onChange={(e) =>
                      setFormData({ ...formData, design_name: e.target.value })
                    }


                  />
                </Col>
                <Col xs={12} md={1}>
                  <InputField label="Purity"
                    name="purity"
                    value={formData.purity}
                    onChange={(e) =>
                      setFormData({ ...formData, purity: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Gross Weight" name="gross_weight"
                    value={formData.gross_weight}
                    onChange={(e) =>
                      setFormData({ ...formData, gross_weight: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Stone Weight" name="stone_weight"
                    value={formData.stone_weight}
                    onChange={(e) =>
                      setFormData({ ...formData, stone_weight: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Weight BW" name="weight_bw"
                    value={formData.weight_bw}
                    onChange={(e) =>
                      setFormData({ ...formData, weight_bw: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Stone Price"
                    name="stone_price"
                    value={formData.stone_price}
                    onChange={(e) =>
                      setFormData({ ...formData, stone_price: e.target.value })
                    }
                  />
                </Col>

                <Col xs={12} md={1}>
                  <InputField label="VA On"
                    name="va_on"
                    value={formData.va_on}
                    onChange={(e) =>
                      setFormData({ ...formData, va_on: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={1}>
                  <InputField label="VA%"
                    value={formData.va_percent}
                    name="va_percent"
                    onChange={(e) =>
                      setFormData({ ...formData, va_percent: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Wastage Weight"
                    name="wastage_weight"
                    value={formData.wastage_weight}
                    onChange={(e) =>
                      setFormData({ ...formData, wastage_weight: e.target.value })
                    }
                  />
                </Col>

                <Col xs={12} md={2}>
                  <InputField label="Total Weight AW"
                    name="total_weight_av"
                    value={formData.total_weight_av}
                    onChange={(e) =>
                      setFormData({ ...formData, total_weight_av: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={1}>
                  <InputField
                    label="MC on"

                    name="mc_on"
                    value={formData.mc_on}
                    onChange={(e) =>
                      setFormData({ ...formData, mc_on: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="MC Per Gram"
                    name="mc_per_gram"
                    value={formData.mc_per_gram}
                    onChange={(e) =>
                      setFormData({ ...formData, mc_per_gram: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Making Charges"
                    name="making_charges"
                    value={formData.making_charges}
                    onChange={(e) =>
                      setFormData({ ...formData, making_charges: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Rate" name="rate"
                    value={formData.rate}
                    onChange={(e) =>
                      setFormData({ ...formData, rate: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField label="Rate Amount" name="rate_amt"
                    value={formData.rate_amt}
                    onChange={(e) =>
                      setFormData({ ...formData, rate_amt: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={1}>
                  <InputField label="Tax%"
                    name="tax_percent"
                    value={formData.tax_percent}
                    onChange={(e) =>
                      setFormData({ ...formData, tax_percent: e.target.value })
                    }
                  />
                </Col>
                <Col xs={12} md={1}>
                  <InputField label="Tax Amt"
                    name="tax_amt"
                    value={formData.tax_amt}
                    onChange={(e) =>
                      setFormData({ ...formData, tax_amt: e.target.value })
                    } />
                </Col>

                <Col xs={12} md={2}>
                  <InputField label="Total Price" name="total_price"
                    value={formData.total_price}
                    onChange={(e) =>
                      setFormData({ ...formData, total_price: e.target.value })
                    }
                  />
                </Col>


                <Col xs={12} md={1}>

                  <Button onClick={handleAdd} style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Add</Button>
                </Col>
              </Row>
              </Col>
             
          </div>
          <div className="sales-form-section">
  <Table bordered hover responsive>
    <thead>
      <tr>
        <th>Date</th>
        <th>Invoice Number</th>
        <th>Code</th>
        <th>Metal</th>
        <th>Product Name</th>
        <th>Metal Type</th>
        <th>Design Name</th>
        <th>Purity</th>
        <th>Gross Weight</th>
        <th>Stone Weight</th>
        <th>Stone Price</th>
        <th>Weight BW</th>
        <th>Wastage On</th>
        <th>VA%</th>
        <th>Wastage Weight</th>
        <th>Total Weight AW</th>
        <th>Making Charges On</th>
        <th>MC Per Gram</th>
        <th>Making Charges</th>
        <th>Rate</th>
        <th>Rate Amount</th>
        <th>Tax %</th>
        <th>Tax Amount</th>
        <th>Total Price</th>
      </tr>
    </thead>
    <tbody>
      {repairDetails.length > 0 ? (
        repairDetails.map((detail, index) => (
          <tr key={index}>
            <td>{detail.date}</td>
            <td>{detail.invoice_number}</td>
            <td>{detail.code}</td>
            <td>{detail.metal}</td>
            <td>{detail.product_name}</td>
            <td>{detail.metal_type}</td>
            <td>{detail.design_name}</td>
            <td>{detail.purity}</td>
            <td>{detail.gross_weight}</td>
            <td>{detail.stone_weight}</td>
            <td>{detail.stone_price}</td>
            <td>{detail.weight_bw}</td>
            <td>{detail.va_on}</td>
            <td>{detail.va_percent}</td>
            <td>{detail.wastage_weight}</td>
            <td>{detail.total_weight_av}</td>
            <td>{detail.mc_on}</td>
            <td>{detail.mc_per_gram}</td>
            <td>{detail.making_charges}</td>
            <td>{detail.rate}</td>
            <td>{detail.rate_amt}</td>
            <td>{detail.tax_percent}</td>
            <td>{detail.tax_amt}</td>
            <td>{detail.total_price}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="24" className="text-center">
            No data available
          </td>
        </tr>
      )}
    </tbody>
  </Table>
</div>



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

                        <InputField
                          label="Cash"
                          name="cash"
                          value={paymentDetails.cash}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, cash: e.target.value })
                          }
                        />
                      </Col>
                      <Col xs={12} md={4}>
                        <InputField
                          label="Card"
                          name="card"
                          value={paymentDetails.card}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, card: e.target.value })
                          }
                        />
                      </Col>
                      <Col xs={12} md={4}>
                        <InputField label="Amt" name="card_amt"
                          value={paymentDetails.card_amt}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, card_amt: e.target.value })
                          } />
                      </Col>

                      <Col xs={12} md={4}>
                        <InputField label="Chq#" name="chq"
                          value={paymentDetails.chq}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, chq: e.target.value })
                          } />
                      </Col>
                      <Col xs={12} md={4}>
                        <InputField label="Amt" name="chq_amt"
                          value={paymentDetails.chq_amt}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, chq_amt: e.target.value })
                          } />
                      </Col>
                      <Col xs={12} md={4}>
                        <InputField label="Online " name="online"
                          value={paymentDetails.online}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, online: e.target.value })
                          } />
                      </Col>
                      <Col xs={12} md={4}>
                        <InputField label="Amt" name="online_amt"
                          value={paymentDetails.online_amt}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, online_amt: e.target.value })
                          } />
                      </Col>

                      <Col xs={12} md={2}>
                        <Button onClick={handleSave} style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Save</Button>
                      </Col>
                      <Col xs={12} md={2}>
                <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>Print</Button>
                </Col>
                <Col xs={12} md={2}>
                <Button
            type="button"
            className="cus-back-btn"
            variant="secondary"
            onClick={handleBack} style={{ backgroundColor: 'gray', marginRight: '10px' }}
          >
            cancel
          </Button>
                </Col>

                    </Row>

                  </Col>
                </div>

              </div>

            </Form>
          </Container>
        </div>
        );
};

        export default RepairForm;
