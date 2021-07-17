import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSignup, signup, clearAuthState } from '../actions/auth';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            username: '',
        };
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    handleInputChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, name } = this.state;

        if (email && password && confirmPassword && name) {
            this.props.dispatch(startSignup());
            this.props.dispatch(signup(email, password, confirmPassword, name));
        }
    };

    render() {
        const { inProgress, error, isLoggedin } = this.props.auth;
        if (isLoggedin) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <form className="login-form">
                    <h1 className="login-header">Friendlink</h1>
                    {error && <div className="alert error-dailog">{error}</div>}

                    <div className="login-field">
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            onChange={(e) =>
                                this.handleInputChange('email', e.target.value)
                            }
                        />
                    </div>

                    <div className="login-field">
                        <input
                            placeholder="Name"
                            type="text"
                            required
                            onChange={(e) =>
                                this.handleInputChange('name', e.target.value)
                            }
                        />
                    </div>

                    <div className="login-field">
                        <input
                            placeholder="Username"
                            type="password"
                            required
                            onChange={(e) =>
                                this.handleInputChange(
                                    'confirmPassword',
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="login-field">
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            onChange={(e) =>
                                this.handleInputChange(
                                    'password',
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="login-field">
                        {inProgress ? (
                            <button
                                onClick={this.onFormSubmit}
                                disabled={inProgress}
                            >
                                Signing up...
                            </button>
                        ) : (
                            <button
                                onClick={this.onFormSubmit}
                                disabled={inProgress}
                            >
                                Sign Up
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

                        <span className="signup-text">
                            Already have an account?{' '}
                            <Link to="/login" className="blue-text">
                                Log in
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

const mapStateToProps = ({ auth }) => ({
    auth,
});

export default connect(mapStateToProps)(Signup);
