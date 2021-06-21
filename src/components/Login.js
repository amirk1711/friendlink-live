import React, { Component } from 'react';

class Login extends Component {
    // to initialize a reference
    constructor(props){
        // call parents(React.Component) constructor first
        super(props);

        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('this.emailInputRef', this.emailInputRef);
        console.log('this.passwordInputRef', this.passwordInputRef);
    };

    render() {
        return (
            <form className="login-form">
                <span className="login-signup-header">Log In</span>
                <div className="field">
                    <input type="email" placeholder="Email" required ref={this.emailInputRef} />
                </div>
                <div className="field">
                <input type="password" placeholder="Password" required ref={this.passwordInputRef} />
                </div>
                <div className="field">
                    <button onClick={this.handleFormSubmit}>Log In</button>
                </div>
            </form>
        );
    }
}

export default Login;