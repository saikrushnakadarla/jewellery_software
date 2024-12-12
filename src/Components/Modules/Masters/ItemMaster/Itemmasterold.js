import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ItemMaster.css";
import InputField from "./Inputfield";
import StoneDetailsModal from "../../Transactions/StockEntry/StoneDetailsModal";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const FormWithTable = () => {
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
        HUID_No: "",
        Wastage_On: "",
        Wastage_Percentage: "",
        Status: "Avalible",
        Source: "Tags Entry",
        Stock_Point: "",
        WastageWeight: "",
        TotalWeight_AW: "",
        MC_Per_Gram: "",
        Making_Charges_On: "",
        Making_Charges: "",
        Design_Master: "gold",
        product_Name: "Priyanka",
        Weight_BW: "",
    });

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [isMaintainTagsChecked, setIsMaintainTagsChecked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setIsMaintainTagsChecked((prev) => !prev);
    };

    const maintainTagsStyle = !isMaintainTagsChecked
        ? {}
        : { backgroundColor: "#f5f5f5", color: "#888" };

    const openingTagsStyle = isMaintainTagsChecked
        ? {}
        : { backgroundColor: "#f5f5f5", color: "#888" };

   
    const [productOptions, setProductOptions] = useState([]);

    useEffect(() => {
        const fetchProductIds = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                const productData = response.data; // Ensure the response structure matches this
                const options = productData.map((product) => ({
                    value: product.product_id,
                    label: product.product_id,
                }));
                setProductOptions(options);
            } catch (error) {
                console.error("Error fetching product IDs:", error);
            }
        };

        fetchProductIds();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            product_id: formData.product_id,
            Pricing: formData.pricing,
            Tag_ID: formData.Tag_ID,
            Prefix: "Gold",
            Category: "Necklace",
            Purity: formData.Purity,
            PCode_BarCode: formData.PCode_BarCode,
            Gross_Weight: parseFloat(formData.Gross_Weight),
            Stones_Weight: parseFloat(formData.Stones_Weight),
            Stones_Price: parseFloat(formData.Stones_Price),
            WastageWeight: parseFloat(formData.WastageWeight),
            HUID_No: formData.HUID_No,
            Wastage_On: formData.Wastage_On,
            Wastage_Percentage: parseFloat(formData.Wastage_Percentage),
            Weight_BW: parseFloat(formData.Weight_BW),
            MC_Per_Gram: parseFloat(formData.MC_Per_Gram),
            Making_Charges_On: parseFloat(formData.Making_Charges_On),
            TotalWeight_AW_AW: parseFloat(formData.TotalWeight_AW),
            Making_Charges: parseFloat(formData.Making_Charges),
            Status: "sold",
            Source: "batch",
            Stock_Point: formData.Stock_Point,
            Design_Master: "jewellery",
            product_Name: "priyanka chain",
        };

        // Log formData to debug
        console.log("Submitting formData:", payload);

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
            navigate("");
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


    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/itemmastertable');
    };
    return (
        <div style={{ paddingTop: "90px" }}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        {/* Tab Navigation */}
                    </div>
                </div>
                <div className="row mt-3 itemmaster-form-container">
                    <div className="col-12" style={{ marginTop: '-55px' }}>
                        {/* Form Section */}
                        {/* <form className="itemmaster-main-container" > */}
                            <div className="form-container">
                                <h4 style={{ marginBottom: "15px" }}>Product Details</h4>
                                <div className="form-row">
                                    <InputField label="P ID:"
                                        name="pid"
                                        value={formData.pid}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        label="Product Name:"
                                        name="productname"
                                        value={formData.productname}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        label="Rbarcode:"
                                        name="rbarcode"
                                        value={formData.rbarcode}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        label="Categories:"
                                        name="categories"
                                        type="select"
                                        value={formData.categories}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Jewellery", label: "Jewellery" },
                                            { value: "Gold", label: "Gold" },
                                            { value: "Silver", label: "Silver" },
                                        ]}
                                    />
                                    <InputField

                                        label="Design Master:"
                                        name="designmaster"
                                        type="select"
                                        value={formData.designmaster}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Jewellery", label: "Jewellery" },
                                            { value: "Gold", label: "Gold" },
                                            { value: "Silver", label: "Silver" },
                                        ]}
                                    />
                                    <InputField
                                        label="Purity:"
                                        type="select"
                                        name="Purity"
                                        value={formData.Purity}
                                        onChange={handleChange}
                                        options={[
                                            { value: "91.6HM", label: "91.6HM" },
                                            { value: "22K", label: "22K" },
                                            { value: "18K", label: "18K" },
                                        ]}
                                    />
                                    <InputField
                                        label="Item Prefix:"
                                        name="itemprefix"
                                        value={formData.itemprefix}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-row">
                                    <InputField
                                        label="Short Name:"
                                        name="shortname"
                                        value={formData.shortname}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        label="Sale Account Head:"
                                        name="saleaccounthead"
                                        type="select"
                                        value={formData.saleaccounthead}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Sales", label: "Sales" },
                                            { value: "Purchase", label: "Purchase" },
                                        ]}
                                    />
                                    <InputField
                                        label="Purchase Account Head:"
                                        name="purchaseaccounthead"
                                        type="select"
                                        value={formData.purchaseaccounthead}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Purchase", label: "Purchase" },
                                            { value: "Sales", label: "Sales" },
                                        ]}
                                    />
                                    <InputField
                                        label="Status:"
                                        name="status"
                                        type="select"
                                        value={formData.status}
                                        onChange={handleChange}
                                        options={[
                                            { value: "ACTIVE", label: "ACTIVE" },
                                            { value: "INACTIVE", label: "INACTIVE" },
                                        ]}
                                    />
                                    <InputField
                                        label="Tax Slab:"
                                        name="taxslab"
                                        type="select"
                                        value={formData.taxslab}
                                        onChange={handleChange}
                                        options={[
                                            { value: "ACTIVE", label: "ACTIVE" },
                                            { value: "INACTIVE", label: "INACTIVE" },
                                        ]}
                                    />
                                    <InputField label="HSN Code:"
                                        name="hsncode"
                                        value={formData.hsncode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-container" style={{ marginTop: "15px" }}>
                                {/* Maintain Tags Section */}
                                <div className="main-tags-row" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="checkbox"
                                        id="main-tags"
                                        style={{ width: "35px" }}
                                        checked={isMaintainTagsChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="main-tags">
                                        <h4>Maintain Tags</h4>
                                    </label>
                                </div>
                                <div className="form-row" style={{ marginBottom: "-20px" }}>
                                    <InputField
                                        label="OP.Qty:"
                                        name="opqty"
                                        value={formData.opqty}
                                        onChange={handleChange}
                                        readOnly={isMaintainTagsChecked}
                                        style={maintainTagsStyle}
                                    />
                                    <InputField
                                        label="OP.Value:"
                                        name="opvalue"
                                        value={formData.opvalue}
                                        onChange={handleChange}
                                        readOnly={isMaintainTagsChecked}
                                        style={maintainTagsStyle}
                                    />
                                    <InputField
                                        label="OP.Weight:"
                                        name="opweight"
                                        value={formData.opweight}
                                        onChange={handleChange}
                                        readOnly={isMaintainTagsChecked}
                                        style={maintainTagsStyle}
                                    />
                                    <InputField
                                        label="HUID No:"
                                        name="HUID_No"
                                        value={formData.HUID_No}
                                        onChange={handleChange}
                                        readOnly={isMaintainTagsChecked}
                                        style={maintainTagsStyle}
                                    />
                                </div>


                            </div>
                            {/* Opening Tags Entry Section */}
                            <div className="form-container" style={{ marginTop: "15px" }}>
                                <h4 style={{ marginBottom: "15px" }}>Opening Tags Entry</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <InputField
                                            label="Pricing:"
                                            type="select"
                                            name="pricing"
                                            value={formData.pricing}
                                            onChange={handleChange}
                                            options={[
                                                { value: "By Weight", label: "By Weight" },
                                                { value: "By Fixed", label: "By Fixed" },
                                            ]}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField
                                            label="P ID:"
                                            name="product_id"
                                            type="text"
                                            value={formData.product_id}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />

                                        {/* <InputField
                                            label="P ID:"
                                            name="product_id"
                                            type="select"
                                            value={formData.product_id}
                                            onChange={handleChange}
                                            options={productOptions}
                                        /> */}

                                        <InputField
                                            label="Tag ID:"
                                            name="Tag_ID"
                                            type="text"
                                            value={formData.Tag_ID}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField
                                            label="Prefix:"
                                            value="Gold"
                                            readOnly
                                            style={openingTagsStyle}
                                        />
                                        <InputField
                                            label="Purity:"
                                            type="select"
                                            name="Purity"
                                            value={formData.Purity}
                                            onChange={handleChange}
                                            options={[
                                                { value: "916HM", label: "916HM" },
                                                { value: "22K", label: "22K" },
                                                { value: "18K", label: "18K" },
                                            ]}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField
                                            label="PCode/BarCode:"
                                            name="PCode_BarCode"
                                            type="text"
                                            value={formData.PCode_BarCode}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <InputField
                                            label="Gross Weight:"
                                            name="Gross_Weight"
                                            value={formData.Gross_Weight}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField
                                            label="Stones Weight:"
                                            name="Stones_Weight"
                                            value={formData.Stones_Weight}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <button
                                            type="button"
                                            style={{ backgroundColor: '#a36e29' }}
                                            className="stone-details-btn"
                                            onClick={handleOpenModal}
                                            readOnly={!isMaintainTagsChecked}
                                        >
                                            Stone Details
                                        </button>
                                        <InputField
                                            label="Stones Price:"
                                            name="Stones_Price"
                                            value={formData.Stones_Price}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField
                                            label="Weight BW:"
                                            name="Weight_BW"
                                            value={formData.Weight_BW}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField
                                            label="HUID No:"
                                            name="HUID_No"
                                            value={formData.HUID_No}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                    </div>
                                    <div className="form-row" style={{ marginBottom: '-20px' }}>
                                        <InputField
                                            label="Wastage On:"
                                            type="select"
                                            name="Wastage_On"
                                            value={formData.Wastage_On}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                            options={[
                                                { value: "Gross Weight", label: "Gross Weight" },
                                                { value: "Weight WW", label: "Weight WW" },
                                            ]}
                                        />
                                        <InputField label="Wastage %:" value={formData.Wastage_Percentage}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                            name="Wastage_Percentage" />

                                        {/* <InputField label="%:"
                                        name="percentage"
                                        value={formData.percentage}
                                        onChange={handleChange}
                                    /> */}
                                        <InputField label="wastage Weight:"
                                            name="WastageWeight"
                                            value={formData.WastageWeight}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField label="total Weight AW:"
                                            name="TotalWeight_AW"
                                            value={formData.TotalWeight_AW}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField
                                            label="Making Charges On:"
                                            type="select"
                                            value={formData.Making_Charges_On}
                                            onChange={handleChange}
                                            name="Making_Charges_On"
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                            options={[{ value: "By Weight", label: "by Weight" },
                                            { value: "Fixed", label: "Fixed" },
                                            ]}
                                        />
                                        <InputField label="Mc Per Gram:"
                                            name="MC_Per_Gram"
                                            value={formData.MC_Per_Gram}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />
                                        <InputField label="Making Charges:"
                                            name="Making_Charges"
                                            value={formData.Making_Charges}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                        />

                                        {/* <InputField label="Tax:"
                                        name="tax"
                                        value={formData.tax}
                                        onChange={handleChange}
                                    /> */}
                                        <InputField
                                            label="Stock Point:"
                                            type="select"
                                            name="Stock_Point"
                                            value={formData.Stock_Point}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                            options={[
                                                { value: "Main Store", label: "Main Store" },
                                                { value: "Secondary Store", label: "Secondary Store" },
                                            ]}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        readOnly={!isMaintainTagsChecked}
                                        style={{
                                            backgroundColor: "#a36e29",
                                            borderColor: "#a36e29",
                                            marginLeft: "95%",
                                            marginTop: "15px",
                                            ...openingTagsStyle
                                        }}
                                    >
                                        Add
                                    </button>
                                </form>
                            </div>

                            <button
                                type="button"
                                className="cus-back-btn"
                                variant="secondary"
                                onClick={handleBack} style={{ backgroundColor: 'gray', marginRight: '10px', marginTop: '10px' }}
                            >
                                cancel
                            </button>
                            {/* Add additional fields similarly */}
                            <button className="btn btn-primary" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }} onClick={handleSave}>
                                Save
                            </button>
                        {/* </form> */}
                        <StoneDetailsModal
                            showModal={showModal}
                            handleCloseModal={handleCloseModal}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormWithTable;
