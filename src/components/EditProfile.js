import React from 'react';

function EditProfile(props) {
    // const { user, error } = this.props.auth;
    //     const { editMode } = this.state;
    return (
        <div className="setting-actions">
            <div className="settings-user-profile">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    alt=""
                    className="profile-pic large"
                />
                <div className="update-profile-pic-text">
                    <span className="black-text">amirkhann.17</span>
                    <span className="blue-text medium-text">
                        Change Profile Picture{' '}
                        <span className="black-text">&bull;</span> Remove
                        Profile Picture
                    </span>
                </div>
            </div>

            <div className="edit-profile">
                <div className="field">
                    <div className="field-label bold-text">Name</div>
                    <input type="text" />
                </div>
                <div className="field">
                    <div className="field-label bold-text">Username</div>
                    <input type="text" />
                </div>
                <div className="field">
                    <div className="field-label bold-text">Website</div>
                    <input type="text" />
                </div>
                <div className="field">
                    <div className="field-label bold-text">Bio</div>
                    <textarea row="4" />
                </div>
                <div className="field">
                    <input type="submit" />
                    {/* <span className="blue-text medium-text">Delete account</span> */}
                </div>
            </div>
        </div>
        // <div>
        //     {error && <div className="alert error-dailog">{error}</div>}
        //     {error === false && (
        //         <div className="alert success-dailog">Profile updated!</div>
        //     )}

        //     {editMode && (
        //         <div className="field">
        //             <div className="field-label">New password</div>

        //             <input
        //                 type="password"
        //                 onChange={(e) =>
        //                     this.handleChange('password', e.target.value)
        //                 }
        //                 value={this.state.password}
        //             />
        //         </div>
        //     )}

        //     {editMode && (
        //         <div className="field">
        //             <div className="field-label">Confirm password</div>

        //             <input
        //                 type="password"
        //                 onChange={(e) =>
        //                     this.handleChange('confirmPassword', e.target.value)
        //                 }
        //                 value={this.state.confirmPassword}
        //             />
        //         </div>
        //     )}

        //     <div className="btn-grp">
        //         {editMode ? (
        //             <button
        //                 className="button save-btn"
        //                 onClick={this.handleSave}
        //             >
        //                 Save
        //             </button>
        //         ) : (
        //             <button
        //                 className="button edit-btn"
        //                 onClick={() => this.handleChange('editMode', true)}
        //             >
        //                 Edit profile
        //             </button>
        //         )}

        //         {editMode && (
        //             <div
        //                 className="go-back"
        //                 onClick={() => this.handleChange('editMode', true)}
        //             >
        //                 Go back
        //             </div>
        //         )}
        //     </div>
        // </div>
    );
}

export default EditProfile;
