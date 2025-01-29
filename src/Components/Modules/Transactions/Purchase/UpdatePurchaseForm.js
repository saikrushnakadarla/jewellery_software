import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import InputField from "../../../Pages/InputField/InputField";
import baseURL from "../../../../Url/NodeBaseURL";
import { AiOutlinePlus } from "react-icons/ai";
import "./UpdatePurchaseForm.css";

const UpdatePurchaseForm = ({ selectedProduct, handleCloseModal, customers = [], categories = [], purityOptions = [], handleAddCustomer, handleAddCategory }) => {
  const [formData, setFormData] = useState(selectedProduct || {});

  useEffect(() => {
    setFormData(selectedProduct || {});
  }, [selectedProduct]);

  const handleChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };

    try {
      const response = await fetch(`${baseURL}/purchases/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Purchase updated successfully");
        handleCloseModal();
      } else {
        alert("Failed to update purchase");
      }
    } catch (error) {
      console.error("Error updating purchase:", error);
      alert("Failed to update purchase");
    }
  };

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


  return (
    <div className="main-container">
    <div className="purchase-form-container">
      <Form onSubmit={handleSave}>
        <div className="purchase-form">
          <div className="purchase-form-left">
            <Col className="urd-form1-section">
              <h4 className="mb-4">Supplier Details</h4>
              <Row>
                <Col xs={12} md={4} className="d-flex align-items-center">
                  <div style={{ flex: 1 }}>
                    <InputField
                      label="Mobile"
                      name="mobile"
                      type="select"
                      value={formData.customer_id || ""} // Use customer_id to match selected value
                      onChange={(e) => handleCustomerChange(e.target.value)}
                      options={[
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
                <Col xs={12} md={4}>
                  <InputField
                    label="Suplier Name:"
                    name="account_name"
                    type="select"
                    value={formData.customer_id || ""} // Use customer_id to match selected value
                    onChange={(e) => handleCustomerChange(e.target.value)}
                    options={[
                      ...customers.map((customer) => ({
                        value: customer.account_id, // Use account_id as the value
                        label: customer.account_name, // Display mobile as the label
                      })),
                    ]}

                  />
                </Col>

                <Col xs={12} md={4}>
                  <InputField label="GSTIN" value={formData.gst_in}
                    onChange={(e) => handleChange("gst_in", e.target.value)} />
                </Col>
              </Row>
            </Col>
          </div>
          <div className="purchase-form-right">
            <Col className="updatepurchase-form2-section">
              <h4 className="mb-4">Invoice Details</h4>
              <Row>
                <Col xs={12} md={4}>
                  <InputField
                    label="Invoice"
                    value={formData.invoice}
                    onChange={(e) => handleChange("invoice", e.target.value)} // Corrected key
                  />
                </Col>
                <Col xs={12} md={4}>
                  <InputField
                    label="Bill Date"
                    type="date"
                    value={formData.bill_date}
                    onChange={(e) => handleChange("bill_date", e.target.value)}
                  />
                </Col>
                <Col xs={12} md={4} >
                  <InputField label="Due Date" type="date" value={formData.due_date}
                    onChange={(e) => handleChange("due_date", e.target.value)} />
                </Col>
              </Row>
            </Col>
          </div>
        </div>
        <div className="urd-form-section">
          <Row>
            <Col xs={12} md={3} className="d-flex align-items-center">
              <div style={{ flex: 1 }}>
                <InputField
                  label="Category"
                  name="category"
                  type="select"
                  value={formData.category}
                  onChange={(e) => {
                    handleChange("category", e.target.value);
                  }}
                  options={categories.map((category) => ({
                    value: category.value,
                    label: category.label,
                  }))}
                />
              </div>
              <AiOutlinePlus
                size={20}
                color="black"
                onClick={handleAddCategory}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  marginBottom: "20px",
                }}
              />
            </Col>
            {formData.category === "Diamond" ? (
              <>
                <Col xs={12} md={2}>
                  <InputField
                    label="Cut"
                    name="cut"
                    type="text"
                    value={formData.cut || ""}
                    onChange={(e) => handleChange("cut", e.target.value)}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Color"
                    name="color"
                    type="text"
                    value={formData.color || ""}
                    onChange={(e) => handleChange("color", e.target.value)}
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Clarity"
                    name="clarity"
                    type="text"
                    value={formData.clarity || ""}
                    onChange={(e) => handleChange("clarity", e.target.value)}
                  />
                </Col>
              </>
            ) : (
              <Col xs={12} md={2}>
                <InputField
                  label="Purity"
                  type="select"
                  name="purity"
                  value={formData.purity}
                  onChange={(e) => handleChange("purity", e.target.value)}
                  options={purityOptions.map((option) => ({
                    value: `${option.name} | ${option.purity}`, // Combined name and purity
                    label: `${option.name} | ${option.purity}`,
                  }))}
                />
              </Col>
            )}
            <Col xs={12} md={2}>
              <InputField
                label="Rbarcode"
                name="rbarcode"
                value={formData.rbarcode}
                onChange={(e) => handleChange("rbarcode", e.target.value)}
                readOnly
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="HSN Code"
                name="hsn_code"
                value={formData.hsn_code}
                onChange={handleChange}
                readOnly
              />
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
              <InputField
                label="Net"
                type="number"
                value={formData.net_weight}
                onChange={(e) => handleChange("net_weight", e.target.value)}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="HM Charges" type="number" value={formData.hm_charges}
                onChange={(e) => handleChange("hm_charges", e.target.value)} />
            </Col>

            <Col xs={12} md={2}>
              <InputField
                label="Other Charges:"
                type="select"
                value={formData.other_charges}
                onChange={(e) => handleChange("other_charges", e.target.value)}
                options={[
                  { value: "Cargo", label: "Cargo" },
                  { value: "Transport", label: "Transport" },
                ]}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="Charges" type="number" value={formData.charges}
                onChange={(e) => handleChange("charges", e.target.value)} />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Total Pure Wt"
                type="number"
                value={formData.pure_weight}
                onChange={(e) => handleChange("pure_weight", e.target.value)}
              />
            </Col>
            <Col xs={12} md={1}>
              <InputField
                label="Paid Wt"
                type="number"
                value={formData.paid_pure_weight}
                onChange={(e) => handleChange("paid_pure_weight", e.target.value)}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Balance Wt"
                type="number"
                value={formData.balance_pure_weight}
                onChange={(e) => handleChange("balance_pure_weight", e.target.value)}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Rate-Cut"
                type="number"
                value={formData.rate}
                onChange={(e) => handleChange("rate", e.target.value)}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Total Amount"
                type="number"
                value={formData.total_amount}
                readOnly // Prevent editing by the user
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Paid Amount"
                type="number"
                value={formData.paid_amount}
                onChange={(e) => handleChange("paid_amount", e.target.value)}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Balance Amount"
                type="number"
                value={formData.balance_amount}
                onChange={(e) => handleChange("balance_amount", e.target.value)}
              />
            </Col>
          </Row>
          <Row>
          </Row>
        </div>
         {/* Buttons */}
         <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" onClick={handleCloseModal} className="me-2">
            Cancel
          </Button>
          <Button type="submit" style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}>
            Update
          </Button>
        </div>
      </Form>
    </div>
  </div>

    //     {/* Buttons */}
    //     <div className="d-flex justify-content-end">
    //       <Button type="button" variant="secondary" onClick={handleCloseModal} className="me-2">
    //         Cancel
    //       </Button>
    //       <Button type="submit" style={{ backgroundColor: "#a36e29", borderColor: "#a36e29" }}>
    //         Update
    //       </Button>
    //     </div>
    //   </Card>
    // </Form>
  );
};

export default UpdatePurchaseForm;
