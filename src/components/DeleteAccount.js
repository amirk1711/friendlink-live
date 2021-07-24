import React from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../actions/auth';

function DeleteAccount(props) {
    console.log('props in delete acc', props);
    const { user } = props.auth;

    const handleSubmit = () => {
        props.dispatch(deleteAccount(user._id));
    };

    if (props.auth.isUpdating) {
        return <div>Deleting your account..</div>;
    }

    return (
        <div className="setting-actions">
            <div className="settings-user-profile">
                <img src={user.avatar} alt="" className="profile-pic large" />
                <div className="update-profile-pic-text">
                    <span className="black-text">{user.username}</span>
                </div>
            </div>

            <div className="delete-account">
                <div className="field">
                    <input
                        type="submit"
                        value="Delete Account"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps({ auth }) {
    return {
        auth,
    };
}

export default connect(mapStateToProps)(DeleteAccount);
