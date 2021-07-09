import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { createPost } from '../actions/posts';
import { storage } from '../config/firebase';

const CreatePost = (props) => {
    console.log('props from cretePost', props);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const handleOnClick = () => {
        // create reference to the firebase storage and select 'postImages/filename-date' folder
        // and put the uploaded image in the above folder
        const uploadTask = storage
            .ref(`postImages/${image.name + '-' + Date.now()}`)
            .put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log('error', error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setUrl(url);
                });
            }
        );
        // props.dispatch(createPost(url));
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            // if user has uploded a photo
            // set that photo in 'image' variable
            setImage(e.target.files[0]);
        }
    };

    console.log('image', image);

    return (
        <div className="create-post">
            <input type="file" onChange={handleChange} />
            <div>
                {progress > 0 && progress < 100 ? (
                    <div>
                        <progress value={progress} max="100" />
                        <button
                            id="add-post-btn"
                            onClick={handleOnClick}
                            disabled={true}
                        >
                            Posting...
                        </button>
                    </div>
                ) : (
                    <button id="add-post-btn" onClick={handleOnClick}>
                        Post
                    </button>
                )}
            </div>

            <br />
            {url}
            <br />
            <img
                src={url || 'http://via.placeholder.com/300x250'}
                alt="post-pic"
                height={250}
                width={300}
            />
        </div>
    );
};

// if i dont pass any callback function like mapStatetoProps then
// i'll get only dispatch function in the CreatePost component
export default connect()(CreatePost);
