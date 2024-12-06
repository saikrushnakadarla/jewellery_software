
// import React, { useState, useEffect } from "react";
// import InputField from "../../../Pages/InputField/InputField";
// import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
// import { FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";


// function MetalType() {
//   const [formData, setFormData] = useState({
//     metal_name: '',
//     description: '',
//     default_purity: '',
//     default_purity_for_rate_entry: '',
//     default_purity_for_old_metal: '',
//     default_issue_purity: '',
//   });

//   const [submittedData, setSubmittedData] = useState([]); // Store submitted form entries

//   // Fetch data from the backend API when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/metaltype");
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
//       const response = await axios.post("http://localhost:5000/metaltype", formData);
//       console.log("Data submitted:", response.data);

//       // Update the table with the new data
//       setSubmittedData([...submittedData, { ...formData, id: response.data.id }]);
//       // Reset the form
//       setFormData({
//         metal_name: '',
//         description: '',
//         default_purity: '',
//         default_purity_for_rate_entry: '',
//         default_purity_for_old_metal: '',
//         default_issue_purity: '',
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
//       await axios.delete(`http://localhost:5000/metaltype/${id}`);
//       // Update the frontend state after successful deletion
//       setSubmittedData(submittedData.filter((item) => item.metal_type_id !== id));
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
//         Header: "Metal Name",
//         accessor: "metal_name",
//       },
//       {
//         Header: "Description",
//         accessor: "description",
//       },
//       {
//         Header: "Default Purity",
//         accessor: "default_purity",
//       },
//       {
//         Header: "Default Purity for Rate Entry",
//         accessor: "default_purity_for_rate_entry",
//       },
//       {
//         Header: "Default Purity for Old Metal",
//         accessor: "default_purity_for_old_metal",
//       },
//       {
//         Header: "Default Issue Purity",
//         accessor: "default_issue_purity",
//       },

//       {
//         Header: "Action",
//         Cell: ({ row }) => (
//           <div>
//             <button className="edit-btn edit-button">
//               <FaEdit />
//             </button>
//             <button className="delete-btn delete-button"
//               onClick={() => handleDelete(row.original.metal_type_id)}
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
//         <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Metal Type</h3>
//         <form className="customer-master-form" onSubmit={handleSubmit}>
//           {/* Row 1 */}
//           <div className="form-row">
//             <InputField
//               label="Metal Name:"
//               name="metal_name"
//               value={formData.metal_name}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Description:"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Default Purity:"
//               name="default_purity"
//               type="select"
//               value={formData.default_purity}
//               onChange={handleChange}
//               required={true}
//               options={[
//                 { value: '', label: 'Select Purity' },
//                 { value: '99.9', label: '99.9%' },
//                 { value: '99.5', label: '99.5%' },
//                 { value: '95.0', label: '95.0%' },
//               ]}
//             />

//           </div>

//           {/* Row 2 */}
//           <div className="form-row">
//             <InputField
//               label="Default Purity for Rate Entry:"
//               name="default_purity_for_rate_entry"
//               type="select"
//               value={formData.default_purity_for_rate_entry}
//               onChange={handleChange}
//               required={true}
//               options={[
//                 { value: '', label: 'Select Purity' },
//                 { value: '99.9', label: '99.9%' },
//                 { value: '99.5', label: '99.5%' },
//                 { value: '95.0', label: '95.0%' },
//               ]}
//             />
//             <InputField
//               label="Default Purity for Old Metal:"
//               name="default_purity_for_old_metal"
//               type="select"
//               value={formData.default_purity_for_old_metal}
//               onChange={handleChange}
//               required={true}
//               options={[
//                 { value: '', label: 'Select Purity' },
//                 { value: '99.9', label: '99.9%' },
//                 { value: '99.5', label: '99.5%' },
//                 { value: '95.0', label: '95.0%' },
//               ]}
//             />
//             <InputField
//               label="Default Issue Purity:"
//               name="default_issue_purity"
//               type="select"
//               value={formData.default_issue_purity}
//               onChange={handleChange}
//               required={true}
//               options={[
//                 { value: '', label: 'Select Purity' },
//                 { value: '99.9', label: '99.9%' },
//                 { value: '99.5', label: '99.5%' },
//                 { value: '95.0', label: '95.0%' },
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

//         {/* Purity Table */}
//         <div style={{ marginTop: '20px' }} className="purity-table-container">
//           <DataTable columns={columns} data={submittedData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MetalType;













