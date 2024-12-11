// import React, { useState, useEffect } from "react";
// import InputField from "../../../Pages/InputField/InputField";
// import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
// import { FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";

// function DesignMaster() {
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

//   // Fetch data from the backend API when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/designmaster");
//         setSubmittedData(response.data); // Populate table with fetched data
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/designmaster", formData);
//       console.log("Data submitted:", response.data);

//       // Update the table with the new data
//       setSubmittedData([...submittedData, { ...formData, design_id: response.data.id }]);
//       // Reset the form
//       setFormData({
//         metal: '',
//         short_id: '',
//         item_type: '',
//         design_item: '',
//         design_name: '',
//         wastage_percentage: '',
//         making_charge: '',
//         design_short_code: '',
//         brand_category: '',
//         mc_type: '',
//       });
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     console.log("Deleting ID:", id); // Debug log
//     const isConfirmed = window.confirm(`Are you sure you want to delete the record with ID ${id}?`);
//     if (!isConfirmed) return;

//     try {
//       const response = await axios.delete(`http://localhost:5000/designmaster/${id}`);
//       if (response.status === 200) {
//         setSubmittedData(submittedData.filter((item) => item.design_id !== id));
//         console.log(`Record with ID ${id} deleted successfully.`);
//       } else {
//         console.error("Failed to delete the record from the database.");
//       }
//     } catch (error) {
//       console.error("Error deleting record:", error);
//     }
//   };



//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Sr. No.",
//         Cell: ({ row }) => row.index + 1, // Generate a sequential number
//       },
//       {
//         Header: "Metal",
//         accessor: "metal",
//       },
//       {
//         Header: "Short Id",
//         accessor: "short_id",
//       },
//       {
//         Header: "Item Type",
//         accessor: "item_type",
//       },
//       {
//         Header: "Design Item",
//         accessor: "design_item",
//       },
//       {
//         Header: "Design Name",
//         accessor: "design_name",
//       },
//       {
//         Header: "Wastage Percentage",
//         accessor: "wastage_percentage",
//       },
//       {
//         Header: "Making Charge",
//         accessor: "making_charge",
//       },
//       {
//         Header: "Design Short Code",
//         accessor: "design_short_code",
//       },
//       {
//         Header: "Brand/Category",
//         accessor: "brand_category",
//       },
//       {
//         Header: "MC Type",
//         accessor: "mc_type",
//       },
//       {
//         Header: "Action",
//         Cell: ({ row }) => (
//           <div>
//             <button className="edit-btn edit-button">
//               <FaEdit />
//             </button>
//             <button
//               className="delete-btn delete-button"
//               onClick={() => handleDelete(row.original.design_id)}
//             >
//               <FaTrash />
//             </button>
//           </div>
//         ),
//       },
//     ],
//     [submittedData]
//   );

//   return (
//     <div className="main-container">
//       <div className="customer-master-container">
//         <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Design Master</h3>
//         <form className="customer-master-form" onSubmit={handleSubmit}>
//           {/* Row 1 */}
//           <div className="form-row">
//             <InputField
//               label="Metal:"
//               name="metal"
//               value={formData.metal}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Short Id:"
//               name="short_id"
//               value={formData.short_id}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Item Type:"
//               name="item_type"
//               type="select"
//               value={formData.item_type}
//               onChange={handleChange}
//               required={true}
//               options={[
//                 { value: '', label: 'Select Item Type' },
//                 { value: 'ring', label: 'Ring' },
//                 { value: 'bracelet', label: 'Bracelet' },
//                 { value: 'necklace', label: 'Necklace' },
//                 { value: 'earring', label: 'Earring' },
//               ]}
//             />
//             <InputField
//               label="Design Item:"
//               name="design_item"
//               value={formData.design_item}
//               onChange={handleChange}
//               required={true}
//             />
//             <InputField
//               label="Design Name:"
//               name="design_name"
//               value={formData.design_name}
//               onChange={handleChange}
//               required={true}
//             />
//           </div>

