import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login, clearAuthState, googleAuth } from '../actions/auth';
import { GoogleLogin } from 'react-google-login';

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

    handleGoogleLogin = (response) => {
        this.props.dispatch(googleAuth(response));
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
                        <div className="or-text">
                            <div className="left-line"></div>OR
                            <div className="right-line"></div>
                        </div>
                        {/* <Link
                            className="social-auth"
                            to="/#"
                            onClick={this.handleGoogleLogin}
                        >
                            <img
                                src="https://image.flaticon.com/icons/png/128/281/281764.png"
                                alt=""
                            />
                            Continue with Google
                        </Link> */}

                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                                <Link
                                    className="social-auth"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                >
                                    <img
                                        src="https://image.flaticon.com/icons/png/128/281/281764.png"
                                        alt=""
                                    />
                                    Continue with Google
                                </Link>
                            )}
                            onSuccess={this.handleGoogleLogin}
                            onFailure={this.handleGoogleLogin}
                            cookiePolicy={'single_host_origin'}
                        />
                        {/* <GoogleLogout
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={logout}
                        ></GoogleLogout> */}
                        <Link className="forgot-text" to="/#">
                            Forgot Password?
                        </Link>
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
                        &copy; {new Date().getFullYear()} Friendlink From Amir
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
