import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './StockEntry.css';
import InputField from "../../Masters/ItemMaster/Inputfield";

const StockEntry = () => {
    const [metal, setMetal] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div style={{ paddingTop: "79px" }}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        {/* Tab Navigation */}
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <form className="p-4 border rounded form-container-stockentry">
                            <div className="mb-4">
                                <h4>Stock Entry</h4>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <InputField
                                            label="Pricing:"
                                            type="select"
                                            value={metal}
                                            onChange={(e) => setMetal(e.target.value)}
                                            options={[
                                                { value: "By Weight", label: "By Weight" },
                                                { value: "By fixed", label: "By fixed" },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <InputField label="P ID:" />
                                    </div>
                                    <div className="col-md-4">
                                        <InputField label="Product Name:" />
                                    </div>
                                    <div className="col-md-3">
                                    <InputField label="Category:" value="Gold" readOnly />
                                    </div>
                                        {/* <InputField
                                            label="Category:"
                                            type="select"
                                            value={metal}
                                            onChange={(e) => setMetal(e.target.value)}
                                            options={[
                                                { value: "Silver", label: "Silver" },
                                                { value: "Gold", label: "Gold" },
                                            ]}
                                        /> */}
                                        
                                        <div className="col-md-3">
                                         <InputField label="Prefix:" value="Gold" readOnly />
                                    </div>
                                    <div className="col-md-3">
                                    <InputField
                                            label="purity:"
                                            type="select"
                                            value={metal}
                                            onChange={(e) => setMetal(e.target.value)}
                                            options={[
                                                { value: "916HM", label: "916HM" },
                                                { value: "22K", label: "22k" },
                                                { value: "18K", label: "18k" },
                                            ]}
                                        /> 
                                        
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="PCode/BarCode:" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="row g-3">
                                    <div className="col-md-2">
                                        <InputField label="Gross Weight:" />
                                    </div>
                                    <div className="col-md-2">
                                        <InputField label="Stones Weight:" />
                                    </div>
                                    <div className="col-md-2">
                                        <button
                                            type="button" style={{backgroundColor:'blue'}}
                                            className="btn btn-primary w-100"
                                            onClick={handleOpenModal}
                                        >
                                            Stone Details
                                        </button>
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Stones Price:" />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Weight WW:" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <InputField
                                            label="Wastage On:"
                                            type="select"
                                            value={metal}
                                            onChange={(e) => setMetal(e.target.value)}
                                            options={[{ value: "Weight", label: "Weight" }]}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Wastage:" value="NaN" readOnly />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="%:" />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Weight:" />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Making Charges:" />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Cal:" />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Tax:" />
                                    </div>
                                    <div className="col-md-3">
                                        <InputField label="Stock Point:" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal for Stone Details */}
            {showModal && (
               
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                    <div className="stockentrymodalformcontainer">
                        <div style={{backgroundColor:'#f9f9f9'}} className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Stone Details</h5>
                                <button
                                     type="button" 
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <InputField label="P Code:" />
                                    </div>
                                    <div className="col-md-6">
                                        <InputField label="Product Name:" />
                                    </div>
                                    <div className="col-md-6">
                                        <InputField label="Stone Name:" />
                                    </div>
                                    <div className="col-md-6">
                                        <InputField label="Weight:" />
                                    </div>
                                    <div className="col-md-6">
                                        <InputField label="Rate per Gram:" />
                                    </div>
                                    <div className="col-md-6">
                                        <InputField label="Total Weight:" />
                                    </div>
                                    <div className="col-md-6">
                                        <InputField label="Total Price:" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                                <button type="button" style={{backgroundColor:'blue'}} className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default StockEntry;
