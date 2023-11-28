// SignupForm.js
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

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSignup() {
    // Add your signup logic here
    // You can make an API call or handle user registration as needed
    console.log('Signup logic here');
    console.log('Username:', this.state.username);
    console.log('Email:', this.state.email);
    console.log('Password:', this.state.password);
    this.props.closeForms(); // Close the signup form after successful signup
  }

  render() {
    return (
      <div style={modalStyle}>
        <h2 style={{ color: this.props.welcomeColor }}>Signup</h2>
        <form>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} style={inputStyle} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} style={inputStyle} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} style={inputStyle} />
          </label>
          <br />
          <button type="button" onClick={this.handleSignup} style={buttonStyle}>Signup</button>
          <button type="button" onClick={this.props.closeForms} style={buttonStyle}>Close</button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
