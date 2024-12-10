import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ItemMaster.css";
import InputField from "./Inputfield";
import StoneDetailsModal from "../../Transactions/StockEntry/StoneDetailsModal";
import { useNavigate } from "react-router-dom";

const FormWithTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [isTagsMaintained, setIsTagsMaintained] = useState(false);
    const [formData, setFormData] = useState({
        opqty: "",
        opvalue: "",
        opweight: "",
        huidno: "",
        pricing: "",
        tagid: "",
        purity: "",
    });

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = () => {
        setIsTagsMaintained((prev) => !prev);
    };

    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/itemmastertable");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic
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
                    <div className="col-12" style={{ marginTop: "-55px" }}>
                        {/* Form Section */}
                        <form className="itemmaster-main-container" onSubmit={handleSubmit}>
                            <div className="form-container" style={{ marginTop: "15px" }}>
                                <div className="main-tags-row" style={{ marginBottom: "15px" }}>
                                    <input
                                        type="checkbox"
                                        id="main-tags"
                                        style={{ width: "35px" }}
                                        checked={isTagsMaintained}
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
                                        disabled={isTagsMaintained}
                                    />
                                    <InputField
                                        label="OP.Value:"
                                        name="opvalue"
                                        value={formData.opvalue}
                                        onChange={handleChange}
                                        disabled={isTagsMaintained}
                                    />
                                    <InputField
                                        label="OP.Weight:"
                                        name="opweight"
                                        value={formData.opweight}
                                        onChange={handleChange}
                                        disabled={isTagsMaintained}
                                    />
                                    <InputField
                                        label="HUID No:"
                                        name="huidno"
                                        value={formData.huidno}
                                        onChange={handleChange}
                                        disabled={isTagsMaintained}
                                    />
                                </div>
                            </div>
                            <div className="form-container" style={{ marginTop: "15px" }}>
                                <h4 style={{ marginBottom: "15px" }}>Opening Tags Entry</h4>
                                <div className="form-row">
                                    <InputField
                                        label="Pricing:"
                                        type="select"
                                        name="pricing"
                                        value={formData.pricing}
                                        onChange={handleChange}
                                        disabled={!isTagsMaintained}
                                        options={[
                                            { value: "By Weight", label: "By Weight" },
                                            { value: "By Fixed", label: "By Fixed" },
                                        ]}
                                    />
                                    <InputField
                                        label="Tag ID:"
                                        name="tagid"
                                        value={formData.tagid}
                                        onChange={handleChange}
                                        disabled={!isTagsMaintained}
                                    />
                                    <InputField label="Prefix:" value="Gold" readOnly disabled={!isTagsMaintained} />
                                    <InputField
                                        label="Purity:"
                                        type="select"
                                        name="purity"
                                        value={formData.purity}
                                        onChange={handleChange}
                                        disabled={!isTagsMaintained}
                                        options={[
                                            { value: "916HM", label: "916HM" },
                                            { value: "22K", label: "22K" },
                                            { value: "18K", label: "18K" },
                                        ]}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{
                                        backgroundColor: "#a36e29",
                                        borderColor: "#a36e29",
                                        marginLeft: "95%",
                                        marginTop: "15px",
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                            <button
                                type="button"
                                className="cus-back-btn"
                                variant="secondary"
                                onClick={handleBack}
                                style={{
                                    backgroundColor: "gray",
                                    marginRight: "10px",
                                    marginTop: "10px",
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    backgroundColor: "#a36e29",
                                    borderColor: "#a36e29",
                                }}
                            >
                                Save
                            </button>
                        </form>
                        <StoneDetailsModal showModal={showModal} handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormWithTable;
