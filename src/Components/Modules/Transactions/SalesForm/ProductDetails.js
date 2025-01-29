import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import InputField from './../../../Pages/InputField/InputField';
import axios from 'axios';
import baseURL from "../../../../Url/NodeBaseURL";

const ProductDetails = ({
  handleAdd,
  handleUpdate,
  isEditing,
  formData,
  data,
  handleChange,
  handleBarcodeChange,
  handleProductNameChange,
  handleMetalTypeChange,
  handleDesignNameChange,
  products,
  filteredDesignOptions,
  filteredPurityOptions,
  filteredMetalTypes,
  subcategoryOptions,
  uniqueProducts,
  purityOptions,
  metaltypeOptions,
  isBarcodeSelected,
  isQtyEditable
}) => {

  console.log("Filtered Design Options:", filteredDesignOptions);
  console.log("Filtered Purity Options:", filteredPurityOptions);
  console.log("Filtered Metal Types:", filteredMetalTypes);
  console.log("Unique Products:", uniqueProducts);
  console.log("subcategory Options:", subcategoryOptions);

  return (
    <Col >
      <Row>
        <Col xs={12} md={2}>
          <InputField
            label="BarCode/Rbarcode"
            name="code"
            value={formData.code}
            onChange={(e) => handleBarcodeChange(e.target.value)}
            type="select"
            options={
              formData.barcodeOptions?.length > 0
                ? formData.barcodeOptions
                : [
                  ...products.map((product) => ({
                    value: product.rbarcode,
                    label: product.rbarcode,
                  })),
                  ...data.map((tag) => ({
                    value: tag.PCode_BarCode,
                    label: tag.PCode_BarCode,
                  })),
                ]
            }
          />
        </Col>
        <Col xs={12} md={2}>
        {isBarcodeSelected ? (
          <InputField
          label="Metal Type"
          name="metal_type"
          value={formData.metal_type || ""}
          onChange={handleChange}
          type="select"
          options={metaltypeOptions} // Set options dynamically from the API
        />
          
          ) : (
          <InputField
            label="Metal Type"
            name="metal_type"
            value={formData.metal_type}
            onChange={(e) => handleMetalTypeChange(e.target.value)}
            type="select"
            options={filteredMetalTypes.map((metalType) => ({
              value: metalType.metal_type,
              label: metalType.metal_type,
            }))}
          />
        )}
        </Col>

        <Col xs={12} md={2}>
          <InputField
            label="Category"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            readOnly
          />
        </Col>

        <Col xs={12} md={2}>
          {isBarcodeSelected ? (
           <InputField
           label="Sub Category"
           name="product_name"
           value={formData.product_name || ""}
           onChange={handleChange}
           type="select"
           options={subcategoryOptions} // Dynamically fetched options based on category
         />
          
          ) : (
            <InputField
              label="Sub Category"
              name="product_name"
              value={formData.product_name}
              onChange={(e) => handleProductNameChange(e.target.value)}
              type="select"
              options={uniqueProducts.map((prod) => ({
                value: prod.sub_category,
                label: prod.sub_category,
              }))}
            />
          )}
        </Col>

        <Col xs={12} md={2}>
          {isBarcodeSelected ? (
            <InputField
              label="Product Design Name"
              name="design_name"
              value={formData.design_name}
              onChange={handleChange}
              type="text"
            />
          ) : (
            <InputField
              label="Product Design Name"
              name="design_name"
              value={formData.design_name}
              onChange={(e) => handleDesignNameChange(e.target.value)}
              type="select"
              options={filteredDesignOptions.map((designOption) => ({
                value: designOption.design_master,
                label: designOption.design_master,
              }))}
            />
          )}
        </Col>

        <Col xs={12} md={2}>
        {isBarcodeSelected ? (
          <InputField
          label="Purity"
          name="purity"
          value={formData.purity || ""}
          onChange={handleChange}
          type="select"
          options={purityOptions} // Set options dynamically from the API
        />
          
          ) : (
          <InputField
            label="Purity"
            name="purity"
            value={formData.purity}
            onChange={handleChange}
            type="select"
            options={filteredPurityOptions.map((Purity) => ({
              value: Purity.Purity,
              label: Purity.Purity,
            }))}
          />
          )}
        </Col>

        {/* <Col xs={12} md={2}>
    <InputField
      label="Sub Category"
      name="sub_category"
      value={formData.sub_category || ""}
      onChange={handleChange}
      readOnly={!isBarcodeSelected}
    />
  </Col> */}
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
            label="Wastage On"
            name="va_on"
            type="select"
            value={formData.va_on || ""} // Default to "Gross Weight"
            onChange={handleChange}
            options={[
              { value: "Gross Weight", label: "Gross Weight" },
              { value: "Weight BW", label: "Weight BW" },
              ...(formData.va_on &&
                !["Gross Weight", "Weight BW"].includes(formData.va_on)
                ? [{ value: formData.va_on, label: formData.va_on }]
                : []),
            ]}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Wastage%"
            name="va_percent"
            value={formData.va_percent || "0"}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="W.Wt"
            name="wastage_weight"
            value={formData.wastage_weight || "0.00"}
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
            label="Amount"
            name="rate_amt"
            value={formData.rate_amt || "0.00"} // Default to "0.00" if undefined
            onChange={handleChange} // Trigger recalculation of Total MC
            readOnly={false} // Ensure it's editable
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="MC On"
            name="mc_on"
            type="select"
            value={formData.mc_on || ""} // Default to "MC / Gram"
            onChange={handleChange}
            options={[
              { value: "MC / Gram", label: "MC / Gram" },
              { value: "Fixed", label: "Fixed" },
              { value: "MC %", label: "MC %" },
              ...(formData.mc_on &&
                !["MC / Gram", "Fixed", "MC %"].includes(formData.mc_on)
                ? [{ value: formData.mc_on, label: formData.mc_on }]
                : []),
            ]}
          />
        </Col>
        <Col xs={12} md={1}>
          {/* <InputField
            label={formData.metal_type?.toLowerCase() === "gold" ? "MC Percentage" : "MC/Gm"} // Dynamic label based on metal type
            name="mc_per_gram"
            value={formData.mc_per_gram || ""} // Ensure value is set properly
            onChange={handleChange}
          /> */}
          <InputField
            label={
              formData.mc_on === "MC %"
                ? "MC %"
                : "MC/Gm"
            } // Dynamic label based on mc_on value
            name="mc_per_gram"
            value={formData.mc_per_gram || ""} // Default value handling
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Total MC"
            name="making_charges"
            value={formData.making_charges || ""} // Display calculated Total MC
            readOnly 
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Qty"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            readOnly={!isQtyEditable} // Make it editable when isQtyEditable is true
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField label="Tax%"
            name="tax_percent"
            value={formData.tax_percent}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Tax Amt"
            name="tax_amt"
            value={formData.tax_amt || "0.00"} // Default to "0.00" if undefined
            onChange={handleChange} // Optional, since it's auto-calculated
            readOnly
          />
        </Col>
        <Col xs={12} md={1}>
          <InputField
            label="Total Price"
            name="total_price"
            value={formData.total_price || "0.00"} // Default to "0.00" if undefined
            onChange={handleChange} // Optional, since it's auto-calculated
            readOnly
          />
        </Col>
        <Col xs={12} md={1}>
          <Button
            onClick={isEditing ? handleUpdate : handleAdd} // Conditional action
            style={{
              backgroundColor: isEditing ? "#a36e29" : "#a36e29",
              borderColor: isEditing ? "#a36e29" : "#a36e29",
            }}
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductDetails;