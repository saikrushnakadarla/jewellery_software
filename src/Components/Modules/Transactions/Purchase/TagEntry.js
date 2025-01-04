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

    const [subCategories, setSubCategories] = useState([]);

    const [productOptions, setProductOptions] = useState([]);
    const [formData, setFormData] = useState({
        product_id: selectedProduct.product_id,
        category: selectedProduct.category,
        sub_category: "",
        subcategory_id: "",
        // subcategory_id: "SBI001",
        product_Name: "",
        design_master: "",
        Pricing: "",
        Tag_ID: "",
        Prefix: "", // Default value
        // Category: selectedProduct.metal_type,
        Purity: selectedProduct.purity,
        metal_type: selectedProduct.metal_type,
        PCode_BarCode: "",
        Gross_Weight: "",
        Stones_Weight: "",
        Stones_Price: "",
        HUID_No: "",
        Wastage_On: "",
        Wastage_Percentage: "",
        Status: "Available",
        Source: "Purchase",
        Stock_Point: "",
        WastageWeight: "",
        TotalWeight_AW: "",
        MC_Per_Gram: "",
        Making_Charges_On: "",
        Making_Charges: "",
        Design_Master: selectedProduct.design_name,
        Weight_BW: "",
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData((prevState) => ({
                ...prevState,
                category: selectedProduct.category || "",
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

    const handleChange = async (e) => {
        const { name, value } = e.target;
    
        if (name === "sub_category") {
            const selectedCategory = subCategories.find(
                (category) => category.subcategory_id === parseInt(value) // Ensure correct type match
            );
    
            const newPrefix = selectedCategory ? selectedCategory.prefix : "";
    
            console.log("New Prefix:", newPrefix);
    
            if (newPrefix) {
                try {
                    // Fetch the next unique PCode_BarCode from the backend
                    const response = await axios.get(`${baseURL}/getNextPCodeBarCode`, {
                        params: { prefix: newPrefix },
                    });
    
                    const nextPCodeBarCode = response.data.nextPCodeBarCode;
    
                    setFormData((prevData) => ({
                        ...prevData,
                        [name]: selectedCategory ? selectedCategory.sub_category_name : "",
                        subcategory_id: selectedCategory ? selectedCategory.subcategory_id : "",
                        item_prefix: newPrefix,
                        Prefix: newPrefix,
                        PCode_BarCode: nextPCodeBarCode, // Update with unique PCode_BarCode
                    }));
                } catch (error) {
                    console.error("Error fetching PCode_BarCode:", error);
                    // Optional: Show an error message to the user
                }
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: selectedCategory ? selectedCategory.sub_category_name : "",
                    subcategory_id: selectedCategory ? selectedCategory.subcategory_id : "",
                    item_prefix: "",
                    Prefix: "",
                    PCode_BarCode: "", // Clear if no prefix
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentSuffix = parseInt(formData.suffix || "001", 10);
        const nextSuffix = (currentSuffix + 1).toString().padStart(3, "0");

        if (!formData.sub_category || !formData.subcategory_id) {
            alert("Please select a valid sub-category before submitting.");
            return;
        }

        try {
            // If `prev` is available from the component state, props, or elsewhere:
            const prev = {
                item_prefix: "", // Replace this with your actual logic for prev
            };

            await axios.post(`${baseURL}/post/opening-tags-entry`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            alert('Data and updated values saved successfully!');

            setFormData({
                product_id: selectedProduct.product_id,
                category: selectedProduct.category,
                sub_category: "",
                subcategory_id: "",
                product_Name: "",
                design_master: "",
                Pricing: "",
                Tag_ID: "",
                Prefix: "",
                // Category: selectedProduct.metal_type,
                metal_type: selectedProduct.metal_type,
                Purity: selectedProduct.purity,
                PCode_BarCode: `${prev?.item_prefix || ""}${nextSuffix}`,
                suffix: nextSuffix,
                Gross_Weight: "",
                Stones_Weight: "",
                Stones_Price: "",
                HUID_No: "",
                Wastage_On: "",
                Wastage_Percentage: "",
                Status: "Available",
                Source: "Purchase",
                Stock_Point: "",
                WastageWeight: "",
                TotalWeight_AW: "",
                MC_Per_Gram: "",
                Making_Charges_On: "",
                Making_Charges: "",
                Design_Master: selectedProduct.design_name,
                Weight_BW: "",
            });
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };

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


    // useEffect(() => {
    //     if (selectedProduct?.product_id) {
    //         fetch(`${baseURL}/get/update-values?product_id=${selectedProduct.product_id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error('Failed to fetch product details');
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 const fetchedData = data?.data?.[0] || {};
    //                 setProductDetails({
    //                     pcs: fetchedData.pieces || selectedProduct.pcs,
    //                     gross_weight: fetchedData.gross_weight || selectedProduct.gross_weight,
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching product details:', error);
    //                 alert('Failed to fetch product details. Please try again later.');
    //             });
    //     }
    // }, [selectedProduct, baseURL]);


    //    // Function to handle modal open
    //    const handleOpenModal = () => {
    //     setShowModal(true);
    // };

    //       // Function to handle modal close
    //       const handleCloseModal = () => {
    //         setShowModal(false);
    //     };

    // const [newSubCategory, setNewSubCategory] = useState({
    //     name: '',
    //     prefix: '',
    //     category: ''
    // });


    const [newSubCategory, setNewSubCategory] = useState({
        name: '',
        prefix: '',
        category: ''
    });
    const [isSubCategoryAdded, setIsSubCategoryAdded] = useState(false);
    // Handle input field changes in modal
    const handleModalChange = (e) => {
        const { name, value } = e.target;
        // Update newSubCategory values
        setNewSubCategory((prev) => ({
            ...prev,
            [name]: value,
        }));

        // If the changed field is 'prefix', update the formData Prefix field
        if (name === "prefix") {
            setFormData((prev) => ({
                ...prev,
                Prefix: value,
            }));
        }


        setNewSubCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (selectedProduct) {
            console.log("Product ID:", selectedProduct.product_id); 
            console.log("Product ID:", selectedProduct.metal_type); // Use product_id as needed
        }
    }, [selectedProduct]);


    // Handle form submission to add new subcategory
    const handleAddSubCategory = async () => {
        try {
            const data = {
                category_id: selectedProduct.product_id,
                subcategory_id: 1, // Assuming this is a static value or comes from somewhere else
                sub_category_name: newSubCategory.name,
                category: newSubCategory.category || formData.category,
                prefix: newSubCategory.prefix
            };

            // Make POST request to the API
            const response = await axios.post('http://localhost:5000/post/subcategory', data);

            if (response.status === 201) { // Use 201 instead of 200 for created status
                // Successfully added the subcategory
                handleCloseModal();
                console.log('Subcategory added successfully');
                alert("Data saved successfully");

                // Clear the form
                setNewSubCategory({
                    name: '',
                    prefix: '',
                    category: ''
                });

                // Refresh the subcategory list
                fetchSubCategories();
            } else {
                console.error('Error adding subcategory:', response);
            }
        } catch (error) {
            console.error('Error during API request:', error);
        }
    };




    // Fetch the subcategories when the component mounts

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/get/subcategories");
            const filteredSubCategories = response.data.filter(
                (subCategory) => subCategory.category_id === selectedProduct.product_id
            );
            setSubCategories(filteredSubCategories); // Set the filtered subcategories
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };
    
    useEffect(() => {
        if (selectedProduct?.product_id) { // Ensure selectedProduct is defined
            fetchSubCategories();
        }
    }, [selectedProduct]);
    

    const [designOptions, setdesignOptions] = useState([]);

    // Fetch design master options from the API
    useEffect(() => {
        const fetchDesignMaster = async () => {
            try {
                const response = await axios.get(`${baseURL}/designmaster`);
                const designMasters = response.data.map((item) => {
                    console.log('Design ID:', item.design_id); // Log design_id
                    return {
                        value: item.design_name, // Assuming the column name is "design_name"
                        label: item.design_name,
                        id: item.design_id, // Assuming the column name is "design_id"
                    };
                });
                setdesignOptions(designMasters);
            } catch (error) {
                console.error('Error fetching design masters:', error);
            }
        };

        fetchDesignMaster();
    }, []);

    const [pcs, setPcs] = useState(null);
  const [grossWeight, setGrossWeight] = useState(null);

  // Function to fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/entry/${selectedProduct.product_id}`);
        const data = await response.json();
        setPcs(data.pcs);
        setGrossWeight(data.gross_weight);

        // Update formData with the fetched values
        // setFormData((prev) => ({
        //   ...prev,
        //   Gross_Weight: data.gross_weight,
        // }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedProduct.product_id]);

    return (
        <div style={{ paddingTop: "0px" }}>
            <div>
            <h4>Pieces: {pcs !== null ? pcs : "0"}</h4>
            <h4>Gross Weight: {grossWeight !== null ? grossWeight : "0"}</h4>
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
                                            <Col xs={12} md={2}>
                                                <InputField
                                                    label="Product Name:"
                                                    name="product_Name"
                                                    value={formData.product_Name}
                                                    onChange={handleChange}  // Pass the event handler correctly
                                                />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField
                                                    label="Design Master:"
                                                    name="design_master"
                                                    type="select"
                                                    value={formData.design_master}
                                                    onChange={handleChange}
                                                    // options={designOptions}
                                                    options={designOptions.map(option => ({ value: option.value, label: option.label }))}
                                                />
                                            </Col>
                                            <Col xs={12} md={2}>
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
                                                        { value: "Floor1", label: "Floor1" },
                                                        { value: "Floor2", label: "Floor2" },
                                                        { value: "Strong room", label: "Strong room" },
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
