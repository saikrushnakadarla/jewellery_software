import React, { useState } from "react";
import "./Repairs.css";
import InputField from "../../../Pages/InputField/InputField";

const RepairForm = () => {
  const [metal, setMetal] = useState("");
  const [type, setType] = useState("");
  const [purity, setPurity] = useState("");

  return (
    <div className="main-container">
    <div className="repair-form-container">
      <form className="repair-form">
        {/* Left Section */}
        <div className="repair-form-left">
          {/* Customer Details */}
          <div className="form-section">
            <h4 className="mb-2">Customer Details</h4>
            <div className="form-row">
              <InputField label="Name:" />
              <InputField label="Mobile:" />
              {/* <InputField label="Phone:" /> */}
              <InputField label="Email:" type="email" />
            </div>
            <div className="form-row">
              <InputField label="Address1:" />
              <InputField label="Address2:" />
              <InputField label="Address3:" />
            </div>
            <div className="form-row">
            <InputField label="Staff:" />
            <InputField label="Delivery Date:" type="date" />
            <InputField label="Place:" />
            <InputField
                label="Metal:"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "GOLD", label: "Gold" },
                  { value: "SILVER", label: "Silver" },
                  { value: "PLATINUM", label: "Platinum" },
                ]}
              />
              <InputField label="Counter:" placeholder="Counter Name" />
            </div>
            
          </div> 
        </div>
        {/* Right Section */}
        <div className="repair-form-right">
          <div className="form-section">
          
            <div className="form-row mt-4">
            <InputField label="Entry Type:" value="REPAIR" readOnly />
            </div>
            <div className="form-row">
            <InputField label="Receipt No:" />
            </div>
            <div className="form-row">
            <InputField label="Date:" type="date" />
            </div>
          </div>
        </div>
      </form>

      {/* Repair Item Details */}
      <div className="form-section">
          <h4>Repair Item Details</h4>
          <div className="form-row">
            <div className="input-wrapper">             
              <InputField
              label="Type:"
              type="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "ORDER PURPOSE", label: "Order Purpose" },
                { value: "REPAIR PURPOSE", label: "Repair Purpose" },
              ]}
            />
            </div>
            <InputField label="Item:" placeholder="Item Name" />
            <InputField label="Tag No:" />
            <InputField label="Description:" placeholder="Description" />
            <InputField
              label="Purity:"
              type="select"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              options={[
                { value: "916HM", label: "916HM" },
                { value: "22K", label: "22K" },
                { value: "18K", label: "18K" },
              ]}
            />
          </div>
          
        </div>

        {/* Extra Charges */}
        <div className="form-section">
          <h4>Extra Charges</h4>
          <div className="form-row">
            <InputField label="Extra Weight:" />
            <InputField label="Stone Value:" />
            <InputField label="Making Charge (MC):" />
            <InputField label="Handling Charge (HC):" />
            <InputField label="Total:" />
          </div>
          
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button">Print</button>
        </div>
      </div>
      </div>
  );
};

export default RepairForm;
