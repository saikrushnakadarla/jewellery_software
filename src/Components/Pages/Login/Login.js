import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import axios from 'axios';
import logo from '../Login/Logo/logo_dark.png';
import InputField from '../InputField/InputField';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // To navigate to the dashboard

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Submitting credentials:', { email, password }); // Debug log
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      console.log('Login response:', response.data); // Debug log
      if (response.data.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage('You do not have admin access.');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data); // Debug log
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="card" style={{ width: '36rem', marginTop: '100px' }}>
        <div className="card-body"   style={{
    backgroundColor: 'rgba(163, 110, 41, 0.08)',
   
  }}>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="mb-3" style={{ width: "250px", height: "100px" }} />
            <h3>Login</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              {/* <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              /> */}
              <InputField
                label="Email:"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>
            <div className="mb-3 position-relative">
              {/* <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label> */}
              {/* <input
                type={showPassword ? 'text' : 'password'}
                className="form-control mt-1"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
              <InputField
                type={showPassword ? 'text' : 'password'}
                label="Password:"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute"
                style={{ right: '10px', top: '10px', cursor: 'pointer' }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            {errorMessage && (
              <div className="text-danger mb-3">
                {errorMessage}
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                style={{
                  backgroundColor: '#a36e29',
                  color: 'white',
                  padding: '10px 20px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                }}              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
