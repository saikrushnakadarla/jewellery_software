import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ItemMaster.css";
import InputField from "./Inputfield";


const FormWithTable = () => {

    const [metal, setMetal] = useState("");
    // const [type, setType] = useState("");
    // const [purity, setPurity] = useState("");

    return (
        <div style={{paddingTop:'45px'}}>
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
                       
                        <div className="form-container" style={{ marginTop: '15px' }}>
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

                        
                        <div className="form-container" style={{ marginTop: '15px' }}>
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
                                <InputField label="Stones Price:" />
                                <button className="stone-details-btn">Stone Details</button>
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
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default FormWithTable;
