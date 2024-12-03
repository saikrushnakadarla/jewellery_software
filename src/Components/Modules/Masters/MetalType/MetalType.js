import React, { useState } from 'react';
import InputField from '../../../Pages/InputField/InputField';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MetalType.css'

const MetalType = () => {
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

  return (
    <div className="main-container">

    <div className="container py-5">
      <div className="card shadow p-4 mb-4">
        <h3 className="text-center mb-4">Metal Type</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Metal Name */}
            <div className="col-md-4">
              <InputField
                label="Metal Name:"
                name="metal_name"
                value={formData.metal_name}
                onChange={handleChange}
                required={true}
              />
            </div>

            {/* Description */}
            <div className="col-md-4">
              <InputField
                label="Description:"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required={true}
              />
            </div>

            {/* Default Purity */}
            <div className="col-md-4">
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

            {/* Default Purity for Rate Entry */}
            <div className="col-md-4">
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
            </div>

            {/* Default Purity for Old Metal */}
            <div className="col-md-4">
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
            </div>

            {/* Default Issue Purity */}
            <div className="col-md-4">
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
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-5">
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Submitted Data Table */}
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Submitted Metal Data</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>S.no.</th>
                <th>Metal Name</th>
                <th>Description</th>
                <th>Default Purity</th>
                <th>Purity for Rate Entry</th>
                <th>Purity for Old Metal</th>
                <th>Issue Purity</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.length > 0 ? (
                submittedData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.metal_name}</td>
                    <td>{data.description}</td>
                    <td>{data.default_purity}</td>
                    <td>{data.default_purity_for_rate_entry}</td>
                    <td>{data.default_purity_for_old_metal}</td>
                    <td>{data.default_issue_purity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No data submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>

  );
};

export default MetalType;
