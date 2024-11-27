import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = { email: '', password: '' };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      updatedErrors.email = 'Valid email is required';
      isValid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      updatedErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        try {
            const response = await fetch('http://localhost:5000/login', { // Ensure port matches your backend
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);

                // Store user data in localStorage/sessionStorage if needed
                localStorage.setItem('user', JSON.stringify(result.user));

                // Display an alert
                alert('Login successful!');

                // Reset the form
                setFormData({
                    email: '',
                    password: '',
                });

                // Navigate to the dashboard or another destination
                navigate('/Dashboard');
            } else {
                // Handle error scenarios
                const errorData = await response.json();
                alert(`Failed to login: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    }
};


  return (
    <div className="main-container">
      <div className="tag">
        <div className="col-md-6" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://media.licdn.com/dms/image/C4E0BAQHno-6E-NDqOQ/company-logo_200_200/0/1630617294777?e=2147483647&v=beta&t=G2JTrcmP559lMBFdU8wOSv47Z8X-wBAm6n9oCDAd-zA"
            alt="Sysadmin"
            className="registration-image"
          />
        </div>
        <div className="col-md-6">
          <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="text-center pt-3">Welcome Back</h2>
            <p className="text-center">Login to stay connected.</p>
            <div className="mb-3">
              <label className="form-label">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email && 'is-invalid'}`}
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your email"
                style={{ borderRadius: 0, borderColor: 'black' }}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FontAwesomeIcon icon={faLock} /> Password
              </label>
              <div className="input-container" style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password && 'is-invalid'}`}
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  placeholder="Enter your password"
                  style={{ borderRadius: 0, borderColor: 'black', paddingRight: '40px' }} // Added paddingRight to accommodate icon
                />
                <i
                  href="#"
                  className="btn icon "
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    marginTop: "-5px",
                    top: '40%',
                    transform: 'translateY(-50%)',
                    right: '5px',
                    cursor: 'pointer',
                    zIndex: "1000",
                    padding: "6px",
                    borderRadius: 0,
                    height: "17px"
                  }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </i>
              </div>

              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-success" style={{ borderColor: '#2D9596' }}>
              Login
            </button>
            <br />
            <p>
              Create an Account{' '}
              <span>
                <a href="/Signup" style={{ borderColor: '#2D9596' }}>
                  Sign Up
                </a>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
