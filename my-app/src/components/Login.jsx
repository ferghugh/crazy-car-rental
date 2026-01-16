import React, { Component } from "react";

/**
 * Login Component
 * Class-based component that renders an email/password login form.
 * Uses hardcoded credentials for demo: fergal@example.com / admin
 * State manages form inputs and displays success/error messages.
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    // Initialize form state: email, password inputs and message display
    this.state = { email: "", password: "", message: "" };
  }

  render() {
    return (
      <div className="col-lg-9">
        {/* Form title */}
        <h4 className="m-1 p-2 border-bottom">Login</h4>

        {/* Email input field */}
        <div className="form-group form-row">
          <label className="col-lg-4">Email:</label>
          {/* Controlled input - value synced to state */}
          <input
            type="text"
            className="form-control"
            value={this.state.email}
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
        </div>

        {/* Password input field */}
        <div className="form-group form-row">
          <label className="col-lg-4">Password:</label>
          {/* Controlled input - value synced to state */}
          <input
            type="password"
            className="form-control"
            value={this.state.password}
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
        </div>

        {/* Login button and success/error message display */}
        <div className="text-right">
          {/* Displays validation message (success or error) */}
          {this.state.message}

          {/* Submit button triggers onLoginClick validation */}
          <button className="btn btn-primary m-1" onClick={this.onLoginClick}>
            Login
          </button>
        </div>
      </div>
    );
  }

  /*
    Validates login credentials.
    Demo credentials: fergal@example.com / admin
   */
  onLoginClick = () => {//This is the function that handles the login process
    console.log(this.state);
    // Check credentials 
    if (
      this.state.email === "fergal@example.com" &&
      this.state.password === "admin"
    ) {
      // succecessfully logged-in
      this.setState({
        message: <span className="text-success">Successfully Logged-in</span>,
      });
    } else {
      // Invalid log-in
      this.setState({
        message: (
          <span className="text-danger">Invalid login, please try again</span>
        ),
      });
    }
  };
}