//           {/* Row 2 */}
//           <div className="form-row">
//             <InputField
//               label="Wastage Percentage:"
//               name="wastage_percentage"
//               value={formData.wastage_percentage}
//               onChange={handleChange}
//               required={true}
//             />
//             <InputField
//               label="Making Charge:"
//               name="making_charge"
//               value={formData.making_charge}
//               onChange={handleChange}
//               required={true}
//             />
//             <InputField
//               label="Design Short Code:"
//               name="design_short_code"
//               value={formData.design_short_code}
//               onChange={handleChange}
//               required={true}
//             />
//             <InputField
//               label="Brand/Category:"
//               name="brand_category"
//               type="select"
//               value={formData.brand_category}
//               onChange={handleChange}
//               required={true}
//               options={[
//                 { value: '', label: 'Select Category' },
//                 { value: 'gold', label: 'Gold' },
//                 { value: 'silver', label: 'Silver' },
//                 { value: 'platinum', label: 'Platinum' },
//                 { value: 'diamond', label: 'Diamond' },
//               ]}
//             />
//             <InputField
//               label="MC Type:"
//               name="mc_type"
//               type="select"
//               value={formData.mc_type}
//               onChange={handleChange}
//               required={true}
//               options={[
//                 { value: '', label: 'Select MC Type' },
//                 { value: 'fixed', label: 'Fixed' },
//                 { value: 'percentage', label: 'Percentage' },
//               ]}
//             />
//           </div>

//           <div className="sup-button-container">
//             <button type="button" className="cus-back-btn">
//               Back
//             </button>
//             <button type="submit" className="cus-submit-btn">
//               Save
//             </button>
//           </div>
//         </form>

//         {/* Design Master Table */}
//         <div style={{ marginTop: '20px' }} className="purity-table-container">
//           <DataTable columns={columns} data={submittedData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DesignMaster;











import React, { useState, useEffect } from "react";
import InputField from "../../../Pages/InputField/InputField";
import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

  // Example validation functions (These should match your actual validation logic)
  const validateMetalType = (value) => /^[a-zA-Z]+$/.test(value); // Only alphabets
  const validateShortId = (value) => /^[a-zA-Z0-9]+$/.test(value); // Alphanumeric characters
  const validateItemType = (value) => value.trim() !== ""; // Not empty
  const validateDesignItem = (value) => /^[a-zA-Z]+$/.test(value); // Only alphabets
  const validateDesignName = (value) => /^[a-zA-Z]+$/.test(value); // Only alphabets
  const validateWastagePercentage = (value) => !isNaN(value) && value >= 0 && value <= 100; // Valid percentage
  const validateMakingCharge = (value) => !isNaN(value); // Valid number
  const validateDesignShortCode = (value) => /^[a-zA-Z0-9]+$/.test(value); // Alphanumeric characters
  const validateBrandCategory = (value) => value.trim() !== ""; // Not empty
  const validateMcType = (value) => value.trim() !== ""; // Not empty

