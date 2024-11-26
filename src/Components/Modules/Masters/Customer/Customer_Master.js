import React, { useState } from 'react';
import './Customer_Master.css';
import InputField from '../../../Pages/InputField/InputField';

function Customer_Master() {
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
      <h2>Customer Master Form</h2>
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

          {/* <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div> */}
          {/* <div className="form-group">
            <label>Print Name:</label>
            <input
              type="text"
              name="printName"
              value={formData.printName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Account Group:</label>
            <select
              name="accountGroup"
              value={formData.accountGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Account Group</option>
              <option value="Individual">Individual</option>
              <option value="Corporate">Corporate</option>
              <option value="Vendor">Vendor</option>
              <option value="Customer">Customer</option>
            </select>
          </div> */}
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
          {/* <div className="form-group">
            <label>Pincode:</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>State:</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Delhi">Delhi</option>
              <option value="Goa">Goa</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div className="form-group">
            <label>State Code:</label>
            <input
              type="text"
              name="stateCode"
              value={formData.stateCode}
              onChange={handleChange}
              required
            />
          </div> */}
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
          {/* <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div> */}
        </div>

        {/* Row 4 */}
        <div className="form-row">


          {/* <div className="">
            <div className="form-row">
              
            </div>
          </div> */}
          {/* <div className="form-group">
            <label>Birthday:</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Anniversary:</label>
            <input
              type="date"
              name="anniversary"
              value={formData.anniversary}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bank Account No:</label>
            <input
              type="text"
              name="bankAccountNo"
              value={formData.bankAccountNo}
              onChange={handleChange}
            />
          </div> */}
        </div>

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
          {/* <div className="form-group">
            <label>Bank Name:</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>IFSC Code:</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Branch:</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            />
          </div> */}
        </div>

        {/* Row 6 */}
        <div className="form-row">

          <div className="">
            <div className="form-row">
              
              <InputField label="Aadhar Card :" />
              <InputField label="PAN Card :" />
            </div>
          </div>

          {/* <div className="form-group">
            <label>GSTIN:</label>
            <input
              type="text"
              name="gstIN"
              value={formData.gstIN}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Aadhar Card:</label>
            <input
              type="text"
              name="aadharCard"
              value={formData.aadharCard}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>PAN Card:</label>
            <input
              type="text"
              name="panCard"
              value={formData.panCard}
              onChange={handleChange}
            />
          </div> */}
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

export default Customer_Master;
