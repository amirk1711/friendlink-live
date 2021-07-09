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

            // Get the selected file
            const [file] = e.target.files;
            // Get the file name and size
            let { name: fileName, size } = file;
            let spanElement = document.querySelector('.file-name');
            let width = spanElement.offsetWidth;
            // Convert size in bytes to MB
            const fileSize = (size / 1000000).toFixed(2);
            if(fileName.length > width/10){
                fileName = fileName.substr(0, parseInt(width/10));
            }
            // Set the text content
            const fileNameAndSize = `${fileName} - ${fileSize}MB`;
            spanElement.innerHTML = fileNameAndSize;
        }
    };

    console.log('image', image);

    return (
        <div className="create-post">
            {/* With file inputs, clicking on the label also opens up the file picker */}
            <div className="file-input">
                <input
                    type="file"
                    id="file"
                    className="file"
                    onChange={handleChange}
                />
                <label htmlFor="file">Choose file...</label>
                <span className="file-name"></span>
            </div>

            {progress > 0 && progress < 100 ? (
                    <button
                        id="add-post-btn"
                        onClick={handleOnClick}
                        disabled={true}
                    >
                        Posting...
                    </button>
            ) : (
                <button id="add-post-btn" onClick={handleOnClick}>
                    Post
                </button>
            )}
            
        </div>
    );
};

// if i dont pass any callback function like mapStatetoProps then
// i'll get only dispatch function in the CreatePost component
export default connect()(CreatePost);
