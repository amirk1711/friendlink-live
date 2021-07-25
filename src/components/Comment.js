import React from 'react';
import { Delete } from '@material-ui/icons';
import { connect } from 'react-redux';
import { deleteComment } from '../actions/posts';

function Comment({ comment, user, dispatch }) {


    const handleDeleteComment = (e) => {
        e.preventDefault();
        // console.log('comment._id', comment._id);
        // console.log('comment.post._id', comment.post);
        dispatch(deleteComment(comment._id, (comment.post._id || comment.post)));
    }

    return (
        <div className="post-comment-item">
            <div className="post-comment-author-profile">
                <img src={comment.user.avatar} alt="" />
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

            {(comment.user._id === user._id || comment.post.user === user._id)&& (
                <Delete
                    style={{
                        color: '#65676b',
                        cursor: 'pointer',
                    }}
                    onClick = {handleDeleteComment}
                />
            )}
        </div>
    );
}



export default connect()(Comment);
