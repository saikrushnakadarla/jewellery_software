import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../StockEntry/StockEntry.css";
import InputField from "../../Masters/ItemMaster/Inputfield";
import StoneDetailsModal from "./PurchaseStoneDetails";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import baseURL from "../../../../Url/NodeBaseURL";
import { Form, Row, Col } from 'react-bootstrap';
import { Modal, Button } from "react-bootstrap";  // Add this import


const TagEntry = ({ handleCloseModal1, selectedProduct }) => {
    const [productDetails, setProductDetails] = useState({
        pcs: selectedProduct?.pcs || 0,
        gross_weight: selectedProduct?.gross_weight || 0,
    });

    const [productOptions, setProductOptions] = useState([]);
    const [formData, setFormData] = useState({
        product_id: selectedProduct.product_id,
        category: "",
        sub_category: "",
        Pricing: "",
        Tag_ID: "",
        Prefix: "tag",
        Category: selectedProduct.metal_type,
        Purity: selectedProduct.purity,
        PCode_BarCode: "",
        Gross_Weight: "",
        Stones_Weight: "",
        Stones_Price: "",
        HUID_No: "",
        Wastage_On: "",
        Wastage_Percentage: "",
        Status: "sold",
        Source: "Purchase",
        Stock_Point: "",
        WastageWeight: "",
        TotalWeight_AW: "",
        MC_Per_Gram: "",
        Making_Charges_On: "",
        Making_Charges: "",
        Design_Master: selectedProduct.design_name,
        product_Name: selectedProduct.product_name,
        Weight_BW: "",
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData((prevState) => ({
                ...prevState,
                category: selectedProduct.category || "", // Set category from selectedProduct
            }));
        }
    }, [selectedProduct]);

    const handleUpdateStoneDetails = (totalWeight, totalPrice) => {
        setFormData({
            ...formData,
            Stones_Weight: totalWeight.toFixed(2),
            Stones_Price: totalPrice.toFixed(2),
        });
    };

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    // Automatically calculate Weight_BW when Gross_Weight or Stones_Weight changes
    useEffect(() => {
        const grossWeight = parseFloat(formData.Gross_Weight) || 0;
        const stonesWeight = parseFloat(formData.Stones_Weight) || 0;
        const weightBW = grossWeight - stonesWeight;

        setFormData((prev) => ({
            ...prev,
            Weight_BW: weightBW.toFixed(2), // Ensures two decimal places
        }));
    }, [formData.Gross_Weight, formData.Stones_Weight]);
    // Automatically calculate WastageWeight and TotalWeight_AW
    useEffect(() => {
        const wastagePercentage = parseFloat(formData.Wastage_Percentage) || 0;
        const grossWeight = parseFloat(formData.Gross_Weight) || 0;
        const weightBW = parseFloat(formData.Weight_BW) || 0;

        let wastageWeight = 0;
        let totalWeight = 0;

        if (formData.Wastage_On === "Gross Weight") {
            wastageWeight = (grossWeight * wastagePercentage) / 100;
            totalWeight = weightBW + wastageWeight;
        } else if (formData.Wastage_On === "Weight BW") {
            wastageWeight = (weightBW * wastagePercentage) / 100;
            totalWeight = weightBW + wastageWeight;
        }

        setFormData((prev) => ({
            ...prev,
            WastageWeight: wastageWeight.toFixed(2),
            TotalWeight_AW: totalWeight.toFixed(2),
        }));
    }, [formData.Wastage_On, formData.Wastage_Percentage, formData.Gross_Weight, formData.Weight_BW]);

    const handleMakingChargesCalculation = () => {
        const totalWeight = parseFloat(formData.TotalWeight_AW) || 0;
        const mcPerGram = parseFloat(formData.MC_Per_Gram) || 0;
        const makingCharges = parseFloat(formData.Making_Charges) || 0;

        if (formData.Making_Charges_On === "By Weight") {
            const calculatedMakingCharges = totalWeight * mcPerGram;
            setFormData((prev) => ({
                ...prev,
                Making_Charges: calculatedMakingCharges.toFixed(2),
            }));
        } else if (formData.Making_Charges_On === "Fixed") {
            const calculatedMcPerGram = makingCharges / totalWeight;
            setFormData((prev) => ({
                ...prev,
                MC_Per_Gram: calculatedMcPerGram.toFixed(2),
            }));
        }
    };



    useEffect(() => {
        handleMakingChargesCalculation();
    }, [formData.Making_Charges_On, formData.MC_Per_Gram, formData.Making_Charges, formData.TotalWeight_AW]);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/stockEntryTable");
    };



    // Fetch product options for P ID dropdown (product_id)
    useEffect(() => {
        axios.get(`${baseURL}/get/products`)
            .then((response) => {
                const options = response.data.map((product) => ({
                    value: product.product_id,
                    label: `${product.product_id}`,
                }));
                setProductOptions(options);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    // Handle field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update the state
        setFormData((prevData) => {
            if (name === "sub_category") {
                const selectedCategory = subCategories.find(
                    (category) => category.subcategory_id === parseInt(value)
                );
                const newPrefix = selectedCategory ? selectedCategory.prefix : "";
                return {
                    ...prevData,
                    [name]: value,
                    item_prefix: newPrefix, // Store the prefix separately
                    PCode_BarCode: `${newPrefix}${prevData.suffix || "001"}`, // Combine prefix with suffix
                };
            }

            return {
                ...prevData,
                [name]: value,
            };
        });

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === "product_id" && value) {
            // Fetch details for the selected product ID
            axios
                .get(`${baseURL}/get/products/${value}`)
                .then((response) => {
                    const product = response.data;
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        product_id: value,
                        product_Name: product.product_name,
                        Design_Master: product.design_master,
                        Category: product.Category,
                        Purity: product.purity,
                    }));
                })
                .catch((error) =>
                    console.error(`Error fetching product details for ID: ${value}`, error)
                );
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedGrossWeight = productDetails.gross_weight - (parseFloat(formData.Gross_Weight) || 0);
        const updatedPcs = productDetails.pcs - 1; // Decrement by 1

        try {
            // Save the form data
            await axios.post(`${baseURL}/post/opening-tags-entry`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Update the gross weight and pieces count
            await axios.post(`${baseURL}/post/update-values`, {
                gross_weight: updatedGrossWeight,
                pieces: updatedPcs,
                product_id: selectedProduct.product_id, // Store product ID with the data
            });

            // Update UI with new data
            setProductDetails((prevDetails) => ({
                ...prevDetails,
                pcs: updatedPcs,
                gross_weight: updatedGrossWeight,
            }));

            alert('Data and updated values saved successfully!');
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message || 'Invalid input data'}`);
            } else if (error.request) {
                alert('No response received from the server. Please try again.');
            } else {
                alert('An error occurred. Please check the console for details.');
            }
            console.error(error);
        }
    };


    useEffect(() => {
        if (selectedProduct?.product_id) {
            fetch(`${baseURL}/get/update-values?product_id=${selectedProduct.product_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch product details');
                    }
                    return response.json();
                })
                .then((data) => {
                    const fetchedData = data?.data?.[0] || {};
                    setProductDetails({
                        pcs: fetchedData.pieces || selectedProduct.pcs,
                        gross_weight: fetchedData.gross_weight || selectedProduct.gross_weight,
                    });
                })
                .catch((error) => {
                    console.error('Error fetching product details:', error);
                    alert('Failed to fetch product details. Please try again later.');
                });
        }
    }, [selectedProduct, baseURL]);


    //    // Function to handle modal open
    //    const handleOpenModal = () => {
    //     setShowModal(true);
    // };

    //       // Function to handle modal close
    //       const handleCloseModal = () => {
    //         setShowModal(false);
    //     };

    const [newSubCategory, setNewSubCategory] = useState({ name: "", prefix: "" });
    const [isSubCategoryAdded, setIsSubCategoryAdded] = useState(false);
    // Handle input field changes in modal
    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setNewSubCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    // Handle form submission to add new subcategory
    const handleAddSubCategory = async () => {
        try {
            const data = {
                subcategory_id: 1, // Assuming this is a static value or comes from somewhere else
                sub_category_name: newSubCategory.name,
                category: newSubCategory.category || formData.category,
                prefix: newSubCategory.prefix
            };

            // Make POST request to the API
            const response = await axios.post('http://localhost:5000/post/subcategory', data);

            // Check the response status
            if (response.status === 201) { // Use 201 instead of 200 for created status
                // Successfully added the subcategory, close the modal and handle any additional logic (e.g., refresh list)
                handleCloseModal();
                console.log('Subcategory added successfully');
                alert("Data saved successfully:")

            } else {
                // Handle error here (optional)
                console.error('Error adding subcategory:', response);
            }
        } catch (error) {
            // Handle any errors
            console.error('Error during API request:', error);
        }
    };

    const [subCategories, setSubCategories] = useState([]);

    // Fetch the subcategories when the component mounts
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/get/subcategories");
                setSubCategories(response.data); // Assuming the response data is an array of subcategories
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        fetchSubCategories();
    }, []);

    useEffect(() => {
        const getLastPcode = async () => {
            try {
                const response = await axios.get(`${baseURL}/last-pbarcode`);
                const suffix = response.data.lastPCode_BarCode || "001"; // Fallback to "001" if no value is fetched
                setFormData((prev) => ({
                    ...prev,
                    suffix, // Store the fetched suffix
                    PCode_BarCode: `${prev.item_prefix || ""}${suffix}`, // Combine prefix with fetched suffix
                }));
            } catch (error) {
                console.error("Error fetching last PCode_BarCode:", error);
            }
        };

        getLastPcode();
    }, []);


    return (
        <div style={{ paddingTop: "0px" }}>
            <div>
                <h4>Pieces: {productDetails.pcs}</h4>
                <h4>Gross Weight: {productDetails.gross_weight}</h4>

                {/* <h4>Pieces: {displayPieces}</h4> 
            <h4>Gross Weight: {displayGrossWeight}</h4>  */}
            </div>
            <div className="container mt-4">
                <div className="row mt-3">
                    <div className="col-12">
                        <Form className="p-4 border rounded form-container-stockentry" onSubmit={handleSubmit}>
                            <div className="stock-entry-form">
                                <div className="stock-entry-form-left">
                                    <Col className="stock-form-section">
                                        <h4 className="mb-4">Stock Entry</h4>
                                        <Row>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Category:"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Col>
                                            <Col xs={12} md={3} className="d-flex align-items-center">
                                                <div style={{ flex: 1 }}>
                                                    <InputField
                                                        label="Sub Category:"
                                                        name="sub_category"
                                                        type="select"
                                                        value={formData.sub_category}
                                                        onChange={handleChange}
                                                        options={subCategories.map((category) => ({
                                                            value: category.subcategory_id, // Use subcategory_id as the value
                                                            label: category.sub_category_name, // Use sub_category_name as the label
                                                        }))}
                                                    />
                                                </div>
                                                <AiOutlinePlus
                                                    size={20}
                                                    color="black"
                                                    onClick={handleOpenModal} // Open modal on click
                                                    style={{
                                                        marginLeft: "10px",
                                                        cursor: "pointer",
                                                        marginBottom: "20px",
                                                    }}
                                                />
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Product Name:"
                                                    name="product_name"
                                                    value={formData.product_name}
                                                    onChange={handleChange}  // Pass the event handler correctly
                                                />
                                            </Col>

                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Pricing:"
                                                    name="Pricing"
                                                    type="select"
                                                    value={formData.Pricing}
                                                    onChange={handleChange}
                                                    options={[
                                                        { value: "By Weight", label: "By Weight" },
                                                        { value: "By fixed", label: "By fixed" },
                                                    ]}
                                                />
                                            </Col>

                                        </Row>
                                        <Row>

                                            <Col xs={12} md={2}>
                                                {/* <InputField
                                                    label="PCode/BarCode:"
                                                    name="PCode_BarCode"
                                                    type="text"
                                                    value={formData.PCode_BarCode} // Default to formData.PCode_BarCode
                                                    onChange={handleChange}
                                                /> */}
                                                <InputField
                                                    label="PCode/BarCode:"
                                                    name="PCode_BarCode"
                                                    type="text"
                                                    value={formData.PCode_BarCode}
                                                    onChange={handleChange}
                                                />

                                            </Col>

                                            <Col xs={12} md={2}>
                                                <InputField
                                                    label="Gross Weight:"
                                                    name="Gross_Weight"
                                                    value={formData.Gross_Weight}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField
                                                    label="Stones Weight:"
                                                    name="Stones_Weight"
                                                    value={formData.Stones_Weight}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Stones Price:"
                                                    name="Stones_Price"
                                                    value={formData.Stones_Price}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Weight BW:"
                                                    name="Weight_BW"
                                                    value={formData.Weight_BW}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>

                                    </Col>
                                </div>
                                <div className="stock-entry-form-right">
                                    <Col className="stock-form-section">
                                        <Row>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Wastage On:"
                                                    name="Wastage_On"
                                                    type="select"
                                                    value={formData.Wastage_On}
                                                    onChange={handleChange}
                                                    options={[
                                                        { value: "Gross Weight", label: "Gross Weight" },
                                                        { value: "Weight BW", label: "Weight BW" },
                                                    ]}
                                                />
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Wastage %:"
                                                    name="Wastage_Percentage"
                                                    value={formData.Wastage_Percentage}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Wastage Weight:"
                                                    name="WastageWeight"
                                                    value={formData.WastageWeight}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Total Weight:"
                                                    name="TotalWeight_AW"
                                                    value={formData.TotalWeight_AW}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Making Charges On:"
                                                    name="Making_Charges_On"
                                                    type="select"
                                                    value={formData.Making_Charges_On}
                                                    onChange={handleChange}
                                                    options={[
                                                        { value: "By Weight", label: "By Weight" },
                                                        { value: "Fixed", label: "Fixed" },
                                                    ]}
                                                />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField
                                                    label="MC Per Gram:"
                                                    name="MC_Per_Gram"
                                                    value={formData.MC_Per_Gram}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField
                                                    label="Making Charges:"
                                                    name="Making_Charges"
                                                    value={formData.Making_Charges}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField
                                                    label="HUID No:"
                                                    name="HUID_No"
                                                    value={formData.HUID_No}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <InputField
                                                    label="Stock Point:"
                                                    name="Stock_Point"
                                                    type="select"
                                                    value={formData.Stock_Point}
                                                    onChange={handleChange}
                                                    options={[
                                                        { value: "Main Store", label: "Main Store" },
                                                        { value: "Secondary Store", label: "Secondary Store" },
                                                    ]}
                                                />
                                            </Col>
                                        </Row>

                                    </Col>
                                </div>
                            </div>
                            <div className="text-end mt-4">
                                <button
                                    type="submit"
                                    onClick={handleCloseModal1}
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>

                    </div>
                </div>
            </div>

            {/* Modal for adding a new sub category */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Sub Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="subCategoryName">
                            <Form.Label>Sub Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newSubCategory.name}
                                onChange={handleModalChange}
                                placeholder="Enter sub category name"
                            />
                        </Form.Group>
                        <Form.Group controlId="subCategoryPrefix">
                            <Form.Label>Prefix</Form.Label>
                            <Form.Control
                                type="text"
                                name="prefix"
                                value={newSubCategory.prefix}
                                onChange={handleModalChange}
                                placeholder="Enter prefix"
                            />
                        </Form.Group>
                        <Form.Group controlId="categoryName">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={newSubCategory.category || formData.category}
                                onChange={handleModalChange}
                                placeholder="Enter category"
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="categoryName">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type="text"
                    name="category"
                    value={formData.category} 
                    onChange={handleModalChange}
                   readOnly
                />
            </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddSubCategory}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default TagEntry;