import React, { useState, useEffect } from "react";
import InputField from "../../../Pages/InputField/InputField";
import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function MetalType() {
  const [formData, setFormData] = useState({
    metal_name: '',
    description: '',
    default_purity: '',
    default_purity_for_rate_entry: '',
    default_purity_for_old_metal: '',
    default_issue_purity: '',
  });

  const [submittedData, setSubmittedData] = useState([]); // Store submitted form entries
  const [editing, setEditing] = useState(null); // Track whether we're editing a record

  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/metaltype");
        setSubmittedData(response.data); // Populate table with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        // Update existing record
        const response = await axios.put(`http://localhost:5000/metaltype/${editing}`, formData);
        console.log("Data updated:", response.data);

        // Update the table with the edited data
        setSubmittedData(submittedData.map((item) =>
          item.metal_type_id === editing ? { ...item, ...formData } : item
        ));
      } else {
        // Submit new record
        const response = await axios.post("http://localhost:5000/metaltype", formData);
        console.log("Data submitted:", response.data);

        // Update the table with the new data
        setSubmittedData([...submittedData, { ...formData, id: response.data.id }]);
      }

      // Reset the form and stop editing mode
      setFormData({
        metal_name: '',
        description: '',
        default_purity: '',
        default_purity_for_rate_entry: '',
        default_purity_for_old_metal: '',
        default_issue_purity: '',
      });
      setEditing(null); // Reset editing state
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the record with ID ${id}?`);

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the action
    }

    try {
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:5000/metaltype/${id}`);
      // Update the frontend state after successful deletion
      setSubmittedData(submittedData.filter((item) => item.metal_type_id !== id));
      console.log(`Record with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = submittedData.find((item) => item.metal_type_id === id);
    setFormData({ ...itemToEdit });
    setEditing(id); // Set the current ID to editing state
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Sr. No.",
        Cell: ({ row }) => row.index + 1, // Generate a sequential number
      },
      {
        Header: "Metal Name",
        accessor: "metal_name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Default Purity",
        accessor: "default_purity",
      },
      {
        Header: "Default Purity for Rate Entry",
        accessor: "default_purity_for_rate_entry",
      },
      {
        Header: "Default Purity for Old Metal",
        accessor: "default_purity_for_old_metal",
      },
      {
        Header: "Default Issue Purity",
        accessor: "default_issue_purity",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button className="edit-btn edit-button" onClick={() => handleEdit(row.original.metal_type_id)}>
              <FaEdit />
            </button>
            <button
              className="delete-btn delete-button"
              onClick={() => handleDelete(row.original.metal_type_id)}
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
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Metal Type</h3>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <InputField
              label="Metal Name:"
              name="metal_name"
              value={formData.metal_name}
              onChange={handleChange}
            />
            <InputField
              label="Description:"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <InputField
              label="Default Purity:"
              name="default_purity"
              type="select"
              value={formData.default_purity}
              onChange={handleChange}
              required={true}
              options={[
                { value: '', label: 'Select Purity' },
                { value: '99.9', label: '99.9%' },
                { value: '99.5', label: '99.5%' },
                { value: '95.0', label: '95.0%' },
              ]}
            />
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <InputField
              label="Default Purity for Rate Entry:"
              name="default_purity_for_rate_entry"
              type="select"
              value={formData.default_purity_for_rate_entry}
              onChange={handleChange}
              required={true}
              options={[
                { value: '', label: 'Select Purity' },
                { value: '99.9', label: '99.9%' },
                { value: '99.5', label: '99.5%' },
                { value: '95.0', label: '95.0%' },
              ]}
            />
            <InputField
              label="Default Purity for Old Metal:"
              name="default_purity_for_old_metal"
              type="select"
              value={formData.default_purity_for_old_metal}
              onChange={handleChange}
              required={true}
              options={[
                { value: '', label: 'Select Purity' },
                { value: '99.9', label: '99.9%' },
                { value: '99.5', label: '99.5%' },
                { value: '95.0', label: '95.0%' },
              ]}
            />
            <InputField
              label="Default Issue Purity:"
              name="default_issue_purity"
              type="select"
              value={formData.default_issue_purity}
              onChange={handleChange}
              required={true}
              options={[
                { value: '', label: 'Select Purity' },
                { value: '99.9', label: '99.9%' },
                { value: '99.5', label: '99.5%' },
                { value: '95.0', label: '95.0%' },
              ]}
            />
          </div>

          <div className="sup-button-container">
            <button type="button" className="cus-back-btn">
              Back
            </button>
            <button type="submit" className="cus-submit-btn">
              {editing ? "Update" : "Save"}
            </button>
          </div>
        </form>

        {/* Purity Table */}
        <div style={{ marginTop: '20px' }} className="purity-table-container">
          <DataTable columns={columns} data={submittedData} />
        </div>
      </div>
    </div>
  );
}

export default MetalType;
