import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment } from './';
import { addLike, createComment } from '../actions/posts';
import {
    CommentOutlined,
    FavoriteBorder,
    Favorite,
    MoreVert,
} from '@material-ui/icons';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        };
    }

    handleAddComment = (e) => {
        const { comment } = this.state;
        const { post } = this.props;

        if (e.key === 'Enter') {
            this.props.dispatch(createComment(comment, post._id));

            // clear comment
            this.setState({
                comment: '',
            });
        }
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

    render() {
        const { post, user } = this.props;
        const { comment } = this.state;

        const isPostLikedByUser = post.likes.includes(user._id);
        return (
            <div className="post">
                <div className="post-wrapper" key={post._id}>
                    <div className="post-top">
                        <div className="post-top-left">
                            <Link to={`/user/${post.user._id}`}>
                                <img
                                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                                    alt="user-pic"
                                    className="post-profile-image"
                                />
                            </Link>
                            <div className="post-details">
                                <span className="post-author">
                                    {post.user.name}
                                </span>
                                <span className="post-time">7m ago</span>
                            </div>
                        </div>

                        <div className="post-top-right">
                            <MoreVert />
                        </div>
                    </div>

                    <div className="post-center">
                        <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
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
                        <div className="liked-by-detail">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
                            <p>
                                Liked by <span>amirk1711</span> and{' '}
                                <span>3 others</span>
                            </p>
                        </div>
                        <div className="post-caption">
                            <p>
                                <span>amirkhann.17</span>
                                &nbsp; Hey! This is my first post. Hey! This is
                                my first post. Hey! This is my first post. Hey!
                                This is my first post. Hey! This is my first
                                post.Hey! This is my first post.
                            </p>
                        </div>
                    </div>

                    <div className="post-bottom">
                        <p className="view-comments">View all 7 comments</p>

                        <div className="post-comments-list">
                            {post.comments.map((comment) => (
                                <Comment
                                    comment={comment}
                                    key={comment._id}
                                    postId={post._id}
                                />
                            ))}
                        </div>

                        <div className="post-comment-box">
                            <input
                                placeholder="Start typing a comment"
                                onChange={this.handleOnCommentChange}
                                onKeyPress={this.handleAddComment}
                                value={comment}
                            />
                            
                            <button onSubmit={this.handleAddComment} className="add-comment-btn">Post</button>
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
