


// import React, { useState, useEffect } from "react";
// import InputField from "../../../Pages/InputField/InputField";
// import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
// import { FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";

// function Purity() {
//   const [formData, setFormData] = useState({
//     name: "",
//     metal: "",
//     purity_percentage: "",
//     purity: "",
//     urd_purity: "",
//     desc: "",
//     old_purity_desc: "",
//     cut_issue: "",
//     skin_print: "",
//   });

//   const [submittedData, setSubmittedData] = useState([]); // Store fetched and submitted form entries

//   // Fetch data from the backend API when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/purity");
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
//       const response = await axios.post("http://localhost:5000/purity", formData);
//       console.log("Data submitted:", response.data);

//       // Update the table with the new data
//       setSubmittedData([...submittedData, { ...formData, purity_id: response.data.id }]);
//       // Reset the form
//       setFormData({
//         name: "",
//         metal: "",
//         purity_percentage: "",
//         purity: "",
//         urd_purity: "",
//         desc: "",
//         old_purity_desc: "",
//         cut_issue: "",
//         skin_print: "",
//       });
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     const isConfirmed = window.confirm(`Are you sure you want to delete the record with ID ${id}?`);
  
//     if (!isConfirmed) {
//       return; // Do nothing if the user cancels the action
//     }
  
//     try {
//       // Send DELETE request to the backend
//       await axios.delete(`http://localhost:5000/purity/${id}`);
//       // Update the frontend state after successful deletion
//       setSubmittedData(submittedData.filter((item) => item.purity_id !== id));
//       console.log(`Record with ID ${id} deleted successfully.`);
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
//         Header: "Name",
//         accessor: "name",
//       },
//       {
//         Header: "Metal",
//         accessor: "metal",
//       },
//       {
//         Header: "Purity Percentage",
//         accessor: "purity_percentage",
//       },
//       {
//         Header: "Purity",
//         accessor: "purity",
//       },
//       {
//         Header: "URD Purity",
//         accessor: "urd_purity",
//       },
//       {
//         Header: "DESC",
//         accessor: "desc",
//       },
//       {
//         Header: "Old Purity Desc",
//         accessor: "old_purity_desc",
//       },
//       {
//         Header: "Cut Issue",
//         accessor: "cut_issue",
//       },
//       {
//         Header: "Skin Print",
//         accessor: "skin_print",
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
//               onClick={() => handleDelete(row.original.purity_id)}
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
//         <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Purity</h3>
//         <form className="customer-master-form" onSubmit={handleSubmit}>
//           {/* Row 1 */}
//           <div className="form-row">
//             <InputField
//               label="Name:"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Metal:"
//               name="metal"
//               value={formData.metal}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Purity Percentage:"
//               name="purity_percentage"
//               value={formData.purity_percentage}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Purity:"
//               name="purity"
//               value={formData.purity}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Row 2 */}
//           <div className="form-row">
//             <InputField
//               label="URD Purity:"
//               name="urd_purity"
//               value={formData.urd_purity}
//               onChange={handleChange}
//             />
//             <InputField
//               label="DESC:"
//               name="desc"
//               value={formData.desc}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Old Purity Desc:"
//               name="old_purity_desc"
//               value={formData.old_purity_desc}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Cut Issue:"
//               name="cut_issue"
//               value={formData.cut_issue}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Skin Print:"
//               name="skin_print"
//               value={formData.skin_print}
//               onChange={handleChange}
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

//         {/* Purity Table */}
//         <div style={{ marginTop: "20px" }} className="purity-table-container">
//           <DataTable columns={columns} data={submittedData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Purity;





