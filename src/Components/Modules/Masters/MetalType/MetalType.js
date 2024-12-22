import React, { useState, useEffect } from "react";
import InputField from "../../../Pages/InputField/InputField";
import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL";

function MetalType() {
  const [formData, setFormData] = useState({
    metal_name: '',
    // item_type: '',
    description: '',
    default_purity: '',
    default_purity_for_rate_entry: '',
    default_purity_for_old_metal: '',
    default_issue_purity: '',
  });

  const [submittedData, setSubmittedData] = useState([]); // Store submitted form entries
  const [editing, setEditing] = useState(null); // Track whether we're editing a record
  const [errors, setErrors] = useState({}); // State for tracking validation errors


  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/metaltype`);
        setSubmittedData(response.data); // Populate table with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

   // Validation functions
   const validateMetalName = (value) => /^[A-Za-z\s]+$/.test(value);
  //  const validateItemType = (value) => value.trim() !== ""; 
   const validateDescription = (value) => value.trim() !== "";
   const validatePurity = (value) => /^[0-9.]+$/.test(value);
 

   const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Initialize a variable to store validation error
    let error = "";
  
    // Validate specific fields based on the input's name
    if (name === "metal_name" && !validateMetalName(value)) {
      error = "Metal type should contain only alphabets.";
    } else if (name === "description" && !validateDescription(value)) {
      error = "Description is required.";
    } else if (name === "default_purity" && !validatePurity(value)) {
      error = "Purity should be selected.";
    } else if (name === "default_purity_for_rate_entry" && !validatePurity(value)) {
      error = "Purity for Rate Entry should be selected.";
    } else if (name === "default_purity_for_old_metal" && !validatePurity(value)) {
      error = "Purity for Old Metal should be selected.";
    } else if (name === "default_issue_purity" && !validatePurity(value)) {
      error = "Issue Purity should be selected.";
    }
  
    // Update formData and errors state
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };


  const validateForm = () => {
    const formErrors = {};
  
    // Validate Metal Name
    if (!validateMetalName(formData.metal_name)) {
      formErrors.metal_name = "Metal Name should contain only alphabets.";
    }
     
    // if (!validateItemType(formData.item_type)) {
    //   formErrors.item_type = "Item Type should contain only alphabets.";
    // }
  
    // Validate Description
    if (!validateDescription(formData.description)) {
      formErrors.description = "Description is required.";
    }
  
    // Validate Purity Fields
    ["default_purity", "default_purity_for_rate_entry", "default_purity_for_old_metal", "default_issue_purity"].forEach((field) => {
      if (!validatePurity(formData[field])) {
        formErrors[field] = "Purity should be a valid number.";
      }
    });
  
    // Set errors in state
    setErrors(formErrors);
  
    // Return true if no errors, otherwise false
    return Object.keys(formErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();


      // Validate form before submitting
      if (!validateForm()) {
        return; // Stop if there are validation errors
      }

    try {
      if (editing) {
        // Update existing record
        const response = await axios.put(`${baseURL}/metaltype/${editing}`, formData);
        console.log("Data updated:", response.data);

        // Update the table with the edited data
        setSubmittedData(submittedData.map((item) =>
          item.metal_type_id === editing ? { ...item, ...formData } : item
        ));
      } else {
        // Submit new record
        const response = await axios.post(`${baseURL}/metaltype`, formData);
        console.log("Data submitted:", response.data);

        // Update the table with the new data
        setSubmittedData([...submittedData, { ...formData, id: response.data.id }]);
      }

      // Reset the form and stop editing mode
      setFormData({
        metal_name: '',
        // item_type: '',
        description: '',
        default_purity: '',
        default_purity_for_rate_entry: '',
        default_purity_for_old_metal: '',
        default_issue_purity: '',
      });
      setEditing(null); // Reset editing state
      alert(`Metal Type created successfully!`);
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
      await axios.delete(`${baseURL}/metaltype/${id}`);
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
      // {
      //   Header: "Item Type",
      //   accessor: "item_type",
      // },
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
          <div className="d-flex align-items-center">
            <button className="action-button edit-button" onClick={() => handleEdit(row.original.metal_type_id)}>
              <FaEdit />
            </button>
            <button
              className="action-button delete-button"
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
              required={true}
              error={errors.metal_name}
            />
        

            {/* <InputField
              label="Item Type:"
              name="item_type"
              value={formData.item_type}
              onChange={handleChange}
              required={true}
              error={errors.item_type}
            /> */}
            <InputField
              label="Description:"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required={true}
              error={errors.description}
            />
            {errors.description && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.description}</p>}

            <InputField
              label="Default Purity:"
              name="default_purity"
              type="select"
              value={formData.default_purity}
              onChange={handleChange}
              required={true}
              options={[
                { value: '99.9', label: '99.9%' },
                { value: '99.5', label: '99.5%' },
                { value: '95.0', label: '95.0%' },
              ]}
              error={errors.default_purity}

            />
          </div>
          {errors.default_purity && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.default_purity}</p>}


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
                { value: '99.9', label: '99.9%' },
                { value: '99.5', label: '99.5%' },
                { value: '95.0', label: '95.0%' },
              ]}
              error={errors.default_purity_for_rate_entry}

            />
            {errors.default_purity_for_rate_entry && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.default_purity_for_rate_entry}</p>}

            <InputField
              label="Default Purity for Old Metal:"
              name="default_purity_for_old_metal"
              type="select"
              value={formData.default_purity_for_old_metal}
              onChange={handleChange}
              required={true}
              options={[
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
                { value: '99.9', label: '99.9%' },
                { value: '99.5', label: '99.5%' },
                { value: '95.0', label: '95.0%' },
              ]}
              error={errors.default_purity_for_old_metal}

            />
            {errors.default_purity_for_old_metal && <p style={{color:'red', fontSize:'15px'}}  className="error-message">{errors.default_purity_for_old_metal}</p>}

          </div>

          <div className="sup-button-container">
            {/* <button type="button" className="cus-back-btn">
              Back
            </button> */}
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
