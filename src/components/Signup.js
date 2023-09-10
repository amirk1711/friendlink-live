import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    startSignup,
    signup,
    clearAuthState,
    checkUsername,
} from '../actions/auth';
import SimpleReactValidator from 'simple-react-validator';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            username: '',
        };
        this.validator = new SimpleReactValidator();
    }

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    handleInputChange = (field, value) => {
        this.setState({
            [field]: value,
        });
        if (field === 'username') {
            this.props.dispatch(checkUsername(value));
        }
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const { email, password, username, name } = this.state;
            if (email && password && username && name) {
                this.props.dispatch(startSignup());
                this.props.dispatch(signup(email, password, username, name));
            }
        } else {
            this.validator.showMessages();
            // re-render to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    };

    render() {
        const { inProgress, error, isLoggedin, isUsernameUnique } =
            this.props.auth;
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
                        {this.validator.message(
                            'email',
                            this.state.email,
                            'required|email',
                            { className: 'text-danger' }
                        )}
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
                        {this.validator.message(
                            'name',
                            this.state.name,
                            'required|alpha_space|max:60',
                            { className: 'text-danger' }
                        )}
                    </div>

                    <div className="login-field">
                        <input
                            placeholder="Username"
                            type="text"
                            required
                            onChange={(e) =>
                                this.handleInputChange(
                                    'username',
                                    e.target.value
                                )
                            }
                        />
                        {this.validator.message(
                            'username',
                            this.state.username,
                            'required|alpha_num_dash|max:60',
                            { className: 'text-danger' }
                        )}
                        {isUsernameUnique === false && (
                            <p className="text-danger">
                                Username already taken.
                            </p>
                        )}
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
                        {this.validator.message(
                            'password',
                            this.state.password,
                            'required|min:8',
                            { className: 'text-danger' }
                        )}
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
                        &copy; {new Date().getFullYear()} Friendlink By Amir
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
