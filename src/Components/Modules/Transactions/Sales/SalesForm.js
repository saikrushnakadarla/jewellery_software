import React, { useState, useEffect } from "react";
import "./SalesForm.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import baseURL from "../../../../Url/NodeBaseURL";

const RepairForm = () => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    product_id: "",
    product_name: "",
    metal_type: "",
    design_name: "",
    purity: "",
    gross_weight: "",
    st_weight: "",
    weight_bw: "",
    rate: "",
    tax: "",
    barcode: "",
    stones_price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:5000/get/opening-tags-entry');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const result = await response.json();
        setData(result.result);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${baseURL}/get/account-details`);
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const result = await response.json();
        const customers = result.filter(
          (item) => item.account_group === 'CUSTOMERS'
        );
        setCustomers(customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchProducts();
    fetchTags();
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBarcodeChange = async (barcode) => {
    try {
      const product = products.find((prod) => String(prod.rbarcode) === String(barcode));

      if (product) {
        setFormData((prevData) => ({
          ...prevData,
          barcode: product.rbarcode || "",
          product_id: product.product_id || "",
          product_name: product.product_name || "",
          metal_type: product.Category || "",
          design_name: product.design_master || "",
          purity: product.purity || "",
          gross_weight: "",
          st_weight: "",
          stones_price: "",
        }));
        return;
      }

      const tag = data.find((tag) => String(tag.PCode_BarCode) === String(barcode));

      if (tag) {
        const productId = tag.product_id;
        const productDetails = products.find((prod) => String(prod.product_id) === String(productId));
        console.log("Product Details=",productDetails)

        setFormData((prevData) => ({
          ...prevData,
          barcode: tag.PCode_BarCode || "",
          product_id: tag.product_id || "",
          product_name: productDetails?.product_name || "",
          metal_type: productDetails?.Category || "",
          design_name: productDetails?.design_master || "",
          purity: productDetails?.purity || "",
          gross_weight: tag.gross_weight || "",
          st_weight: tag.stones_weight || "",
          stones_price: tag.stones_price || "",
        }));
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        barcode: "",
        product_id: "",
        product_name: "",
        metal_type: "",
        design_name: "",
        purity: "",
        gross_weight: "",
        st_weight: "",
        stones_price: "",
      }));
    } catch (error) {
      console.error("Error handling barcode change:", error);
    }
  };

  return (
    <div className="main-container">
      <Container className="sales-form-container">
        <Form>
          <h3 style={{ marginTop: '-45px', marginBottom: '10px', textAlign: 'left', color: '#a36e29' }}>Sales</h3>
          <div className="sales-form-section">
            <Col>
              <Row>
                <Col xs={12} md={2}>
                  <InputField
                    label="BarCode/Rbarcode"
                    name="barcode"
                    value={formData.barcode}
                    onChange={(e) => handleBarcodeChange(e.target.value)}
                    type="select"
                    options={[
                      ...products.map((product) => ({
                        value: product.rbarcode,
                        label: product.rbarcode,
                      })),
                      ...data.map((tag) => ({
                        value: tag.PCode_BarCode,
                        label: tag.PCode_BarCode,
                      })),
                    ]}
                  />
                </Col>

                <Col xs={12} md={2}>
                  <InputField
                    label="P ID"
                    name="product_id"
                    value={formData.product_id}
                    onChange={(e) => handleChange(e)}
                    readOnly
                  />
                </Col>

                <Col xs={12} md={3}>
                  <InputField
                    label="Product Name"
                    name="product_name"
                    value={formData.product_name}
                    onChange={(e) => handleChange(e)}
                    readOnly
                  />
                </Col>

                <Col xs={12} md={2}>
                  <InputField
                    label="Metal Type"
                    value={formData.metal_type}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Design Name"
                    value={formData.design_name}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={1}>
                  <InputField
                    label="Purity"
                    value={formData.purity}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Gross Weight"
                    value={formData.gross_weight}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="St Weight"
                    value={formData.st_weight}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
                <Col xs={12} md={2}>
                  <InputField
                    label="Stones Price"
                    value={formData.stones_price}
                    onChange={handleChange}
                    readOnly
                  />
                </Col>
              </Row>
            </Col>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default RepairForm;
