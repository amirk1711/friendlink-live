import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendResetLink } from '../actions/accounts';

function ForgotPassword(props) {
    const { accounts, dispatch } = props;
    const { sentLinkError, sentLinkSuccess, sentLinkInProgress } = accounts;
    const [email, setEmail] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(sendResetLink(email));
    };

    return (
        <div>
            <form className="login-form">
                <h1 className="login-header">Friendlink</h1>
                {sentLinkError && <div className="alert error-dailog">{sentLinkError}</div>}
                {sentLinkSuccess && (
                    <div className="alert success-dailog">{sentLinkSuccess}</div>
                )}
                <div className="login-field">
                    <p className="grey-text medium-text">
                        Enter the email address associated with your account to
                        get the password reset link.
                    </p>
                </div>

                <div className="login-field">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className="login-field">
                    {sentLinkInProgress ? (
                        <button disabled={true}>Requesting...</button>
                    ) : (
                        <button onClick={handleFormSubmit}>
                            Request reset link
                        </button>
                    )}
                </div>

                <div className="other-actions">
                    <div className="or-text">
                        <div className="left-line"></div>OR
                        <div className="right-line"></div>
                    </div>

                    <span className="signup-text">
                        <Link to="/login" className="blue-text">
                            Go back to Login
                        </Link>
                    </span>
                </div>
            </form>

            <div className="text-center footer-text">
                <span className="copy-text medium-text">
                    &copy; {new Date().getFullYear()} Friendlink from Amir Khan
                </span>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts,
    };
}

export default connect(mapStateToProps)(ForgotPassword);
