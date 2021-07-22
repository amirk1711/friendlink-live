import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../actions/auth';

function EditProfile(props) {

    const loggedInUser = props.auth.user;
    // console.log('loggedInUser', loggedInUser);

    const [name, setName] = useState(loggedInUser.name);
    const [username, setUsername] = useState(loggedInUser.username);
    const [website, setWebsite] = useState(loggedInUser.webiste);
    const [bio, setBio] = useState(loggedInUser.bio);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name && username && website && bio) {
            // console.log(name, username, website, bio);
            props.dispatch(editUser(name, username, website, bio, loggedInUser._id));
        }
    }

    // console.log('props.auth.isUpdating', props.auth.isUpdating);
    if(props.auth.isUpdating){
        return (<div>Updating profile...</div>);
    }


    return (
        <div className="setting-actions">
            <div className="settings-user-profile">
                <img
                    src={loggedInUser.avatar}
                    alt=""
                    className="profile-pic large"
                />
                <div className="update-profile-pic-text">
                    <span className="black-text">{loggedInUser.username}</span>
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
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <div className="field-label bold-text">Username</div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="field">
                    <div className="field-label bold-text">Website</div>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>
                <div className="field">
                    <div className="field-label bold-text">Bio</div>
                    <textarea
                        row="4"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div className="field">
                    <input type="submit" onClick={handleSubmit}/>                    
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

export default connect(mapStateToProps)(EditProfile);
