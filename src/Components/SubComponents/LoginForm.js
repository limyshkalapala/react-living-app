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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: '', // New state to store error messages
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: '' }); // Clear error message on input change
  }

  handleLogin() {
    const { username, password } = this.state;
    const lambdaUrl = 'https://pjx9dst1l4.execute-api.us-east-1.amazonaws.com/production/login';

    const requestData = {
      username,
      password,
    };

    fetch(lambdaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        const parsedData = JSON.parse(data.body);
        console.log('Parsed data:', parsedData);

        localStorage.setItem('username', parsedData.username);
        localStorage.setItem('s3Link', parsedData.profile_image_url);

        this.props.closeForms();
      })
      .catch(error => {
        console.error('Error calling Lambda function:', error);

        // Handle different error scenarios
        if (error.message.includes('Password is incorrect')) {
          this.setState({ error: 'Incorrect password' });
        } else if (error.message.includes('Username is not registered')) {
          this.setState({ error: 'Username not registered' });
        } else {
          this.setState({ error: 'An error occurred during login' });
        }
      });
  }

  render() {
    return (
      <div style={modalStyle}>
        <h2 style={{ color: this.props.welcomeColor }}>Login</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              style={inputStyle}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              style={inputStyle}
            />
          </label>
          <br />
          {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
          <button type="button" onClick={this.handleLogin} style={buttonStyle}>
            Login
          </button>
          <button type="button" onClick={this.props.closeForms} style={buttonStyle}>
            Close
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
