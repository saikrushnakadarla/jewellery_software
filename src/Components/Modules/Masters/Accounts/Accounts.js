import React, { useState, useEffect } from "react";
import "./Accounts.css";
import InputField from "../../../Pages/InputField/InputField";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import baseURL from "../../../../Url/NodeBaseURL";


const RepairForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the account ID from URL params
  const [formData, setFormData] = useState({
    account_name: "",
    print_name: "",
    account_group: "",
    op_bal: "",
    dr_cr: "",
    metal_balance: "",
    address1: "",
    address2: "",
    city: "",
    gst_in: '',
    pincode: "",
    state: "",
    state_code: "",
    phone: "",
    mobile: "",
    contact_person: "",
    email: "",
    birthday: "",
    anniversary: "",
    branch: "",
    bank_account_no: "",
    bank_name: "",
    ifsc_code: "",
  });
  const [states, setStates] = useState([]);

  // Fetch data if editing an existing account
  useEffect(() => {
    if (id) {
      const fetchAccountData = async () => {
        try {
          const response = await fetch(`${baseURL}/get/account-details/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch account data");
          }
          const result = await response.json();
          // setFormData(result);
            // Parse dates without timezone adjustment
            const parseDate = (dateString) => {
              if (!dateString) return '';
              const date = new Date(dateString);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
              const day = String(date.getDate()).padStart(2, '0');
              return `${year}-${month}-${day}`;
            };
          setFormData({
            ...result,
            birthday: parseDate(result.birthday),
            anniversary: parseDate(result.anniversary),
          });
          
        } catch (error) {
          console.error("Error fetching account data:", error.message);
        }
      };
      fetchAccountData();
    }
  }, [id]);

  const [accountGroups, setAccountGroups] = useState([]);
  useEffect(() => {
    const fetchAccountGroups = async () => {
      try {
        const response = await fetch(`${baseURL}/accountsgroup`);
        if (!response.ok) {
          throw new Error("Failed to fetch account groups");
        }
        const data = await response.json();
        // Assuming the API returns an array of objects with `AccountsGroupName`
        const formattedOptions = data.map(group => ({
          value: group.AccountsGroupName,
          label: group.AccountsGroupName,
        }));
        setAccountGroups(formattedOptions);
      } catch (error) {
        console.error("Error fetching account groups:", error.message);
      }
    };
    fetchAccountGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict the 'mobile' field to 10 numeric characters
    if (name === 'mobile') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else if (name === 'account_name') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        print_name: prevData.print_name === prevData.account_name ? value : prevData.print_name,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      alert('Mobile number must be exactly 10 digits.');
      return;
    }

    try {
      // Step 1: Check for duplicate mobile number only when creating a new account (POST request)
      if (!id) {
        const duplicateCheckResponse = await fetch(`${baseURL}/get/account-details`);
        if (!duplicateCheckResponse.ok) {
          throw new Error("Failed to fetch accounts data for duplicate check");
        }
        const accounts = await duplicateCheckResponse.json();

        // Check if the mobile number already exists
        const isDuplicate = accounts.some((account) => account.mobile === formData.mobile);
        if (isDuplicate) {
          alert("This mobile number already exists. Please use a different number.");
          return;
        }
      }

      // Step 2: Proceed with form submission (POST or PUT)
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${baseURL}/edit/account-details/${id}`  // Update the account if ID exists
        : `${baseURL}/account-details`;           // Create a new account if no ID

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const result = await response.json();
      alert(id ? "Account updated successfully!" : "Account created successfully!");
      navigate("/accountstable");
    } catch (err) {
      console.error("Error submitting form:", err.message);
      alert(`Error: ${err.message}`);
    }
  };


  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/states`);
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

  return (
    <div className="main-container">
      <Container className="accounts-form-container">
        <form onSubmit={handleSubmit}>
          <Row className="accounts-form-section">
            <h4 className="mb-4">{id ? "Edit Account" : "Create Account"}</h4>
            <Col xs={12} md={4}>
              <InputField
                label="Account Name"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={12} md={4}>
              <InputField
                label="Print Name"
                name="print_name"
                value={formData.print_name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={12} md={4}>
              <InputField
                label="Group"
                name="account_group"
                type="select"
                value={formData.account_group}
                onChange={handleChange}
                options={accountGroups} // Dynamic options
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Op. Bal."
                name="op_bal"
                type="number"
                value={formData.op_bal}
                onChange={handleChange}
              />
            </Col>

            <Col xs={12} md={2}>
              <InputField
                label="Metal Balance"
                name="metal_balance"
                type="number"
                value={formData.metal_balance}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Dr/Cr"
                name="dr_cr"
                type="select"
                value={formData.dr_cr}
                onChange={handleChange}
                options={[
                  { value: "Dr", label: "Dr." },
                  { value: "Cr", label: "Cr." },
                ]}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Address"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Address2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Col>

            <Col xs={12} md={2}>
              <InputField
                label="Pincode"
                name="pincode"
                type="number"
                value={formData.pincode}
                onChange={handleChange}
              />
            </Col>
            {/* <Col xs={12} md={2}>
              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="State Code"
                name="state_code"
                type="text"
                value={formData.state_code}
                onChange={handleChange}
              />
            </Col> */}
            <Col xs={12} md={2}>
              <InputField
                label="State:"
                name="state"
                type="select"
                value={formData.state}
                onChange={handleStateChange} // Use handleStateChange to update the state and state_code
                options={states.map((state) => ({
                  value: state.state_name,
                  label: state.state_name,
                }))}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField label="State Code:" name="state_code" value={formData.state_code} onChange={handleChange} readOnly />
            </Col>

            <Col xs={12} md={3}>
              <InputField
                label="Phone"
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Mobile"
                name="mobile"
                type="number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Contact Person"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Birthday On"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="Anniversary On"
                name="anniversary"
                type="date"
                value={formData.anniversary}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="GSTIN:"
                name="gst_in"
                value={formData.gst_in}
                onChange={handleChange}

              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Bank Account No."
                name="bank_account_no"
                value={formData.bank_account_no}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <InputField
                label="IFSC Code"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <InputField
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="form-buttons">
            <Button
              variant="secondary"
              type="button"
              className="cus-back-btn"
              onClick={() => navigate("/accountstable")}
            >
              Cancel
            </Button>
            <Button type="submit" style={{ backgroundColor: '#a36e29', borderColor: '#a36e29' }}>

              {id ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default RepairForm;
