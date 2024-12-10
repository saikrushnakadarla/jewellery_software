import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ItemMaster.css";
import InputField from "./Inputfield";
import StoneDetailsModal from "../../Transactions/StockEntry/StoneDetailsModal";
import { useNavigate } from 'react-router-dom';

const FormWithTable = () => {
    const [formData, setFormData] = useState({
        productname: "",
        rbarcode: "",
        categories: "",
        designmaster: "",
        itemprefix: "",
        shortname: "",
        saleaccounthead: "",
        purchaseaccounthead: "",
        status: true,
        taxslab: "",
        hsncode: "",
        opqty: ' ',
        opvalue: ' ',
        opweight: ' ',
        purity: "",
        huidno: "",
        pricing: "",
        pid: ' ',
        category: "Gold",
        prefix: "R",
        pcode: "",
        grossweight: ' ',
        stonesweight: ' ',
        stonesprice: ' ',
        weightww: ' ',
        wastageon: "",
        wastage: ' ',
        percentage: ' ',
        weight: ' ',
        makingcharges: ' ',
        cal: ' ',
        tax: ' ',
        stackpoint: "",
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/add-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Product added successfully!");
                setFormData({
                    productname: "",
                    rbarcode: "",
                    categories: "",
                    designmaster: "",
                    itemprefix: "",
                    shortname: "",
                    saleaccounthead: "",
                    purchaseaccounthead: "",
                    status: true,
                    taxslab: "",
                    hsncode: "",
                    opqty: ' ',
                    opvalue: ' ',
                    opweight: ' ',
                    purity: "",
                    huidno: "",
                    pricing: "",
                    pid: ' ',
                    purity: "",
                    tagid: ' ',
                    category: "Gold",
                    prefix: "R",
                    pcode: "",
                    grossweight: ' ',
                    stonesweight: ' ',
                    stonesprice: ' ',
                    weightww: ' ',
                    wastageon: "",
                    wastage: ' ',
                    percentage: ' ',
                    weight: ' ',
                    makingcharges: ' ',
                    cal: ' ',
                    tax: ' ',
                    status: "",
                    stackpoint: "",
                });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert("Error submitting the form. Please try again.");
            console.error(error);
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
                        <form className="itemmaster-main-container" onSubmit={handleSubmit}>
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
                                        name="purity"
                                        value={formData.purity}
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
                                        name="huidno"
                                        value={formData.huidno}
                                        onChange={handleChange}
                                        readOnly={isMaintainTagsChecked}
                                        style={maintainTagsStyle}
                                    />
                                </div>


                            </div>
                            {/* Opening Tags Entry Section */}
                            <div className="form-container" style={{ marginTop: "15px" }}>
                                <h4 style={{ marginBottom: "15px" }}>Opening Tags Entry</h4>
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
                                        label="Tag ID:"
                                        name="tagid"
                                        value={formData.tagid}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                    <InputField label="Prefix:" value="Gold" readOnly style={openingTagsStyle} />
                                    <InputField
                                        label="Purity:"
                                        type="select"
                                        name="purity"
                                        value={formData.purity}
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
                                        name="pcode"
                                        value={formData.pcode}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                    {/* <InputField
                                        label="Status:"
                                        type="select"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        options={[
                                            { value: "Sold", label: "Sold" },
                                            { value: "Purchase", label: "Purchase" },
                                        ]}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    /> */}
                                </div>
                                <div className="form-row">
                                    <InputField
                                        label="Gross Weight:"
                                        name="grossweight"
                                        value={formData.grossweight}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                    <InputField
                                        label="Stones Weight:"
                                        name="stonesweight"
                                        value={formData.stonesweight}
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
                                        name="stonesprice"
                                        value={formData.stonesprice}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                    <InputField
                                        label="Weight BW:"
                                        name="weightww"
                                        value={formData.weightww}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                    <InputField
                                        label="HUID No:"
                                        name="huidno"
                                        value={formData.huidno}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                </div>
                                <div className="form-row" style={{ marginBottom: '-20px' }}>
                                    <InputField
                                        label="Wastage On:"
                                        type="select"
                                        name="wastageon"
                                        value={formData.wastageon}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                        options={[
                                            { value: "Gross Weight", label: "Gross Weight" },
                                            { value: "Weight WW", label: "Weight WW" },
                                        ]}
                                    />
                                     <InputField label="Wastage %:"  value={formData.wastagepercentage}
                                            onChange={handleChange}
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                            name="wastagepercentage" />
                                            
                                    {/* <InputField label="%:"
                                        name="percentage"
                                        value={formData.percentage}
                                        onChange={handleChange}
                                    /> */}
                                    <InputField label="wastage Weight:"
                                        name="wastageweight"
                                        value={formData.wastageweight}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                     <InputField label="total Weight AW:"
                                        name="totalweight"
                                        value={formData.totalweight}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                     <InputField
                                            label="Making Charges On:"
                                            type="select"
                                            value={formData.charges}
                                            onChange={handleChange}
                                            name="charges"
                                            readOnly={!isMaintainTagsChecked}
                                            style={openingTagsStyle}
                                            options={[{ value: "By Weight", label: "by Weight" },
                                                { value: "Fixed", label: "Fixed" },
                                            ]}
                                        />
                                         <InputField label="Mc Per Gram:"
                                        name="mcpergram"
                                        value={formData.mcpergram}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                    />
                                    <InputField label="Making Charges:"
                                        name="makingcharges"
                                        value={formData.makingcharges}
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
                                        name="stackpoint"
                                        value={formData.stackpoint}
                                        onChange={handleChange}
                                        readOnly={!isMaintainTagsChecked}
                                        style={openingTagsStyle}
                                        options={[
                                            { value: "Main Store", label: "Main Store" },
                                            { value: "Secondary Store", label: "Secondary Store" },
                                        ]}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary"  readOnly={!isMaintainTagsChecked}
                                       style={{ backgroundColor: '#a36e29', borderColor: '#a36e29',marginLeft:'95%',marginTop:'15px',openingTagsStyle }}>
                                Add
                            </button>
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
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>
                                Save
                            </button>
                        </form>
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
