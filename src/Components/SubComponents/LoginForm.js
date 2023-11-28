// LoginForm.js
import React from 'react';

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  backgroundColor: '#FFF',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '8px 0',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const buttonStyle = {
  backgroundColor: '#ea4c88',
  color: '#FFF',
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  margin: '0 5px',
};

const LoginForm = ({ closeForms, welcomeColor }) => {
  const handleLogin = () => {
    // Add your login logic here
    // You can make an API call or handle authentication as needed
    console.log('Login logic here');
    closeForms(); // Close the login form after successful login
  };

  return (
    <div style={modalStyle}>
      <h2 style={{ color: welcomeColor }}>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" name="username" style={inputStyle} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" style={inputStyle} />
        </label>
        <br />
        <button type="button" onClick={handleLogin} style={buttonStyle}>Login</button>
        <button type="button" onClick={closeForms} style={buttonStyle}>Close</button>
      </form>
    </div>
  );
};

export default LoginForm;
