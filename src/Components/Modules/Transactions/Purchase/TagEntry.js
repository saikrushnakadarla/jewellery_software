import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../StockEntry/StockEntry.css";
import InputField from "./InputField";
import StoneDetailsModal from "./TagStoneDetailsModal";
import PurchaseStoneDetailsModal from "./PurchaseStoneDetailsModal";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import baseURL from "../../../../Url/NodeBaseURL";
import "./TagEntry.css";
import { Form, Row, Col, Table } from 'react-bootstrap';
import * as XLSX from "xlsx";
import { FaCamera, FaUpload, FaTrash, FaEdit, FaFileExcel } from "react-icons/fa";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";  // Add this import
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import Webcam from "react-webcam";

const TagEntry = ({ handleCloseTagModal, selectedProduct, fetchBalance }) => {
    console.log("Pricing=", selectedProduct.Pricing)
    console.log("Metal Type=", selectedProduct.metal_type)
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [productDetails, setProductDetails] = useState({
        pcs: selectedProduct?.pcs || 0,
        gross_weight: selectedProduct?.gross_weight || 0,
    });
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const webcamRef = useRef(null);
    const [subCategories, setSubCategories] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [purityOptions, setPurityOptions] = useState([]);
    const [showWebcam, setShowWebcam] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        tag_id: selectedProduct.tag_id,
        product_id: selectedProduct.product_id,
        account_name: selectedProduct.account_name,
        category: selectedProduct.category,
        invoice: selectedProduct.invoice,
        sub_category: "",
        subcategory_id: "",
        // subcategory_id: "SBI001",
        product_Name: "",
        design_master: "",
        Pricing: selectedProduct.Pricing,
        cut: "",
        clarity: "",
        color: "",
        Tag_ID: "",
        Prefix: "", // Default value
        // Category: selectedProduct.metal_type,
        Purity: "",
        metal_type: selectedProduct.metal_type,
        PCode_BarCode: "",
        Gross_Weight: "",
        Stones_Weight: "",
        deduct_st_Wt: "Yes",
        stone_price_per_carat: "",
        Stones_Price: "",
        HUID_No: "",
        Wastage_On: "Gross Weight",
        Wastage_Percentage: "",
        Status: "Available",
        Source: "Purchase",
        Stock_Point: "",
        pieace_cost: "",
        tax_percent: "",
        mrp_price: "",
        total_pcs_cost: "",
        WastageWeight: "",
        TotalWeight_AW: "",
        MC_Per_Gram: "",
        Making_Charges_On: "",
        Making_Charges: "",
        Design_Master: selectedProduct.design_name,
        Weight_BW: "",
        pur_Gross_Weight: "",
        pur_Stones_Weight: "",
        pur_deduct_st_Wt: "Yes",
        pur_stone_price_per_carat: "",
        pur_Stones_Price: "",
        pur_Weight_BW: "",
        pur_Making_Charges_On: "",
        pur_MC_Per_Gram: "",
        pur_Making_Charges: "",
        pur_Wastage_On: "Gross Weight",
        pur_Wastage_Percentage: "",
        pur_WastageWeight: "",
        pur_TotalWeight_AW: "",
        size: "",
        tag_weight: "",
        pcs: "1",
        MC_Per_Gram_Label:"",
    });
    const [show, setShow] = useState(false);
    const [showPurchase, setShowPurchase] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [stoneDetails, setStoneDetails] = useState({
        stoneName: "",
        cut: "",
        color: "",
        clarity: "",
        stoneWt: "",
        caratWt: "",
        stonePrice: "",
        amount: "",
    });

    const [stoneList, setStoneList] = useState([]);
    const [editingStoneIndex, setEditingStoneIndex] = useState(null);

    const handleAddStone = () => {
        let newStoneList = [...stoneList];

        if (editingStoneIndex !== null) {
            newStoneList[editingStoneIndex] = stoneDetails;
            setEditingStoneIndex(null);
        } else {
            newStoneList.push(stoneDetails);
        }

        setStoneList(newStoneList);
        localStorage.setItem("tagStoneDetails", JSON.stringify(newStoneList));
        window.dispatchEvent(new Event("storage"));
        setStoneDetails({
            stoneName: "",
            cut: "",
            color: "",
            clarity: "",
            stoneWt: "",
            caratWt: "",
            stonePrice: "",
            amount: "",
        });
    };

    const handleEditStone = (index) => {
        const selectedStone = stoneList[index];
        setStoneDetails(selectedStone);
        setEditingStoneIndex(index);
        handleShow();
    };

    const handleDeleteStone = (index) => {
        const updatedList = stoneList.filter((_, i) => i !== index);
        setStoneList(updatedList);
        localStorage.setItem("tagStoneDetails", JSON.stringify(updatedList));
        window.dispatchEvent(new Event("storage"));
    };

    const handleShowPurchase = () => {
        console.log("Opening PurchaseStoneDetailsModal...");
        setShowPurchase(true);
    };

    const handleClosePurchase = () => setShowPurchase(false);

    const [purStoneDetails, setPurStoneDetails] = useState({
        stoneName: "",
        cut: "",
        color: "",
        clarity: "",
        stoneWt: "",
        caratWt: "",
        stonePrice: "",
        amount: "",
    });
    const [purchaseStoneList, setPurchaseStoneList] = useState([]);
    const [editingPurchaseStoneIndex, setEditingPurchaseStoneIndex] = useState(null);

    const handleAddTagPurStone = () => {
        let newPurchaseStoneList = [...purchaseStoneList];

        if (editingPurchaseStoneIndex !== null) {
            newPurchaseStoneList[editingPurchaseStoneIndex] = purStoneDetails;
            setEditingPurchaseStoneIndex(null);
        } else {
            newPurchaseStoneList.push(purStoneDetails);
        }

        setPurchaseStoneList(newPurchaseStoneList);
        localStorage.setItem("tagPurStoneDetails", JSON.stringify(newPurchaseStoneList));
        window.dispatchEvent(new Event("storage"));
        setPurStoneDetails({
            stoneName: "",
            cut: "",
            color: "",
            clarity: "",
            stoneWt: "",
            caratWt: "",
            stonePrice: "",
            amount: "",
        });
    };

    const handleTagPurEditStone = (index) => {
        const selectedStone = purchaseStoneList[index];
        setPurStoneDetails(selectedStone);
        setEditingPurchaseStoneIndex(index);
        handleShowPurchase();
    };

    const handleTagPurDeleteStone = (index) => {
        const updatedList = purchaseStoneList.filter((_, i) => i !== index);
        setPurchaseStoneList(updatedList);
        localStorage.setItem("tagPurStoneDetails", JSON.stringify(updatedList));
        window.dispatchEvent(new Event("storage"));
    };


    const isByFixed = formData.Pricing === "By fixed";
    const [isGeneratePDF, setIsGeneratePDF] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        if (selectedProduct) {
            setFormData((prevState) => ({
                ...prevState,
                category: selectedProduct.category || "",
            }));
        }
    }, [selectedProduct]);

    useEffect(() => {
        const calculateTotalWeight = () => {
            const storedStoneDetails = JSON.parse(localStorage.getItem("tagStoneDetails")) || [];

            const totalStoneWeight = storedStoneDetails.reduce(
                (sum, item) => sum + (parseFloat(item.stoneWt) || 0),
                0
            );
            const totalStoneValue = storedStoneDetails.reduce(
                (sum, item) => sum + (parseFloat(item.amount) || 0),
                0
            );

            setFormData((prevData) => ({
                ...prevData,
                Stones_Weight: totalStoneWeight.toFixed(3),
                Stones_Price: totalStoneValue.toFixed(2),
            }));
        };

        calculateTotalWeight();

        const handleStorageChange = () => calculateTotalWeight();
        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        const calculateTotalWeight = () => {
            const storedStoneDetails = JSON.parse(localStorage.getItem("tagPurStoneDetails")) || [];

            const totalStoneWeight = storedStoneDetails.reduce(
                (sum, item) => sum + (parseFloat(item.stoneWt) || 0),
                0
            );
            const totalStoneValue = storedStoneDetails.reduce(
                (sum, item) => sum + (parseFloat(item.amount) || 0),
                0
            );

            setFormData((prevData) => ({
                ...prevData,
                pur_Stones_Weight: totalStoneWeight.toFixed(3),
                pur_Stones_Price: totalStoneValue.toFixed(2),
            }));
        };

        calculateTotalWeight();

        const handleStorageChange = () => calculateTotalWeight();
        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        const wastagePercentage = parseFloat(formData.Wastage_Percentage) || 0;
        const grossWeight = parseFloat(formData.Gross_Weight) || 0;
        const weightBW = parseFloat(formData.Weight_BW) || 0;
        const purWastagePercentage = parseFloat(formData.pur_Wastage_Percentage) || 0;
        const purGrossWeight = parseFloat(formData.pur_Gross_Weight) || 0;
        const purWeightBW = parseFloat(formData.pur_Weight_BW) || 0;

        let wastageWeight = 0;
        let totalWeight = 0;
        let purWastageWeight = 0;
        let purTotalWeight = 0;

        if (formData.Wastage_On === "Gross Weight") {
            wastageWeight = (grossWeight * wastagePercentage) / 100;
            totalWeight = weightBW + wastageWeight;
        } else if (formData.Wastage_On === "Weight BW") {
            wastageWeight = (weightBW * wastagePercentage) / 100;
            totalWeight = weightBW + wastageWeight;
        }

        if (formData.pur_Wastage_On === "Gross Weight") {
            purWastageWeight = (purGrossWeight * purWastagePercentage) / 100;
            purTotalWeight = purWeightBW + purWastageWeight;
        } else if (formData.pur_Wastage_On === "Weight BW") {
            purWastageWeight = (purWeightBW * purWastagePercentage) / 100;
            purTotalWeight = purWeightBW + purWastageWeight;
        }

        setFormData((prev) => ({
            ...prev,
            WastageWeight: wastageWeight.toFixed(3),
            TotalWeight_AW: totalWeight.toFixed(3),
            pur_WastageWeight: purWastageWeight.toFixed(3),
            pur_TotalWeight_AW: purTotalWeight.toFixed(3),
        }));
    }, [formData.Wastage_On, formData.Wastage_Percentage, formData.Gross_Weight, formData.Weight_BW,
    formData.pur_Wastage_On, formData.pur_Wastage_Percentage, formData.pur_Gross_Weight, formData.pur_Weight_BW
    ]);

    const handleMakingChargesCalculation = () => {
        const totalWeight = parseFloat(formData.TotalWeight_AW) || 0;
        const mcPerGram = parseFloat(formData.MC_Per_Gram) || 0;
        const makingCharges = parseFloat(formData.Making_Charges) || 0;
        const purTotalWeight = parseFloat(formData.pur_TotalWeight_AW) || 0;
        const purMcPerGram = parseFloat(formData.pur_MC_Per_Gram) || 0;
        const purMakingCharges = parseFloat(formData.pur_Making_Charges) || 0;

        if (formData.Making_Charges_On === "MC / Gram") {
            // Calculate Making Charges based on MC/Gram
            const calculatedMakingCharges = totalWeight * mcPerGram;
            setFormData((prev) => ({
                ...prev,
                Making_Charges: calculatedMakingCharges.toFixed(2), // Automatically set Making Charges
            }));
        } else if (formData.Making_Charges_On === "MC / Piece") {
            // Calculate MC/Gram based on fixed Making Charges
            const calculatedMcPerGram = totalWeight ? makingCharges / totalWeight : 0;
            setFormData((prev) => ({
                ...prev,
                MC_Per_Gram: calculatedMcPerGram.toFixed(2), // Automatically set MC/Gram
            }));
        }

        if (formData.pur_Making_Charges_On === "MC / Gram") {
            // Calculate Making Charges based on MC/Gram
            const calculatedMakingCharges = purTotalWeight * purMcPerGram;
            setFormData((prev) => ({
                ...prev,
                pur_Making_Charges: calculatedMakingCharges.toFixed(2), // Automatically set Making Charges
            }));
        } else if (formData.pur_Making_Charges_On === "MC / Piece") {
            // Calculate MC/Gram based on fixed Making Charges
            const calculatedMcPerGram = purTotalWeight ? purMakingCharges / purTotalWeight : 0;
            setFormData((prev) => ({
                ...prev,
                pur_MC_Per_Gram: calculatedMcPerGram.toFixed(2), // Automatically set MC/Gram
            }));
        }
    };

    useEffect(() => {
        handleMakingChargesCalculation();
    }, [
        formData.Making_Charges_On,
        formData.MC_Per_Gram,
        formData.Making_Charges,
        formData.TotalWeight_AW,
        formData.pur_Making_Charges_On,
        formData.pur_MC_Per_Gram,
        formData.pur_Making_Charges,
        formData.pur_TotalWeight_AW,
    ]);

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


    const isGoldCategory = formData.category &&
        ["gold", "diamond"].some((metal) => formData.category.toLowerCase().includes(metal));

    const isSilverCategory = formData.category && formData.category.toLowerCase().includes("silver");

    useEffect(() => {
        if (isGoldCategory) {
            setFormData((prevData) => ({
                ...prevData,
                Making_Charges_On: "MC %",
                MC_Per_Gram_Label: "MC%",
                Making_Charges: "", // Reset field when hidden
            }));
        } else if (isSilverCategory) {
            setFormData((prevData) => ({
                ...prevData,
                Making_Charges_On: "MC / Gram",
                MC_Per_Gram_Label: "MC/Gm",
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                MC_Per_Gram_Label: "MC/Gm",
            }));
        }
    }, [formData.category]);

    useEffect(() => {
        if (isGoldCategory) {
            setFormData((prevData) => ({
                ...prevData,
                pur_Making_Charges_On: "MC %",
                pur_MC_Per_Gram_Label: "MC%",
                pur_Making_Charges: "", // Reset field when hidden
            }));
        } else if (isSilverCategory) {
            setFormData((prevData) => ({
                ...prevData,
                pur_Making_Charges_On: "MC / Gram",
                pur_MC_Per_Gram_Label: "MC/Gm",
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                pur_MC_Per_Gram_Label: "MC/Gm",
            }));
        }
    }, [formData.category]);

    const handleChange = async (fieldOrEvent, valueArg) => {

        let field, value;
        if (fieldOrEvent && fieldOrEvent.target) {
            field = fieldOrEvent.target.name;
            value = fieldOrEvent.target.value;

            // Handle file input
            if (fieldOrEvent.target.type === "file") {
                const file = fieldOrEvent.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFormData((prev) => ({
                            ...prev,
                            productImage: file, // Store actual file
                            imagePreview: reader.result, // Store preview for display
                        }));
                    };
                    reader.readAsDataURL(file);
                }
                return;
            }
        } else {
            field = fieldOrEvent;
            value = valueArg;
        }

        if (field === "sub_category") {
            const selectedCategory = subCategories.find(
                (category) => category.sub_category_name === value
            );
    
            if (selectedCategory) {
                const newPrefix = selectedCategory.prefix;
    
                try {
                    const response = await axios.get(`${baseURL}/getNextPCodeBarCode`, {
                        params: { prefix: newPrefix },
                    });
    
                    const nextPCodeBarCode = response.data.nextPCodeBarCode; // e.g., GRN002
    
                    setFormData((prevData) => ({
                        ...prevData,
                        sub_category: selectedCategory.sub_category_name, // Store selected sub_category_name
                        subcategory_id: selectedCategory.subcategory_id, // Store subcategory_id
                        item_prefix: newPrefix,
                        Prefix: newPrefix,
                        PCode_BarCode: nextPCodeBarCode,
                        suffix: nextPCodeBarCode.replace(newPrefix, ""), // Extract numeric suffix
                    }));
                } catch (error) {
                    console.error("Error fetching PCode_BarCode:", error);
                }
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    sub_category: "",
                    subcategory_id: "",
                    item_prefix: "",
                    Prefix: "",
                    PCode_BarCode: "",
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value,
            }));
        }

        setFormData((prevData) => {
            let updatedData = { ...prevData, [field]: value };

            if (field === "Gross_Weight") {
                updatedData.pur_Gross_Weight = value;
            }

            // Update MC field only if Making_Charges_On is "MC / Gram" or "MC / Piece"
            if (field === "Making_Charges_On") {
                if (value === "MC / Gram" || value === "MC / Piece") {
                    updatedData.Making_Charges = prevData.Making_Charges || "";
                } else {
                    updatedData.Making_Charges = ""; // Hide field
                }
            }

            if (field === "pur_Making_Charges_On") {
                if (value === "MC / Gram" || value === "MC / Piece") {
                    updatedData.pur_Making_Charges = prevData.pur_Making_Charges || "";
                } else {
                    updatedData.pur_Making_Charges = ""; // Hide field
                }
            }

            // Update MC_Per_Gram_Label when Making_Charges_On changes
            if (field === "Making_Charges_On") {
                let newLabel = "MC/Gm"; // Default
                if (value === "MC %") newLabel = "MC%";
                else if (value === "MC / Gram") newLabel = "MC/Gm";
                else if (value === "MC / Piece") newLabel = "MC/Gm";

                updatedData.MC_Per_Gram_Label = newLabel;
            }

            if (field === "pur_Making_Charges_On") {
                let newLabel = "MC/Gm"; // Default
                if (value === "MC %") newLabel = "MC%";
                else if (value === "MC / Gram") newLabel = "MC/Gm";
                else if (value === "MC / Piece") newLabel = "MC/Gm";

                updatedData.pur_MC_Per_Gram_Label = newLabel;
            }

            // --- Calculate Stones Price ---
            if (field === "Stones_Weight" || field === "stone_price_per_carat") {
                const stoneWeight =
                    parseFloat(
                        field === "Stones_Weight" ? value : prevData.Stones_Weight
                    ) || 0;
                const stonePricePerCarat =
                    parseFloat(
                        field === "stone_price_per_carat"
                            ? value
                            : prevData.stone_price_per_carat
                    ) || 0;
                if (stoneWeight > 0 && stonePricePerCarat > 0) {
                    const calculatedStonePrice = (stoneWeight / 0.20) * stonePricePerCarat;
                    updatedData.Stones_Price = calculatedStonePrice.toFixed(2);
                } else {
                    updatedData.Stones_Price = "";
                }
            }

            if (field === "pur_Stones_Weight" || field === "pur_stone_price_per_carat") {
                const stoneWeight =
                    parseFloat(
                        field === "pur_Stones_Weight" ? value : prevData.pur_Stones_Weight
                    ) || 0;
                const stonePricePerCarat =
                    parseFloat(
                        field === "pur_stone_price_per_carat"
                            ? value
                            : prevData.pur_stone_price_per_carat
                    ) || 0;
                if (stoneWeight > 0 && stonePricePerCarat > 0) {
                    const calculatedStonePrice = (stoneWeight / 0.20) * stonePricePerCarat;
                    updatedData.pur_Stones_Price = calculatedStonePrice.toFixed(2);
                } else {
                    updatedData.pur_Stones_Price = "";
                }
            }

            // --- Recalculate Weight BW ---
            if (
                field === "Gross_Weight" ||
                field === "Stones_Weight" ||
                field === "deduct_st_Wt" ||
                field === "pur_Gross_Weight" ||
                field === "pur_Stones_Weight" ||
                field === "pur_deduct_st_Wt"
            ) {
                // For normal weight calculation
                const grossWt = parseFloat(updatedData.Gross_Weight) || 0;
                const stonesWt = parseFloat(updatedData.Stones_Weight) || 0;
                const deductOption = updatedData.deduct_st_Wt
                    ? updatedData.deduct_st_Wt.toLowerCase()
                    : "";

                if (deductOption === "yes") {
                    updatedData.Weight_BW = (grossWt - stonesWt).toFixed(2);
                } else {
                    updatedData.Weight_BW = grossWt.toFixed(2);
                }

                // For purchase weight calculation
                const purGrossWt = parseFloat(updatedData.pur_Gross_Weight) || 0;
                const purStonesWt = parseFloat(updatedData.pur_Stones_Weight) || 0;
                const purDeductOption = updatedData.pur_deduct_st_Wt
                    ? updatedData.pur_deduct_st_Wt.toLowerCase()
                    : "";

                if (purDeductOption === "yes") {
                    updatedData.pur_Weight_BW = (purGrossWt - purStonesWt).toFixed(2);
                } else {
                    updatedData.pur_Weight_BW = purGrossWt.toFixed(2);
                }
            }

            // Update MRP Price and Total Pcs Cost when Pricing is "By fixed"
            if (field === "pieace_cost" || field === "tax_percent") {
                const taxPercent = parseFloat(field === "tax_percent" ? value : prevData.tax_percent) || 0;
                const pieaceCost = parseFloat(field === "pieace_cost" ? value : prevData.pieace_cost) || 0;
                updatedData.mrp_price = ((pieaceCost / (100 + taxPercent)) * 100).toFixed(2);
            }

            if (field === "pieace_cost" || field === "pcs") {
                const pcs = parseFloat(field === "pcs" ? value : prevData.pcs) || 0;
                const pieaceCost = parseFloat(field === "pieace_cost" ? value : prevData.pieace_cost) || 0;
                updatedData.total_pcs_cost = (pcs * pieaceCost).toFixed(2);
            }

            // If user enters MRP Price, update pieace_cost and total_pcs_cost
            if (field === "mrp_price") {
                const mrpPrice = parseFloat(value) || 0;
                const taxPercent = parseFloat(prevData.tax_percent) || 0;

                // Calculate Pieace Cost
                const pieaceCost = (mrpPrice * taxPercent / 100) + mrpPrice;
                updatedData.pieace_cost = pieaceCost.toFixed(2);

                // Update Total Pcs Cost
                const pcs = parseFloat(prevData.pcs) || 0;
                updatedData.total_pcs_cost = (pcs * pieaceCost).toFixed(2);
            }
            return updatedData;
        });

        // --- Handle Category Change ---
        if (field === "category") {
            setFormData((prevData) => ({
                ...prevData,
                category: value,
            }));
            return;
        }
    };

    const isSilverOrGold = /silver|gold/i.test(formData.category);


    const isGeneratePDFRef = useRef(isGeneratePDF); // Create a ref to track latest state

    useEffect(() => {
        isGeneratePDFRef.current = isGeneratePDF; // Update ref whenever state changes
    }, [isGeneratePDF]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.altKey && event.key.toLowerCase() === "s") {
                event.preventDefault(); // Prevent default behavior
                console.log("Alt + S detected, submitting form...");

                // Ensure latest values are used
                const pcsValue = parseFloat(formData.pcs) || 0;
                const grossWeightValue = parseFloat(formData.Gross_Weight) || 0;

                console.log("PCS:", pcsValue, "Gross Weight:", grossWeightValue);

                if (formData.Pricing === "By fixed" && pcsValue <= 0) {
                    alert("The product's PCS must be greater than zero to submit the form.");
                    return;
                }

                if (formData.Pricing === "By fixed" && (!formData.pieace_cost || parseFloat(formData.pieace_cost) <= 0)) {
                    alert("Please enter a Piece Cost.");
                    return;
                }

                if (formData.Pricing !== "By fixed" && (pcsValue <= 0 || grossWeightValue <= 0)) {
                    alert("The product's PCS and Gross Weight must be greater than zero to submit the form.");
                    return;
                }

                if (!formData.sub_category || !formData.subcategory_id) {
                    alert("Please select a valid sub-category before submitting.");
                    return;
                }

                if (formData.Pricing === "By Weight" && !formData.Gross_Weight) {
                    alert("Please add Gross Weight");
                    return;
                }

                handleSubmit(); // Call submit function after validations
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [formData]);

    // const captureImage = () => {
    //     if (webcamRef.current) {
    //         const imageSrc = webcamRef.current.getScreenshot();
    //         setFormData((prev) => ({
    //             ...prev,
    //             imagePreview: imageSrc,
    //             productImage: imageSrc,
    //         }));
    //         setShowWebcam(false);
    //     }
    // };

    // const clearImage = () => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         productImage: null,
    //         imagePreview: null,
    //     }));
    // };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Convert image to base64 and update state
            };
            reader.readAsDataURL(file);
        }
    };

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        setIsCameraOpen(false);
    };

    const clearImage = () => {
        setImage(null);
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
    
        if (formData.Pricing === "By fixed") {
            if (pcs <= 0) {
                alert("The product's PCS must be greater than zero to submit the form.");
                return;
            }
            if (!formData.pieace_cost || parseFloat(formData.pieace_cost) <= 0) {
                alert("Please enter a Piece Cost.");
                return;
            }
        } else {
            if (pcs <= 0 || grossWeight <= 0) {
                alert("The product's PCS and Gross Weight must be greater than zero to submit the form.");
                return;
            }
        }
    
        if (!formData.sub_category || !formData.subcategory_id) {
            alert("Please select a valid sub-category before submitting.");
            return;
        }
    
        if (formData.Pricing === "By Weight" && !formData.Gross_Weight) {
            alert("Please add Gross Weight");
            return;
        }
    
        try {
            const updatedData = { ...formData, image };
    
            let apiURL = `${baseURL}/post/opening-tags-entry`; // Default: Add new entry
            let method = "POST";
            let isUpdating = false;
    
            if (formData.opentag_id) {
                apiURL = `${baseURL}/update/opening-tags-entry/${formData.opentag_id}`;
                method = "PUT";
                isUpdating = true;
            }
    
            await axios({
                method: method,
                url: apiURL,
                data: updatedData,
                headers: { "Content-Type": "application/json" },
            });
    
            alert(isUpdating ? "Stock updated successfully!" : "Stock added successfully!");
            fetchData(); // Refresh data
    
            setIsEditMode(false); // Exit edit mode
    
            if (isGeneratePDFRef.current) {
                generateAndDownloadPDF(updatedData);
            }
    
            localStorage.removeItem("tagStoneDetails");
            localStorage.removeItem("tagPurStoneDetails");
    
            setStoneList([]);
            setPurchaseStoneList([]);
    
            if (isUpdating) {
                // **Reset FormData completely after update**
                setTimeout(() => {
                    setFormData((prevData) => ({
                        PCode_BarCode: "",
                        suffix: "",
                        tag_id: selectedProduct?.tag_id || "",
                        product_id: selectedProduct?.product_id || "",
                        category: selectedProduct?.category || "",
                        Pricing: selectedProduct?.Pricing || "",
                        metal_type: selectedProduct?.metal_type || "",
                        account_name: selectedProduct?.account_name || "",                       
                        invoice: selectedProduct?.invoice || "",
                        Gross_Weight: "",
                        Stones_Weight: "",
                        Stones_Price: "",
                        deduct_st_Wt: "Yes",
                        Weight_BW: "",
                        Wastage_On: "Gross Weight",
                        WastageWeight: "",
                        // sub_category: prevData.sub_category,
                        Purity: prevData.Purity,
                        HUID_No: prevData.HUID_No,
                        Stock_Point: prevData.Stock_Point,
                        design_master: prevData.design_master,
                        Making_Charges_On: prevData.Making_Charges_On, 
                        pur_Making_Charges_On: prevData.pur_Making_Charges_On,
                        MC_Per_Gram_Label: prevData.MC_Per_Gram_Label, 
                        pur_MC_Per_Gram_Label: prevData.MC_Per_Gram_Label, 
                        Status: "Available",
                        Source: "Purchase",
                        pur_Gross_Weight: "",
                        pur_Stones_Weight: "",
                        pur_Stones_Price: "",
                        pur_deduct_st_Wt: "Yes",
                        pur_Weight_BW: "",
                        pur_WastageWeight: "",
                        pur_Wastage_On: "Gross Weight",
                        pcs: "1",
                        pieace_cost: "",
                        mrp_price: "",
                        total_pcs_cost: "",
                    }));
                    setImage(null);
                    fetchTagData();
                }, 100); // Small delay ensures React updates state correctly
            } else {
                // **Handle nextPCodeBarCode fetch for new entries**
                try {
                    const response = await axios.get(`${baseURL}/getNextPCodeBarCode`, {
                        params: { prefix: formData.item_prefix },
                    });
                    const nextPCodeBarCode = response.data.nextPCodeBarCode;
    
                    setFormData((prevData) => ({
                        ...prevData, // Keep previous values
                        PCode_BarCode: nextPCodeBarCode,
                        suffix: nextPCodeBarCode.replace(formData.item_prefix, ""),
                        tag_id: selectedProduct?.tag_id || "",
                        product_id: selectedProduct?.product_id || "",
                        category: selectedProduct?.category || "",
                        Pricing: selectedProduct?.Pricing || "",
                        metal_type: selectedProduct?.metal_type || "",
                        Gross_Weight: "",
                        Stones_Weight: "",
                        Stones_Price: "",
                        deduct_st_Wt: "Yes",
                        Weight_BW: "",
                        Wastage_On: "Gross Weight",
                        WastageWeight: "",
                        Making_Charges_On: prevData.Making_Charges_On,
                        pur_Making_Charges_On: prevData.pur_Making_Charges_On,
                        MC_Per_Gram_Label: prevData.MC_Per_Gram_Label, 
                        pur_MC_Per_Gram_Label: prevData.MC_Per_Gram_Label, 
                        Status: "Available",
                        Source: "Purchase",
                        pur_Gross_Weight: "",
                        pur_Stones_Weight: "",
                        pur_Stones_Price: "",
                        pur_deduct_st_Wt: "Yes",
                        pur_Weight_BW: "",
                        pur_WastageWeight: "",
                        pur_Wastage_On: "Gross Weight",
                        pcs: "1",
                        pieace_cost: "",
                        mrp_price: "",
                        total_pcs_cost: "",
                    }));
                    setImage(null);
                    fetchTagData();
                } catch (error) {
                    console.error("Error fetching PCode_BarCode:", error);
                }
            }

    
            setIsGeneratePDF(true);
    
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    };
    
    



    const generateAndDownloadPDF = async (data) => {
        const doc = new jsPDF();
        let qrContent = "";

        if (data.Pricing === "By Weight") {
            qrContent = `PCode: ${data.PCode_BarCode}, Name: ${data.sub_category}, Weight: ${data.Gross_Weight}, Tag Weight: ${data.tag_weight}, Total Weight AW: ${data.TotalWeight_AW}, Making Charges: ${data.Making_Charges}`;
        } else if (data.Pricing === "By fixed") {
            qrContent = `PCode: ${data.PCode_BarCode}, Name: ${data.sub_category}, Piece Cost: ${data.pieace_cost}`;
        }

        try {
            const qrImageData = await QRCode.toDataURL(qrContent);

            doc.setFontSize(10); // Set a smaller font size
            doc.text("Product QR Code", 10, 10);
            doc.addImage(qrImageData, "PNG", 10, 15, 30, 30); // Smaller QR code

            doc.setFontSize(8); // Reduce font size for text content
            doc.text(`PCode: ${data.PCode_BarCode}`, 50, 20);
            doc.text(`Name: ${data.sub_category}`, 50, 25);

            if (data.Pricing === "By Weight") {
                doc.text(`Weight: ${data.Gross_Weight}`, 50, 30);
                doc.text(`Tag Weight: ${data.tag_weight}`, 50, 35);
                doc.text(`Total Weight: ${data.TotalWeight_AW}`, 50, 40);
                doc.text(`Making Charges: ${data.Making_Charges}`, 50, 45);
            } else if (data.Pricing === "By fixed") {
                doc.text(`Piece Cost: ${data.pieace_cost}`, 50, 30);
            }

            doc.save(`QR_Code_${data.PCode_BarCode}.pdf`);
        } catch (error) {
            console.error("Error generating QR Code PDF:", error);
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

    const [newSubCategory, setNewSubCategory] = useState({
        name: '',
        prefix: '',
        category: ''
    });

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        // Update newSubCategory values
        setNewSubCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            console.log("Tag ID:", selectedProduct.tag_id);
        }
    }, [selectedProduct]);

    const handleAddSubCategory = async () => {
        try {
            const data = {
                category_id: selectedProduct.product_id,
                subcategory_id: 1, // Assuming this is a static value or comes from somewhere else
                sub_category_name: newSubCategory.name,
                category: newSubCategory.category || formData.category,
                prefix: newSubCategory.prefix,
                metal_type: selectedProduct.metal_type,
            };

            // Make POST request to the API
            const response = await axios.post(`${baseURL}/post/subcategory`, data);

            if (response.status === 201) { // Use 201 instead of 200 for created status
                // Successfully added the subcategory
                handleCloseModal();
                console.log('Subcategory added successfully');
                alert("Subcategory added successfully");

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

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get(`${baseURL}/get/subcategories`);
            const filteredSubCategories = response.data.filter(
                (subCategory) => subCategory.category_id === selectedProduct.product_id
            );
            setSubCategories(filteredSubCategories);
            console.log("filteredSubCategories=",filteredSubCategories)
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };


    // const fetchSubCategories = async () => {
    //     try {
    //         const response = await axios.get(`${baseURL}/get/subcategories`);

    //         // Convert selectedProduct.metal_type to lowercase for case-insensitive comparison
    //         const selectedMetalType = selectedProduct.metal_type?.toLowerCase();

    //         // Apply filtering logic based on metal_type
    //         const filteredSubCategories = response.data.filter((subCategory) => {
    //             const subCategoryMetalType = subCategory.metal_type?.toLowerCase();
    //             if (selectedMetalType === "gold" || selectedMetalType === "diamond") {
    //                 return subCategoryMetalType === "gold";
    //             } else if (selectedMetalType === "silver") {
    //                 return subCategoryMetalType === "silver";
    //             }
    //             return false; // If none of the conditions match, return false
    //         });

    //         setSubCategories(filteredSubCategories); 
    //     } catch (error) {
    //         console.error("Error fetching subcategories:", error);
    //     }
    // };

    useEffect(() => {
        if (selectedProduct?.product_id) {
            fetchSubCategories();
        }
    }, [selectedProduct]);

    const [designOptions, setdesignOptions] = useState([]);
    useEffect(() => {
        const fetchDesignMaster = async () => {
            try {
                const response = await axios.get(`${baseURL}/designmaster`);
                const designMasters = response.data.map((item) => {
                    console.log('Design ID:', item.design_id); // Log design_id
                    return {
                        value: item.design_name,
                        label: item.design_name,
                        id: item.design_id,
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

    const fetchData = async () => {
        if (!selectedProduct.product_id || !selectedProduct.tag_id) return;

        try {
            const response = await fetch(`${baseURL}/entry/${selectedProduct.product_id}/${selectedProduct.tag_id}`);
            if (!response.ok) {
                throw new Error("Entry not found or server error");
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            setPcs(data.bal_pcs);
            setGrossWeight(data.bal_gross_weight);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedProduct.product_id, selectedProduct.tag_id]); // Re-run when either changes


    useEffect(() => {
        const fetchPurity = async () => {
            try {
                const response = await axios.get(`${baseURL}/purity`);
                const filteredPurity = response.data.filter(
                    (item) => item.metal.toLowerCase() === formData.metal_type.toLowerCase() ||
                        (formData.metal_type.toLowerCase() === "diamond" && item.metal.toLowerCase() === "gold")
                );
                setPurityOptions(filteredPurity);

                console.log("Purity Options:", filteredPurity);

                let defaultOption = null;

                if (["gold", "diamond"].includes(formData.metal_type.toLowerCase())) {
                    defaultOption = filteredPurity.find((option) =>
                        option.name.toLowerCase().includes("22")
                    );
                } else if (formData.metal_type.toLowerCase() === "silver") {
                    defaultOption = filteredPurity.find((option) =>
                        option.name.toLowerCase().includes("92.5")
                    );
                }

                if (defaultOption) {
                    const defaultPurityValue = `${defaultOption.name} | ${defaultOption.purity}`;
                    console.log("Setting default purity:", defaultPurityValue);

                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        Purity: defaultPurityValue, // Ensure exact match
                    }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (formData.metal_type) {
            fetchPurity();
        }
    }, [formData.metal_type]);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isEditMode, setIsEditMode] = useState(false); // State to toggle form visibility

    const fetchTagData = async () => {
        try {
            const response = await fetch(`${baseURL}/get/opening-tags-entry`);
            const jsonData = await response.json();

            console.log("Fetched Data:", jsonData); // Log the entire response

            if (jsonData.result && Array.isArray(jsonData.result)) {
                // Filter data based on selectedProduct conditions
                const filteredData = jsonData.result.filter(
                    (item) =>
                        item.invoice === selectedProduct.invoice &&
                        item.category === selectedProduct.category
                );

                setData(filteredData);
            } else {
                console.error("Unexpected API response format:", jsonData);
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTagData();
    }, [selectedProduct]);

    const handleEdit = (rowData) => {
        setFormData(rowData);
        setIsEditMode(true);
        setImage(rowData.image || "");
    
        // Check if Making_Charges_On is "MC %" and set MC_Per_Gram_Label accordingly
        if (rowData.Making_Charges_On === "MC %") {
            setFormData((prevData) => ({
                ...prevData,
                MC_Per_Gram_Label: "MC%",
            }));
        }
    };

    const handleDelete = async (id) => {
        console.log("Deleting ID:", id); // Confirming ID before sending request
        const url = `${baseURL}/delete/opening-tags-entry/${id}`;
        console.log("DELETE Request URL:", url);

        // Confirm before proceeding
        if (!window.confirm("Are you sure you want to delete this record?")) {
            return;
        }

        try {
            const response = await axios.delete(url);
            alert(response.data.message);

            // Fetch updated data after successful deletion
            fetchData();
            fetchTagData();
        } catch (error) {
            console.error("Error deleting record:", error.response?.data || error.message);
            alert("Failed to delete record.");
        }
    };

    const exportToExcel = (event) => {
        event.preventDefault(); // Prevent form submission if inside a form
    
        if (data.length === 0) {
            alert("No data available to export.");
            return;
        }
    
        const worksheetData = data.map((item, index) => ({
            "SI": index + 1,
            "Supplier Name": item.account_name,
            "Barcode": item.PCode_BarCode,
            "Category": item.category,
            "Sub Category": item.sub_category,
            "Design Name": item.design_master,
            "Purity": item.Purity,
            "Pcs": item.pcs,
            "Gross Wt": item.Gross_Weight,            
            "Stone Wt": item.Stones_Weight,
            "Wt BW": item.Weight_BW,
            "W.Wt": item.WastageWeight,
            "Total Wt": item.TotalWeight_AW,
            "MC On": item.Making_Charges_On,
            "Total MC": item.Making_Charges,
            "Piece Cost": item.pieace_cost,    
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
        // Auto-adjust column width
        const columnWidths = Object.keys(worksheetData[0]).map((key) => ({
            wch: Math.max(
                key.length,
                ...worksheetData.map(row => row[key] ? row[key].toString().length : 0)
            ) + 2
        }));
    
        worksheet["!cols"] = columnWidths;
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
        XLSX.writeFile(workbook, "TagDetails.xlsx");
    };
    
    


    return (
        <div style={{ paddingTop: "0px" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <h4 style={{ margin: "0" }}>Pieces: {pcs !== null ? pcs : "0"}</h4>
                <h4 style={{ margin: "0" }}>Gross Weight: {grossWeight !== null ? grossWeight : "0"}</h4>
            </div>
            <div className="container mb-4">
                <div className="row mt-1">
                    <div className="col-12">
                        <Form className="p-4 border rounded form-container-stockentry" >
                            <div className="stock-entry-form">
                                <h4 className="mb-3" style={{ marginTop: '-16px' }}>Stock Entry</h4>
                                <Row className="stock-form-section">
                                    {/* Always visible fields */}
                                    <Col xs={12} md={2}>
                                        <InputField
                                            label="Supplier Name"
                                            name="account_name"
                                            value={formData.account_name}
                                            onChange={handleChange}
                                            readOnly
                                        />
                                    </Col>
                                    {/* <Col xs={12} md={2}>
                                        <InputField
                                            label="Invoice"
                                            value={formData.invoice || ""} // Ensures no undefined issue
                                            onChange={(e) => {
                                                const input = e.target;
                                                const start = input.selectionStart; // Capture cursor position
                                                const transformedValue = input.value.toUpperCase();

                                                setFormData((prevState) => ({
                                                    ...prevState,
                                                    invoice: transformedValue,
                                                }));

                                                // Restore cursor position after transformation
                                                requestAnimationFrame(() => {
                                                    input.setSelectionRange(start, start);
                                                });
                                            }}
                                        />
                                    </Col> */}
                                    <Col xs={12} md={2}>
                                        <InputField
                                            label="Category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            readOnly
                                        />
                                    </Col>
                                    <Col xs={12} md={3} className="d-flex align-items-center">
                                        <div style={{ flex: 1 }}>
                                            <InputField
                                                label="Sub Category"
                                                name="sub_category"
                                                type="select"
                                                value={formData.sub_category}
                                                onChange={handleChange}
                                                options={subCategories.map((category) => ({
                                                    value: category.sub_category_name,
                                                    label: category.sub_category_name,
                                                }))}
                                                autoFocus
                                            />
                                        </div>
                                        <AiOutlinePlus
                                            size={20}
                                            color="black"
                                            onClick={handleOpenModal}
                                            style={{ marginLeft: "10px", cursor: "pointer", marginBottom: "20px" }}
                                        />
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <InputField
                                            label="Product Design Name"
                                            name="design_master"
                                            type="select"
                                            value={formData.design_master}
                                            onChange={handleChange}
                                            options={designOptions.map(option => ({ value: option.value, label: option.label }))}
                                        />
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <InputField
                                            label="Pricing"
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
                                    {/* 
                                    {!isSilverOrGold && (
                                        <>
                                            <Col xs={12} md={1}>
                                                <InputField
                                                    label="Cut"
                                                    name="cut"
                                                    value={formData.cut}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={1}>
                                                <InputField
                                                    label="Color"
                                                    name="color"
                                                    value={formData.color}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col xs={12} md={1}>
                                                <InputField
                                                    label="Clarity"
                                                    name="clarity"
                                                    value={formData.clarity}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </>
                                    )} */}

                                    {/* Render different fields based on Pricing selection */}
                                    {isByFixed ? (
                                        <>
                                            <Col xs={12} md={2}>
                                                <InputField label="PCode/BarCode" name="PCode_BarCode" type="text" value={formData.PCode_BarCode} onChange={handleChange} />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField label="HUID No" name="HUID_No" value={formData.HUID_No} onChange={handleChange} />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField label="Stock Point" name="Stock_Point" type="select" value={formData.Stock_Point} onChange={handleChange} options={[
                                                    { value: "Display Floor1", label: "Display Floor1" },
                                                    { value: "Display Floor2", label: "Display Floor2" },
                                                    { value: "Strong room", label: "Strong room" },
                                                ]} />
                                            </Col>

                                        </>
                                    ) : (
                                        <>
                                            <Col xs={12} md={2}>
                                                <InputField label="PCode/BarCode" name="PCode_BarCode" type="text" value={formData.PCode_BarCode} onChange={handleChange} />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField label="Purity" name="Purity" type="select" value={formData.Purity} onChange={handleChange} options={purityOptions.map((option) => ({
                                                    value: `${option.name} | ${option.purity}`,
                                                    label: `${option.name} | ${option.purity}`,
                                                }))} />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField label="HUID No" name="HUID_No" value={formData.HUID_No} onChange={handleChange} />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField label="Stock Point" name="Stock_Point" type="select" value={formData.Stock_Point} onChange={handleChange} options={[
                                                    { value: "Display Floor1", label: "Display Floor1" },
                                                    { value: "Display Floor2", label: "Display Floor2" },
                                                    { value: "Strong room", label: "Strong room" },
                                                ]} />
                                            </Col>

                                            <Col xs={12} md={2}>
                                                <div className="image-upload-container">
                                                    {/* Dropdown Button for Upload Options */}
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic-button">Upload Image</Dropdown.Toggle>

                                                        <Dropdown.Menu style={{ zIndex: 1050, position: "absolute" }}>
                                                            <Dropdown.Item onClick={() => fileInputRef.current.click()}>
                                                                Select Image
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setIsCameraOpen(true)}>
                                                                Capture Image
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>


                                                    {/* Hidden file input */}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        onChange={handleImageChange}
                                                        style={{ display: "none" }}
                                                    />

                                                    {/* Webcam Modal */}
                                                    {isCameraOpen && (
                                                        <div className="webcam-container mt-2">
                                                            <Webcam
                                                                audio={false}
                                                                ref={webcamRef}
                                                                screenshotFormat="image/jpeg"
                                                                className="img-thumbnail"
                                                            />
                                                            <div className="d-flex gap-2 mt-2">
                                                                <Button onClick={captureImage} variant="primary">
                                                                    Capture
                                                                </Button>
                                                                <Button onClick={() => setIsCameraOpen(false)} variant="danger">
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Image Preview with Delete Icon */}
                                                    {image && (
                                                        <div style={{ position: "relative", display: "inline-block", marginTop: "10px" }}>
                                                            <img src={image} alt="Selected"
                                                                style={{
                                                                    width: "100px",
                                                                    height: "100px",
                                                                    borderRadius: "8px",
                                                                }} />
                                                            <button
                                                                type="button"
                                                                onClick={clearImage}
                                                                style={{
                                                                    position: "absolute",
                                                                    top: "5px",
                                                                    right: "5px",
                                                                    background: "transparent",
                                                                    border: "none",
                                                                    color: "red",
                                                                    fontSize: "16px",
                                                                    cursor: "pointer",
                                                                    zIndex: 10,
                                                                }}
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </Col>

                                            <div className="purchase-form-left">
                                                <Col className="tag-urd-form1-section">
                                                    <h4 className="mb-3" style={{ marginTop: '-10px' }}>Sales</h4>
                                                    {/* New Row for Weight Fields */}
                                                    <Row className="mt-3">
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Gross Wt" name="Gross_Weight" value={formData.Gross_Weight} onChange={handleChange} />
                                                        </Col>
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Stones Wt" name="Stones_Weight" value={formData.Stones_Weight} onChange={handleChange} />
                                                        </Col>
                                                        <Col xs={12} md="2">
                                                            <Button variant="primary"
                                                                onClick={handleShow}
                                                                style={{
                                                                    backgroundColor: '#a36e29',
                                                                    borderColor: '#a36e29',
                                                                    fontSize: '0.8rem',
                                                                    marginLeft: '-20px',
                                                                    whiteSpace: 'nowrap'
                                                                }}
                                                            >
                                                                Stone Details
                                                            </Button>
                                                        </Col>
                                                        <Col xs={12} md={4}>
                                                            <InputField
                                                                label="Deduct St Wt"
                                                                name="deduct_st_Wt"
                                                                type="select"
                                                                value={formData.deduct_st_Wt || ""}
                                                                onChange={(e) => handleChange("deduct_st_Wt", e.target.value)}
                                                                options={[
                                                                    { value: "Yes", label: "Yes" },
                                                                    { value: "No", label: "No" },
                                                                ]}
                                                            />
                                                        </Col>
                                                        {/* <Col xs={12} md={4}>
                                                            <InputField
                                                                label="Stone Price/Carat"
                                                                name="stone_price_per_carat"
                                                                value={formData.stone_price_per_carat}
                                                                onChange={handleChange}
                                                            />
                                                        </Col> */}
                                                        <Col xs={12} md={3}>
                                                            <InputField
                                                                label="Stones Price"
                                                                name="Stones_Price"
                                                                value={formData.Stones_Price}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={4}>
                                                            <InputField label="Weight BW" name="Weight_BW" value={formData.Weight_BW} onChange={handleChange} readOnly />
                                                        </Col>
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Tag Wt" name="tag_weight" value={formData.tag_weight} onChange={handleChange} />
                                                        </Col>
                                                        <Col xs={12} md={2}>
                                                            <InputField label="Size" name="size" value={formData.size} onChange={handleChange} />
                                                        </Col>
                                                        <Col xs={12} md={4}>
                                                            <InputField
                                                                label="MC On"
                                                                name="Making_Charges_On"
                                                                type="select"
                                                                value={formData.Making_Charges_On}
                                                                onChange={handleChange}
                                                                options={[
                                                                    { value: "MC / Gram", label: "MC / Gram" },
                                                                    { value: "MC / Piece", label: "MC / Piece" },
                                                                    { value: "MC %", label: "MC %" },
                                                                ]}
                                                            />
                                                        </Col>

                                                        <Col xs={12} md={3}>
                                                            <InputField
                                                                label={formData.MC_Per_Gram_Label}
                                                                name="MC_Per_Gram"
                                                                value={formData.MC_Per_Gram}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>

                                                        {/* Show Making_Charges field only when Making_Charges_On is "MC / Gram" or "MC / Piece" */}
                                                        {(formData.Making_Charges_On === "MC / Gram" || formData.Making_Charges_On === "MC / Piece") && (
                                                            <Col xs={12} md={3}>
                                                                <InputField
                                                                    label="MC"
                                                                    name="Making_Charges"
                                                                    value={formData.Making_Charges}
                                                                    onChange={handleChange}
                                                                />
                                                            </Col>
                                                        )}


                                                        <Col xs={12} md={4}>
                                                            <InputField
                                                                label="Wastage On"
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
                                                            <InputField label="Wastage %" name="Wastage_Percentage" value={formData.Wastage_Percentage} onChange={handleChange} />
                                                        </Col>
                                                        <Col xs={12} md={2}>
                                                            <InputField label="W.Wt" name="WastageWeight" value={formData.WastageWeight} onChange={handleChange} readOnly />
                                                        </Col>
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Total Weight" name="TotalWeight_AW" value={formData.TotalWeight_AW} onChange={handleChange} readOnly />
                                                        </Col>

                                                    </Row>
                                                </Col>
                                            </div>
                                            <div className="purchase-form-right">
                                                <Col className="tag-urd-form2-section">
                                                    <h4 className="mb-3" style={{ marginTop: '-10px' }}>Purchase</h4>
                                                    {/* New Row for Weight Fields */}
                                                    <Row className="mt-3">
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Gross Wt" name="pur_Gross_Weight" value={formData.pur_Gross_Weight} onChange={handleChange} />
                                                        </Col>
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Stones Wt" name="pur_Stones_Weight" value={formData.pur_Stones_Weight} onChange={handleChange} />
                                                        </Col>
                                                        <Col xs={12} md="2">
                                                            <Button variant="primary"
                                                                onClick={handleShowPurchase}
                                                                style={{
                                                                    backgroundColor: '#a36e29',
                                                                    borderColor: '#a36e29',
                                                                    fontSize: '0.8rem',
                                                                    marginLeft: '-17px',
                                                                    whiteSpace: 'nowrap'
                                                                }}
                                                            >
                                                                Stone Details
                                                            </Button>
                                                        </Col>
                                                        <Col xs={12} md={4}>
                                                            <InputField
                                                                label="Deduct St Wt"
                                                                name="pur_deduct_st_Wt"
                                                                type="select"
                                                                value={formData.pur_deduct_st_Wt || ""}
                                                                onChange={(e) => handleChange("pur_deduct_st_Wt", e.target.value)}
                                                                options={[
                                                                    { value: "Yes", label: "Yes" },
                                                                    { value: "No", label: "No" },
                                                                ]}
                                                            />
                                                        </Col>
                                                        {/* <Col xs={12} md={4}>
                                                            <InputField
                                                                label="Stone Price/Carat"
                                                                name="pur_stone_price_per_carat"
                                                                value={formData.pur_stone_price_per_carat}
                                                                onChange={handleChange}
                                                            />
                                                        </Col> */}
                                                        <Col xs={12} md={3}>
                                                            <InputField
                                                                label="Stones Price"
                                                                name="pur_Stones_Price"
                                                                value={formData.pur_Stones_Price}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Weight BW" name="pur_Weight_BW" value={formData.pur_Weight_BW} onChange={handleChange} readOnly />
                                                        </Col>
                                                        <Col xs={12} md={4}>
                                                            <InputField
                                                                label="MC On"
                                                                name="pur_Making_Charges_On"
                                                                type="select"
                                                                value={formData.pur_Making_Charges_On}
                                                                onChange={handleChange}
                                                                options={[
                                                                    { value: "MC / Gram", label: "MC / Gram" },
                                                                    { value: "MC / Piece", label: "MC / Piece" },
                                                                    { value: "MC %", label: "MC %" },
                                                                ]}
                                                            />
                                                        </Col>

                                                        <Col xs={12} md={2}>
                                                            <InputField
                                                                label={formData.MC_Per_Gram_Label}
                                                                name="pur_MC_Per_Gram"
                                                                value={formData.pur_MC_Per_Gram}
                                                                onChange={handleChange}
                                                            />
                                                        </Col>

                                                        {/* Show Making_Charges field only when Making_Charges_On is "MC / Gram" or "MC / Piece" */}
                                                        {(formData.pur_Making_Charges_On === "MC / Gram" || formData.pur_Making_Charges_On === "MC / Piece") && (
                                                            <Col xs={12} md={3}>
                                                                <InputField
                                                                    label="MC"
                                                                    name="pur_Making_Charges"
                                                                    value={formData.pur_Making_Charges}
                                                                    onChange={handleChange}
                                                                />
                                                            </Col>
                                                        )}


                                                        <Col xs={12} md={4}>
                                                            <InputField
                                                                label="Wastage On"
                                                                name="pur_Wastage_On"
                                                                type="select"
                                                                value={formData.pur_Wastage_On}
                                                                onChange={handleChange}
                                                                options={[
                                                                    { value: "Gross Weight", label: "Gross Weight" },
                                                                    { value: "Weight BW", label: "Weight BW" },
                                                                ]}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Wastage %" name="pur_Wastage_Percentage" value={formData.pur_Wastage_Percentage} onChange={handleChange} />
                                                        </Col>
                                                        <Col xs={12} md={2}>
                                                            <InputField label="W.Wt" name="pur_WastageWeight" value={formData.pur_WastageWeight} onChange={handleChange} readOnly />
                                                        </Col>
                                                        <Col xs={12} md={3}>
                                                            <InputField label="Total Wt" name="pur_TotalWeight_AW" value={formData.pur_TotalWeight_AW} onChange={handleChange} readOnly />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </>
                                    )}

                                    {formData.Pricing === "By fixed" && (
                                        <>
                                            <Col xs={12} md={1}>
                                                <InputField label="Pcs" type="number" value={formData.pcs} onChange={(e) => handleChange("pcs", e.target.value)} />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField label="Piece Cost" type="number" value={formData.pieace_cost} onChange={(e) => handleChange("pieace_cost", e.target.value)} />
                                            </Col>
                                            <Col xs={12} md={1}>
                                                <InputField label="Tax %" value={formData.tax_percent} onChange={(e) => handleChange("tax_percent", e.target.value)} />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField label="MRP" type="number" value={formData.mrp_price} onChange={(e) => handleChange("mrp_price", e.target.value)} />
                                            </Col>
                                            <Col xs={12} md={2}>
                                                <InputField label="Total Pcs Cost" type="number" value={formData.total_pcs_cost} onChange={(e) => handleChange("total_pcs_cost", e.target.value)} />
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <div className="image-upload-container">
                                                    {/* Dropdown Button for Upload Options */}
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic-button">Upload Image</Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={() => fileInputRef.current.click()}>
                                                                Select Image
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setIsCameraOpen(true)}>
                                                                Capture Image
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                    {/* Hidden file input */}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        onChange={handleImageChange}
                                                        style={{ display: "none" }}
                                                    />

                                                    {/* Webcam Modal */}
                                                    {isCameraOpen && (
                                                        <div className="webcam-container mt-2">
                                                            <Webcam
                                                                audio={false}
                                                                ref={webcamRef}
                                                                screenshotFormat="image/jpeg"
                                                                className="img-thumbnail"
                                                            />
                                                            <div className="d-flex gap-2 mt-2">
                                                                <Button onClick={captureImage} variant="primary">
                                                                    Capture
                                                                </Button>
                                                                <Button onClick={() => setIsCameraOpen(false)} variant="danger">
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Image Preview with Delete Icon */}
                                                    {image && (
                                                        <div style={{ position: "relative", display: "inline-block", marginTop: "10px" }}>
                                                            <img src={image} alt="Selected"
                                                                style={{
                                                                    width: "100px",
                                                                    height: "100px",
                                                                    borderRadius: "8px",
                                                                }} />
                                                            <button
                                                                type="button"
                                                                onClick={clearImage}
                                                                style={{
                                                                    position: "absolute",
                                                                    top: "5px",
                                                                    right: "5px",
                                                                    background: "transparent",
                                                                    border: "none",
                                                                    color: "red",
                                                                    fontSize: "16px",
                                                                    cursor: "pointer",
                                                                    zIndex: 10,
                                                                }}
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </Col>
                                        </>
                                    )}
                                </Row>


                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                {/* <label>
                                    <input
                                        type="checkbox"
                                        checked={isGeneratePDF}
                                        onChange={(e) => setIsGeneratePDF(e.target.checked)}
                                    />
                                    Generate PDF
                                </label> */}
                                <label className="checkbox-label" htmlFor="tcs">
                                    <input
                                        type="checkbox"
                                        id="tcs"
                                        name="tcsApplicable"
                                        className="checkbox-input"
                                        checked={isGeneratePDF}
                                        onChange={(e) => setIsGeneratePDF(e.target.checked)}
                                    />
                                    Print QR Code
                                </label>

                                <div className="text-end">
                                    <Button
                                        variant="secondary"
                                        onClick={handleCloseTagModal}
                                        style={{ backgroundColor: 'gray', marginRight: '10px' }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="success"
                                        style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
                                        onClick={handleSubmit}
                                    >
                                        {isEditMode ? "Update" : "Save"}
                                    </Button>
                                </div>
                            </div>


                            {/* <OpeningTagsTable /> */}
                            <div className="container mt-4" style={{ overflowX: "auto", maxWidth: "100%" }}>
                                {/* Excel Export Button */}
                                <button
                                    onClick={exportToExcel}
                                    style={{
                                        marginBottom: "10px",
                                        padding: "8px 12px",
                                        backgroundColor: "green",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <FaFileExcel style={{ marginRight: "5px" }} /> Export to Excel
                                </button>

                                {/* Table */}
                                <Table bordered style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                                    <thead style={{ fontSize: "14px", fontWeight: "bold" }}>
                                        <tr>
                                            <th>SI</th>
                                            <th>Barcode</th>
                                            <th>Category</th>
                                            <th>Sub Category</th>
                                            <th>Design Name</th>
                                            <th>Gross Wt</th>
                                            <th>Stone Wt</th>
                                            <th>Wt BW</th>
                                            <th>W.Wt</th>
                                            <th>Total Wt</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ fontSize: "14px" }}>
                                        {data.length > 0 ? (
                                            data.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.PCode_BarCode}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.sub_category}</td>
                                                    <td>{item.design_master}</td>
                                                    <td>{item.Gross_Weight}</td>
                                                    <td>{item.Stones_Weight}</td>
                                                    <td>{item.Weight_BW}</td>
                                                    <td>{item.WastageWeight}</td>
                                                    <td>{item.TotalWeight_AW}</td>
                                                    <td>
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt="Product Image"
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "5px",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    const newWindow = window.open();
                                                                    newWindow.document.write(
                                                                        `<img src="${item.image}" alt="Product Image" style="width: 100%; height: auto;" />`
                                                                    );
                                                                }}
                                                                onError={(e) => (e.target.src = "/placeholder.png")}
                                                            />
                                                        ) : (
                                                            "No Image"
                                                        )}
                                                    </td>
                                                    <td>
                                                        <FaEdit
                                                            style={{ cursor: "pointer", color: "blue" }}
                                                            onClick={() => handleEdit(item)}
                                                        />
                                                        <FaTrash
                                                            style={{
                                                                cursor: "pointer",
                                                                marginLeft: "10px",
                                                                color: "red",
                                                            }}
                                                            onClick={() => handleDelete(item.opentag_id)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="12" className="text-center">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Sub Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="categoryName">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={newSubCategory.category || formData.category}
                                onChange={handleModalChange}
                                placeholder="Enter category"
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="subCategoryName">
                            <Form.Label>Sub Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newSubCategory.name}
                                onChange={handleModalChange}

                            />
                        </Form.Group>
                        <Form.Group controlId="subCategoryPrefix">
                            <Form.Label>Prefix</Form.Label>
                            <Form.Control
                                type="text"
                                name="prefix"
                                value={newSubCategory.prefix}
                                onChange={handleModalChange}

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
            <StoneDetailsModal
                show={show}
                handleClose={handleClose}
                stoneDetails={stoneDetails}
                setStoneDetails={setStoneDetails}
                handleAddStone={handleAddStone}
                stoneList={stoneList}
                handleEditStone={handleEditStone}
                handleDeleteStone={handleDeleteStone}
                editingStoneIndex={editingStoneIndex}
            />
            <PurchaseStoneDetailsModal
                showPurchase={showPurchase}
                handleClosePurchase={handleClosePurchase}
                purStoneDetails={purStoneDetails}
                setPurStoneDetails={setPurStoneDetails}
                handleAddTagPurStone={handleAddTagPurStone}
                purchaseStoneList={purchaseStoneList}
                handleTagPurEditStone={handleTagPurEditStone}
                handleTagPurDeleteStone={handleTagPurDeleteStone}
                editingPurchaseStoneIndex={editingPurchaseStoneIndex}
            />
        </div>
    );
};

export default TagEntry;
