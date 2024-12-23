import React, { useState, useEffect } from "react";
import "./Purchase.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import baseURL from "../../../../Url/NodeBaseURL";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";

const URDPurchase = () => {
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [product, setProduct] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState(
    {
      account_name: "",
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
      indent: "",
      bill_no: "",
      type: "",
      rate_cut: "",
      date: new Date().toISOString().split("T")[0],
      bill_date: "",
      due_date: "",
      Purchase_rate: "",
      product_id: "",
      product_name: "",
      metal_type: "",
      design_name: "",
      purity: "",
      hsn: "",
      product_type: "",
      stock_type: "",
      pcs: "",
      gross_weight: "",
      stone_weight: "",
      net_weight: "",
      unit_weight: "",
      waste_percentage: "",
      waste_amount: "",
      pure_weight: "",
      alloy: "",
      cost: "",
      total_weight: "",
      wt_rate_amount: "",
      mc_per_gram: "",
      mc: "",
      stone_amount: "",
      total_amount: "",
      stone: "",
      stone_pcs: "",
      stone_ct: "",
      cwp: "",
      gms: "",
      stone_rate: "",
      clarity: "",
      rate: "",
      clear: "",
      class: "",
      cut: "",
    });

  const [tableData, setTableData] = useState([]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    setTableData((prev) => [...prev, formData]);
    setFormData((prev) => ({
      ...prev,
      product_id: "",
      product_name: "",
      metal_type: "",
      design_name: "",
      purity: "",
      hsn: "",
      product_type: "",
      stock_type: "",
      pcs: "",
      gross_weight: "",
      stone_weight: "",
      net_weight: "",
      unit_weight: "",
      waste_percentage: "",
      waste_amount: "",
      pure_weight: "",
      alloy: "",
      cost: "",
      total_weight: "",
      wt_rate_amount: "",
      mc_per_gram: "",
      mc: "",
      stone_amount: "",
      total_amount: "",
      stone: "",
      stone_pcs: "",
      stone_ct: "",
      cwp: "",
      gms: "",
      stone_rate: "",
      clarity: "",
      rate: "",
      clear: "",
      class: "",
      cut: "",
    }));
  };


  const handleSave = async () => {
    try {
      const dataToSave = {
        formData,
        tableData,
      };

      const response = await axios.post(`${baseURL}/post/purchase`, dataToSave);

      if (response.status === 201) {
        alert(response.data.message);

        // Reset formData and tableData
        setFormData({
          account_name: "",
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
          indent: "",
          bill_no: "",
          type: "",
          rate_cut: "",
          date: "",
          bill_date: "",
          due_date: "",
          Purchase_rate: "",
        });

        setTableData([]);
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error);
      alert("Failed to save data.");
    }
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
        console.log("Customers=", customers)
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
    console.log("Customer Id=", customer)

    if (customer) {
      setFormData({
        ...formData,
        customer_id: customerId, // Ensure this is correctly set
        account_name: customer.account_name, // Set the name field to the selected customer
        mobile: customer.mobile || "",
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
        account_name: "",
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
    navigate('/purchasetable');
  };

  const handleAddCustomer = () => {
    navigate("/customermaster", { state: { from: "/purchase" } });
  };

  return (
    <div className="main-container">
      <div className="purchase-form-container">
        <Form>
          <div className="purchase-form">
            <div className="purchase-form-left">
              {/* Customer Details */}
              <Col className="urd-form-section">
                <h4 className="mb-4">Customer Details</h4>
                <Row>
                  <Col xs={12} md={3} className="d-flex align-items-center">
                    <div style={{ flex: 1 }}>
                      <InputField
                        label="Mobile"
                        name="mobile"
                        type="select"
                        value={formData.customer_id || ""} // Use customer_id to match selected value
                        onChange={(e) => handleCustomerChange(e.target.value)}
                        options={[
                          { value: "", label: "Select" }, // Placeholder option
                          ...customers.map((customer) => ({
                            value: customer.account_id, // Use account_id as the value
                            label: customer.mobile, // Display mobile as the label
                          })),
                        ]}
                      />
                    </div>
                    <AiOutlinePlus
                      size={20}
                      color="black"
                      onClick={handleAddCustomer}
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        marginBottom: "20px",
                      }}
                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="Customer Name:"
                      value={formData.account_name}
                      onChange={(e) => handleChange("account_name", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="Email:"

                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="Address1:"
                      value={formData.address1}
                      onChange={(e) => handleChange("address1", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="Address2:"
                      value={formData.address2}
                      onChange={(e) => handleChange("address2", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField
                      label="PinCode"
                      value={formData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}

                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="State:" value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="State Code:" value={formData.state_code}
                      onChange={(e) => handleChange("state_code", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="Aadhar" value={formData.aadhar_card}
                      onChange={(e) => handleChange("aadhar_card", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="GSTIN" value={formData.gst_in}
                      onChange={(e) => handleChange("gst_in", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3}>
                    <InputField label="PAN" value={formData.pan_card}
                      onChange={(e) => handleChange("pan_card", e.target.value)} />
                  </Col>

                </Row>

              </Col>
            </div>
            <div className="purchase-form-right">
              <Col className="urd-form-section">
                <Row>
                  <Col xs={12} md={6} >
                    <InputField label="Indent" value={formData.indent}
                      onChange={(e) => handleChange("indent", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Bill No" value={formData.bill_no}
                      onChange={(e) => handleChange("bill_no", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Type" value={formData.type}
                      onChange={(e) => handleChange("type", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Rate-Cut" value={formData.rate_cut}
                      onChange={(e) => handleChange("rate_cut", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6}>
                    <InputField
                      label="Date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Bill Date" type="date" value={formData.bill_date}
                      onChange={(e) => handleChange("bill_date", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Due Date" type="date" value={formData.due_date}
                      onChange={(e) => handleChange("due_date", e.target.value)} />
                  </Col>
                  <Col xs={12} md={6} >
                    <InputField label="Rate" value={formData.Purchase_rate}
                      onChange={(e) => handleChange("Purchase_rate", e.target.value)} />
                  </Col>

                </Row>


              </Col>
            </div>
          </div>

          <div className="urd-form-section">
            {/* <h4>Purchase Details</h4> */}
            <Row>
              <Col xs={12} md={1}>
                <InputField
                  label="P ID"
                  type="text"
                  value={formData.product_id}
                  onChange={(e) => handleChange("product_id", e.target.value)}
                />
              </Col>
              <Col xs={12} md={2}>
                <InputField
                  label="Product Name"
                  type="select"
                  value={formData.product_name}
                  onChange={(e) => handleChange('product_name', e.target.value)}
                  options={[
                    { value: 'PRODUCT1', label: 'Product1' },
                    { value: 'PRODUCT2', label: 'Product2' },
                    { value: 'PRODUCT3', label: 'Product3' },
                    { value: 'PRODUCT4', label: 'Product4' },
                  ]}
                />
              </Col>
              <Col xs={12} md={2}>
                <InputField
                  label="Metal Type"
                  type="select"
                  value={formData.metal_type}
                  onChange={(e) => handleChange('metal_type', e.target.value)}
                  options={[
                    { value: "GOLD", label: "Gold" },
                    { value: "SILVER", label: "Silver" },
                    { value: "PLATINUM", label: "Platinum" },
                  ]}
                />
              </Col>
              <Col xs={12} md={2}>
                <InputField
                  label="Design Master"
                  type="select"
                  value={formData.design_name}
                  onChange={(e) => handleChange('design_name', e.target.value)}
                  options={[
                    { value: "GOLD", label: "Gold" },
                    { value: "SILVER", label: "Silver" },
                    { value: "PLATINUM", label: "Platinum" },
                  ]}
                />
              </Col>
              <Col xs={12} md={1}>
                <InputField
                  label="Purity:"
                  type="select"
                  value={formData.purity}
                  onChange={(e) => handleChange('purity', e.target.value)}
                  options={[
                    { value: "24K", label: "24K" },
                    { value: "22K", label: "22K (916)" },
                    { value: "22KHM", label: "22K (916HM)" },
                    { value: "18K", label: "18K (750)" },
                    { value: "14K", label: "14K (585)" },
                    { value: "10K", label: "10K (417)" },
                    { value: "9K", label: "9K (375)" },
                  ]}
                />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="HSN" type="text" value={formData.hsn}
                  onChange={(e) => handleChange("hsn", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Type" type="text" value={formData.product_type}
                  onChange={(e) => handleChange("product_type", e.target.value)} />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="Stock Type" type="text" value={formData.stock_type}
                  onChange={(e) => handleChange("stock_type", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="PCs" type="text" value={formData.pcs}
                  onChange={(e) => handleChange("pcs", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Gross" type="number" value={formData.gross_weight}
                  onChange={(e) => handleChange("gross_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Stone" type="number" value={formData.stone_weight}
                  onChange={(e) => handleChange("stone_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Net" type="number" value={formData.net_weight}
                  onChange={(e) => handleChange("net_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Rate" type="number" value={formData.stone_rate}
                  onChange={(e) => handleChange("stone_rate", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Unit" type="number" value={formData.unit_weight}
                  onChange={(e) => handleChange("unit_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="W%" type="number" value={formData.waste_percentage}
                  onChange={(e) => handleChange("waste_percentage", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Waste" type="number" value={formData.waste_amount}
                  onChange={(e) => handleChange("waste_amount", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Pure Wt" type="number" value={formData.pure_weight}
                  onChange={(e) => handleChange("pure_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Alloy" value={formData.alloy}
                  onChange={(e) => handleChange("alloy", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Cost" type="number" value={formData.cost}
                  onChange={(e) => handleChange("cost", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Total Wt" type="number" value={formData.total_weight}
                  onChange={(e) => handleChange("total_weight", e.target.value)} />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="WT*Rate Amt" type="number" value={formData.wt_rate_amount}
                  onChange={(e) => handleChange("wt_rate_amount", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="MC/Gm" type="number" value={formData.mc_per_gram}
                  onChange={(e) => handleChange("mc_per_gram", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="MC" type="number" value={formData.mc}
                  onChange={(e) => handleChange("mc", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Stn.Amt" type="number" value={formData.stone_amount}
                  onChange={(e) => handleChange("stone_amount", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Total" type="number" value={formData.total_amount}
                  onChange={(e) => handleChange("total_amount", e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={2}>
                <InputField label="Stone" value={formData.stone}
                  onChange={(e) => handleChange("stone", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="PCs" type="number" value={formData.stone_pcs}
                  onChange={(e) => handleChange("stone_pcs", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="CT" type="number" value={formData.stone_ct}
                  onChange={(e) => handleChange("stone_ct", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Gms" type="number" value={formData.gms}
                  onChange={(e) => handleChange("gms", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="CWP" value={formData.cwp}
                  onChange={(e) => handleChange("cwp", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Rate" type="number" value={formData.rate}
                  onChange={(e) => handleChange("rate", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Clear" value={formData.clear}
                  onChange={(e) => handleChange("clear", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Class" value={formData.class}
                  onChange={(e) => handleChange("class", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Cut" value={formData.cut}
                  onChange={(e) => handleChange("cut", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Clarity" value={formData.clarity}
                  onChange={(e) => handleChange("clarity", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <Button
                  style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <div style={{ overflowX: "scroll" }}>
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Metal Type</th>
                    <th>Design Name</th>
                    <th>Purity</th>
                    <th>HSN</th>
                    <th>Product Type</th>
                    <th>Stock Type</th>
                    <th>Pieces</th>
                    <th>Gross Weight</th>
                    <th>Stone Weight</th>
                    <th>Net Weight</th>
                    <th>Unit Weight</th>
                    <th>Waste Percentage</th>
                    <th>Waste Amount</th>
                    <th>Pure Weight</th>
                    <th>Alloy</th>
                    <th>Cost</th>
                    <th>Total Weight</th>
                    <th>Weight Rate Amount</th>
                    <th>MC Per Gram</th>
                    <th>Making Charges</th>
                    <th>Stone Amount</th>
                    <th>Total Amount</th>
                    <th>Stone</th>
                    <th>Stone Pieces</th>
                    <th>Stone Carat</th>
                    <th>CWP</th>
                    <th>GMS</th>
                    <th>Stone Rate</th>
                    <th>Clarity</th>
                    <th>Rate</th>
                    <th>Clear</th>
                    <th>Class</th>
                    <th>Cut</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.product_id}</td>
                      <td>{data.product_name}</td>
                      <td>{data.metal_type}</td>
                      <td>{data.design_name}</td>
                      <td>{data.purity}</td>
                      <td>{data.hsn}</td>
                      <td>{data.product_type}</td>
                      <td>{data.stock_type}</td>
                      <td>{data.pcs}</td>
                      <td>{data.gross_weight}</td>
                      <td>{data.stone_weight}</td>
                      <td>{data.net_weight}</td>
                      <td>{data.unit_weight}</td>
                      <td>{data.waste_percentage}</td>
                      <td>{data.waste_amount}</td>
                      <td>{data.pure_weight}</td>
                      <td>{data.alloy}</td>
                      <td>{data.cost}</td>
                      <td>{data.total_weight}</td>
                      <td>{data.wt_rate_amount}</td>
                      <td>{data.mc_per_gram}</td>
                      <td>{data.mc}</td>
                      <td>{data.stone_amount}</td>
                      <td>{data.total_amount}</td>
                      <td>{data.stone}</td>
                      <td>{data.stone_pcs}</td>
                      <td>{data.stone_ct}</td>
                      <td>{data.cwp}</td>
                      <td>{data.gms}</td>
                      <td>{data.stone_rate}</td>
                      <td>{data.clarity}</td>
                      <td>{data.rate}</td>
                      <td>{data.clear}</td>
                      <td>{data.class}</td>
                      <td>{data.cut}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="form-buttons">
            <Button type="submit" variant="success" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }} onClick={handleSave}>Save</Button>

            <Button
              variant="secondary"
              onClick={handleBack} style={{ backgroundColor: 'gray', marginRight: '10px' }}
            >
              cancel
            </Button>

          </div>
        </Form>
      </div>
    </div>
  );
};

export default URDPurchase;
