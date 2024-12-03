


import React, { useState } from 'react';
import InputField from '../../../Pages/InputField/InputField';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../MetalType/MetalType.css'

const Purity = () => {
  const [formData, setFormData] = useState({
    name: '',
    metal: '',
    purity_percentage: '',
    purity: '',
    urd_purity: '',
    desc: '',
    old_purity_desc: '',
    cut_issue: '',
    skin_print : '',
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
      name: '',
      metal: '',
      purity_percentage: '',
      purity: '',
      urd_purity: '',
      desc: '',
      old_purity_desc: '',
      cut_issue: '',
      skin_print: '',

    });
  };

  return (
    <div className="main-container">

      <div className="container py-5">
        <div className="card shadow p-4 mb-4">
          <h3 className="text-center mb-4">Purity</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Metal Name */}
              <div className="col-md-3">
                <InputField
                  label="Name:"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={true}
                />
              </div>

              {/* Description */}
              <div className="col-md-3">
                <InputField
                  label="Metal"
                  name="metal"
                  value={formData.metal}
                  onChange={handleChange}
                  required={true}
                />
              </div>             

              {/* Default Purity for Rate Entry */}
              <div className="col-md-3">
                <InputField
                   label="Purity Percentage:"
                  name="purity_percentage"
                  value={formData.purity_percentage}
                  onChange={handleChange}
                  required={true}
                />
              </div>

              {/* Default Purity for Old Metal */}
              <div className="col-md-3">
                <InputField
                  label="Purity:"
                  name="purity"
                  value={formData.purity}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="URD Purity:"
                  name="urd_purity"
                  value={formData.urd_purity}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="DESC:"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Old Purity Desc:"
                  name="old_purity_desc"
                  value={formData.old_purity_desc}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Cut Issue:"
                  name="cut_issue"
                  value={formData.cut_issue}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-md-3">
                <InputField
                  label="Skin Print:"
                  name="skin_print"
                  value={formData.skin_print}
                  onChange={handleChange}
                  required={true}
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
          <h3 className="text-center mb-4">Purity</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>S.no.</th>
                  <th>Name </th>
                  <th>Metal</th>
                  <th>Purity Percentage</th>
                  <th>Purity</th>
                  <th>URD Purity</th>
                  <th>DESC </th>
                  <th>Old Purity Desc</th>
                  <th>Cut Issue</th>
                  <th>Skin Print</th>

                </tr>
              </thead>
              <tbody>
                {submittedData.length > 0 ? (
                  submittedData.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.metal}</td>
                      <td>{data.purity_percentage}</td>
                      <td>{data.purity}</td>
                      <td>{data.urd_purity}</td>
                      <td>{data.desc}</td>
                      <td>{data.old_purity_desc}</td>
                      <td>{data.cut_issue}</td>
                      <td>{data.skin_print}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">
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

export default Purity;

