import React, { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL";
import { Col, Row } from "react-bootstrap";
import InputField from "../../../Pages/InputField/InputField"; // Adjust the path as per your project structure.

const SalesFormSection = () => {
  const [metalOptions, setMetalOptions] = useState([]);
  const [purityOptions, setPurityOptions] = useState([]);
  const [oldDetails, setOldDetails] = useState({
    metal: "",
    purity: "",
    hsn_code: "",
    gross: 0,
    dust: 0,
    ml_percent: 0,
    net_wt: 0,
    remarks: "",
    rate: 0,
    total_amount: 0,
  });

  const [rates, setRates] = useState({
    rate_24crt: "",
    rate_22crt: "",
    rate_18crt: "",
    rate_16crt: "",
  });

  useEffect(() => {
    const fetchPurity = async () => {
      try {
        const response = await axios.get(`${baseURL}/purity`);
        setPurityOptions(response.data); // Populate purity options dynamically
      } catch (error) {
        console.error("Error fetching purity options:", error);
      }
    };

    fetchPurity();
  }, []);

  useEffect(() => {
    const fetchMetalTypes = async () => {
      try {
        const response = await axios.get(`${baseURL}/metaltype`);
        const metalTypes = response.data.map((item) => ({
          value: item.metal_name,
          label: item.metal_name,
          hsn_code: item.hsn_code,
        }));
        setMetalOptions(metalTypes);
      } catch (error) {
        console.error("Error fetching metal types:", error);
      }
    };

    fetchMetalTypes();
  }, []);

  useEffect(() => {
    const fetchCurrentRates = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/current-rates`);
        setRates({
          rate_24crt: response.data.rate_24crt || "",
          rate_22crt: response.data.rate_22crt || "",
          rate_18crt: response.data.rate_18crt || "",
          rate_16crt: response.data.rate_16crt || "",
        });
      } catch (error) {
        console.error("Error fetching current rates:", error);
      }
    };

    fetchCurrentRates();
  }, []);

  const parsePurityToPercentage = (purity) => {
    if (!purity) return null;

    const match = purity.match(/(\d+)(k|K)/); // Match formats like "22K", "24k", etc.
    if (match) {
      const caratValue = parseInt(match[1], 10);
      return (caratValue / 24) * 100;
    }

    if (purity.toLowerCase() === "916hm") return 91.6;

    return null;
  };

  const calculateNetWeight = ({ gross, dust, purity, ml_percent }) => {
    const purityPercentage = parsePurityToPercentage(purity) || 0;
    const grossWeight = parseFloat(gross) || 0;
    const dustWeight = parseFloat(dust) || 0;
    const mlPercentValue = parseFloat(ml_percent) || 0;

    return ((grossWeight - dustWeight) * (purityPercentage - mlPercentValue)) / 100;
  };

  const calculateTotalAmount = ({ net_wt, rate }) => {
    const netWeight = parseFloat(net_wt) || 0;
    const rateAmount = parseFloat(rate) || 0;
    return ((netWeight) * (rateAmount)) ;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setOldDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, [name]: value };
  
      // Recalculate net weight
      updatedDetails.net_wt = calculateNetWeight(updatedDetails);
      updatedDetails.total_amount = calculateTotalAmount(updatedDetails);
      // Dynamically fetch HSN code if metal is selected
      if (name === "metal") {
        const selectedMetal = metalOptions.find((option) => option.value === value);
        updatedDetails.hsn_code = selectedMetal?.hsn_code || "";
      }
  
      return updatedDetails;
    });
  };
  

  const currentRate =
    oldDetails.purity === "24K" ? rates.rate_24crt :
    oldDetails.purity === "22K" ? rates.rate_22crt :
    oldDetails.purity === "18K" ? rates.rate_18crt :
    oldDetails.purity === "16K" ? rates.rate_16crt :
    "";

      useEffect(() => {
        if (oldDetails.metal === 'Gold') {
          setOldDetails((prevState) => ({
            ...prevState,
            ml_percent: 1, // Set default value for Gold
          }));
        } else if (oldDetails.metal === 'Silver') {
          setOldDetails((prevState) => ({
            ...prevState,
            ml_percent: 3, // Set default value for Silver
          }));
        } else if (!oldDetails.metal) {
          setOldDetails((prevState) => ({
            ...prevState,
            ml_percent: '', // Clear ml_percent if metal is cleared
          }));
        }
      }, [oldDetails.metal]);

  return (
    <Col className="sales-form-section">
      <Row>
        <h4 className="mb-3">Old</h4>

        <Col xs={12} md={4}>
          <InputField label="Product" />
        </Col>
        <Col xs={12} md={3}>
          <InputField
            label="Metal"
            name="metal"
            type="select"
            value={oldDetails.metal}
            onChange={handleInputChange}
            options={metalOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />
        </Col>
        <Col xs={12} md={3}>
          <InputField
            label="Purity"
            type="select"
            name="purity"
            value={oldDetails.purity}
            onChange={handleInputChange}
            options={purityOptions.map((purity) => ({
              value: purity.name,
              label: purity.name,
            }))}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="HSN Code"
            name="hsn_code"
            value={oldDetails.hsn_code}
            readOnly
          />
        </Col>

        <Col xs={12} md={3}>
          <InputField
            label="Gross"
            name="gross"
            value={oldDetails.gross}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={3}>
          <InputField
            label="Dust"
            name="dust"
            value={oldDetails.dust}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="ML %"
            type="number"
            name="ml_percent"
            value={oldDetails.ml_percent}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Net Wt"
            name="net_wt"
            value={Number.isNaN(oldDetails.net_wt) ? "" : oldDetails.net_wt.toFixed(2)}
            readOnly
          />
        </Col>
        <Col xs={12} md={2}>
          <InputField
            label="Rate"
            name="rate"
            value={oldDetails.rate || currentRate}
            onChange={handleInputChange}
          />
        </Col>
        <Col xs={12} md={2}>
           <InputField
            label="Total Amount"
            name="total_amount"
            value={oldDetails.total_amount.toFixed(2)}
            readOnly
          />
        </Col>
      </Row>
    </Col>
  );
};

export default SalesFormSection;
