import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changeProfilePic, editUser } from '../actions/auth';
import { storage } from '../config/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

function EditProfile(props) {
    const loggedInUser = props.auth.user;

    const [name, setName] = useState(loggedInUser.name);
    const [username, setUsername] = useState(loggedInUser.username);
    const [website, setWebsite] = useState(loggedInUser.website);
    const [bio, setBio] = useState(loggedInUser.bio);
    const [profile, setProfile] = useState(loggedInUser.avatar);

    const [image, setImage] = useState(loggedInUser.avatar);
    const [localUrl, setLocalUrl] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleCancelBtn = () => {
        setImage(null);
        document.getElementById('file-p').value = null;
    };

    useEffect(() => {
        handleCancelBtn()
    }, [props.auth.isUploaded]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name && username && website && bio) {
            props.dispatch(
                editUser(name, username, website, bio, loggedInUser._id)
            );
        }
    };

    if (props.auth.isUpdating) {
        return <div>Updating profile...</div>;
    }

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setLocalUrl(URL.createObjectURL(e.target.files[0]));
        }
    };


    const handleSaveBtn = () => {
        if (profile.substr(8, 5) !== 'image') {
            // it means user has already uploaded a profile pic
            // delete that profile pic before uploading the new one
            let profileRef = storage.refFromURL(profile);
            profileRef
                .delete()
                .then(() => {
                    console.log('Image deleted from firebase!');
                })
                .catch((err) =>
                    console.log('Error in deleting image from firebase', err)
                );
        }

        const uploadTask = storage
            .ref(`profileImages/${image.name + '-' + Date.now()}`)
            .put(image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setProgress(
                    Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                );
            },
            (error) => {
                console.log('error', error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log('url of image', url);
                    props.dispatch(changeProfilePic(url));
                    setProfile(url);
                });
            }
        );
    };

    const handleRemoveBtn = () => {
        if (profile.substr(8, 5) !== 'image') {
            // it means user has already uploaded a profile pic
            // delete that profile pic before uploading the new one
            let profileRef = storage.refFromURL(profile);
            profileRef
                .delete()
                .then(() => {
                    console.log('Image deleted from firebase!');
                })
                .catch((err) =>
                    console.log('Error in deleting image from firebase', err)
                );
        }

        props.dispatch(
            changeProfilePic(
                'https://image.flaticon.com/icons/png/512/848/848043.png'
            )
        );
        setProfile('https://image.flaticon.com/icons/png/512/848/848043.png');
    };


    return (
        <div className="setting-actions">
            <div className="settings-user-profile">
                <img src={profile} alt="" className="profile-pic large" />
                <div className="update-profile-pic-text">
                    <span className="black-text">{loggedInUser.username}</span>
                    <span className="blue-text medium-text file-input">
                        <input
                            type="file"
                            id="file-p"
                            className="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-p">Change </label>
                        <span className="black-text">&bull;</span>{' '}
                        <span
                            className="remove-profile-text"
                            onClick={handleRemoveBtn}
                        >
                            Remove
                        </span>
                    </span>
                </div>
            </div>

            {image && (
                <div className="profile-preview">
                    <img
                        src={localUrl}
                        alt=""
                        className="profile-preview-img"
                    />
                    <button className="cancel-btn" onClick={handleCancelBtn}>
                        Cancel
                    </button>
                    <CircularProgress variant="determinate" value={progress} />
                    {props.auth.isUploading ? (
                        <button className="save-btn" disabled>
                            Saving...
                        </button>
                    ) : (
                        <button className="save-btn" onClick={handleSaveBtn}>
                            Save
                        </button>
                    )}
                </div>
            )}

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
                    <input type="submit" onClick={handleSubmit} />
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
