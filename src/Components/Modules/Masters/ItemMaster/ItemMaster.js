import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ItemMaster.css";
import InputField from "./Inputfield";

const handleAddStockPoint = () => {
    alert("Add new stock point functionality!");
    // Implement the functionality to add a new stock point here
};
const FormWithTable = () => {

    const [metal, setMetal] = useState("");
    // const [type, setType] = useState("");
    // const [purity, setPurity] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div style={{ paddingTop: '90px' }}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        {/* Tab Navigation */}

                    </div>
                </div>

                <div className="row mt-3 itemmaster-form-container" >
                    <div className="col-12" style={{ marginTop: '-55px' }}>
                        {/* Form Section */}
                        <form className="form-container">


                            <div className="form-container">
                                <h4 style={{ marginBottom: '15px', }}>Product Details</h4>
                                <div className="form-row">
                                    <InputField label="Product Name:" />
                                    <InputField label="Rbarcode:" />
                                    <InputField
                                        label="Categories:"
                                        type="select"
                                        value={metal}
                                        onChange={(e) => setMetal(e.target.value)}
                                        options={[
                                            { value: "GOLD", label: "Gold" },
                                            { value: "SILVER", label: "Silver" },

                                        ]}
                                    />
                                    <InputField label="Item Prefix:" />
                                </div>


                                <div className="form-row" style={{ marginBottom: '-20px' }}>
                                    <InputField label="Short Name:" />
                                    <InputField
                                        label="Sale Account Head:"
                                        type="select"
                                        value={metal}
                                        onChange={(e) => setMetal(e.target.value)}
                                        options={[
                                            { value: "Sales", label: "Sales" },

                                        ]}
                                    />


                                    <InputField
                                        label="Purchase Account Head:"
                                        type="select"
                                        value={metal}
                                        onChange={(e) => setMetal(e.target.value)}
                                        options={[
                                            { value: "Purchase", label: "Purchase" },

                                        ]}
                                    />

                                    <InputField
                                        label="Status:"
                                        type="select"
                                        value={metal}
                                        onChange={(e) => setMetal(e.target.value)}
                                        options={[
                                            { value: "ACTIVE", label: "ACTIVE" },
                                            { value: "INACTIVE", label: "INACTIVE" },
                                        ]}
                                    />
                                    <InputField
                                        label="Tax Slab:"
                                        type="select"
                                        value={metal}
                                        onChange={(e) => setMetal(e.target.value)}
                                        options={[
                                            { value: "ACTIVE", label: "ACTIVE" },
                                            { value: "INACTIVE", label: "INACTIVE" },
                                        ]}
                                    />
                                    <InputField label="HSN Code:" />
                                </div>
                            </div>

                            <div className="form-container" style={{ marginTop: '15px' }}>
                                <div className="main-tags-row" style={{ marginBottom: '15px', }}>
                                    <input type="checkbox" id="main-tags" style={{ width: '35px' }} />
                                    <label htmlFor="main-tags">
                                        <h4>Maintain Tags</h4>
                                    </label>
                                </div>
                                <div className="form-row" style={{ marginBottom: '-20px' }}>
                                    <InputField label="OP.Qty:" />
                                    <InputField label="OP.Value:" />
                                    <InputField label="OP.Weight:" />
                                    <InputField
                                        label="Purity:"
                                        type="select"
                                        value={metal}
                                        onChange={(e) => setMetal(e.target.value)}
                                        options={[
                                            { value: "91.6HM", label: "91.6HM" },
                                            { value: "22K", label: "22k" },
                                            { value: "18K", label: "18k" },
                                        ]}
                                    />
                                    <InputField label="HUID No:" />
                                </div>
                            </div>


                            <div className="form-container" style={{ marginTop: '15px' }}>
                                <h4 style={{ marginBottom: '15px', }}>Stock Entry</h4>
                                <div className="form-row">
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
                                    <InputField label="P ID:" />
                                    <InputField label="Product Name:" />
                                    <InputField label="Category:" value="Gold" readOnly />
                                 
                                         <InputField label="Prefix:" value="Gold" readOnly />
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
                                    <InputField label="PCode/BarCode:" />
                                </div>
                                <div className="form-row">
                                    <InputField label="Gross Weight:" />
                                    <InputField label="Stones Weight:" />
                                    <button
                                        type="button" style={{ backgroundColor: 'blue' }}
                                        className="stone-details-btn"
                                        onClick={handleOpenModal}
                                    >
                                        Stone Details
                                    </button>
                                    <InputField label="Stones Price:" />
                                    {/* <button className="stone-details-btn">Stone Details</button> */}
                                    <InputField label="Weight WW:" />
                                </div>

                                <div className="form-row" style={{ marginBottom: '-20px' }}>
                                    <InputField
                                        label="Wastage On:"
                                        type="select"
                                        value={metal}
                                        onChange={(e) => setMetal(e.target.value)}
                                        options={[
                                            { value: "Weight", label: "Weight" },

                                        ]}
                                    />
                                    <InputField label="Wastage:" value="NaN" readOnly />
                                    <InputField label="%:" />
                                    <InputField label="Weight:" />
                                    <InputField label="Making Chaeges:" />
                                    <InputField label="Cal:" />
                                    <InputField label="Tax:" />
                                    <div style={{display:"flex"}}>
                                    <InputField
                                        label="Stock Point:"
                                        type="select"
                                        value={metal}
                                        onChange={(e) => setMetal(e.target.value)}
                                        options={[
                                            { value: "Main Store", label: "Main Store" },
                                            { value: "Secondary Store", label: "Secondary Store" },
                                        ]}
                                    />
                                    <button className="plusbutton"
                                        onClick={handleAddStockPoint}
                                        // style={{
                                        //     padding: "4px 8px",
                                        //     borderRadius: "50%",
                                        //     backgroundColor: "#007BFF",
                                        //     color: "white",
                                        //     border: "none",
                                        //     cursor: "pointer",
                                        //     fontSize: "14px",
                                        //     display: "flex",
                                        //     alignItems: "center",
                                        //     justifyContent: "center",
                                        //     height: "24px",
                                        //     width: "24px",
                                        // }}
                                        title="Add Stock Point"
                                    >
                                        +
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showModal && (


                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="product-stockentrymodalformcontainer">
                            <div style={{ backgroundColor: '#f9f9f9' }} className="modal-content">
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
                                    <button type="button" style={{ backgroundColor: 'blue' }} className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                      
                        <div className="itemmaster-container">
                        <h4 style={{marginBottom:'15px',}}>Product Details</h4>
                            <div className="form-row">
                                <InputField label="Product Name:" />
                                <InputField
                                    label="Categories:"
                                    type="select"
                                    value={metal}
                                    onChange={(e) => setMetal(e.target.value)}
                                    options={[
                                        { value: "GOLD", label: "Gold" },
                                        { value: "SILVER", label: "Silver" },

                                    ]}
                                />
                                <InputField label="Item Prefix:" />
                            </div>


                            <div className="form-row" style={{ marginBottom: '-20px' }}>
                                <InputField label="Short Name:" />
                                <InputField
                                    label="Sale Account Head:"
                                    type="select"
                                    value={metal}
                                    onChange={(e) => setMetal(e.target.value)}
                                    options={[
                                        { value: "Sales", label: "Sales" },

                                    ]}
                                />


                                <InputField
                                    label="Purchase Account Head:"
                                    type="select"
                                    value={metal}
                                    onChange={(e) => setMetal(e.target.value)}
                                    options={[
                                        { value: "Purchase", label: "Purchase" },

                                    ]}
                                />

                                <InputField
                                    label="Status:"
                                    type="select"
                                    value={metal}
                                    onChange={(e) => setMetal(e.target.value)}
                                    options={[
                                        { value: "ACTIVE", label: "ACTIVE" },
                                        { value: "INACTIVE", label: "INACTIVE" },
                                    ]}
                                />
                                <InputField
                                    label="Tax Slab:"
                                    type="select"
                                    value={metal}
                                    onChange={(e) => setMetal(e.target.value)}
                                    options={[
                                        { value: "ACTIVE", label: "ACTIVE" },
                                        { value: "INACTIVE", label: "INACTIVE" },
                                    ]}
                                />
                                <InputField label="HSN Code:" />
                            </div>
                        </div>
                       
                        <div className="itemmaster-container" style={{ marginTop: '15px' }}>
                        <div className="main-tags-row" style={{marginBottom:'15px',}}>
                            <input type="checkbox" id="main-tags" style={{width:'35px'}} />
                            <label htmlFor="main-tags">
                                <h4>Maintain Tags</h4>
                            </label>
                        </div>
                            <div className="form-row" style={{ marginBottom: '-20px' }}>
                                <InputField label="OP.Qty:" />
                                <InputField label="OP.Value:" />
                                <InputField label="OP.Weight:" />
                                <InputField label="Purity:" />
                                <InputField label="HUID No:" />
                            </div>
                        </div>

                        
                        <div className="itemmaster-container" style={{ marginTop: '15px' }}>
                        <h4 style={{marginBottom:'15px',}}>Stock Entry</h4>
                            <div className="form-row">
                                <InputField
                                    label="Pricing:"
                                    type="select"
                                    value={metal}
                                    onChange={(e) => setMetal(e.target.value)}
                                    options={[
                                        { value: "By Weight", label: "By Weight" },

                                    ]}
                                />
                                <InputField label="P ID:" />
                                <InputField label="Product Name:" />
                                <InputField
                                    label="Category:"
                                    type="select"
                                    value={metal}
                                    onChange={(e) => setMetal(e.target.value)}
                                    options={[
                                        { value: "Silver", label: "Silver" },
                                        { value: "Gold", label: "Gold" },
                                    ]}
                                />
                                <InputField label="PCode/BarCode:" />
                            </div>
                            <div className="form-row">
                                <InputField label="Gross Weight:" />
                                <InputField label="Stones Weight:" />
                                <button
                                            type="button" style={{backgroundColor:'blue'}}
                                            className="stone-details-btn"
                                            onClick={handleOpenModal}
                                        >
                                            Stone Details
                                        </button>
                                <InputField label="Stones Price:" />
                                {/* <button className="stone-details-btn">Stone Details</button> */}
                                <InputField label="Weight WW:" />
                            </div>

                            <div className="form-row" style={{ marginBottom: '-20px' }}>
                                <InputField
                                    label="Wastage On:"
                                    type="select"
                                    value={metal}
                                    onChange={(e) => setMetal(e.target.value)}
                                    options={[
                                        { value: "Weight", label: "Weight" },

                                    ]}
                                />
                                <InputField label="Wastage:" value="NaN" readOnly />
                                <InputField label="%:" />
                                <InputField label="Weight:" />
                                <InputField label="Making Chaeges:" />
                                <InputField label="Cal:" />
                                <InputField label="Tax:" />
                                <InputField label="Stack Point:" />
                            </div>
                        </div>
                   

                </div>
            )}
        </div>
    );
};

export default FormWithTable;
