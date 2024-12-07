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

function DesignMaster() {
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

  const [submittedData, setSubmittedData] = useState([]); // Store fetched and submitted form entries
  const [editMode, setEditMode] = useState(false); // Toggle between add and edit modes
  const [editId, setEditId] = useState(null); // Store ID of the record being edited

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
              label="Metal:"
              name="metal"
              value={formData.metal}
              onChange={handleChange}
            />
            <InputField
              label="Short Id:"
              name="short_id"
              value={formData.short_id}
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