function DesignMaster() {
  const [formData, setFormData] = useState({
    metal_type: '',
    item_type: '',
    design_item: '',
    design_name: '',
    short_id: '',
    wastage_percentage: '',
    making_charge: '',
    design_short_code: '',
    brand_category: '',
    mc_type: '',
  });

  const [submittedData, setSubmittedData] = useState([]); // Store fetched and submitted form entries
  const [editMode, setEditMode] = useState(false); // Toggle between add and edit modes
  const [editId, setEditId] = useState(null); // Store ID of the record being edited
  const [errors, setErrors] = useState({}); // Store validation errors


  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/designmaster");
        setSubmittedData(response.data); // Populate table with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData state
    setFormData({
      ...formData,
      [name]: value,
    });

    // Initialize a variable to store error message for the field
    let error = "";

    // Validate field based on its name
    if (name === "metal_type" && !validateMetalType(value)) {
      error = "Invalid MetalType Name (only alphabets allowed)";
    } else if (name === "short_id" && !validateShortId(value)) {
      error = "Invalid Short ID (only alphanumeric characters allowed)";
    } else if (name === "item_type" && !validateItemType(value)) {
      error = "Item Type is required";
    } else if (name === "design_item" && !validateDesignItem(value)) {
      error = "Invalid Design Item (only alphabets allowed)";
    } else if (name === "design_name" && !validateDesignName(value)) {
      error = "Invalid Design Name (only alphabets allowed)";
    } else if (name === "wastage_percentage" && !validateWastagePercentage(value)) {
      error = "Invalid Wastage Percentage (valid number required)";
    } else if (name === "making_charge" && !validateMakingCharge(value)) {
      error = "Invalid Making Charge (valid number required)";
    } else if (name === "design_short_code" && !validateDesignShortCode(value)) {
      error = "Invalid Design Short Code (only alphanumeric characters allowed)";
    } else if (name === "brand_category" && !validateBrandCategory(value)) {
      error = "Brand/Category is required";
    } else if (name === "mc_type" && !validateMcType(value)) {
      error = "MC Type is required";
    }

    // Update error state for the specific field
    setErrors({
      ...errors,
      [name]: error,
    });
  };


  const validateForm = () => {
    const newErrors = {};

    // Apply each validation function to the respective form fields
    if (!validateMetalType(formData.metal_type)) newErrors.metal_type = "Invalid Metaltype Name (only alphabets allowed)";
    if (!validateShortId(formData.short_id)) newErrors.short_id = "Invalid Short ID (only alphanumeric characters allowed)";
    if (!validateItemType(formData.item_type)) newErrors.item_type = "Item Type is required";
    if (!validateDesignItem(formData.design_item)) newErrors.design_item = "Invalid Design Item (only alphabets allowed)";
    if (!validateDesignName(formData.design_name)) newErrors.design_name = "Invalid Design Name (only alphabets allowed)";
    if (!validateWastagePercentage(formData.wastage_percentage)) newErrors.wastage_percentage = "Invalid Wastage Percentage (valid number required)";
    if (!validateMakingCharge(formData.making_charge)) newErrors.making_charge = "Invalid Making Charge (valid number required)";
    if (!validateDesignShortCode(formData.design_short_code)) newErrors.design_short_code = "Invalid Design Short Code (only alphanumeric characters allowed)";
    if (!validateBrandCategory(formData.brand_category)) newErrors.brand_category = "Brand/Category is required";
    if (!validateMcType(formData.mc_type)) newErrors.mc_type = "MC Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Edit functionality
      try {
        const response = await axios.put(`http://localhost:5000/designmaster/${editId}`, formData);
        console.log("Data updated:", response.data);

        // Update the table with the edited data
        setSubmittedData(
          submittedData.map((item) =>
            item.design_id === editId ? { ...formData, design_id: editId } : item
          )
        );

        // Reset the form and exit edit mode
        resetForm();
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      // Add functionality
      try {
        const response = await axios.post("http://localhost:5000/designmaster", formData);
        console.log("Data submitted:", response.data);

        // Update the table with the new data
        setSubmittedData([...submittedData, { ...formData, design_id: response.data.id }]);

        // Reset the form
        resetForm();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  const handleEdit = (row) => {
    setEditMode(true);
    setEditId(row.design_id); // Set the ID of the record being edited
    setFormData({ ...row }); // Pre-fill the form with the selected record's data
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the record with ID ${id}?`);

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the action
    }

    try {
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:5000/designmaster/${id}`);
      // Update the frontend state after successful deletion
      setSubmittedData(submittedData.filter((item) => item.design_id !== id));
      console.log(`Record with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      metal_type: '',
      item_type: '',
      design_item: '',
      design_name: '',
      short_id: '',
      wastage_percentage: '',
      making_charge: '',
      design_short_code: '',
      brand_category: '',
      mc_type: '',
    });
    setEditMode(false);
    setEditId(null);
    setErrors({});

  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Sr. No.",
        Cell: ({ row }) => row.index + 1, // Generate a sequential number
      },
      {
        Header: "Metal Type",
        accessor: "metal_type",
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
        Header: "Short Id",
        accessor: "short_id",
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
            <button
              className="edit-btn edit-button"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </button>
            <button
              className="delete-btn delete-button"
              onClick={() => handleDelete(row.original.design_id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [submittedData]
  );

  return (
    <div className="main-container">
      <div className="customer-master-container">
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
          {editMode ? " DesignMaster" : " DesignMaster"}
        </h3>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
           <InputField
              label="Metal Type:"
              name="metal_type"
               type="select"
              value={formData.metal_type}
              onChange={handleChange}
              required={true}

              options={[
                { value: 'gold', label: 'Gold' },
                { value: 'silver', label: 'Silver' },
                { value: 'platinum', label: 'Platinum' },
                { value: 'diamond', label: 'Diamond' },
              ]}
              error={errors.metal_type}

            />
                      {errors.metal_type && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.metal_type}</p>}

         
            <InputField
              label="Item Type:"
              name="item_type"
              value={formData.item_type}
              onChange={handleChange}
              required={true}
            
              error={errors.item_type}

            />
                      {errors.item_type && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.item_type}</p>}

            <InputField
              label="Design Item:"
              name="design_item"
              value={formData.design_item}
              onChange={handleChange}
              required={true}
              error={errors.design_item}

            />
                      {errors.design_item && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.design_item}</p>}

            <InputField
              label="Design Name:"
              name="design_name"
              value={formData.design_name}
              onChange={handleChange}
              required={true}
              error={errors.design_name}

            />
                      {errors.design_name && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.design_name}</p>}
                      <InputField
              label="Short Id:"
              name="short_id"
              value={formData.short_id}
              onChange={handleChange}
              required={true}
              error={errors.short_id}

            />
                      {errors.short_id && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.short_id}</p>}

          </div>

          {/* Row 2 */}
          <div className="form-row">
            <InputField
              label="Wastage Percentage:"
              name="wastage_percentage"
              value={formData.wastage_percentage}
              onChange={handleChange}
              required={true}
              error={errors.wastage_percentage}

            />
                      {errors.wastage_percentage && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.wastage_percentage}</p>}

            <InputField
              label="Making Charge:"
              name="making_charge"
              value={formData.making_charge}
              onChange={handleChange}
              required={true}
              error={errors.making_charge}

            />
                      {errors.making_charge && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.making_charge}</p>}

            <InputField
              label="Design Short Code:"
              name="design_short_code"
              value={formData.design_short_code}
              onChange={handleChange}
              required={true}
              error={errors.design_short_code}

            />
                      {errors.design_short_code && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.design_short_code}</p>}

            <InputField
              label="Brand/Category:"
              name="brand_category"
              value={formData.brand_category}
              onChange={handleChange}
              required={true}
            
              error={errors.brand_category}

            />
                      {errors.brand_category && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.brand_category}</p>}

            <InputField
              label="MC Type:"
              name="mc_type"
              type="select"
              value={formData.mc_type}
              onChange={handleChange}
              required={true}
              options={[
                { value: 'fixed', label: 'By Fixed' },
                { value: 'percentage', label: 'By Weight' },
              ]}
              error={errors.mc_type}

            />
                      {errors.mc_type && <p  style={{color:'red', fontSize:'15px'}}  className="error">{errors.mc_type}</p>}

          </div>

          <div className="sup-button-container">
            {/* <button type="button" className="cus-back-btn" onClick={resetForm}>
              Cancel
            </button> */}
            <button type="submit" className="cus-submit-btn">
              {editMode ? "Update" : "Save"}
            </button>
          </div>
        </form>

        {/* Purity Table */}
        <div style={{ marginTop: "20px" }} className="purity-table-container">
          <DataTable columns={columns} data={submittedData} />
        </div>
      </div>
    </div>
  );
}

export default DesignMaster;
