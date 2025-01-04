import React, { useState, useEffect } from "react";
import "./Purchase.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import baseURL from "../../../../Url/NodeBaseURL";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import TagEntry from "./TagEntry";
import { Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from 'react-icons/fa';

const URDPurchase = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [productIdAndRbarcode, setProductIdAndRbarcode] = useState({});
  const [formData, setFormData] = useState(
    {
      mobile: "",
      account_name: "",
      gst_in: "",
      terms: "Cash",
      invoice: "",
      bill_no: "",
      rate_cut: "",
      date: new Date().toISOString().split("T")[0],
      bill_date: new Date().toISOString().split("T")[0],
      due_date: "",
      category: "",
      hsn_code: "",
      rbarcode: "",
      pcs: "",
      gross_weight: "",
      stone_weight: "",
      net_weight: "",
      hm_charges: "",
      other_charges: "",
      charges: "",
      purity: "",
      metal_type: "",
      pure_weight: "",
      rate: "",
      total_amount: "",
    });
  const [tableData, setTableData] = useState([]);
  const [rates, setRates] = useState({ rate_24crt: "", rate_22crt: "", rate_18crt: "", rate_16crt: "" });
  const [purityOptions, setPurityOptions] = useState([]);
  const [showModal1, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchPurityPercentage = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/purity`);
  //       setPurityOptions(response.data);
  //       const purityData = Array.isArray(response.data) ? response.data : [response.data]; // Ensure response is an array

  //       console.log("API Data:", purityData); // Log the API data for debugging

  //       // Find the matching purity
  //       const matchedPurity = purityData.find(
  //         (item) => item.name === formData.purity
  //       );

  //       if (matchedPurity) {
  //         console.log("Matched Purity:", matchedPurity); // Log the matched purity
  //         setFormData((prevData) => ({
  //           ...prevData,
  //           purityPercentage: matchedPurity.purity_percentage,
  //         }));
  //       } else {
  //         console.warn("Purity not found in API data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching purity data:", error);
  //     }
  //   };

  //   fetchPurityPercentage();
  // }, [formData.purity]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [field]: value };

      // If the category changes, update the hsn_code automatically
      if (field === "category") {
        const selectedCategory = categories.find(
          (category) => category.value === value
        );
        if (selectedCategory) {
          updatedFormData.hsn_code = selectedCategory.hsn_code;  // Set the hsn_code based on the selected category
        }
      }

      return updatedFormData;
    });

    setFormData((prev) => {
      const updatedFormData = { ...prev, [field]: value };

      let updatedDetails = { ...updatedFormData };

      // Parse purity to percentage from carats (e.g., "24K" -> 100%)
      const parsePurityToPercentage = (purity) => {
        const caratValue = parseFloat(purity.replace("K", "")); // Extract number from "24K", "22K", etc.
        return (caratValue / 24) * 100; // Convert carats to percentage
      };

      // Update rate based on purity
      if (field === "purity") {
        const rate =
          value === "24K" ? rates.rate_24crt :
            value === "22K" ? rates.rate_22crt :
              value === "18K" ? rates.rate_18crt :
                value === "16K" ? rates.rate_16crt :
                  "";

        updatedDetails.rate = rate;
      }

      // Update pure weight when net weight or purity changes
      if (field === "net_weight" || field === "purity") {
        const netWeight = parseFloat(updatedDetails.net_weight) || 0;
        const purityPercentage = parsePurityToPercentage(updatedDetails.purity) || 0;

        updatedDetails.pure_weight = ((netWeight * purityPercentage) / 100).toFixed(2);
      }

      // Additional calculations for other fields
      if (
        updatedDetails.gross &&
        updatedDetails.dust &&
        updatedDetails.ml_percent &&
        updatedDetails.purity
      ) {
        const purityValue = parsePurityToPercentage(updatedDetails.purity);

        if (purityValue) {
          const gross = parseFloat(updatedDetails.gross) || 0;
          const dust = parseFloat(updatedDetails.dust) || 0;
          const mlPercent = parseFloat(updatedDetails.ml_percent) || 0;

          const netWeight = ((gross - dust) * (purityValue - mlPercent)) / 100;
          updatedDetails.eqt_wt = netWeight.toFixed(2);
        }
      }

      // Other calculations for weights and amounts
      const grossWeight = parseFloat(updatedDetails.gross_weight) || 0;
      const stoneWeight = parseFloat(updatedDetails.stone_weight) || 0;
      updatedDetails.net_weight = grossWeight - stoneWeight;

      const netWeight = parseFloat(updatedDetails.net_weight) || 0;
      const purityPercentage = parsePurityToPercentage(updatedDetails.purity) || 0;
      updatedDetails.pure_weight = ((netWeight * purityPercentage) / 100).toFixed(2);

      // Calculate total amount based on pure weight and rate
      const pureWeight = parseFloat(updatedDetails.pure_weight) || 0;
      const rate = parseFloat(updatedDetails.rate) || 0;
      updatedDetails.total_amount = (pureWeight * rate).toFixed(2);

      return updatedDetails;
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Prepare data to be sent to the API
    const apiData = {
      product_id: formData.product_id, // Assuming rbarcode maps to product_id
      pcs: formData.pcs || "0", // Allow pcs to be empty if not provided
      gross_weight: formData.gross_weight || "0", // Allow gross_weight to be empty if not provided
    };

    try {
      // Make a POST request to the API
      const response = await fetch("http://localhost:5000/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Pcs and GrossWeight added to the database successfully:", result);

        if (editingIndex === null) {
          // Add new entry to the table
          setTableData([...tableData, formData]);
        } else {
          // Edit existing entry in the table
          const updatedTableData = tableData.map((row, index) =>
            index === editingIndex ? formData : row
          );
          setTableData(updatedTableData);
          setEditingIndex(null); // Reset edit mode
        }

        // Reset formData only when needed (optional for editing scenarios)
        setFormData({
          ...formData, // If necessary, keep persistent fields like mobile, etc.
          category: "",
          hsn_code: "",
          rbarcode: "",
          pcs: "",
          gross_weight: "",
          stone_weight: "",
          net_weight: "",
          hm_charges: "",
          other_charges: "",
          charges: "",
          purity: "",
          pure_weight: "",
          rate: "",
          total_amount: "",
        });
      } else {
        console.error("Failed to add entry to the database:", response.statusText);
      }
    } catch (error) {
      console.error("Error while adding entry to the database:", error);
    }
  };



  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = {
        formData: { ...formData }, // Explicitly spread to ensure values are intact
        table_data: tableData, // Include table data
      };

      // Send the data to your backend
      const response = await axios.post("http://localhost:5000/post/purchase", dataToSave, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Data saved successfully:", response.data);
      alert("Data saved successfully:")

      // Optionally reset after successful save
      setFormData({
        mobile: "",
        account_name: "",
        gst_in: "",
        terms: "Cash",
        invoice: "",
        bill_no: "",
        rate_cut: "",
        date: new Date().toISOString().split("T")[0],
        bill_date: new Date().toISOString().split("T")[0],
        due_date: "",
        category: "",
        rbarcode: "",
        pcs: "",
        gross_weight: "",
        stone_weight: "",
        net_weight: "",
        hm_charges: "",
        other_charges: "",
        charges: "",
        purity: "",
        pure_weight: "",
        rate: "",
        total_amount: "",
      });

      setTableData([]); // Reset table data if needed
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // const handleEdit = (index) => {
  //   setFormData(tableData[index]); // Populate the form with selected row data
  //   setEditingIndex(index); // Track the index being edited
  // };
  const handleEdit = async (index) => {
    const selectedData = tableData[index]; // Get the data for the selected row
    const { product_id, pcs, gross_weight } = selectedData; // Extract product_id, pcs, and gross_weight

    try {
      // Send a request to the backend to update the product_id entry
      const response = await fetch(`http://localhost:5000/delete-updated-values/${product_id}`, {
        method: "PUT", // Change to PUT since we're updating, not deleting
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pcs, gross_weight }), // Pass pcs and gross_weight
      });

      if (!response.ok) {
        throw new Error("Failed to update entry in updated_values_table");
      }

      console.log("Entry updated successfully");
      setFormData(selectedData); // Populate the form with selected row data
      setEditingIndex(index); // Track the index being edited
    } catch (error) {
      console.error("Error updating entry:", error);
      alert("Failed to update the entry. Please try again.");
    }
  };


  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData); // Remove the selected row
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
          (item) => item.account_group === 'SUPPLIERS'
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
    navigate("/suppliermaster", { state: { from: "/purchase" } });
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (showModal1) {
        e.preventDefault();
        e.returnValue = ""; // This triggers the confirmation dialog in some browsers.
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [showModal1]);

  const handleCloseModal1 = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchCurrentRates = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/current-rates`);
        console.log('API Response:', response.data);

        // Log the 24crt rate separately
        console.log('24crt Rate:', response.data.rate_24crt);

        // Dynamically set the rates based on response
        setRates({
          rate_24crt: response.data.rate_24crt || "",
          rate_22crt: response.data.rate_22crt || "",
          rate_18crt: response.data.rate_18crt || "",
          rate_16crt: response.data.rate_16crt || "",
        });
      } catch (error) {
        console.error('Error fetching current rates:', error);
      }
    };
    fetchCurrentRates();
  }, []);


  // useEffect(() => {
  //   const fetchLastRbarcode = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/lastRbarcode`);
  //       setFormData((prev) => ({
  //         ...prev,
  //         rbarcode: response.data.lastrbNumbers,
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching estimate number:", error);
  //     }
  //   };

  //   fetchLastRbarcode();
  // }, []);


  // useEffect(() => {
  //   const fetchLastInvoice = async () => {
  //     try {
  //       const response = await axios.get(`${baseURL}/lastInvoice`);
  //       setFormData((prev) => ({
  //         ...prev,
  //         invoice: response.data.lastInvoiceNumber,
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching estimate number:", error);
  //     }
  //   };

  //   fetchLastInvoice();
  // }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/get/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Extract unique categories and map them into the required format with purity and hsn_code
        const categorizedData = data.map((item) => ({
          value: item.product_name,
          label: item.product_name,
          categoryType: item.Category, // Assuming "category" column indicates Gold/Silver
          purity: item.purity,
          hsn_code: item.hsn_code,
          product_id: item.product_id,
        }));

        // Remove duplicates
        const uniqueCategories = [
          ...new Map(categorizedData.map((item) => [item.value, item])).values(),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch purity options and hsn_code based on the selected category
  // Fetch purity options and rates based on the selected category
  useEffect(() => {
    const fetchRateForSilver = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get/current-rates");
        setFormData((prev) => ({
          ...prev,
          purity: "24K", // Directly set purity to 24K for silver
          rate: response.data.silver_rate || "",
        }));
      } catch (error) {
        console.error("Error fetching silver rate:", error);
      }
    };

    if (formData.category) {
      const selectedCategory = categories.find(
        (cat) => cat.value === formData.category
      );

      if (selectedCategory?.categoryType === "Silver") {
        fetchRateForSilver();
        setPurityOptions([{
          value: "24K",
          label: "24K",
        }]); // Only show 24K for silver
      } else if (selectedCategory?.categoryType === "Gold") {
        axios
          .get("http://localhost:5000/get/products")
          .then((response) => {
            const products = response.data;

            // Filter products based on selected category name
            const filteredProducts = products.filter(
              (product) => product.product_name === formData.category
            );

            // Extract unique purity values
            const uniquePurityValues = [
              ...new Set(filteredProducts.map((product) => product.purity)),
            ].filter((purity) => purity); // Exclude null/undefined

            // Update purity options
            setPurityOptions(
              uniquePurityValues.map((purity) => ({
                value: purity,
                label: purity,
              }))
            );

            // Reset rate until purity is selected
            setFormData((prev) => ({
              ...prev,
              rate: "",
            }));
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      }
    } else {
      // Reset purity options and rate if no category is selected
      setPurityOptions([]);
      setFormData((prev) => ({ ...prev, rate: "" }));
    }
  }, [formData.category, categories]);



  useEffect(() => {
    if (formData.category && formData.purity) {
      // Fetch data from API
      axios
        .get("http://localhost:5000/get/products")
        .then((response) => {
          const products = response.data;

          // Filter the products matching both category and purity
          const matchingProduct = products.find(
            (product) =>
              product.product_name === formData.category &&
              product.purity === formData.purity
          );

          // Update the product ID and rbarcode
          if (matchingProduct) {
            setProductIdAndRbarcode({
              product_id: matchingProduct.product_id,
              rbarcode: matchingProduct.rbarcode,
              metal_type: matchingProduct.Category,
            });
            setFormData((prevFormData) => ({
              ...prevFormData,
              product_id: matchingProduct.product_id, // Add product_id here
              rbarcode: matchingProduct.rbarcode,    // Ensure rbarcode is also updated
              metal_type: matchingProduct.Category,
            }));

            // Log success to console
            console.log(
              `Fetched product details: Product ID = ${matchingProduct.product_id}, Rbarcode = ${matchingProduct.rbarcode}`
            );
          } else {
            setProductIdAndRbarcode({});
            setFormData((prevFormData) => ({
              ...prevFormData,
              product_id: '', // Reset product_id if no match
              rbarcode: '',   // Reset rbarcode if no match
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    } else {
      // Reset if category or purity is not selected
      setProductIdAndRbarcode({});
      setFormData((prevFormData) => ({
        ...prevFormData,
        product_id: '', // Reset product_id
        rbarcode: '',   // Reset rbarcode
      }));
    }
  }, [formData.category, formData.purity]);


  const handleOpenModal = (data) => {
    setSelectedProduct(data);
    setShowModal(true);
  };


  // Handle category addition and navigate
  const handleAddCategory = () => {
    console.log("Add Category button clicked");
    navigate("/itemmaster" , { state: { from: "/purchase" } });
  };

  return (
    <div className="main-container">
      <div className="purchase-form-container">
        <Form>
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
              <Col className="urd-form2-section">
                <Row>
                  <Col xs={12} md={3}>
                    <InputField label="Terms" type="select" value={formData.terms}
                      onChange={(e) => handleChange("terms", e.target.value)}
                      options={[
                        { value: "Cash", label: "Cash" },
                        { value: "Credit", label: "Credit" },
                      ]}
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <InputField
                      label="Invoice"
                      value={formData.invoice}
                      onChange={(e) => handleChange("invoice", e.target.value)} // Corrected key
                    />
                  </Col>
                  {/* <Col xs={12} md={3} >
                    <InputField label="Bill No" value={formData.bill_no}
                      onChange={(e) => handleChange("bill_no", e.target.value)} />
                  </Col> */}

                  <Col xs={12} md={3} >
                    <InputField label="Rate-Cut" value={formData.rate_cut}
                      onChange={(e) => handleChange("rate_cut", e.target.value)} />
                  </Col>

                  <Col xs={12} md={3} >
                    <InputField label="Bill Date" type="date" value={formData.bill_date}
                      onChange={(e) => handleChange("bill_date", e.target.value)} />
                  </Col>
                  <Col xs={12} md={3} >
                    <InputField label="Due Date" type="date" value={formData.due_date}
                      onChange={(e) => handleChange("due_date", e.target.value)} />
                  </Col>
                </Row>
              </Col>
            </div>
          </div>
          <div className="urd-form-section">
            <Row>
            <Col xs={12} md={2} className="d-flex align-items-center">
        <div style={{ flex: 1 }}>
          <InputField
            label="Category"
            name="category"
            type="select"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
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
              <Col xs={12} md={2}>
                <InputField
                  label="Rbarcode"
                  name="rbarcode"
                  value={productIdAndRbarcode.rbarcode}
                  onChange={(e) => handleChange("rbarcode", e.target.value)}
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
                    { value: "cargo", label: "cargo" },
                    { value: "transport", label: "transport" },
                  ]}
                />
              </Col>
              <Col xs={12} md={2}>
                <InputField label="Charges" type="number" value={formData.charges}
                  onChange={(e) => handleChange("charges", e.target.value)} />
              </Col>
              <Col xs={12} md={2}>
                <InputField
                  label="Purity"
                  type="select"
                  name="purity"
                  value={formData.purity}
                  onChange={(e) => handleChange("purity", e.target.value)}
                  options={purityOptions}
                />

              </Col>
              <Col xs={12} md={1}>

                <InputField
                  label="Pure Wt"
                  type="number"
                  value={formData.pure_weight}
                  onChange={(e) => handleChange("pure_weight", e.target.value)}
                />
              </Col>
              <Col xs={12} md={2}>
                <InputField
                  label="Rate"
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


              {/* <Col xs={12} md={1}>
                <InputField label="Actions" type="number" value={formData.total_amount}
                  onChange={(e) => handleChange("total_amount", e.target.value)} />
              </Col>
              <Col xs={12} md={1}>
                <InputField label="Pure Bal" type="number" value={formData.total_amount}
                  onChange={(e) => handleChange("total_amount", e.target.value)} />
              </Col> */}
              <Col xs={12} md={1}>
                <Button onClick={handleAdd}>

                  {editingIndex !== null ? "Update" : "Add"}
                </Button>
              </Col>
            </Row>
            <Row>
            </Row>
            <div style={{ overflowX: "scroll", marginTop: '-27px' }}>
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>product_id</th>
                    <th>Rbarcode</th>
                    <th>Category</th>
                    <th>Pieces</th>
                    <th>Gross</th>
                    <th>Stone</th>
                    <th>Net</th>
                    <th>HM Charges</th>
                    <th>Other Charges</th>
                    <th>Charges</th>
                    <th>Metal Type</th>
                    <th>Purity</th>
                    <th>Pure Wt</th>
                    <th>Rate</th>
                    <th>Total Amount</th>
                    <th>Actions</th> {/* New Action column */}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.product_id}</td> {/* Display product_id */}
                      <td>{data.rbarcode}</td>
                      <td>{data.category}</td>
                      <td>{data.pcs}</td>
                      <td>{data.gross_weight}</td>
                      <td>{data.stone_weight}</td>
                      <td>{data.net_weight}</td>
                      <td>{data.hm_charges}</td>
                      <td>{data.other_charges}</td>
                      <td>{data.charges}</td>
                      <td>{data.metal_type}</td>
                      <td>{data.purity}</td>
                      <td>{data.pure_weight}</td>
                      <td>{data.rate}</td>
                      <td>{data.total_amount}</td>
                      <td style={{ display: 'flex' }}>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ backgroundColor: 'rgb(163, 110, 41)', width: '102px' }}
                          onClick={() => handleOpenModal(data)} // Pass entire row data
                        >
                          Tag Entry
                        </button>
                        <button
                          type="button"
                          className="action-button edit-button"
                          onClick={() => handleEdit(index)}
                          // disabled={editingIndex !== null}
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="action-button delete-button"
                          onClick={() => handleDelete(index)}
                        >
                          <FaTrash />
                        </button>
                      </td>
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

      <Modal
        show={showModal1}
        onHide={handleCloseModal1}
        size="lg"
        backdrop="static"
        keyboard={false}
        dialogClassName="custom-tagentrymodal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tag Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <TagEntry
              handleCloseModal={handleCloseModal1}
              selectedProduct={selectedProduct}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
};

export default URDPurchase;
