import React from 'react';

class ReportsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username') || '',
      reportLinks: [],
    };
  }

  fetchReports = async () => {
    try {
      // Fetch reports based on the username from Lambda
      const { username } = this.state;
      const lambdaEndpoint = 'https://pjx9dst1l4.execute-api.us-east-1.amazonaws.com/production/fetch-reports'; // Replace with your Lambda endpoint
      const response = await fetch(lambdaEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { userName: username } }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setState({ reportLinks: data.publicLinks || [] });
      } else {
        console.error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  componentDidMount() {
    // Fetch reports when the component mounts
    this.fetchReports();
  }

  render() {
    const { username, reportLinks } = this.state;

    return (
      <div>
        <h2>Reports</h2>
        <p>Username: {username}</p>

        {/* Display report links */}
        <ul>
          {reportLinks.map((link, index) => (
            <li key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Report {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ReportsComponent;
