import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../Pages/InputField/InputField";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../../../Url/NodeBaseURL";

function UserMaster() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Form state
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone_number: "",
    role: "",          // store user_type string
    user_type_id: "",  // store user_type_id
    password: "",
    retype_password: "",
    full_name: "",
  });

  // Store user types from DB
  const [userTypes, setUserTypes] = useState([]);

  // Fetch user types on component mount
  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const response = await axios.get(`${baseURL}/usertypes`);
        setUserTypes(response.data); // Array of { id, user_type }
      } catch (err) {
        console.error("Error fetching user types:", err.message);
      }
    };
    fetchUserTypes();
  }, []);

  // Fetch user data for editing
  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await axios.get(`${baseURL}/users/${id}`);
          const user = response.data;
          setFormData((prev) => ({
            ...prev,
            user_name: user.user_name || "",
            email: user.email || "",
            phone_number: user.phone_number || "",
            role: user.role || "",
            user_type_id: user.user_type_id || "",
            password: "",          // Blank for security
            retype_password: "",   // Blank for security
            full_name: user.full_name || "",
          }));
        } catch (err) {
          console.error("Error fetching user:", err.message);
        }
      }
    };
    fetchUser();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    if (name === "user_name") updatedValue = value.toUpperCase();
    if (name === "phone_number") updatedValue = value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => {
      // If user_type_id changed, also update role string
      if (name === "user_type_id") {
        const selectedType = userTypes.find((ut) => ut.id === parseInt(value));
        return {
          ...prev,
          user_type_id: value,
          role: selectedType ? selectedType.user_type : "", // set role string
        };
      }

      return {
        ...prev,
        [name]: updatedValue,
      };
    });
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.retype_password) {
      alert("Passwords do not match!");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone_number)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const payload = {
        ...formData,
        role: formData.role,           // user_type string
        user_type_id: formData.user_type_id, // user_type_id
      };
      console.log("payload=", payload)
      if (id) {
        await axios.put(`${baseURL}/users/${id}`, payload);
        alert("User updated successfully");
      } else {
        await axios.post(`${baseURL}/users`, payload);
        alert("User created successfully");
      }
      navigate("/usertable");
    } catch (err) {
      console.error("Error saving user:", err.message);
      alert("An error occurred while saving the user.");
    }
  };

  // Handle back
  const handleBack = () => navigate("/usertable");

  return (
    <div className="main-container">
      <div className="customer-master-container">
        <h2>{id ? "Edit User" : "Add User"}</h2>
        <form className="customer-master-form" onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <InputField
                label="User Name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
                autoFocus
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <InputField
                label="User Type"
                name="user_type_id"
                type="select"
                value={formData.user_type_id}
                onChange={handleChange}
                required
                options={userTypes.map((ut) => ({ value: ut.id, label: ut.user_type }))}
              />
            </Col>
            {!id && (
              <>
                <Col md={4}>
                  <InputField
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={4}>
                  <InputField
                    label="Retype Password"
                    name="retype_password"
                    value={formData.retype_password}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </>
            )}

          </Row>

          <div className="sup-button-container">
            <button type="button" className="cus-back-btn" onClick={handleBack}>
              Close
            </button>
            <button type="submit" className="cus-submit-btn">
              {id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserMaster;
