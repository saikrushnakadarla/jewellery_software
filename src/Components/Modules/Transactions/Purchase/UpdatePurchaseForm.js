import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import InputField from "../../../Pages/InputField/InputField";
import baseURL from "../../../../Url/NodeBaseURL";
import { AiOutlinePlus } from "react-icons/ai";
import "./UpdatePurchaseForm.css";
import axios from "axios";

const UpdatePurchaseForm = ({ selectedProduct, handleCloseModal, handleAddCustomer, handleAddCategory }) => {
    const [formData, setFormData] = useState(selectedProduct || {});
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [purityOptions, setPurityOptions] = useState([]);
    const [rates, setRates] = useState({ rate_24crt: "", rate_22crt: "", rate_18crt: "", rate_16crt: "" });

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

    useEffect(() => {
        const fetchCurrentRates = async () => {
            try {
                const response = await axios.get(`${baseURL}/get/current-rates`);
                setRates({
                    rate_24crt: response.data.rate_24crt || "",
                    rate_22crt: response.data.rate_22crt || "",
                    rate_18crt: response.data.rate_18crt || "",
                    rate_16crt: response.data.rate_16crt || "",
                    silver_rate: response.data.silver_rate || "",
                });
            } catch (error) {
                console.error('Error fetching current rates:', error);
            }
        };
        fetchCurrentRates();
    }, []);

    const handleChange = (field, value) => {
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [field]: value };

            // Restrict paid_amount to not exceed total_amount
            if (field === "paid_amount") {
                const totalAmount = parseFloat(updatedFormData.total_amount) || 0;
                const paidAmount = parseFloat(value) || 0;

                if (paidAmount > totalAmount) {
                    alert("Paid amount cannot exceed the total amount.");
                    return prevFormData; // Prevent update
                }
            }
            // Parse purity value to percentage
            const parsePurityToPercentage = (purity) => {
                if (!purity) return null;

                // Match formats like "22K", "24k", "22kt", "22KT", "22"
                const match = purity.match(/(\d+)(k|K|kt|KT)?/);
                if (match) {
                    const caratValue = parseInt(match[1], 10); // Extract carat number
                    if (caratValue) {
                        return (caratValue / 24) * 100; // Convert carat to percentage (e.g., 22K = 91.6)
                    }
                }

                // Handle specific formats like "916HM" directly
                if (purity.toLowerCase() === "916hm") return 91.6;

                return null; // Default if no match
            };


            if (field === "purity" || field === "metal_type") {
                // Separate condition for gold
                if (formData.metal_type.toLowerCase() === "gold") {
                    // Check for different purity values and set the rate accordingly for gold
                    if (
                        value.toLowerCase().includes("22") || // Check for 22 KT, 22K, 22k, etc.
                        value.toLowerCase().includes("22kt") ||
                        value.toLowerCase().includes("22k")
                    ) {
                        updatedFormData.rate = rates.rate_22crt;
                    } else if (
                        value.toLowerCase().includes("24") || // Check for 24 KT, 24K, etc.
                        value.toLowerCase().includes("24kt") ||
                        value.toLowerCase().includes("24k")
                    ) {
                        updatedFormData.rate = rates.rate_24crt;
                    } else if (
                        value.toLowerCase().includes("18") || // Check for 18 KT, 18K, etc.
                        value.toLowerCase().includes("18kt") ||
                        value.toLowerCase().includes("18k")
                    ) {
                        updatedFormData.rate = rates.rate_18crt;
                    } else if (
                        value.toLowerCase().includes("16") || // Check for 16 KT, 16K, etc.
                        value.toLowerCase().includes("16kt") ||
                        value.toLowerCase().includes("16k")
                    ) {
                        updatedFormData.rate = rates.rate_16crt;
                    } else {
                        updatedFormData.rate = "";
                    }
                }
            }

            if (field === "metal_type") {
                // Additional condition to ensure silver rate is fetched without purity
                if (formData.metal_type.toLowerCase() === "silver") {
                    updatedFormData.rate = rates.silver_rate; // Set rate based on silver
                }
            }
            if (field === "net_weight" || field === "purity") {
                const netWeight = parseFloat(updatedFormData.net_weight) || 0;
                const purityPercentage = parsePurityToPercentage(
                    updatedFormData.purity
                ) || 0;

                updatedFormData.pure_weight = (
                    (netWeight * purityPercentage) / 100
                ).toFixed(2);
            }
            // Additional calculations for other fields
            if (
                updatedFormData.gross &&
                updatedFormData.dust &&
                updatedFormData.ml_percent &&
                updatedFormData.purity
            ) {
                const purityValue = parsePurityToPercentage(updatedFormData.purity);

                if (purityValue) {
                    const gross = parseFloat(updatedFormData.gross) || 0;
                    const dust = parseFloat(updatedFormData.dust) || 0;
                    const mlPercent = parseFloat(updatedFormData.ml_percent) || 0;

                    const netWeight = ((gross - dust) * (purityValue - mlPercent)) / 100;
                    updatedFormData.eqt_wt = netWeight.toFixed(2);
                }
            }
            // Update net weight and pure weight
            const grossWeight = parseFloat(updatedFormData.gross_weight) || 0;
            const stoneWeight = parseFloat(updatedFormData.stone_weight) || 0;
            updatedFormData.net_weight = grossWeight - stoneWeight;

            const netWeight = parseFloat(updatedFormData.net_weight) || 0;
            const purityPercentage = parsePurityToPercentage(
                updatedFormData.purity
            ) || 0;
            updatedFormData.pure_weight = (
                (netWeight * purityPercentage) / 100
            ).toFixed(2);

            // Calculate total amount
            const pureWeight = parseFloat(updatedFormData.pure_weight) || 0;
            const rate = parseFloat(updatedFormData.rate) || 0;
            updatedFormData.total_amount = (pureWeight * rate).toFixed(2);

            // Calculate balance amount
            const paidAmount = parseFloat(updatedFormData.paid_amount) || 0;
            updatedFormData.balance_amount = (
                parseFloat(updatedFormData.total_amount || 0) - paidAmount
            ).toFixed(2);

            const paid_pure_weight = parseFloat(updatedFormData.paid_pure_weight) || 0;

            // Set Balance Pure Wt to zero if rate_cut is empty or not equal to zero
            const rateCut = parseFloat(updatedFormData.rate) || 0;
            updatedFormData.balance_pure_weight =
                rateCut === 0
                    ? (parseFloat(updatedFormData.pure_weight || 0) - paid_pure_weight).toFixed(2)
                    : "0";

            return updatedFormData;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/get/account-details`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();

                // Filter only suppliers or customers
                const filteredCustomers = result.filter(
                    (item) => item.account_group === 'SUPPLIERS' || item.account_group === 'CUSTOMERS'
                );
                setCustomers(filteredCustomers);
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
    useEffect(() => {
        const fetchLastInvoice = async () => {
            try {
                const response = await axios.get(`${baseURL}/lastInvoice`);
                setFormData((prev) => ({
                    ...prev,
                    invoice: response.data.lastInvoiceNumber,
                }));
            } catch (error) {
                console.error("Error fetching estimate number:", error);
            }
        };

        fetchLastInvoice();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${baseURL}/get/products`);
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

    useEffect(() => {
        if (formData.category) {
            axios
                .get(`${baseURL}/get/products`)
                .then((response) => {
                    const products = response.data;

                    const matchingProduct = products.find(
                        (product) =>
                            product.product_name === formData.category
                    );

                    if (matchingProduct) {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            product_id: matchingProduct.product_id, // Update product_id
                            rbarcode: matchingProduct.rbarcode,    // Update rbarcode
                            metal_type: matchingProduct.Category,
                            hsn_code: matchingProduct.hsn_code
                        }));
                    } else {
                        // Reset product_id and rbarcode if no match
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            product_id: '',
                            rbarcode: '',
                            hsn_code: '',
                            purity: '',
                            rate: '',
                        }));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching product details:", error);
                });
        } else {
            // Reset if category or purity is not selected
            setFormData((prevFormData) => ({
                ...prevFormData,
                product_id: '',
                rbarcode: '',
                hsn_code: '',
                purity: '',
                rate: '',
            }));
        }
    }, [formData.category]);


    useEffect(() => {
        const fetchCurrentRates = async () => {
            try {
                const response = await axios.get(`${baseURL}/get/current-rates`);
                setRates({
                    rate_24crt: response.data.rate_24crt || "",
                    rate_22crt: response.data.rate_22crt || "",
                    rate_18crt: response.data.rate_18crt || "",
                    rate_16crt: response.data.rate_16crt || "",
                    silver_rate: response.data.silver_rate || "",
                });
            } catch (error) {
                console.error('Error fetching current rates:', error);
            }
        };
        fetchCurrentRates();
    }, []);


    useEffect(() => {
        const fetchPurity = async () => {
            if (!formData.category) {
                setFormData((prev) => ({
                    ...prev,
                    purity: "", // Clear purity
                    rate: "",   // Clear rate
                }));
                setPurityOptions([]);
                return;
            }

            if (!formData.metal_type) {
                setPurityOptions([]);
                return;
            }

            try {
                const response = await axios.get(`${baseURL}/purity`);

                // Filter purity options based on selected metal type
                const filteredPurity = response.data.filter(
                    (item) => item.metal.toLowerCase() === formData.metal_type.toLowerCase()
                );

                setPurityOptions(filteredPurity);
                console.log("Purity Options:", filteredPurity);

                let defaultOption = null;

                if (formData.metal_type.toLowerCase() === "gold") {
                    defaultOption = filteredPurity.find((option) =>
                        ["22k", "22 kt", "22"].some((match) =>
                            option.name.toLowerCase().includes(match)
                        )
                    );

                    if (defaultOption) {
                        setFormData((prev) => ({
                            ...prev,
                            purity: `${defaultOption.name} | ${defaultOption.purity}`,
                            rate: rates.rate_22crt, // Set the correct rate
                        }));
                    }
                }

                if (formData.metal_type.toLowerCase() === "silver") {
                    const silver22K = filteredPurity.find((option) =>
                        ["22k", "22 kt", "22"].some((match) =>
                            option.name.toLowerCase().includes(match)
                        )
                    );

                    const silver24K = filteredPurity.find((option) =>
                        ["24k", "24 kt", "24"].some((match) =>
                            option.name.toLowerCase().includes(match)
                        )
                    );

                    // Set default priority: 24K > 22K
                    defaultOption = silver24K || silver22K;

                    if (defaultOption) {
                        setFormData((prev) => ({
                            ...prev,
                            purity: `${defaultOption.name} | ${defaultOption.purity}`,
                            rate: rates.silver_rate, // Set the correct rate
                        }));
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (formData.category) {
            fetchPurity();
        } else {
            setFormData((prev) => ({
                ...prev,
                purity: "",
                rate: "",
            }));
            setPurityOptions([]);
        }
    }, [formData.metal_type, formData.category, rates]); // Add rates dependency to ensure it's updated when rates change



    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setFormData((prevState) => ({
            ...prevState,
            bill_date: today,
        }));
    }, []);

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
                                            readOnly
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
    );
};

export default UpdatePurchaseForm;