import React, { useState, useEffect } from "react";
import InputField from "../../../Pages/InputField/InputField";
import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
// Custom validation functions
const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // Only alphabets and spaces
const validateMetal = (metal) => /^[a-zA-Z\s]+$/.test(metal); // Only alphabets and spaces
const validatePurityPercentage = (purity_percentage) => /^[0-9]+(\.[0-9]{1,2})?$/.test(purity_percentage); // Numbers with optional 2 decimals
const validatePurity = (purity) => /^[a-zA-Z0-9\s]+$/.test(purity); // Alphanumeric with spaces
const validateURDPurity = (urd_purity) => /^[a-zA-Z0-9\s]+$/.test(urd_purity); // Alphanumeric with spaces
const validateDescription = (desc) => desc.trim() !== ""; // Required field (non-empty)
const validateOldPurityDesc = (old_purity_desc) => old_purity_desc.trim() !== ""; // Required field (non-empty)
const validateCutIssue = (cut_issue) => cut_issue.trim() !== ""; // Required field (non-empty)
const validateSkinPrint = (skin_print) => skin_print.trim() !== ""; // Required field (non-empty)


function Purity() {
  const [formData, setFormData] = useState({
    name: "",
    metal: "",
    purity_percentage: "",
    purity: "",
    urd_purity: "",
    desc: "",
    old_purity_desc: "",
    cut_issue: "",
    skin_print: "",
  });

  const [submittedData, setSubmittedData] = useState([]); // Store fetched and submitted form entries
  const [editMode, setEditMode] = useState(false); // Toggle between add and edit modes
  const [editId, setEditId] = useState(null); // Store ID of the record being edited
  const [errors, setErrors] = useState({}); // Store validation errors

  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/purity");
        setSubmittedData(response.data); // Populate table with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Initialize a variable to store validation error
    let error = "";
  
    // Validate specific fields based on the input's name
    if (name === "name" && !validateName(value)) {
      error = "Name should contain only alphabets.";
    } else if (name === "metal" && !validateMetal(value)) {
      error = "Metal should contain only alphabets.";
    } else if (name === "purity_percentage" && !validatePurityPercentage(value)) {
      error = "Purity Percentage should be a number (up to 2 decimals).";
    } else if (name === "purity" && !validatePurity(value)) {
      error = "Purity should contain alphanumeric characters.";
    } else if (name === "urd_purity" && !validateURDPurity(value)) {
      error = "URD Purity should contain alphanumeric characters.";
    } else if (name === "desc" && !validateDescription(value)) {
      error = "Description is required.";
    } else if (name === "old_purity_desc" && !validateOldPurityDesc(value)) {
      error = "Old Purity Description is required.";
    } else if (name === "cut_issue" && !validateCutIssue(value)) {
      error = "Cut Issue is required.";
    } else if (name === "skin_print" && !validateSkinPrint(value)) {
      error = "Skin Print is required.";
    }
  
    // Update formData and errors state
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };
  
  

  const validateForm = () => {
    let formErrors = {};
    
    // Validations for each input field
    if (!validateName(formData.name)) {
      formErrors.name = "Name should contain only alphabets.";
    }
    if (!validateMetal(formData.metal)) {
      formErrors.metal = "Metal should contain only alphabets.";
    }
    if (!validatePurityPercentage(formData.purity_percentage)) {
      formErrors.purity_percentage = "Purity Percentage should be a number (up to 2 decimals).";
    }
    if (!validatePurity(formData.purity)) {
      formErrors.purity = "Purity should contain alphanumeric characters.";
    }
    if (!validateURDPurity(formData.urd_purity)) {
      formErrors.urd_purity = "URD Purity should contain alphanumeric characters.";
    }
    if (!validateDescription(formData.desc)) {
      formErrors.desc = "Description is required.";
    }
    if (!validateOldPurityDesc(formData.old_purity_desc)) {
      formErrors.old_purity_desc = "Old Purity Description is required.";
    }
    if (!validateCutIssue(formData.cut_issue)) {
      formErrors.cut_issue = "Cut Issue is required.";
    }
    if (!validateSkinPrint(formData.skin_print)) {
      formErrors.skin_print = "Skin Print is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

        // Validate form before submitting
        if (!validateForm()) {
          return; // Stop if there are validation errors
        }

    if (editMode) {
      // Edit functionality
      try {
        const response = await axios.put(`http://localhost:5000/purity/${editId}`, formData);
        console.log("Data updated:", response.data);

        // Update the table with the edited data
        setSubmittedData(
          submittedData.map((item) =>
            item.purity_id === editId ? { ...formData, purity_id: editId } : item
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
        const response = await axios.post("http://localhost:5000/purity", formData);
        console.log("Data submitted:", response.data);

        // Update the table with the new data
        setSubmittedData([...submittedData, { ...formData, purity_id: response.data.id }]);

        // Reset the form
        resetForm();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  const handleEdit = (row) => {
    setEditMode(true);
    setEditId(row.purity_id); // Set the ID of the record being edited
    setFormData({ ...row }); // Pre-fill the form with the selected record's data
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the record with ID ${id}?`);

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the action
    }

    try {
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:5000/purity/${id}`);
      // Update the frontend state after successful deletion
      setSubmittedData(submittedData.filter((item) => item.purity_id !== id));
      console.log(`Record with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      metal: "",
      purity_percentage: "",
      purity: "",
      urd_purity: "",
      desc: "",
      old_purity_desc: "",
      cut_issue: "",
      skin_print: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Sr. No.",
        Cell: ({ row }) => row.index + 1, // Generate a sequential number
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Metal",
        accessor: "metal",
      },
      {
        Header: "Purity Percentage",
        accessor: "purity_percentage",
      },
      {
        Header: "Purity",
        accessor: "purity",
      },
      {
        Header: "URD Purity",
        accessor: "urd_purity",
      },
      {
        Header: "DESC",
        accessor: "desc",
      },
      {
        Header: "Old Purity Desc",
        accessor: "old_purity_desc",
      },
      {
        Header: "Cut Issue",
        accessor: "cut_issue",
      },
      {
        Header: "Skin Print",
        accessor: "skin_print",
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
              onClick={() => handleDelete(row.original.purity_id)}
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
          {editMode ? "Edit Purity" : "Add Purity"}
        </h3>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <InputField
              label="Name:"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={true}
              error={errors.name}
            />
            {errors.name && <p style={{color:'red', fontSize:'15px'}} className="error-message">{errors.name}</p>}

            <InputField
              label="Metal:"
              name="metal"
              value={formData.metal}
              onChange={handleChange}
              required={true}
              error={errors.metal}
            />
            {errors.metal && <p  style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.metal}</p>}

            <InputField
              label="Purity Percentage:"
              name="purity_percentage"
              value={formData.purity_percentage}
              onChange={handleChange}
              required={true}
              error={errors.purity_percentage}
            />
            {errors.purity_percentage && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.purity_percentage}</p>}

            <InputField
              label="Purity:"
              name="purity"
              value={formData.purity}
              onChange={handleChange}
              required={true}
              error={errors.purity}

            />
            {errors.purity && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.purity}</p>}

          </div>

          {/* Row 2 */}
          <div className="form-row">
            <InputField
              label="URD Purity:"
              name="urd_purity"
              value={formData.urd_purity}
              onChange={handleChange}
              required={true}
              error={errors.urd_purity}

            />
            {errors.urd_purity && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.urd_purity}</p>}

            <InputField
              label="DESC:"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required={true}
              error={errors.desc}

            />
            {errors.desc && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.desc}</p>}

            <InputField
              label="Old Purity Desc:"
              name="old_purity_desc"
              value={formData.old_purity_desc}
              onChange={handleChange}
              required={true}
              error={errors.old_purity_desc}

            />
            {errors.old_purity_desc && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.old_purity_desc}</p>}

            <InputField
              label="Cut Issue:"
              name="cut_issue"
              value={formData.cut_issue}
              onChange={handleChange}
              required={true}
              error={errors.cut_issue}

            />
            {errors.cut_issue && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.cut_issue}</p>}

            <InputField
              label="Skin Print:"
              name="skin_print"
              value={formData.skin_print}
              onChange={handleChange}
              required={true}
              error={errors.skin_print}

            />
            {errors.skin_print && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.skin_print}</p>}

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

export default Purity;
