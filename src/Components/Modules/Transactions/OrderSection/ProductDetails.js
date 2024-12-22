import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';

const ProductDetails = ({ 
  formData, 
  handleChange, 
  handleBarcodeChange,
  handleProductChange,
  handleProductNameChange,
  handleMetalTypeChange,
  handleDesignNameChange,
  handleAdd,
  products,
  isQtyEditable
}) => {
  return (
    <Col>
      <Row>
        <Col xs={12} md={2}>
          <InputField
            label="BarCode/Rbarcode"
            name="code"
            value={formData.code}
            onChange={(e) => handleBarcodeChange(e.target.value)}
            type="select"
            options={[
              ...products.map((product) => ({
                value: product.rbarcode,
                label: product.rbarcode,
              }))
            ]}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="P ID"
            name="product_id"
            value={formData.product_id}
            onChange={(e) => handleProductChange(e.target.value)}
            type="select"
            options={products.map((product) => ({
              value: product.product_id,
              label: product.product_id,
            }))}
          />
        </Col>
        <Col xs={12} md={3}>
          <InputField
            label="Product Name"
            name="product_name"
            value={formData.product_name}
            onChange={(e) => handleProductNameChange(e.target.value)}
            type="select"
            options={products.map((product) => ({
              value: product.product_name,
              label: product.product_name,
            }))}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Metal Type"
            name="metal_type"
            value={formData.metal_type}
            onChange={(e) => handleMetalTypeChange(e.target.value)}
            type="select"
            options={products.map((product) => ({
              value: product.Category,
              label: product.Category,
            }))}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Design Name"
            name="design_name"
            value={formData.design_name}
            onChange={(e) => handleDesignNameChange(e.target.value)}
            type="select"
            options={products.map((product) => ({
              value: product.design_master,
              label: product.design_master,
            }))}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Purity"
            name="purity"
            value={formData.purity}
            onChange={handleChange}
            readOnly
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Gross Wt"
            name="gross_weight"
            value={formData.gross_weight || ""}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Stone Wt"
            name="stone_weight"
            value={formData.stone_weight || ""}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="St Price"
            name="stone_price"
            value={formData.stone_price || ""}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Weight BW"
            name="weight_bw"
            value={formData.weight_bw || ""}
            onChange={handleChange}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="VA On"
            name="va_on"
            type="select"
            value={formData.va_on || ""}
            onChange={handleChange}
            options={[
              { value: "Gross Weight", label: "Gross Weight" },
              { value: "Weight BW", label: "Weight BW" }
            ]}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="VA%"
            name="va_percent"
            value={formData.va_percent || ""}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="WW"
            name="wastage_weight"
            value={formData.wastage_weight || ""}
            onChange={handleChange}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Total Weight AW"
            name="total_weight_av"
            value={formData.total_weight_av || ""}
            onChange={handleChange}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="MC On"
            name="mc_on"
            type="select"
            value={formData.mc_on || ""}
            onChange={handleChange}
            options={[
              { value: "By Weight", label: "By Weight" },
              { value: "Fixed", label: "Fixed" }
            ]}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="MC/Gm"
            name="mc_per_gram"
            value={formData.mc_per_gram || ""}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Making Charges"
            name="making_charges"
            value={formData.making_charges || ""}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Rate"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Qty"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            readOnly={!isQtyEditable}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Amount"
            name="rate_amt"
            value={formData.rate_amt || "0.00"}
            onChange={handleChange}
            readOnly
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Tax%"
            name="tax_percent"
            value={formData.tax_percent}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Tax Amt"
            name="tax_amt"
            value={formData.tax_amt || "0.00"}
            onChange={handleChange}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Total Price"
            name="total_price"
            value={formData.total_price || "0.00"}
            onChange={handleChange}
            readOnly
          />
        </Col>
        <Col xs={12} md={1}>
          <Button onClick={handleAdd} style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>
            Add
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductDetails;