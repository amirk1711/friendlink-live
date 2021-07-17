import React from 'react';

function DeleteAccount(props) {
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
                </div>
            </div>

            <div className="delete-account">
                <div className="field">
                    <div className="field-label bold-text">Password</div>
                    <input type="password" />
                </div>


                <div className="field">
                    <input type="submit" value="Delete Account"/>
                </div>

                
            </div>
        </div>
    );
}

export default DeleteAccount;