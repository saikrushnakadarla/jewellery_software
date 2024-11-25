import React from "react";
import "./Repairs.css";
import InputField from "../../../Pages/InputField/InputField";

const RepairForm = () => {
  return (
    <div className="repair-form-container">
      <h2>Repair Form</h2>
      <form className="repair-form">
        {/* First Row */}
        <div className="form-row">
          <InputField label="Entry Type:" value="REPAIR" readOnly />
          <InputField label="Receipt No:" />
          <InputField label="Date:" type="date" />
        </div>

        {/* Customer Details */}
        <div className="form-section">
          <h3>Customer Details</h3>
          <div className="form-row">
            <InputField label="Name:" />
            <InputField label="Mobile:" />
            <InputField label="Phone:" />
          </div>
          <div className="form-row">
            <InputField label="Email:" type="email" />
            <InputField label="Address1:" />
            <InputField label="Address2:" />
          </div>
          <div className="form-row">
            <InputField label="Address3:" />
            <InputField label="Place:" />
          </div>
        </div>

        {/* Staff and Delivery Info */}
        <div className="form-section">
          <div className="form-row">
            <InputField label="Staff:" />
            <InputField label="Delivery Date:" type="date" />
            <div className="input-wrapper">
              <label>Metal:</label>
              <select>
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
                <option value="PLATINUM">Platinum</option>
              </select>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="form-section">
          <div className="form-row">
            <InputField label="Counter:" placeholder="Counter Name" />
          </div>
        </div>

        {/* Repair Item Details */}
        <div className="form-section">
          <h3>Repair Item Details</h3>
          <div className="form-row">
            <div className="input-wrapper">
              <label>Type:</label>
              <select>
                <option value="ORDER PURPOSE">Order Purpose</option>
                <option value="REPAIR PURPOSE">Repair Purpose</option>
              </select>
            </div>
            <InputField label="Item:" placeholder="Item Name" />
            <InputField label="Tag No:" />
          </div>
          <div className="form-row">
            <div className="input-wrapper">
              <label>Purity:</label>
              <select>
                <option value="916HM">916HM</option>
                <option value="22K">22K</option>
                <option value="18K">18K</option>
              </select>
            </div>
            <InputField label="Description:" placeholder="Description" />
          </div>
        </div>

        {/* Extra Charges */}
        <div className="form-section">
          <h3>Extra Charges</h3>
          <div className="form-row">
            <InputField label="Extra Weight:" />
            <InputField label="Stone Value:" />
            <InputField label="Making Charge (MC):" />
          </div>
          <div className="form-row">
            <InputField label="Handling Charge (HC):" />
          </div>
        </div>

        {/* Buttons */}
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
