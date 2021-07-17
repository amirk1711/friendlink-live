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
        console.log('props from login', this.props);
        const { error, inProgress, isLoggedin } = this.props.auth;
        const { from } =
            {
                from: { pathname: '/' },
            } || this.props.location.state;
        if (isLoggedin) {
            return <Redirect to={from} />;
        }
        return (
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
                    <Link className="social-auth">
                        <img
                            src="https://image.flaticon.com/icons/png/128/281/281764.png"
                            alt=""
                        />
                        Continue with Google
                    </Link>
                    <Link className="forgot-text">Forgot Password?</Link>
                    <span className="signup-text">
                        Don't have an account?{' '}
                        <Link to="/signup" className="blue-text">
                            Sign up
                        </Link>
                    </span>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Login);
