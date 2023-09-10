import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../actions/auth';

function ChangePassword(props) {
    const { user } = props.auth;

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        props.dispatch(changePassword(oldPassword, newPassword, confirmPassword));
    }

    if(props.auth.isUpdating){
        return (<div>Updating Password...</div>);
    }

    return (
        <div className="setting-actions">
            <div className="settings-user-profile">
                <img src={user.avatar} alt="" className="profile-pic large" />
                <div className="update-profile-pic-text">
                    <span className="black-text">{user.username}</span>
                </div>
            </div>

            <div className="change-password">
                <div className="field">
                    <div className="field-label bold-text">Old Password</div>
                    <input
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div className="field">
                    <div className="field-label bold-text">New Password</div>
                    <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="field">
                    <div className="field-label bold-text">
                        Confirm New Password
                    </div>
                    <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="field">
                    <input type="submit" value="Change Password" onClick={handleSubmit}/>
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

export default connect(mapStateToProps)(ChangePassword);
