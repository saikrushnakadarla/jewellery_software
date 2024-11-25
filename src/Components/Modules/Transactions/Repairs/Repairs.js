import React from "react";
import "./Repairs.css";
import InputField from "../../../Pages/InputField/InputField";

const RepairForm = () => {
  return (
    <div className="repair-form-container">
      <h2>Repair Form</h2>
      <form className="repair-form">
        <div className="form-section">
          <InputField label="Entry Type:" value="REPAIR" readOnly />
          <InputField label="Receipt No:" />
          <InputField label="Date:" type="date" />
        </div>

        <div className="form-section">
          <InputField label="Receipt No:" />
        </div>

        <div className="form-section">
          <InputField label="Date:" type="date" />
        </div>

        <div className="form-section">
          <h3>Customer Details</h3>
          <InputField label="Name:" />
          <InputField label="Mobile:" />
          <InputField label="Phone:" />
          <InputField label="Email:" type="email" />
          <InputField label="Address1:" />
          <InputField label="Address2:" />
          <InputField label="Address3:" />
          <InputField label="Place:" />
        </div>

        <div className="form-section">
          <InputField label="Staff:" />
          <InputField label="Delivery Date:" type="date" />
          <div className="form-subsection">
            <label>Metal:</label>
            <select>
              <option value="GOLD">Gold</option>
              <option value="SILVER">Silver</option>
              <option value="PLATINUM">Platinum</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <InputField label="Counter:" placeholder="Counter Name" />
        </div>

        <div className="form-section">
          <h3>Repair Item Details</h3>
          <div className="form-subsection">
            <label>Type:</label>
            <select>
              <option value="ORDER PURPOSE">Order Purpose</option>
              <option value="REPAIR PURPOSE">Repair Purpose</option>
            </select>
          </div>
          <InputField label="Item:" placeholder="Item Name" />
          <InputField label="Tag No:" />
          <div className="form-subsection">
            <label>Purity:</label>
            <select>
              <option value="916HM">916HM</option>
              <option value="22K">22K</option>
              <option value="18K">18K</option>
            </select>
          </div>
          <InputField label="Description:" placeholder="Description" />
        </div>

        <div className="form-section">
          <h3>Extra Charges</h3>
          <InputField label="Extra Weight:" />
          <InputField label="Stone Value:" />
          <InputField label="Making Charge (MC):" />
          <InputField label="Handling Charge (HC):" />
        </div>

        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button">Print</button>
          <button type="button">New</button>
        </div>
      </form>
    </div>
  );
};

export default RepairForm;
