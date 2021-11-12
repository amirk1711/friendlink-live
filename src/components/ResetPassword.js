import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPass, validateLink } from '../actions/accounts';

function ResetPassword(props) {
    console.log('props in forgot : ', props);
    const { accounts, dispatch } = props;
    const {
        resetPassError,
        resetPassSuccess,
        resetPassInProgress,
        isResetLinkValidated,
        validatingResetLink,
        validationError,
    } = accounts;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let getTokenFromLink = props.location.search;
    getTokenFromLink = getTokenFromLink.substr(13);

    useEffect(() => {
        if (!isResetLinkValidated) {
            dispatch(validateLink(getTokenFromLink));
        }
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPass(getTokenFromLink, password, confirmPassword));
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            <form className="login-form">
                <h1 className="login-header">Friendlink</h1>

                {validatingResetLink && (
                    <div>
                        <p>Validating Reset Link...</p>
                    </div>
                )}

                {resetPassError && (
                    <div className="alert error-dailog">{resetPassError}</div>
                )}
                {resetPassSuccess && (
                    <div className="alert success-dailog">
                        {resetPassSuccess}
                    </div>
                )}
                {validationError && (
                    <div className="alert error-dailog">{validationError}</div>
                )}

                {isResetLinkValidated && !validatingResetLink && (
                    <>
                        <div className="login-field">
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <div className="login-field">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                            />
                        </div>

                        <div className="login-field">
                            {resetPassInProgress ? (
                                <button disabled={true}>Resetting...</button>
                            ) : (
                                <button onClick={handleFormSubmit}>
                                    Reset
                                </button>
                            )}
                        </div>
                    </>
                )}

                {(resetPassSuccess || resetPassError || validationError) && (
                    <div className="other-actions">
                        <span className="signup-text">
                            <Link to="/login" className="blue-text">
                                Go back to Login
                            </Link>
                        </span>
                    </div>
                )}
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

export default connect(mapStateToProps)(ResetPassword);
