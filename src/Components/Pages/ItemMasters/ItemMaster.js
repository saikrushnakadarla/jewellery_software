import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ItemMaster.css";

const FormWithTable = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    {/* Tab Navigation */}

                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12">
                    {/* Form Section */}
                    <form className="form-container">
                        
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="purity" className="form-label">
                                    Product Name
                                </label>
                                <input type="text" className="form-control" id="purity" placeholder="916HM" />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="sizeLen" className="form-label">
                                    Categories
                                </label>
                                <select className="form-select" id="sizeLen">
                                    <option value="">Select</option>
                                    <option value="silver">Silver</option>
                                    <option value="gold">Gold</option>
                                </select>
                            </div>


                            <div className="col-md-4 mb-3">
                                <label htmlFor="rate" className="form-label">
                                    Item Prefix
                                </label>
                                <input type="text" className="form-control" id="rate" placeholder="7120.00" />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="mcgm" className="form-label">
                                    Short Name
                                </label>
                                <input type="text" className="form-control" id="mcgm" placeholder="" />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="rhodiumStone" className="form-label">
                                    Sale Account Head
                                </label>
                                <select className="form-select" id="sizeLen">
                                    <option value="">Select</option>
                                    <option value="silver">Sales</option>
                                  
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="tag" className="form-label">
                                    Purchase Account Head
                                </label>
                                <select className="form-select" id="sizeLen">
                                    <option value="">Select</option>
                                    <option value="silver">Purchase</option>
                                   
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="ochc" className="form-label">
                                    Status
                                </label>
                                <select className="form-select" id="sizeLen">
                                    <option value="">Select</option>
                                    <option value="silver">ACTIVE</option>
                                    <option value="gold">INACTIVE</option>
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="tvalue" className="form-label">
                                    Tax Slab
                                </label>
                                <select className="form-select" id="sizeLen">
                                    <option value="">Select</option>
                                    <option value="silver">ACTIVE</option>
                                    <option value="gold">INACTIVE</option>
                                </select>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="status" className="form-label">
                                    HSN Code
                                </label>
                                <input type="text" className="form-control" id="status" placeholder="Normal" />
                            </div>




                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormWithTable;
