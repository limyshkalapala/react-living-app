// WelcomeComponent.js
import React from 'react';
import FooterComponent from './SubComponents/FooterComponent.js';
import WelcomeDetailsComponent from './SubComponents/WelcomeDetailsComponent.js';
import logo from '../logo.png';
import LoginForm from './SubComponents/LoginForm.js';
import SignupForm from './SubComponents/SignupForm.js';

let inherit_height = {
  height: 'inherit'
};

let primary_color = {
  color: 'rgb(234, 76, 136)'
};

let buttons_container = {
  width: '100%',
  textAlign: 'center'
};

let details_button = {
  height: '38px',
  padding: '0 15px',
  textAlign: 'center',
  fontSize: '11px',
  fontWeight: '600',
  lineHeight: '38px',
  letterSpacing: '.1rem',
  textTransform: 'uppercase',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  borderRadius: '4px',
  border: '1px solid #bbb',
  cursor: 'pointer',
  boxSizing: 'border-box',
  display: 'inline-block',
  color: '#ea4c88',
  backgroundColor: '#FFF',
  borderColor: '#FFF',
  margin: '0 10px'
};

let login_signup_button = {
  height: '38px',
  padding: '0 15px',
  textAlign: 'center',
  fontSize: '11px',
  fontWeight: '600',
  lineHeight: '38px',
  letterSpacing: '.1rem',
  textTransform: 'uppercase',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  borderRadius: '4px',
  border: '1px solid #bbb',
  cursor: 'pointer',
  boxSizing: 'border-box',
  display: 'inline-block',
  color: '#FFF',
  backgroundColor: '#ea4c88',
  borderColor: '#ea4c88',
  margin: '0 10px'
};

class WelcomeComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      openDetails: false,
      showLogin: false,
      showSignup: false,
      username: localStorage.getItem('username'),
      s3Link: localStorage.getItem('s3Link')
    };

    this.openDetails = this.openDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
    this.showSignupForm = this.showSignupForm.bind(this);
    this.closeForms = this.closeForms.bind(this);
  }

  openDetails() {
    this.setState({ openDetails: true });
  }

  closeDetails() {
    this.setState({ openDetails: false });
  }

  showLoginForm() {
    this.setState({ showLogin: true, showSignup: false });
  }

  showSignupForm() {
    this.setState({ showLogin: false, showSignup: true });
  }

  closeForms() {
    this.setState({ showLogin: false, showSignup: false });
  }

  // Add a new method to handle signout
  handleSignout = () => {
    // Remove username from local storage or perform any other signout logic
    localStorage.removeItem('username');
    // Optionally, you can update the state to reflect the signout
    this.setState({ username: null });
  };

  render() {
    // Retrieve values from local storage
    const username = localStorage.getItem('username');
    const s3Link = localStorage.getItem('s3Link');

    const userInfoStyle = {
      position: 'fixed',
      bottom: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '300px',
      background: '#FFF',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      zIndex: '9999',
    };

    const greetingStyle = {
      fontSize: '18px',
      margin: '5px 0',
    };

    const imageStyle = {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      margin: '5px 0',
    };

    return (
      <div style={inherit_height}>
        {(!this.state.openDetails) && <div className="aligner">
          <div>
            <div className='welcome-block'>
              {(username && s3Link) &&
                <div style={userInfoStyle}>
                  <p style={greetingStyle}>Hello, {username}!</p>
                  <img src={s3Link} alt="Profile" style={imageStyle} />
                  <button style={login_signup_button} onClick={this.handleSignout}>Signout</button>
                </div>
              }
              <img src={logo} className='welcome-logo' alt='logo' />
              <h3 className='welcome-intro'>citii.<span style={primary_color}>io</span></h3>
              <p className='welcome-description'> Ever thought how far your current salary will go in another city? This simple app will calculate how much more (or less) you would need in order to maintain the same standard of living in another city!</p>
              <div style={buttons_container}>
                <button style={details_button} onClick={this.openDetails}>Details</button>
                <button className='continue-button' onClick={this.props.nextStep}>Start</button>
                {!username && <button style={login_signup_button} onClick={this.showLoginForm}>Login</button>}
                {!username && <button style={login_signup_button} onClick={this.showSignupForm}>Signup</button>}
              </div>
            </div>
          </div>
          <FooterComponent />
        </div>}
        {(this.state.openDetails) && <WelcomeDetailsComponent closeDetails={this.closeDetails} />}
        {this.state.showLogin && <LoginForm closeForms={this.closeForms} />}
        {this.state.showSignup && <SignupForm closeForms={this.closeForms} />}
      </div>
    );
  }
}

export default WelcomeComponent;
