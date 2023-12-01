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
      profileImage: null,  // New state for profile image
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleInputChange(event) {
    const { name, type, files } = event.target;
  
    if (type === 'file' && files.length > 0) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        this.setState({ [name]: { file: files[0], base64: reader.result } }, () => {
          // After setting the state, log the profileImage to the console
          console.log('Profile Image:', this.state.profileImage);
        });
      };
  
      reader.readAsDataURL(files[0]);
    } else {
      const { value } = event.target;
      this.setState({ [name]: value });
    }
  }

  handleSignup() {
    const { username, email, password, profileImage } = this.state;
    const lambdaUrl = 'https://pjx9dst1l4.execute-api.us-east-1.amazonaws.com/production/signup';

    // Prepare the data to send to the Lambda function
    const requestData = {
      username,
      email,
      password,
      image: profileImage ? profileImage.base64 : null,  // Pass base64 data of the image
    };

    console.log('Lambda function request:', requestData);


    // Make the API call to your Lambda function using fetch
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
        console.log('Lambda function response:', data);
        // Handle success or additional logic here
        this.props.closeForms(); // Close the signup form after successful signup
      })
      .catch(error => {
        console.error('Error calling Lambda function:', error);
        // Handle error or display an error message to the user
      });
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
          <label>
            Profile Image:
            <input type="file" accept="image/*" name="profileImage" onChange={this.handleInputChange} style={inputStyle} />
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
