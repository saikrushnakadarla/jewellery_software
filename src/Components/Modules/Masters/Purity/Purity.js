
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
//       setSubmittedData([...submittedData, { ...formData, id: response.data.id }]);
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
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       try {
//         await axios.delete(`http://localhost:5000/purity/${id}`);
//         console.log("Record deleted:", id);

//         // Update the table to remove the deleted record
//         setSubmittedData(submittedData.filter((item) => item.id !== id));
//       } catch (error) {
//         console.error("Error deleting record:", error);
//       }
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
//             <button className="delete-btn delete-button"
//                           onClick={() => handleDelete(row.original.id)} // Call handleDelete with record ID
// >
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/purity", formData);
      console.log("Data submitted:", response.data);

      // Update the table with the new data
      setSubmittedData([...submittedData, { ...formData, purity_id: response.data.id }]);
      // Reset the form
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
      await axios.delete(`http://localhost:5000/purity/${id}`);
      // Update the frontend state after successful deletion
      setSubmittedData(submittedData.filter((item) => item.purity_id !== id));
      console.log(`Record with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
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
            <button className="edit-btn edit-button">
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
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Purity</h3>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row">
            <InputField
              label="Name:"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Metal:"
              name="metal"
              value={formData.metal}
              onChange={handleChange}
            />
            <InputField
              label="Purity Percentage:"
              name="purity_percentage"
              value={formData.purity_percentage}
              onChange={handleChange}
            />
            <InputField
              label="Purity:"
              name="purity"
              value={formData.purity}
              onChange={handleChange}
            />
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <InputField
              label="URD Purity:"
              name="urd_purity"
              value={formData.urd_purity}
              onChange={handleChange}
            />
            <InputField
              label="DESC:"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
            <InputField
              label="Old Purity Desc:"
              name="old_purity_desc"
              value={formData.old_purity_desc}
              onChange={handleChange}
            />
            <InputField
              label="Cut Issue:"
              name="cut_issue"
              value={formData.cut_issue}
              onChange={handleChange}
            />
            <InputField
              label="Skin Print:"
              name="skin_print"
              value={formData.skin_print}
              onChange={handleChange}
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
        <div style={{ marginTop: "20px" }} className="purity-table-container">
          <DataTable columns={columns} data={submittedData} />
        </div>
      </div>
    </div>
  );
}

export default Purity;
