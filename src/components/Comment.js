import React from 'react';

function Comment({ comment, user }) {
    return (
        <div className="post-comment-item">
            <div className="post-comment-author-profile">
                <img
                    src={user.avatar}
                    alt=""
                />
            </div>

            <div className="post-comment">
                <div className="post-comment-details">
                    <p className="post-comment-author-name">
                        {comment.user.name}
                    </p>
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
