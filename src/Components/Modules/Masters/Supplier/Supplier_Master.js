// import React, { useState } from 'react';
// import InputField from '../../../Pages/InputField/InputField';

// function Supplier_Master() {
//   const [formData, setFormData] = useState({
//     customerName: '',
//     printName: '',
//     accountGroup: '',
//     pincode: '',
//     state: '',
//     stateCode: '',
//     phone: '',
//     mobile: '',
//     email: '',
//     birthday: '',
//     anniversary: '',
//     bankAccountNo: '',
//     bankName: '',
//     ifscCode: '',
//     branch: '',
//     gstIN: '',
//     aadharCard: '',
//     panCard: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const [tcsApplicable, setTcsApplicable] = useState(false);

//   const handleCheckboxChange = () => {
//     setTcsApplicable(!tcsApplicable);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//   };
//   const [metal, setMetal] = useState("");

//   return (
//     <div className="main-container">
//     <div className="customer-master-container">
//       <h2  style={{color:'#A26D2B'}} >Suppliers</h2>
//       <form className="customer-master-form" onSubmit={handleSubmit}>
//         {/* Row 1 */}
//         <div className="form-row">


//           <div className="">
//             <div className="form-row">
//               <InputField label="Customer Name:" />
//               <InputField label="Print Name:" />
//               <InputField
//                 label="Account Group:"
//                 type="select"
//                 value={metal}
//                 onChange={(e) => setMetal(e.target.value)}
//                 options={[
//                   { value: "Individual", label: "Individual" },
//                   { value: "Corporate", label: "Corporate" },

//                   { value: "Vendor", label: "Vendor" },
//                   { value: "Customer", label: "Customer" },
//                 ]}
//               />
//                <InputField label="Pincode:" />
//             </div>
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="">
//             <div className="form-row">

//               <InputField
//                 label="State:"
//                 type="select"
//                 value={metal}
//                 onChange={(e) => setMetal(e.target.value)}
//                 options={[
//                   { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//                   { value: "Bihar", label: "Bihar" },

//                   { value: "Delhi", label: "Delhi" },
//                   { value: "Goa", label: "Goa" },
//                   { value: "Maharashtra", label: "Maharashtra" },
//                   { value: "Tamil Nadu", label: "Tamil Nadu" },
//                   { value: "West Bengal", label: "West Bengal" },



//                 ]}
//               />
//               <InputField label="State Code:" type="State Code:" />
//               <InputField label="Phone:" />
//               <InputField label="Mobile:" />
//             </div>
//           </div>

//         </div>

//         {/* Row 3 */}
//         <div className="form-row">

//           <div className="">
//             <div className="form-row">

//               <InputField label="Email:" />
//               <InputField label="Birthday :" type="date"/>
//               <InputField label="Anniversary :" type="date"/>
//               <InputField label="Bank Account No :" />
//             </div>
//           </div>

//         </div>


//         <div className="form-row">

//           <div className="">
//             <div className="form-row">
//               <InputField label="Bank Name :" />
//               <InputField label="IFSC Code :" />
//               <InputField label="Branch :" />
//               <InputField label="GSTIN :" />
//             </div>
//           </div>

//         </div>

//         {/* Row 6 */}
//         <div className="form-row">

//           <div className="">
//             <div className="form-row">

//               <InputField label="Aadhar Card :" />
//               <InputField label="PAN Card :" />
//             </div>
//           </div>


//         </div>


//         <div className="form-group">
//           <label className="checkbox-label" htmlFor="tcs">
//             <input 
//               type="checkbox" 
//               id="tcs" 
//               name="tcs" 
//               className="checkbox-input" 
//               checked={tcsApplicable} 
//               onChange={handleCheckboxChange} 
//             />
//             TCS Applicable
//           </label>
//         </div>

//         <button type="submit" className="cus-submit-btn">Save</button>

//       </form>
//     </div>
//     </div>
//   );
// }

// export default Supplier_Master;
















import React, { useState } from 'react';
// import './Customer_Master.css';
import InputField from '../../../Pages/InputField/InputField';
import './Supplier_Master.css'
import { useNavigate } from 'react-router-dom';


function Customer_Master() {
  const [formData, setFormData] = useState({
    customer_name: '',
    print_name: '',
    account_group: '',
    pin_code: '',
    state: '',
    state_code: '',
    phone: '',
    mobile: '',
    email: '',
    birthday: '',
    anniversary: '',
    bank_account_no: '',
    bank_name: '',
    ifsc_code: '',
    branch: '',
    gst_in: '',
    aadhar_card: '',
    pan_card: '',
  });

  const [tcsApplicable, setTcsApplicable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setTcsApplicable(!tcsApplicable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, account_group: 'Supplier', tcsApplicable };

    try {
      const response = await fetch('http://localhost:5000/supplier-and-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Data saved successfully:', result);
        alert('Supplier data saved successfully!');
      } else {
        console.error('Failed to save data:', response.statusText);
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/suppliertable'); 
  };


  return (
    <div className="main-container">
      <div className="customer-master-container">
        <h2>Suppliers</h2>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <InputField
              label="Customer Name:"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
            />
            <InputField
              label="Print Name:"
              name="print_name"
              value={formData.print_name}
              onChange={handleChange}
            />
            <InputField
              label="Account Group:"
              name="account_group"
              value="Supplier"
              readOnly
            />
            <InputField
              label="Pincode:"
              name="pin_code"
              value={formData.pin_code}
              onChange={handleChange}
            />
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <InputField
              label="State:"
              name="state"
              type="select"
              value={formData.state}
              onChange={handleChange}
              options={[
                { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
                { value: 'Bihar', label: 'Bihar' },
                { value: 'Delhi', label: 'Delhi' },
                { value: 'Goa', label: 'Goa' },
                { value: 'Maharashtra', label: 'Maharashtra' },
                { value: 'Tamil Nadu', label: 'Tamil Nadu' },
                { value: 'West Bengal', label: 'West Bengal' },
              ]}
            />
            <InputField
              label="State Code:"
              name="state_code"
              value={formData.state_code}
              onChange={handleChange}
            />
            <InputField
              label="Phone:"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <InputField
              label="Mobile:"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          {/* Additional Rows */}
          <div className="form-row">
            <InputField
              label="Email:"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Birthday:"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
            />
            <InputField
              label="Anniversary:"
              name="anniversary"
              type="date"
              value={formData.anniversary}
              onChange={handleChange}
            />
            <InputField
              label="Bank Account No:"
              name="bank_account_no"
              value={formData.bank_account_no}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <InputField
              label="Bank Name:"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
            />
            <InputField
              label="IFSC Code:"
              name="ifsc_code"
              value={formData.ifsc_code}
              onChange={handleChange}
            />
            <InputField
              label="Branch:"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            />
            <InputField
              label="GSTIN:"
              name="gst_in"
              value={formData.gst_in}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <InputField
              label="Aadhar Card:"
              name="aadhar_card"
              value={formData.aadhar_card}
              onChange={handleChange}
            />
            <InputField
              label="PAN Card:"
              name="pan_card"
              value={formData.pan_card}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="checkbox-label" htmlFor="tcs">
              <input
                type="checkbox"
                id="tcs"
                name="tcsApplicable"
                className="checkbox-input"
                checked={tcsApplicable}
                onChange={handleCheckboxChange}
              />
              TCS Applicable
            </label>
          </div>
          {/* <div>
         
          <button type="submit" className="cus-submit-btn">
            Save
          </button>
          </div> */}
          <div className="sup-button-container">
            <button
              type="button"
              className="cus-back-btn"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="cus-submit-btn"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Customer_Master;
