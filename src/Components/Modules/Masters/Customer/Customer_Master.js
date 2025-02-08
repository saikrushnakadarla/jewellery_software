
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import InputField from '../../../Pages/InputField/InputField';
import './Customer_Master.css';
import axios from "axios";

import { Row, Col } from 'react-bootstrap';
import baseURL from '../../../../Url/NodeBaseURL';


function Customer_Master() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    account_name: '',
    print_name: '',
    account_group: 'CUSTOMERS',
    address1: '',
    address2: '',
    city: '',
    pincode: '',
    state: '',
    state_code: '',
    phone: '',
    mobile: '',
    email: '',
    birthday: '',
    anniversary: '',
    bank_account_no: '',
    bank_name: '',
    ifsc_code: '',
    branch: '',
    gst_in: '',
    aadhar_card: '',
    pan_card: '',
  });
  const [existingMobiles, setExistingMobiles] = useState([]); // Track existing mobile numbers

  const [tcsApplicable, setTcsApplicable] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  const [states, setStates] = useState([]);


  useEffect(() => {
    // Fetch existing customers to check for duplicate mobile numbers
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${baseURL}/get/account-details`);
        if (response.ok) {
          const result = await response.json();
          const mobiles = result
            .filter((item) => item.account_group === 'CUSTOMERS')
            .map((item) => item.mobile);
          setExistingMobiles(mobiles);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    // Fetch specific customer if editing
    const fetchCustomer = async () => {
      if (id) {
        try {
          const response = await fetch(`${baseURL}/get/account-details/${id}`);
          if (response.ok) {
            const result = await response.json();
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
            }
        } catch (error) {
          console.error('Error fetching customer:', error);
        }
      }
    };

    fetchCustomers();
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
  
    switch (name) {
      case "account_name":
        // Capitalize first letter and update print_name if it matches account_name
        updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setFormData((prevData) => ({
          ...prevData,
          [name]: updatedValue,
          print_name: prevData.print_name === prevData.account_name ? updatedValue : prevData.print_name,
        }));
        return; // Return early since we've already updated state
  
      case "print_name":
        // Capitalize first letter
        updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
        break;
  
      case "mobile":
      case "phone":
        // Allow only numbers and limit to 10 digits
        updatedValue = value.replace(/\D/g, "").slice(0, 10);
        break;
  
      case "aadhar_card":
        // Allow only numbers and limit to 12 digits
        updatedValue = value.replace(/\D/g, "").slice(0, 12);
        break;
  
      case "pincode":
        // Allow only numbers and limit to 6 digits
        updatedValue = value.replace(/\D/g, "").slice(0, 6);
        break;
  
      case "gst_in":
        // GSTIN must be 15 alphanumeric characters (uppercase)
        updatedValue = value.toUpperCase().slice(0, 15);
        break;
  
      case "pan_card":
        // PAN must be 10 alphanumeric characters (uppercase)
        updatedValue = value.toUpperCase().slice(0, 10);
        break;
  
      case "ifsc_code":
        // IFSC must be exactly 11 alphanumeric characters (uppercase)
        updatedValue = value.toUpperCase().slice(0, 11);
        break;
  
      default:
        break;
    }
  
    // Update state
    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
  

  const handleCheckboxChange = () => {
    setTcsApplicable(!tcsApplicable);
  };

  const validateForm = () => {
    if (!formData.account_name.trim()) {
      alert("Customer Name is required.");
      return false;
    }
    if (!formData.mobile.trim()) {
      alert("Mobile number is required.");
      return false;
    }
    // if (formData.mobile.length !== 10) {
    //   alert("Mobile number must be exactly 10 digits.");
    //   return false;
    // }
    // if (formData.aadhar_card.length !== 12) {
    //   alert("Aadhar Card must be exactly 12 digits.");
    //   return false;
    // }
    // if (formData.pan_card.length !== 10) {
    //   alert("PAN Card must be exactly 10 characters.");
    //   return false;
    // }
    // if (formData.gst_in.length !== 15) {
    //   alert("GSTIN must be exactly 15 characters.");
    //   return false;
    // }
    // if (formData.ifsc_code.length !== 11) {
    //   alert("IFSC Code must be exactly 11 characters.");
    //   return false;
    // }
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      // Check for duplicate mobile only when creating a new customer
      if (!id) {
        const response = await fetch(`${baseURL}/get/account-details`);
        if (!response.ok) {
          throw new Error("Failed to fetch data for duplicate check.");
        }
        const result = await response.json();
        const isDuplicateMobile = result.some((item) => item.mobile === formData.mobile);
  
        if (isDuplicateMobile) {
          alert("This mobile number is already associated with another entry.");
          return;
        }
      }
  
      // Proceed with saving the record (POST or PUT)
      const method = id ? "PUT" : "POST";
      const endpoint = id
        ? `${baseURL}/edit/account-details/${id}`
        : `${baseURL}/account-details`;
  
      const saveResponse = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, tcsApplicable }),
      });
  
      if (saveResponse.ok) {
        alert(`Customer ${id ? "updated" : "created"} successfully!`);
        navigate("/customerstable");
      } else {
        alert("Failed to save customer.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the request.");
    }
  };
  
  


  const handleBack = () => {
    const from = location.state?.from || "/customerstable";
    navigate(from);
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
      <div className="customer-master-container">
        <h2>{id ? 'Edit Customer' : 'Add Customer'}</h2>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <Row>
            <Col md={4}>
              <InputField
                label="Trade / Customer Name"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Print Name"
                name="print_name"
                value={formData.print_name}
                onChange={handleChange}
                required
              />
            </Col>
            {/* <Col md={4}>
      <InputField
        label="Account Group:"
        name="account_group"
        value="CUSTOMER"
        readOnly
      />
    </Col> */}
            <Col md={4}>
              <InputField
                label="Address1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}

              />
            </Col>

            <Col md={4}>
              <InputField
                label="Address2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}

              />
            </Col>
            <Col md={4}>
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}

              />
            </Col>
            <Col md={4}>
              <InputField
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}

              />
            </Col>
           

            <Col md={3}>
              <InputField
                label="State"
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
            <Col md={3}>
              <InputField label="State Code:" name="state_code" value={formData.state_code} onChange={handleChange} readOnly />
            </Col>
            <Col md={3}>
              <InputField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}

              />
            </Col>
            <Col md={3}>
              <InputField
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}

              />
            </Col>

            <Col md={2}>
              <InputField
                label="Birthday"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}

              />
            </Col>
            <Col md={2}>
              <InputField
                label="Anniversary"
                name="anniversary"
                type="date"
                value={formData.anniversary}
                onChange={handleChange}

              />
            </Col>
            <Col md={4}>
              <InputField
                label="Bank Account No"
                name="bank_account_no"
                value={formData.bank_account_no}
                onChange={handleChange}

              />
            </Col>
            <Col md={3}>
              <InputField
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}

              />
            </Col>

            <Col md={3}>
              <InputField
                label="IFSC Code"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}

              />
            </Col>
            <Col md={3}>
              <InputField
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}

              />
            </Col>
            <Col md={3}>
              <InputField
                label="GSTIN"
                name="gst_in"
                value={formData.gst_in}
                onChange={handleChange}

              />
            </Col>
            <Col md={4}>
              <InputField
                label="Aadhar Card"
                name="aadhar_card"
                value={formData.aadhar_card}
                onChange={handleChange}

              />
            </Col>
            <Col md={4}>
              <InputField
                label="PAN Card"
                name="pan_card"
                value={formData.pan_card}
                onChange={handleChange}

              />
            </Col>
          </Row>

          {/* Checkbox */}
          <Row>
            <Col>
              <div className="form-group">
                <label className="checkbox-label" htmlFor="tcs">
                  <input
                    type="checkbox"
                    id="tcs"
                    name="tcsApplicable"
                    className="checkbox-input"
                    checked={tcsApplicable}
                    onChange={handleCheckboxChange}
                  />
                  TCS Applicable
                </label>
              </div>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="sup-button-container">
            <button
              type="button"
              className="cus-back-btn"
              onClick={handleBack}
            >
              Close
            </button>
            <button
              type="submit"
              className="cus-submit-btn"
            >
              {id ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Customer_Master;
