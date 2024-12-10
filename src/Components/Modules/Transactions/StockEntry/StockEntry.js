import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StockEntry.css";
import InputField from "../../Masters/ItemMaster/Inputfield";
import StoneDetailsModal from "./StoneDetailsModal";
import { useNavigate } from "react-router-dom";

const StockEntry = () => {
    const [formData, setFormData] = useState({
        product_id: "",
        Pricing: "",
        Tag_ID: "",
        Prefix: "tag",
        Category: "Gold", 
        Purity: "",
        PCode_BarCode: "",
        Gross_Weight: "",
        Stones_Weight: "",
        Stones_Price: "",
        HUID_No: "ABC1234",
        Wastage_On: "",
        Wastage_Percentage: "",
        Status: "sold",
        Source: "Transactions",
        Stock_Point: "",
        WastageWeight: "",
        TotalWeight_AW: "",
        MC_Per_Gram: "",
        Making_Charges_On: "",
        Making_Charges: "",
        Design_Master: "",
        product_Name: "",
        Weight_BW: "",
    });

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/stockEntryTable");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log formData to debug
        console.log("Submitting formData:", formData);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/opening-tags-entry",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("Data saved successfully:", response.data);
            alert("Data saved successfully!");
            navigate("/stockEntryTable");
        } catch (error) {
            if (error.response) {
                // Server responded with a status code other than 2xx
                console.error("Response error:", error.response.data);
                alert(`Error: ${error.response.data.message || "Invalid input data"}`);
            } else if (error.request) {
                // Request made but no response received
                console.error("Request error:", error.request);
                alert("No response received from server. Please try again.");
            } else {
                // Something else caused the error
                console.error("Error:", error.message);
                alert("An error occurred. Please check the console for details.");
            }
        }
    };

    return (
        <div style={{ paddingTop: "79px" }}>
            <div className="container mt-4">
                <div className="row mt-3">
                    <div className="col-12">
                        <form className="p-4 border rounded form-container-stockentry" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h4>Stock Entry</h4>
                                <div className="row g-3">
                                    <div className="col-md-3">
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
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="P ID:"
                                            name="product_id"
                                            type="select"
                                            value={formData.product_id}
                                            onChange={handleChange}
                                            options={[
                                                { value: "4", label: "4" },
                                                { value: "5", label: "5" },
                                                { value: "6", label: "6" },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <InputField
                                            label="Tag ID:"
                                            name="Tag_ID"
                                            value={formData.Tag_ID}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <InputField
                                            label="Product Name:"
                                            name="product_Name"
                                            type="select"
                                            value={formData.product_Name}
                                            onChange={handleChange}
                                            options={[
                                                { value: "Product1", label: "Product1" },
                                                { value: "Product2", label: "Product2" },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <InputField
                                            label="Design Master:"
                                            name="Design_Master"
                                            type="select"
                                            value={formData.Design_Master}
                                            onChange={handleChange}
                                            options={[
                                                { value: "Jewellery", label: "Jewellery" },
                                                { value: "Gold", label: "Gold" },
                                                { value: "Silver", label: "Silver" },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Category:" value="Gold" readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Prefix:" value="tag" readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="Purity:"
                                            name="Purity"
                                            type="select"
                                            value={formData.Purity}
                                            onChange={handleChange}
                                            options={[
                                                { value: "916HM", label: "916HM" },
                                                { value: "22K", label: "22K" },
                                                { value: "18K", label: "18K" },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="PCode/BarCode:"
                                            name="PCode_BarCode"
                                            value={formData.PCode_BarCode}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <InputField
                                            label="Gross Weight:"
                                            name="Gross_Weight"
                                            value={formData.Gross_Weight}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="Stones Weight:"
                                            name="Stones_Weight"
                                            value={formData.Stones_Weight}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                    <button
                                            type="button" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}
                                            className="btn btn-primary w-100"
                                            onClick={handleOpenModal}

                                        >
                                            Stone Details
                                        </button>
                                    </div>
                                    <div className="col-md-2">
                                        <InputField
                                            label="Stones Price:"
                                            name="Stones_Price"
                                            value={formData.Stones_Price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <InputField label="Weight BW:"
                                         name="Weight_BW"
                                            value={formData.Weight_BW}
                                            onChange={handleChange}
                                           
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <InputField
                                            label="Wastage On:"
                                            name="Wastage_On"
                                            type="select"
                                            value={formData.Wastage_On}
                                            onChange={handleChange}
                                            options={[
                                                { value: "Gross Weight", label: "Gross Weight" },
                                                { value: "Weight WW", label: "Weight WW" },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="Wastage %:"
                                            name="Wastage_Percentage"
                                            value={formData.Wastage_Percentage}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="Wastage Weight:"
                                            name="WastageWeight"
                                            value={formData.WastageWeight}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="Total Weight:"
                                            name="TotalWeight_AW"
                                            value={formData.TotalWeight_AW}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
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
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="MC Per Gram:"
                                            name="MC_Per_Gram"
                                            value={formData.MC_Per_Gram}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField
                                            label="Making Charges:"
                                            name="Making_Charges"
                                            value={formData.Making_Charges}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3">
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
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="cus-back-btn"
                                onClick={handleBack}
                                style={{ backgroundColor: "gray", marginRight: "10px" }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="cus-submit-btn">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <StoneDetailsModal showModal={showModal} handleCloseModal={handleCloseModal} />
        </div>
    );
};

export default StockEntry;
