import React, { useState, useEffect, useRef } from "react";
import InputField from "../../../Pages/InputField/InputField";
import DataTable from "../../../Pages/InputField/TableLayout"; // Reusable table component
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL";
import { Row, Col } from 'react-bootstrap';


function Purity() {
  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    state_code: "",
    country: "",
    mobile: "",
    phone: "",
    website: "",
    gst_no: "",
    pan_no: "",
    bank_name: "",
    bank_account_no: "",
    ifsc_code: "",
    branch: "",
    bank_url: "",
  });
  const [states, setStates] = useState([]);

  const formRef = useRef(null); // Create a reference for the form
  const [submittedData, setSubmittedData] = useState([]); // Store fetched and submitted form entries
  const [editMode, setEditMode] = useState(false); // Toggle between add and edit modes
  const [editId, setEditId] = useState(null); // Store ID of the record being edited
  const [errors, setErrors] = useState({}); // Store validation errors

  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/companies`);
        setSubmittedData(response.data); // Populate table with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get/states');
        setStates(response.data); // Assuming `states` is a state variable to store states data
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = states.find((state) => state.state_name === e.target.value);
    setFormData({
      ...formData,
      state: selectedState?.state_name || "",
      state_code: selectedState?.state_code || "",
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      try {
        const response = await axios.put(`${baseURL}/api/companies/${editId}`, formData);
        setSubmittedData(
          submittedData.map((item) =>
            item.purity_id === editId ? { ...formData, purity_id: editId } : item
          )
        );

        resetForm();
        alert(`CompanyInfo updated successfully!`);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      try {
        const response = await axios.post(`${baseURL}/api/companies/`, formData);
        setSubmittedData([...submittedData, { ...formData, purity_id: response.data.id }]);
        resetForm();
        alert(`CompanyInfo created successfully!`);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  const handleEdit = (row) => {
    setEditMode(true);
    setEditId(row.purity_id); // Set the ID of the record being edited
    setFormData({ ...row }); // Pre-fill the form with the selected record's data
    setErrors({}); // Clear any previous errors

    // Scroll to the form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the record with ID ${id}?`);

    if (!isConfirmed) {
      return; // Do nothing if the user cancels the action
    }

    try {
      await axios.delete(`${baseURL}/purity/${id}`);
      setSubmittedData(submittedData.filter((item) => item.purity_id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      company_name: "",
      address: "",
      address2: "",
      city: "",
      pincode: "",
      state: "",
      state_code: "",
      country: "",
      mobile: "",
      phone: "",
      website: "",
      gst_no: "",
      pan_no: "",
      bank_name: "",
      bank_account_no: "",
      ifsc_code: "",
      branch: "",
      bank_url: "",
    });
    setEditMode(false);
    setEditId(null);
    setErrors({});
  };

  const columns = React.useMemo(
    () => [
      { Header: "Sr. No.", Cell: ({ row }) => row.index + 1 },
      { Header: "Company Name", accessor: "company_name" },
      { Header: "Address", accessor: "address" },
      { Header: "Address2", accessor: "address2" },
      { Header: "City", accessor: "city" },
      { Header: "Pincode", accessor: "pincode" },
      { Header: "State", accessor: "state" },
      { Header: "State Code", accessor: "state_code" },
      { Header: "Country", accessor: "country" },
      { Header: "Mobile", accessor: "mobile" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Website", accessor: "website" },
      { Header: "GST No", accessor: "gst_no" },
      { Header: "PAN No", accessor: "pan_no" },
      { Header: "Bank Name", accessor: "bank_name" },
      { Header: "Account No", accessor: "bank_account_no" },
      { Header: "IFSC Code", accessor: "ifsc_code" },
      { Header: "Branch", accessor: "branch" },
      { Header: "Bank URL", accessor: "bank_url" },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <button className="action-button edit-button" >
              <FaEdit />
            </button>
            <button
              className="action-button delete-button"
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
          {editMode ? "Edit Company Info" : "Company Info"}
        </h3>
        <form ref={formRef} className="customer-master-form" onSubmit={handleSubmit}>
          <Row>
            <Col md={3}>
              <InputField label="Company Name:" name="company_name" value={formData.company_name} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <InputField label="Address:" name="address" value={formData.address} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <InputField label="Address 2:" name="address2" value={formData.address2} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <InputField label="City:" name="city" value={formData.city} onChange={handleChange} />
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <InputField label="Pincode:" name="pincode" value={formData.pincode} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <label>State:</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleStateChange}
                className="form-control"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.state_id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </select>
            </Col>

            <Col md={3}>
              <InputField label="State Code:" name="state_code" value={formData.state_code} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <InputField label="Country:" name="country" value={formData.country} onChange={handleChange} />
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <InputField label="Mobile:" name="mobile" value={formData.mobile} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <InputField label="Phone:" name="phone" value={formData.phone} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <InputField label="Website:" name="website" value={formData.website} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <InputField label="GST No:" name="gst_no" value={formData.gst_no} onChange={handleChange} />
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <InputField label="PAN No:" name="pan_no" value={formData.pan_no} onChange={handleChange} />
            </Col>
            <Col md={2}>
              <InputField label="Bank Name:" name="bank_name" value={formData.bank_name} onChange={handleChange} />
            </Col>
            <Col md={2}>
              <InputField label="Branch:" name="branch" value={formData.branch} onChange={handleChange} />
            </Col>
            <Col md={2}>
              <InputField label="Bank URL:" name="bank_url" value={formData.bank_url} onChange={handleChange} />
            </Col>
            <Col md={2}>
              <InputField label="Account No:" name="bank_account_no" value={formData.bank_account_no} onChange={handleChange} />
            </Col>
            <Col md={2}>
              <InputField label="IFSC Code:" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} />
            </Col>
          </Row>



          <div className="sup-button-container">
            <button type="submit" className="cus-submit-btn">
              {editMode ? "Update" : "Save"}
            </button>
          </div>
        </form>

        <div style={{ marginTop: "20px" }} className="purity-table-container">
          <DataTable columns={columns} data={[...submittedData].reverse()} />
        </div>
      </div>
    </div>

  );
}

export default Purity;