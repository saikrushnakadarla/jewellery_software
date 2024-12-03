


// import React, { useState } from 'react';
// import InputField from '../../../Pages/InputField/InputField';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../MetalType/MetalType.css'

// const DesignMaster = () => {
//   const [formData, setFormData] = useState({
//     metal: '',
//     short_id: '',
//     item_type: '',
//     design_item: '',
//     design_name: '',
//     wastage_percentage: '',
//     making_charge: '',
//     design_short_code: '',
//     brand_category: '',
//     mc_type: '',

//   });

//   const [submittedData, setSubmittedData] = useState([]); // Store submitted form entries

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Append formData to submittedData and reset the form
//     setSubmittedData([...submittedData, formData]);
//     setFormData({
//       metal: '',
//       short_id: '',
//       item_type: '',
//       design_item: '',
//       design_name: '',
//       wastage_percentage: '',
//       making_charge: '',
//       design_short_code: '',
//       brand_category: '',
//       mc_type: '',

//     });
//   };

//   return (
//     <div className="main-container">

//       <div className="container py-5">
//         <div className="card shadow p-4 mb-4">
//           <h3 className="text-center mb-4">Design Master</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="row g-3">
//               {/* Metal Name */}
//               <div className="col-md-2">
//                 <InputField
//                   label="Metal:"
//                   name="metal"
//                   value={formData.metal}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </div>

//               {/* Description */}
//               <div className="col-md-2">
//                 <InputField
//                   label="Short Id:"
//                   name="short_id"
//                   value={formData.short_id}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </div>

//               {/* Default Purity */}
//               <div className="col-md-2">
//                 <InputField
//                   label="Item Type:"
//                   name="item_type"
//                   type="select"
//                   value={formData.item_type}
//                   onChange={handleChange}
//                   required={true}
//                   options={[
//                     { value: '', label: 'Select Item Type' },
//                     { value: 'ring', label: 'Ring' },
//                     { value: 'bracelet', label: 'Bracelet' },
//                     { value: 'necklace', label: 'Necklace' },
//                     { value: 'earring', label: 'Earring' },
//                   ]}
//                 />
//               </div>

//               {/* Default Purity for Rate Entry */}
//               <div className="col-md-2">
//                 <InputField
//                   label="Design Item:"
//                   name="design_item"
//                   value={formData.design_item}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </div>

//               {/* Default Purity for Old Metal */}
//               <div className="col-md-2">
//                 <InputField
//                   label="Design Name:"
//                   name="design_name"
//                   value={formData.design_name}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </div>
//               <div className="col-md-2">
//                 <InputField
//                   label="Wastage Percentage:"
//                   name="wastage_percentage"
//                   value={formData.wastage_percentage}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </div>
//               <div className="col-md-2">
//                 <InputField
//                   label="Making Charge:"
//                   name="making_charge"
//                   value={formData.making_charge}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </div>
//               <div className="col-md-2">
//                 <InputField
//                   label="Design Short Code:"
//                   name="design_short_code"
//                   value={formData.design_short_code}
//                   onChange={handleChange}
//                   required={true}
//                 />
//               </div>

//               {/* Default Issue Purity */}
//               <div className="col-md-2">
//                 <InputField
//                   label="Brand/Category:"
//                   name="brand_category"
//                   type="select"
//                   value={formData.brand_category}
//                   onChange={handleChange}
//                   required={true}
//                   options={[
//                     { value: '', label: 'Select Category' },
//                     { value: 'gold', label: 'Gold' },
//                     { value: 'silver', label: 'Silver' },
//                     { value: 'platinum', label: 'Platinum' },
//                     { value: 'diamond', label: 'Diamond' },
//                   ]}
//                 />
//               </div>
//               <div className="col-md-2">
//                 <InputField
//                   label="MC Type:"
//                   name="mc_type"
//                   type="select"
//                   value={formData.mc_type}
//                   onChange={handleChange}
//                   required={true}
//                   options={[
//                     { value: '', label: 'Select MC Type' },
//                     { value: 'fixed', label: 'Fixed' },
//                     { value: 'percentage', label: 'Percentage' },
//                   ]}
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="text-center mt-4">
//               <button type="submit" className="btn btn-primary px-5">
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Submitted Data Table */}
//         <div className="card shadow p-4">
//           <h3 className="text-center mb-4">DesignMaster</h3>
//           <div className="table-responsive">
//             <table className="table table-bordered table-hover">
//               <thead className="table-light">
//                 <tr>
//                   <th>S.no.</th>
//                   <th>Metal </th>
//                   <th>Short Id</th>
//                   <th>Item Type</th>
//                   <th>Design Item</th>
//                   <th>Design Name</th>
//                   <th>Wastage Percentage</th>
//                   <th>Making Charge</th>
//                   <th>Design Short Code</th>
//                   <th>Brand/Category</th>
//                   <th>MC Type</th>

