

import React, { useState } from "react";
import InputField from "../../../Pages/InputField/InputField";
import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
import { FaEdit, FaTrash } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Append formData to submittedData and reset the form
    setSubmittedData([...submittedData, formData]);
    setFormData({
      metal_name: '',
      description: '',
      default_purity: '',
      default_purity_for_rate_entry: '',
      default_purity_for_old_metal: '',
      default_issue_purity: '',
    });
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
        <h3  style={{ textAlign: 'center', marginBottom:'30px'  }}>Metal Type</h3>
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

          
          <div className="form-buttons">
        <Button variant="secondary" type="button" className="cus-back-btn" >
              Cancel
            </Button>
          <Button type="submit" variant="primary">Save</Button>
          {/* <Button type="button">Print</Button> */}
        </div>
        </form>

        {/* Purity Table */}
        <div style={{marginTop:'20px'}} className="purity-table-container">
          {/* <h3 style={{textAlign:'center'}}>Submitted Data</h3> */}
          <DataTable columns={columns} data={submittedData} />
        </div>
      </div>
    </div>
  );
}

export default MetalType;
