import React from 'react';

function Comment({ comment }) {
    return (
        <div className="post-comment-item">
            <div className="post-comment-author-profile">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
            </div>

            <div className="post-comment">
                <div className="post-comment-details">
                    <p className="post-comment-author-name">{comment.user.name}</p>
                    <p className="post-comment-content">{comment.content}</p>
                </div>
                <p className="post-comment-action">
                    <span>2h&emsp;{comment.likes.length} Likes&emsp;Reply</span>
                </p>
            </div>
        </div>
    );
}

export default Comment;
