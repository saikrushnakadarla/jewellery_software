// import React, { useState } from 'react';
// import './Customer_Master.css';
// import InputField from '../../../Pages/InputField/InputField';

// function Customer_Master() {
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
//       <h2 style={{color:'#A26D2B'}}>Customers</h2>
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
//               <InputField label="Pincode:" />
//             </div>
//           </div>

        
//         </div>

//         {/* Row 2 */}
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
       
//           </div>

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

//         {/* Row 4 */}
//         <div className="form-row">


       
//         </div>

//         {/* Row 5 */}
//         <div className="form-row">

//           <div className="">
//             <div className="form-row">
//               <InputField label="Bank Name :" />
//               <InputField label="IFSC Code :" />
//               <InputField label="Branch :" />
//               <InputField label="GSTIN :" />
//             </div>
//           </div>
         

//         {/* Row 6 */}
//         <div className="form-row">

//           <div className="">
//             <div className="form-row">
              
//               <InputField label="Aadhar Card :" />
//               <InputField label="PAN Card :" />
//             </div>
//           </div>

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

// export default Customer_Master;



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

  const [tcsApplicable, setTcsApplicable] = useState(false);
  const [metal, setMetal] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox for TCS Applicable
  const handleCheckboxChange = () => {
    setTcsApplicable(!tcsApplicable);
  };

  // Handle form submission and send data to the backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the API
    const dataToSend = { ...formData, tcsApplicable };

    // Send the POST request
    fetch('http://localhost:5000/supplier-and-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        console.log('Success:', data);
        alert('Data submitted successfully!');
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        alert('Failed to submit data.');
      });
  };

  return (
    <div className="main-container">
      <div className="customer-master-container">
        <h2 style={{ color: '#A26D2B' }}>Customers</h2>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <InputField
              label="Customer Name:"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
            <InputField
              label="Print Name:"
              name="printName"
              value={formData.printName}
              onChange={handleChange}
            />
            <InputField
              label="Account Group:"
              type="select"
              name="accountGroup"
              value={formData.accountGroup}
              onChange={handleChange}
              options={[
                { value: "Individual", label: "Individual" },
                { value: "Corporate", label: "Corporate" },
                { value: "Vendor", label: "Vendor" },
                { value: "Customer", label: "Customer" },
              ]}
            />
            <InputField
              label="Pincode:"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <InputField
              label="State:"
              type="select"
              name="state"
              value={formData.state}
              onChange={handleChange}
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
            <InputField
              label="State Code:"
              name="stateCode"
              value={formData.stateCode}
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

          {/* Row 3 */}
          <div className="form-row">
            <InputField
              label="Email:"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Birthday:"
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
            <InputField
              label="Anniversary:"
              type="date"
              name="anniversary"
              value={formData.anniversary}
              onChange={handleChange}
            />
            <InputField
              label="Bank Account No:"
              name="bankAccountNo"
              value={formData.bankAccountNo}
              onChange={handleChange}
            />
          </div>

          {/* Row 4 */}
          <div className="form-row">
            <InputField
              label="Bank Name:"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
            />
            <InputField
              label="IFSC Code:"
              name="ifscCode"
              value={formData.ifscCode}
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
              name="gstIN"
              value={formData.gstIN}
              onChange={handleChange}
            />
          </div>

          {/* Row 5 */}
          <div className="form-row">
            <InputField
              label="Aadhar Card:"
              name="aadharCard"
              value={formData.aadharCard}
              onChange={handleChange}
            />
            <InputField
              label="PAN Card:"
              name="panCard"
              value={formData.panCard}
              onChange={handleChange}
            />
          </div>

          {/* TCS Checkbox */}
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

          {/* Submit Button */}
          <button type="submit" className="cus-submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Customer_Master;
