
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("sai");
  const [email, setEmail] = useState("sai@gmail.com");
  const [password, setPassword] = useState("Sai@123");
  const [confirmPassword, setConfirmPassword] = useState("Sai@123");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false); // State to track if password field has been touched
  const [passwordPasted, setPasswordPasted] = useState(false); // State to track if password is pasted in confirm password field

  const validateUsername = (username) => {
    const regex = /^[A-Za-z]+$/; // Regular expression to match only letters
    return regex.test(username);
  };

  const collectData = async (e) => {
    e.preventDefault();
  
    // Reset previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  
    // Validate inputs here...

  let isValid = true;
    if (!name.trim()) {
      setNameError("Username is required");
      isValid = false;
    } else if (!validateUsername(name)) {
      setNameError("Username should contain only letters");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)
    ) {
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      );
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
  
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          confirmPassword,
        }),
      });
  
      const result = await response.json();
      console.log(result); // Log the result for debugging
  
      if (response.ok) {
        alert("User registered successfully");
        navigate("/login"); // Redirect to login or another page
      } else {
        alert(result.error || "Failed to register");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message || "An unexpected error occurred. Please try again.");
    }
  };
  
  


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordTouched(true); // Set password as touched when user starts typing
    setPasswordError(""); // Clear password error when user starts typing

    if (value.length >= 8 && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
      setPasswordError("Weak password");
    }
  };

  // Handle paste event on confirm password field
  const handleConfirmPasswordPaste = (e) => {
    // Prevent pasting password into confirm password field
    e.preventDefault();
    setPasswordPasted(true);
  };

  // Handle change in confirm password field
  const handleConfirmPasswordChange = (e) => {
    if (passwordPasted) {
      // If password is pasted, clear the state and prompt user to manually enter
      setConfirmPassword("");
      setPasswordPasted(false);
    } else {
      // If not pasted, proceed with normal change handling
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <div className="registration-container">
      <div className="row">
        <div className="col-md-6 column1">
          <img
            src="https://media.licdn.com/dms/image/C4E0BAQHno-6E-NDqOQ/company-logo_200_200/0/1630617294777?e=2147483647&v=beta&t=G2JTrcmP559lMBFdU8wOSv47Z8X-wBAm6n9oCDAd-zA"
            alt="Sysadmin"
            className="registration-image"
          />
        </div>
        <div className="col-md-6 column2">
          <form onSubmit={collectData} className="registration-form">
            <h2 className="text-center">SIGN UP</h2>
            <p className="text-center">Create your account</p>
            <div>
              <label className="form-label">Username*</label>
              <input
                type="text"
                className={`form-control ${nameError && "is-invalid"}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username"
                style={{ borderRadius: 0, borderColor: "black", backgroundColor: "white" }}
              />
              {nameError && (
                <div className="invalid-feedback">{nameError}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Email*</label>
              <input
                type="email"
                className={`form-control ${emailError && "is-invalid"}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ borderRadius: 0, borderColor: "black", backgroundColor: "white" }}
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password*</label>
              <div className="d-flex align-items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    password === confirmPassword &&
                    password !== "" &&
                    confirmPassword !== "" &&
                    "is-valid"
                    } ${passwordError ? "is-invalid" : ""}`}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  style={{
                    borderRadius: 0,
                    borderColor: password === confirmPassword && password !== "" && confirmPassword !== "" ? 'green' : 'black',
                    backgroundColor: "white",
                    height: "35px"
                  }}
                />
                <i
                  href="#"
                  className="btn btn icon"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    cursor: 'pointer', zIndex: "1000", padding: "5px",
                    height: "17px",
                    marginLeft: "-31px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                </i>
              </div>
              {passwordError && (
                <div className="invalid-feedback">{passwordError}</div>
              )}
              {passwordTouched && password && password.length < 8 && (
                <div className="password-strength-warning invalid-feedback">Password should be at least 8 characters</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password*</label>
              <div className="d-flex align-items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${
                    password === confirmPassword &&
                    password !== "" &&
                    confirmPassword !== "" &&
                    "is-valid"
                    } ${confirmPasswordError && "is-invalid"}`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onPaste={handleConfirmPasswordPaste} // Add onPaste event handler
                  placeholder="Confirm your password"
                  style={{
                    borderRadius: 0,
                    borderColor: password === confirmPassword && password !== "" && confirmPassword !== "" ? 'green' : 'black',
                    backgroundColor: "white",
                    height: "35px"
                  }}
                />
                <i
                  href="#"
                  className="btn btn icon"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    position: 'absolute',
                    cursor: 'pointer', zIndex: "1000", padding: "5px",
                    height: "17px",
                    marginLeft: "-31px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </i>
              </div>
              {confirmPasswordError && (
                <div className="invalid-feedback">
                  {confirmPasswordError}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "100px" }}
            >
              SIGN UP
            </button>
            <p>
              Already have an Account ?{" "}
              <span>
                <a href="/login" style={{ borderColor: "#2D9596" }}>
                  Sign In
                </a>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
