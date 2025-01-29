import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import InputField from "../../../Pages/InputField/InputField";
import baseURL from "../../../../Url/NodeBaseURL";
import { AiOutlinePlus } from "react-icons/ai";

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

  return (
    <Form onSubmit={handleSave}>
      <Card className="p-4">
        <h4 className="mb-3">Update Purchase</h4>

        {/* Supplier Details Section */}
        <div className="mb-4">
          <h5>Supplier Details</h5>
          <Row>
            <Col md={4} className="d-flex align-items-center">
              <div style={{ flex: 1 }}>
                <InputField
                  label="Mobile"
                  name="mobile"
                  type="select"
                  value={formData.customer_id || ""}
                  onChange={(e) => handleChange("customer_id", e.target.value)}
                  options={customers.map((customer) => ({
                    value: customer.account_id,
                    label: customer.mobile,
                  }))}
                />
              </div>
              <AiOutlinePlus size={20} color="black" onClick={handleAddCustomer} style={{ marginLeft: "10px", cursor: "pointer", marginBottom: "20px" }} />
            </Col>
            <Col md={4}>
              <InputField
                label="Supplier Name"
                name="account_name"
                type="select"
                value={formData.customer_id || ""}
                onChange={(e) => handleChange("customer_id", e.target.value)}
                options={customers.map((customer) => ({
                  value: customer.account_id,
                  label: customer.account_name,
                }))}
              />
            </Col>
            <Col md={4}>
              <InputField label="GSTIN" value={formData.gst_in || ""} onChange={(e) => handleChange("gst_in", e.target.value)} />
            </Col>
          </Row>
        </div>

        {/* Invoice Details Section */}
        <div className="mb-4">
          <h5>Invoice Details</h5>
          <Row>
            <Col md={4}>
              <InputField label="Invoice" value={formData.invoice || ""} onChange={(e) => handleChange("invoice", e.target.value)} />
            </Col>
            <Col md={4}>
              <InputField label="Bill Date" type="date" value={formData.bill_date || ""} onChange={(e) => handleChange("bill_date", e.target.value)} />
            </Col>
            <Col md={4}>
              <InputField label="Due Date" type="date" value={formData.due_date || ""} onChange={(e) => handleChange("due_date", e.target.value)} />
            </Col>
          </Row>
        </div>

        {/* Product Details Section */}
        <div className="mb-4">
          <h5>Product Details</h5>
          <Row>
            <Col md={3} className="d-flex align-items-center">
              <div style={{ flex: 1 }}>
                <InputField
                  label="Category"
                  name="category"
                  type="select"
                  value={formData.category || ""}
                  onChange={(e) => handleChange("category", e.target.value)}
                  options={categories.map((category) => ({
                    value: category.value,
                    label: category.label,
                  }))}
                />
              </div>
              <AiOutlinePlus size={20} color="black" onClick={handleAddCategory} style={{ marginLeft: "10px", cursor: "pointer", marginBottom: "20px" }} />
            </Col>

            {formData.category === "Diamond" ? (
              <>
                <Col md={3}>
                  <InputField label="Cut" name="cut" type="text" value={formData.cut || ""} onChange={(e) => handleChange("cut", e.target.value)} />
                </Col>
                <Col md={3}>
                  <InputField label="Color" name="color" type="text" value={formData.color || ""} onChange={(e) => handleChange("color", e.target.value)} />
                </Col>
                <Col md={3}>
                  <InputField label="Clarity" name="clarity" type="text" value={formData.clarity || ""} onChange={(e) => handleChange("clarity", e.target.value)} />
                </Col>
              </>
            ) : (
              <Col md={3}>
                <InputField
                  label="Purity"
                  type="select"
                  name="purity"
                  value={formData.purity || ""}
                  onChange={(e) => handleChange("purity", e.target.value)}
                  options={purityOptions.map((option) => ({
                    value: `${option.name} | ${option.purity}`,
                    label: `${option.name} | ${option.purity}`,
                  }))}
                />
              </Col>
            )}
          </Row>
        </div>

        {/* Payment Details Section */}
        <div className="mb-4">
          <h5>Payment Details</h5>
          <Row>
            <Col md={3}>
              <InputField label="Total Amount" type="number" value={formData.total_amount || 0} readOnly />
            </Col>
            <Col md={3}>
              <InputField label="Paid Amount" type="number" value={formData.paid_amount || 0} onChange={(e) => handleChange("paid_amount", e.target.value)} />
            </Col>
            <Col md={3}>
              <InputField label="Balance Amount" type="number" value={formData.balance_amount || 0} onChange={(e) => handleChange("balance_amount", e.target.value)} />
            </Col>
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
      </Card>
    </Form>
  );
};

export default UpdatePurchaseForm;
