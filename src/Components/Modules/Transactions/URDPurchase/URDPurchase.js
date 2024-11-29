import React, { useState } from "react";
import "./URDPurchase.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";

const URDPurchase = () => {

    const [metal, setMetal] = useState("");
    const [type, setType] = useState("");
    const [purity, setPurity] = useState("");
    const [product, setProduct] = useState("");
    const [hsnCode, setHsnCode] = useState("");
    const [stoneType, setStoneType] = useState("");
    const [stoneType2, setStoneType2] = useState("");
    const [isChecked, setIsChecked] = useState("");
  return (
    <div className="main-container">
    <div className="urdpurchase-form-container">
        <form className="urdpurchase-form">
        {/* Left Section */}
        <div className="urdpurchase-form-left">
          {/* Customer Details */}
          <div className="urd-form-section">
            <h4 className="mb-2">Customer Details</h4>
            <div className="urd-form-row">
              <InputField label="Name:" />
              <InputField label="Mobile:" />
              <InputField label="Pin:" />
              {/* <InputField label="Email:" type="email" /> */}
            </div>
            <div className="urd-form-row">
              <InputField label="Address1:" />
              <InputField label="Address2:" />
              <InputField label="Aadhar:" />
            </div>
            <div className="urd-form-row">
            <InputField label="Staff:" />
            <InputField
              label="Type:"
              type="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "EXCHANGE", label: "Exchange" },
                { value: "PURCHASE", label: "Purchase" },
                { value: "REPAIR", label: "Repair" },
                { value: "RETURN", label: "Return" },
                
              ]}
            />
              
            </div>
            
          </div> 
        </div>
        {/* Right Section */}
        <div className="urdpurchase-form-right">
          <div className="urd-form-section">
          
            <div className="urd-form-row mt-4">
            <InputField label="Entry Type:" value="REPAIR" readOnly />
            </div>
            <div className="urd-form-row">
            <InputField label="Code:" />
            </div>
            <div className="urd-form-row">
            <InputField label="Date:" type="date" />
            </div>
          </div>
        </div>
      </form>
       
        <div className="urd-form-section">
        <h4>Purchase Details</h4> 
          <div className="urd-form-row">
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

<InputField
              label="Purity:"
              type="select"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              options={[
                { value: "24K", label: "24K" },
                { value: "22K", label: "22K (916)" },
                { value: "22KHM", label: "22K (916HM)" },
                { value: "18K", label: "18K (750)" },
                { value: "14K", label: "14K (585)" },
                { value: "10K", label: "10K (417)" },
                { value: "9K", label: "9K (375)" },
              ]}
            />


<InputField
              label="Product:"
              type="select"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              options={[
                { value: "PRODUCT1", label: "Product1" },
                { value: "PRODUCT2", label: "Product2" },
                { value: "PRODUCT3", label: "Product3" },
                { value: "PRODUCT4", label: "Product4" },
               
              ]}
            />

<InputField label="Item:" />

<InputField
              label="HSN Code:"
              type="select"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
              options={[
                { value: "HSNCODE1", label: "HsnCode1" },
                { value: "HSNCODE2", label: "HsnCode2" },
                { value: "HSNCODE3", label: "HsnCode3" },
                { value: "HSNCODE4", label: "HsnCode4" },
               
              ]}
            />
             
          </div>
          
       
        
        {/* Repair Item Details */}
        
          {/* <h4>Repair Item Details</h4> */}
          <div className="urd-form-row">
            <InputField label="Gross:"  />
            <InputField label="Dust:" />
            <InputField label="Touch %:" />
            <InputField label="ML %:" />
            <InputField label="Eqv WT:" />
            <InputField label="Remarks:" />
            <InputField label="Rate:" />
            <InputField label="value:" />
            
          </div>
          <div className="urd-form-row">
            <InputField
              label="Stone Type:"
              type="select"
              value={stoneType}
              onChange={(e) => setStoneType(e.target.value)}
              options={[
                { value: "STONETYPE1", label: "StoneType1" },
                { value: "STONETYPE2", label: "StoneType2" },
                { value: "STONETYPE3", label: "StoneType3" },
              ]}
            />
              <InputField label="Pieces:" />
              <InputField label="Gms/CT:" />
              <InputField label="Rate:" />
              <InputField label="Stn Amt:" />


              <div className="form-checkbox">
    <label>
      <input
        type="checkbox"
        value={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      &nbsp; Hall Mark
    </label>
  </div>
            </div>
            <div className="urd-form-row">
            <InputField
             
              type="select"
              value={stoneType2}
              onChange={(e) => setStoneType2(e.target.value)}
              options={[
                { value: "STONETYPE1", label: "StoneType1" },
                { value: "STONETYPE2", label: "StoneType2" },
                { value: "STONETYPE3", label: "StoneType3" },
              ]}
            />
              <InputField  />
              <InputField />
              <InputField />
              <InputField  />


              <div className="form-add-button">
  <button 
    type="button" 
    className="btn-primary" 
    onClick={() => {
      // Add your functionality here
      console.log("Add button clicked");
    }}
  >
    Add
  </button>
</div>

            </div>

            </div>
            
          
       

        {/* Extra Charges */}
        <div className="urd-form-section">
          <h4>Item Details</h4>
          
          <table className="item-details-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Item</th>
                <th>WT</th>
                <th>Dust</th>
                <th>Purity</th>
                <th>Touch%</th>
                <th>ML%</th>
                <th>Eqv WT</th>
                <th>Rate</th>
                <th>HSN</th>
                <th>Stone</th>
                <th>CT</th>
                <th>PCS</th>
                <th>Stone Value</th>
                <th>M.Value</th>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <td>1</td>
                <td>Sample Item</td>
                <td>10</td>
                <td>0.5</td>
                <td>22K</td>
                <td>95%</td>
                <td>2%</td>
                <td>9.5</td>
                <td>4500</td>
                <td>HSN1234</td>
                <td>Ruby</td>
                <td>0.2</td>
                <td>5</td>
                <td>500</td>
                <td>50</td>
              </tr>
              
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <Button type="submit" variant="success">Save</Button>
          <Button type="submit" variant="secondary">cancel</Button>
          <Button type="submit" variant="primary">Print</Button>
        </div>
     
    </div>
    </div>
  );
};

export default URDPurchase;
