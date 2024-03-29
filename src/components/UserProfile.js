import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile, unfollowUser } from '../actions/profile';
import { followUser } from '../actions/profile';
import { Link } from 'react-router-dom';
import { ProfilePostCard, FriendsList } from './';
import { createChatUser, setRedirectedUser } from '../actions/chat';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null,
            error: null,
            successMessage: null,
        };
    }
    componentDidMount() {
        const { match } = this.props;

        if (match.params.userId) {
            // dispatch an action
            this.props.dispatch(fetchUserProfile(match.params.userId));
        }
    }

    // to fix the search issue
    componentDidUpdate(prevProps) {
        const {
            match: { params: prevParams },
        } = prevProps;
        const {
            match: { params: currentParams },
        } = this.props;
        if (
            prevParams &&
            currentParams &&
            prevParams.userId !== currentParams.userId
        ) {
            this.props.dispatch(fetchUserProfile(currentParams.userId));
        }
    }

    checkIfUserIsAFriend = () => {
        const { profile, auth } = this.props;
        for (let f of profile.user.followers) {
            if (f._id === auth.user._id) {
                return true;
            }
        }
        return false;
    };

    handleAddFriendClick = async () => {
        const userId = this.props.match.params.userId;
        this.props.dispatch(followUser(userId));
    };

    handleRemoveFriendClick = async () => {
        const userId = this.props.match.params.userId;
        this.props.dispatch(unfollowUser(userId));
    };

    handleCreateChatUser = async () => {
        const receiverId = this.props.match.params.userId;
        const { user } = this.props.auth;
        const senderId = user._id;
        this.props.dispatch(createChatUser(senderId, receiverId));
        this.props.dispatch(setRedirectedUser(this.props.profile.user));
    };

    render() {
        const { profile, auth } = this.props;

        const user = profile.user;
        const loggedInUser = auth.user;
        const userPosts = profile.userPosts;

        if (
            (Object.keys(user).length === 0 && user.constructor === Object) ||
            profile.inProgress
        ) {
            return (
                <div class="loader">
                    <img src="https://amirk1711.github.io/SampleImages/loader_blue.gif" alt="loader"/>
                </div>
            );
        }

        const isUserAFriend = this.checkIfUserIsAFriend();

        let activeTab = 1;
        return (
            <div className="user-profile">
                <div className="user-profile-upper">
                    <div className="profile-img-container">
                        <img
                            src={user.avatar}
                            alt="user-dp"
                            className="extra-large profile-pic"
                        />
                    </div>

                    <div className="profile-user-details">
                        <div className="username-row">
                            <span className="profile-username black-text">
                                {user.username}
                            </span>
                            {loggedInUser._id === user._id ? (
                                <div className="profile-user-btns">
                                    <button className="mr-10 edit-profile-btn">
                                        <Link
                                            to="/settings"
                                            className="black-text"
                                        >
                                            Edit Profile
                                        </Link>
                                    </button>
                                    <button className="settings-btn">
                                        <Link
                                            to="/settings"
                                            className="black-text"
                                        >
                                            Settings
                                        </Link>
                                    </button>
                                </div>
                            ) : (
                                <div className="btn-grp">
                                    {!isUserAFriend ? (
                                        <button
                                            className="follow-btn no-btn medium-text mr-10 bold-text"
                                            onClick={this.handleAddFriendClick}
                                        >
                                            Follow
                                        </button>
                                    ) : (
                                        <button
                                            className="unfollow-btn no-btn medium-text mr-10 bold-text"
                                            onClick={
                                                this.handleRemoveFriendClick
                                            }
                                        >
                                            Following
                                        </button>
                                    )}

                                    <Link to="/messages">
                                        <button
                                            className="msg-btn bold-text"
                                            onClick={this.handleCreateChatUser}
                                        >
                                            Message
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="profile-stat-btns">
                            <button className="stat-btn no-btn mr-10 large-text">
                                <span className="large-text bold-text">
                                    {userPosts.length}
                                </span>{' '}
                                &nbsp;Posts
                            </button>
                            <button className="stat-btn no-btn mr-10 large-text">
                                <span className="large-text bold-text">
                                    {user.followers.length}
                                </span>{' '}
                                &nbsp;Followers
                            </button>
                            <button className="stat-btn no-btn mr-10 large-text">
                                <span className="large-text bold-text">
                                    {user.following.length}
                                </span>{' '}
                                &nbsp;Following
                            </button>
                        </div>

                        <span className="profile-fullname black-text large-text bold-text">
                            {user.name}
                        </span>
                        <span className="profile-bio large-text mb-8">
                            {user.bio}
                        </span>
                        <Link
                            to={user.website}
                            className="profile-bio large-text blue-text mb-8"
                        >
                            {user.website}
                        </Link>
                    </div>
                </div>

                <div className="user-profile-lower">
                    <div className="profile-action-btns">
                        <button className="large-text tab-btn">Posts</button>
                        <button className="large-text tab-btn">
                            Followers
                        </button>
                        <button className="large-text tab-btn">
                            Following
                        </button>
                    </div>
                    {activeTab === 1 && <ProfilePostCard posts={userPosts} />}
                    {activeTab === 2 && (
                        <FriendsList friends={user.followers} />
                    )}
                    {activeTab === 3 && (
                        <FriendsList friends={user.following} />
                    )}
                </div>

                <div className="text-center footer-text">
                    <span className="copy-text medium-text">
                        &copy; {new Date().getFullYear()} Friendlink By Amir
                        Khan
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ profile, friends, auth, chat }) {
    return {
        profile,
        friends,
        auth,
        chat,
    };
}
export default connect(mapStateToProps)(UserProfile);
