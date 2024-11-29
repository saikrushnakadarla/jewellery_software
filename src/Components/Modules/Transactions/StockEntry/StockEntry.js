import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './StockEntry.css';
import InputField from "../../Masters/ItemMaster/Inputfield";

const handleAddStockPoint = () => {
    alert("Add new stock point functionality!");
    // Implement the functionality to add a new stock point here
};
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

                                        <InputField
                                            label="P ID:"
                                            type="select"
                                            value={metal}
                                            onChange={(e) => setMetal(e.target.value)}
                                            options={[
                                                { value: "PR001", label: "PR001" },
                                                { value: "PR002", label: "PR002" },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-md-4">

                                        <InputField
                                            label="Product Name:"
                                            type="select"
                                            value={metal}
                                            onChange={(e) => setMetal(e.target.value)}
                                            options={[
                                                { value: "product1", label: "product1" },
                                                { value: "product2", label: "product2" },
                                            ]}
                                        />
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
                                            type="button" style={{ backgroundColor: 'blue' }}
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
                                        <InputField
                                            label="Stock Point:"
                                            type="select"
                                            value={metal}
                                            onChange={(e) => setMetal(e.target.value)}
                                            options={[
                                                { value: "Main Store", label: "Main Store" },
                                                { value: "Secondary Store", label: "Secondary Store" },
                                            ]}
                                        /> <button className="plusbutton"
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

            {/* Modal for Stone Details */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        {/* Increased modal width using `modal-lg` */}
                        <div className="stockentrymodalformcontainer">
                            <div className="modal-content bg-light">
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
                                    <div className="row g-3" style={{backgroundColor:'rgba(163, 110, 41, 0.08)'}}>
                                        <div className="col-md-4">
                                            <InputField label="P Code:" />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label="Product Name:" />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label="Stone Name:" />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label="Weight:" />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label="Rate per Gram:" />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label="Total Weight:" />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField label="Total Price:" />
                                        </div>
                                        <div className="col-md-4">
                                            <button type="button" className="btn btn-primary">
                                                Save
                                            </button>
                                        </div>

                                    </div>

                                    {/* Table Section */}
                                    <div className="mt-4">
                                        <h6 className="fw-bold">Stone List</h6>
                                        {/* Use a scrollable container to ensure the table fits */}
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered table-hover">
                                                <thead className="table-secondary">
                                                    <tr>
                                                        <th>P Code</th>
                                                        <th>Product Name</th>
                                                        <th>Stone Name</th>
                                                        <th>Weight</th>
                                                        <th>Rate/Gram</th>
                                                        <th>Total Weight</th>
                                                        <th>Total Price</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Example Row 1 */}
                                                    <tr>
                                                        <td>P001</td>
                                                        <td>Product A</td>
                                                        <td>Diamond</td>
                                                        <td>5g</td>
                                                        <td>$500</td>
                                                        <td>5g</td>
                                                        <td>$2500</td>
                                                        <td>
                                                            <button className="btn btn-primary btn-sm me-2">Edit</button>
                                                            <button className="btn btn-danger btn-sm">Delete</button>
                                                        </td>
                                                    </tr>
                                                    {/* Example Row 2 */}
                                                    <tr>
                                                        <td>P002</td>
                                                        <td>Product B</td>
                                                        <td>Ruby</td>
                                                        <td>3g</td>
                                                        <td>$300</td>
                                                        <td>3g</td>
                                                        <td>$900</td>
                                                        <td>
                                                            <button className="btn btn-primary btn-sm me-2">Edit</button>
                                                            <button className="btn btn-danger btn-sm">Delete</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
                                    <button type="button" className="btn btn-primary">
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
