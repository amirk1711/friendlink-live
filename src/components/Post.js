import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment } from './';
import { addLike, createComment, deletePost } from '../actions/posts';
import {
    CommentOutlined,
    FavoriteBorder,
    Favorite,
    Delete,
} from '@material-ui/icons';

import { format } from 'timeago.js';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            toggleViewComment: false,
        };
    }

    handleAddComment = (e) => {
        e.preventDefault();

        const { comment } = this.state;
        const { post } = this.props;

        console.log('comment', comment);
        console.log('post', post);

        this.props.dispatch(createComment(comment, post._id));

        // clear comment
        this.setState({
            comment: '',
        });
    };

    handleOnCommentChange = (e) => {
        this.setState({
            comment: e.target.value,
        });
    };

    handlePostLike = () => {
        const { post, user } = this.props;
        this.props.dispatch(addLike(post._id, 'Post', user._id));
    };

    handleDeletePost = () => {
        this.props.dispatch(deletePost(this.props.post._id));
    };

    render() {
        const { post, user } = this.props;
        const { comment } = this.state;
        const postAuthor = post.user;

        let twoComments = [];

        // if(post.comments === undefined){
        //     return <h2>Deleting comment</h2>
        // }

        if (post.comments.length >= 2) {
            twoComments.push(post.comments[0]);
            twoComments.push(post.comments[1]);
        }

        const isPostLikedByUser = post.likes.some(
            (like) => like._id === user._id || like === user._id
        );

        let followingLikedUser = [];

        for (let likedUser of post.likes) {
            if (user.following.includes(likedUser._id)) {
                followingLikedUser.push(likedUser);
            }
        }

        
        return (
            <div className="post">
                <div className="post-wrapper" key={post._id}>
                    <div className="post-top">
                        <div className="post-top-left">
                            <Link to={`/user/${post.user._id}`}>
                                <img
                                    src={post.user.avatar}
                                    alt="user-pic"
                                    className="post-profile-image"
                                />
                            </Link>
                            <div className="post-details">
                                <span className="post-author">
                                    {post.user.username}
                                </span>
                                <span className="post-time">{format(post.createdAt)}</span>
                            </div>
                        </div>

                        <div className="post-top-right">
                            {postAuthor._id === user._id && (
                                <Delete
                                    style={{
                                        color: '#65676b',
                                        cursor: 'pointer',
                                    }}
                                    onClick={this.handleDeletePost}
                                />
                            )}
                        </div>
                    </div>

                    <div className="post-center">
                        <img
                            src={post.content}
                            className="post-image"
                            alt="post-img"
                        />
                        <div className="post-actions">
                            <button
                                className="post-like no-btn"
                                onClick={this.handlePostLike}
                            >
                                {isPostLikedByUser ? (
                                    <Favorite style={{ color: 'red' }} />
                                ) : (
                                    <FavoriteBorder />
                                )}

                                <span>{post.likes.length}</span>
                            </button>

                            <button className="post-comments no-btn">
                                <CommentOutlined />
                                <span>{post.comments.length}</span>
                            </button>
                        </div>

                        {followingLikedUser.length > 0 && (
                            <div className="liked-by-detail">
                                <img
                                    src={followingLikedUser[0].avatar}
                                    alt=""
                                />
                                {post.likes.length > 1 && (
                                    <p>
                                        Liked by{' '}
                                        <span>
                                            {followingLikedUser[0].username}
                                        </span>{' '}
                                        and{' '}
                                        <span>
                                            {post.likes.length - 1} others
                                        </span>
                                    </p>
                                )}

                                {post.likes.length <= 1 && (
                                    <p>
                                        Liked by{' '}
                                        <span>
                                            {followingLikedUser[0].username}
                                        </span>
                                    </p>
                                )}
                            </div>
                        )}

                        {followingLikedUser.length === 0 && (
                            <div className="liked-by-detail">
                                <p>
                                    <span>{post.likes.length} Likes</span>
                                </p>
                            </div>
                        )}

                        <div className="post-caption">
                            <p>
                                <span>{post.user.username}</span>
                                &nbsp; {post.caption}
                            </p>
                        </div>
                    </div>

                    <div className="post-bottom">
                        {post.comments.length > 2 && (
                            <p
                                className="view-comments"
                                onClick={() => {
                                    this.setState({
                                        toggleViewComment: !this.state.toggleViewComment,
                                    });
                                }}
                            >
                                View all {post.comments.length} comments
                            </p>
                        )}

                        {post.comments.length > 2 &&
                            !this.state.toggleViewComment && (
                                <div className="post-comments-list">
                                    {twoComments.map((comment) => (
                                        <Comment
                                            user={post.user}
                                            comment={comment}
                                            key={comment._id}
                                            postId={post._id}
                                        />
                                    ))}
                                </div>
                            )}

                        {(this.state.toggleViewComment ||
                            post.comments.length <= 2) && (
                            <div className="post-comments-list">
                                {post.comments.map((comment) => (
                                    <Comment
                                        user={user}
                                        comment={comment}
                                        key={comment._id}
                                        postId={post._id}
                                    />
                                ))}
                            </div>
                        )}

                        {/* {!this.state.toggleViewComment && ()} */}

                        <div className="post-comment-box">
                            <input
                                placeholder="Start typing a comment"
                                onChange={this.handleOnCommentChange}
                                value={comment}
                            />

                            <button
                                onClick={this.handleAddComment}
                                className="add-comment-btn"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// validate prop types
Post.propTypes = {
    post: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
    return {
        user: auth.user,
    };
}

export default connect(mapStateToProps)(Post);
