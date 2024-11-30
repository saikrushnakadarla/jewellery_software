import React from "react";
import InputField from "../../Masters/ItemMaster/Inputfield";

const StoneDetailsForm = () => {
  return (
    <div className="modal-body">
      <div className="row g-3" style={{ backgroundColor: 'rgba(163, 110, 41, 0.08)' }}>
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
  );
};

export default StoneDetailsForm;