//                 </tr>
//               </thead>
//               <tbody>
//                 {submittedData.length > 0 ? (
//                   submittedData.map((data, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{data.metal}</td>
//                       <td>{data.short_id}</td>
//                       <td>{data.item_type}</td>
//                       <td>{data.design_item}</td>
//                       <td>{data.design_name}</td>
//                       <td>{data.wastage_percentage}</td>
//                       <td>{data.making_charge}</td>
//                       <td>{data.design_short_code}</td>
//                       <td>{data.brand_category}</td>
//                       <td>{data.mc_type}</td>

//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="11" className="text-center">
//                       No data submitted yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default DesignMaster;






import React, { useState } from "react";
import InputField from "../../../Pages/InputField/InputField";
import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
import { FaEdit, FaTrash } from "react-icons/fa";
// import "./Purity.scss";

function MetalType() {
  const [formData, setFormData] = useState({
    metal: '',
    short_id: '',
    item_type: '',
    design_item: '',
    design_name: '',
    wastage_percentage: '',
    making_charge: '',
    design_short_code: '',
    brand_category: '',
    mc_type: '',
  });

  const [submittedData, setSubmittedData] = useState([]); // Store submitted form entries

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Append formData to submittedData and reset the form
    setSubmittedData([...submittedData, formData]);
    setFormData({
      metal: '',
      short_id: '',
      item_type: '',
      design_item: '',
      design_name: '',
      wastage_percentage: '',
      making_charge: '',
      design_short_code: '',
      brand_category: '',
      mc_type: '',
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Sr. No.",
        Cell: ({ row }) => row.index + 1, // Generate a sequential number
      },
      {
        Header: "Metal",
        accessor: "metal",
      },
      {
        Header: "Short Id",
        accessor: "short_id",
      },
      {
        Header: "Item Type",
        accessor: "item_type",
      },
      {
        Header: "Design Item",
        accessor: "design_item",
      },
      {
        Header: "Design Name",
        accessor: "design_name",
      },
      {
        Header: "Wastage Percentage",
        accessor: "wastage_percentage",
      },
      {
        Header: "Making Charge",
        accessor: "making_charge",
      },
      {
        Header: "Design Short Code",
        accessor: "design_short_code",
      },
      {
        Header: "Brand/Category",
        accessor: "brand_category",
      },
      {
        Header: "MC Type",
        accessor: "mc_type",
      },

      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button className="edit-btn edit-button">
              <FaEdit />
            </button>
            <button className="delete-btn delete-button">
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="main-container">
      <div className="customer-master-container">
        <h3 style={{ textAlign: 'center', marginBottom:'30px' }}  >Design Master</h3>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <InputField
              label="Metal:"
              name="metal_name"
              value={formData.metal_name}
              onChange={handleChange}
            />
            <InputField
              label="Short Id:"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <InputField
              label="Item Type:"
              name="item_type"
              type="select"
              value={formData.item_type}
              onChange={handleChange}
              required={true}
              options={[
                { value: '', label: 'Select Item Type' },
                { value: 'ring', label: 'Ring' },
                { value: 'bracelet', label: 'Bracelet' },
                { value: 'necklace', label: 'Necklace' },
                { value: 'earring', label: 'Earring' },
              ]}
            />

            <InputField
              label="Design Item:"
              name="design_item"
              value={formData.design_item}
              onChange={handleChange}
              required={true}
            />

            <InputField
              label="Design Name:"
              name="design_name"
              value={formData.design_name}
              onChange={handleChange}
              required={true}
            />



          </div>

          {/* Row 2 */}
          <div className="form-row">
            <InputField
              label="Wastage Percentage:"
              name="wastage_percentage"
              value={formData.wastage_percentage}
              onChange={handleChange}
              required={true}
            />


            <InputField
              label="Making Charge:"
              name="making_charge"
              value={formData.making_charge}
              onChange={handleChange}
              required={true}
            />
            <InputField
              label="Design Short Code:"
              name="design_short_code"
              value={formData.design_short_code}
              onChange={handleChange}
              required={true}
            />

            <InputField
              label="Brand/Category:"
              name="brand_category"
              type="select"
              value={formData.brand_category}
              onChange={handleChange}
              required={true}
              options={[
                { value: '', label: 'Select Category' },
                { value: 'gold', label: 'Gold' },
                { value: 'silver', label: 'Silver' },
                { value: 'platinum', label: 'Platinum' },
                { value: 'diamond', label: 'Diamond' },
              ]}
            />


            <InputField
              label="MC Type:"
              name="mc_type"
              type="select"
              value={formData.mc_type}
              onChange={handleChange}
              required={true}
              options={[
                { value: '', label: 'Select MC Type' },
                { value: 'fixed', label: 'Fixed' },
                { value: 'percentage', label: 'Percentage' },
              ]}
            />

          </div>

          <div className="sup-button-container">
            <button type="button" className="cus-back-btn">
              Back
            </button>
            <button type="submit" className="cus-submit-btn">
              Save
            </button>
          </div>
        </form>

        {/* Purity Table */}
        <div className="purity-table-container">
          <h3 style={{ textAlign: 'center' }}>Submitted Data</h3>
          <DataTable columns={columns} data={submittedData} />
        </div>
      </div>
    </div>
  );
}

export default MetalType;
