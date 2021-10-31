import React from 'react';

const ProfilePostCard = (props) => {
    const { posts } = props;

    return (
        <div className="profile-post-card-wrapper">
            {posts.map((post) => {
                return (
                    <div className="profile-post-card" key={post._id}>
                        <img
                            src={post.content}
                            className="profile-post-image"
                            alt="post-img"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ProfilePostCard;

/*
<div className="profile-post-card">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    className="profile-post-image"
                    alt="post-img"
                />
            </div>
            <div className="profile-post-card">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    className="profile-post-image"
                    alt="post-img"
                />
            </div>
            <div className="profile-post-card">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    className="profile-post-image"
                    alt="post-img"
                />
            </div>
            <div className="profile-post-card">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    className="profile-post-image"
                    alt="post-img"
                />
            </div>
            <div className="profile-post-card">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    className="profile-post-image"
                    alt="post-img"
                />
            </div>
            <div className="profile-post-card">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    className="profile-post-image"
                    alt="post-img"
                />
            </div>
            <div className="profile-post-card">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    className="profile-post-image"
                    alt="post-img"
                />
            </div>
            <div className="profile-post-card">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    className="profile-post-image"
                    alt="post-img"
                />
            </div>
*/