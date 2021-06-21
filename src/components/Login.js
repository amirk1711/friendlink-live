import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class Login extends Component {
  // to initialize a reference
  constructor(props) {
    // call parents(React.Component) constructor first
    super(props);

    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (e) => {
    // e.preventDefault();
    // console.log(e.target.value);
    this.setState({
        email: e.target.value,
    });

  };

  handlePasswordChange = (e) => {
    // e.preventDefault();
    // console.log(e.target.value);
    this.setState({
        password: e.target.value,
    });
    
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('this.emailInputRef', this.emailInputRef);
    // console.log('this.passwordInputRef', this.passwordInputRef);
    console.log('this.state', this.state);

    const {email, password} = this.state;
    if(email && password){
        // but for now dispatch will not be avialable 
        // because we have not connected it to store yet
        this.props.dispatch(login(email, password));
    }
  };

  render() {
      const {error, inProgress} = this.props.auth; 
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert-error-dialog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
        {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}

        </div>
      </form>
    );
  }
}


function mapStateToProps(state){
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Login);
