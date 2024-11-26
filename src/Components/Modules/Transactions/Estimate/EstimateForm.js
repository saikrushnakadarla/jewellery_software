import React, { useState } from "react";
import "./Estimate.css";
import InputField from "../../../Pages/InputField/InputField";

const RepairForm = () => {

  
  return (
    <div className="estimate-form-container">
      {/* Repair Item Details */}
      <div className="form-section">
          <h4>Estimate</h4>
          <div className="form-row">
          <div className="input-third"> 
            <InputField label="PCODE:" placeholder="PCODE"/>
            </div>
            <div className="input-half"> 
            <InputField label="Product Name:" />
            </div>
            <div className="input-twenty"> 
                <InputField label="Gross Weight:" />
            </div>
            <div className="input-twenty"> 
                <InputField label="Stones Weight:" />
            </div>
            <div className="input-twenty"> 
                <InputField label="Stones Price:" />
            </div>
            <div className="input-twenty"> 
                <InputField label="Weight WW:" />
            </div>
            <div className="input-tenth"> 
            <div className="input-with-suffix">
                <InputField label="Wastage:" />
                <span className="suffix">%</span>
            </div>
            </div>            
            <div className="input-twenty"> 
                <InputField label="Wastage:" />
            </div>
            <div className="input-twenty"> 
                <InputField label="Nett Weight:" />
            </div>
            <div className="input-twenty">
                <InputField label="Rate AV:" />
            </div>
            <div className="input-twenty">
                <InputField label="Rate/10Gms:" />
            </div>
            <div className="input-twenty">
                <InputField label="Rate/1Gms:" />
            </div>
            <div className="input-twenty">
            <InputField label="MC Per Gram:" />
            </div>
            <div className="input-twenty">
            <InputField label="Total B4 Tax" />
            </div>
            <div className="input-twenty">
            <InputField label="Total MC" />
            </div>
            <div className="input-tenth">
            <InputField label="Tax %" />
            </div>
            <div className="input-twenty">
            <InputField label="Tax VAT Amount" />
            </div>
            <div className="input-third">
            <InputField label="Total Rs." />
            </div>
          </div>
         
        </div>

        

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button">Print</button>
        </div>
      </div>
  );
};

export default RepairForm;
