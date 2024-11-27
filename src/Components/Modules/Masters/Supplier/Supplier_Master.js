import React, { useState } from 'react';
import InputField from '../../../Pages/InputField/InputField';

function Supplier_Master() {
  const [formData, setFormData] = useState({
    customerName: '',
    printName: '',
    accountGroup: '',
    pincode: '',
    state: '',
    stateCode: '',
    phone: '',
    mobile: '',
    email: '',
    birthday: '',
    anniversary: '',
    bankAccountNo: '',
    bankName: '',
    ifscCode: '',
    branch: '',
    gstIN: '',
    aadharCard: '',
    panCard: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [tcsApplicable, setTcsApplicable] = useState(false);

  const handleCheckboxChange = () => {
    setTcsApplicable(!tcsApplicable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };
  const [metal, setMetal] = useState("");

  return (
    <div className="main-container">
    <div className="customer-master-container">
      <h2>Suppliers</h2>
      <form className="customer-master-form" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="form-row">


          <div className="">
            <div className="form-row">
              <InputField label="Customer Name:" />
              <InputField label="Print Name:" />
              <InputField
                label="Account Group:"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "Individual", label: "Individual" },
                  { value: "Corporate", label: "Corporate" },

                  { value: "Vendor", label: "Vendor" },
                  { value: "Customer", label: "Customer" },


                ]}
              />
               <InputField label="Pincode:" />
            </div>
          </div>
          
         
        </div>

        {/* Row 2 */}
        <div className="form-row">

          <div className="">
            <div className="form-row">
             
              <InputField
                label="State:"
                type="select"
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                options={[
                  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
                  { value: "Bihar", label: "Bihar" },

                  { value: "Delhi", label: "Delhi" },
                  { value: "Goa", label: "Goa" },
                  { value: "Maharashtra", label: "Maharashtra" },
                  { value: "Tamil Nadu", label: "Tamil Nadu" },
                  { value: "West Bengal", label: "West Bengal" },



                ]}
              />
              <InputField label="State Code:" type="State Code:" />
              <InputField label="Phone:" />
              <InputField label="Mobile:" />
            </div>
          </div>
         
        </div>

        {/* Row 3 */}
        <div className="form-row">

          <div className="">
            <div className="form-row">
              
              <InputField label="Email:" />
              <InputField label="Birthday :" type="date"/>
              <InputField label="Anniversary :" type="date"/>
              <InputField label="Bank Account No :" />
            </div>
          </div>
        
        </div>

        {/* Row 4 */}
        {/* <div className="form-row">


          <div className="">
            <div className="form-row">
              
            </div>
          </div>
         
        </div> */}

        {/* Row 5 */}
        <div className="form-row">

          <div className="">
            <div className="form-row">
              <InputField label="Bank Name :" />
              <InputField label="IFSC Code :" />
              <InputField label="Branch :" />
              <InputField label="GSTIN :" />
            </div>
          </div>
         
        </div>

        {/* Row 6 */}
        <div className="form-row">

          <div className="">
            <div className="form-row">
              
              <InputField label="Aadhar Card :" />
              <InputField label="PAN Card :" />
            </div>
          </div>

         
        </div>


        <div className="form-group">
          <label className="checkbox-label" htmlFor="tcs">
            <input 
              type="checkbox" 
              id="tcs" 
              name="tcs" 
              className="checkbox-input" 
              checked={tcsApplicable} 
              onChange={handleCheckboxChange} 
            />
            TCS Applicable
          </label>
        </div>

        <button type="submit" className="cus-submit-btn">Save</button>

      </form>
    </div>
    </div>
  );
}

export default Supplier_Master;
