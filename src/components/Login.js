import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login, clearAuthState } from '../actions/auth';

class Login extends Component {
    constructor(props) {
        // call parents(React.Component) constructor first
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    // when component will unmount, clear the auth state
    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            // to use dispatch, first connect
            // this component to the store
            this.props.dispatch(login(email, password));
        }
    };

    render() {
        const { error, inProgress, isLoggedin } = this.props.auth;
        const { from } = this.props.location.state || {
            from: { pathname: '/' },
        };
        if (isLoggedin) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <form className="login-form">
                    <h1 className="login-header">Friendlink</h1>
                    {error && <div className="alert error-dailog">{error}</div>}
                    <div className="login-field">
                        <input
                            type="email"
                            placeholder="Email or username"
                            required
                            onChange={this.handleEmailChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="login-field">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={this.handlePasswordChange}
                            value={this.state.password}
                        />
                    </div>
                    <div className="login-field">
                        {inProgress ? (
                            <button
                                onClick={this.handleFormSubmit}
                                disabled={inProgress}
                            >
                                Logging in...
                            </button>
                        ) : (
                            <button
                                onClick={this.handleFormSubmit}
                                disabled={inProgress}
                            >
                                Log In
                            </button>
                        )}
                    </div>

                    <div className="other-actions">
                        <span className="signup-text">
                            Don't have an account?{' '}
                            <Link to="/signup" className="blue-text">
                                Sign up
                            </Link>
                        </span>
                    </div>
                </form>

                <div className="text-center footer-text">
                    <span className="copy-text medium-text">
                        &copy; {new Date().getFullYear()} Friendlink By Amir
                        Khan
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Login);
