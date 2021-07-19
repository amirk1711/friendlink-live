import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts';
import { storage } from '../config/firebase';

const CreatePost = (props) => {
    const [image, setImage] = useState(null);
    const [localUrl, setLocalUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [fileType, setFileType] = useState(null);
    const [caption, setCaption] = useState('');

    const handleOnClick = () => {
        // create reference to the firebase storage and select 'postImages/filename-date' folder
        // and put the uploaded image in the above folder
        const uploadTask = storage
            .ref(`postImages/${image.name + '-' + Date.now()}`)
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
                    props.dispatch(createPost(url, fileType, caption));
                });
            }
        );
    };

    const handleChange = async (e) => {
        if (e.target.files[0]) {
            // if user has uploded a photo
            // set that photo in 'image' variable

            setImage(e.target.files[0]);
            setFileType(e.target.files[0].type);
            setLocalUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleCancelBtn = () => {
        setImage(null);
        // document.getElementById('file').value = null;
    };

    const handleCaptionChange = (e) => {
        e.preventDefault();
        console.log('caption', e.target.value);
        setCaption(e.target.value);
    };

    return (
        <div className="create-post">
            {/* With file inputs, clicking on the label also opens up the file picker */}

            {image && (
                <div className="preview-and-caption">
                    <img src={localUrl} alt="" className="post-preview-img" />
                    <div className="caption-input">
                        <textarea
                            placeholder="Write caption here..."
                            onChange={handleCaptionChange}
                        />
                    </div>
                </div>
            )}

            <div className="file-input-and-post">
                {image && (
                    <button className="cancel-btn" onClick={handleCancelBtn}>
                        Cancel
                    </button>
                )}

                {!image && (
                    <div className="file-input">
                        <input
                            type="file"
                            id="file"
                            className="file"
                            onChange={handleChange}
                        />
                        <label htmlFor="file">Choose file...</label>
                    </div>
                )}

                {progress > 0 && progress < 100 ? (
                    <button id="add-post-btn" disabled={true}>
                        Posting...
                    </button>
                ) : (
                    <button id="add-post-btn" onClick={handleOnClick}>
                        Post
                    </button>
                )}
            </div>
        </div>
    );
};

// if i dont pass any callback function like mapStatetoProps then
// i'll get only dispatch function in the CreatePost component
export default connect()(CreatePost);
