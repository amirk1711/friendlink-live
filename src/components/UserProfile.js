import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { follow, unfollow } from '../actions/suggestions';
import { Link } from 'react-router-dom';
import { ProfilePostCard, FriendsList } from './';

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
        // console.log('this.props', this.props);
        // const { match, friends } = this.props;
        // const userId = match.params.userId;

        // const index = friends
        //     .map((friend) => friend.to_user._id)
        //     .indexOf(userId);

        // if (index !== -1) {
        //     return true;
        // }

        return false;
    };

    handleAddFriendClick = async () => {
        const userId = this.props.match.params.userId;
        const url = APIUrls.addFriend(userId);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (data.success) {
            this.setState({
                success: true,
                successMessage: 'Added friend successfully!',
            });

            this.props.dispatch(follow(data.data.friendship));
        } else {
            this.setState({
                success: null,
                error: data.message,
            });
        }
    };

    handleRemoveFriendClick = async () => {
        // Mini Assignment
        const { match } = this.props;
        const url = APIUrls.removeFriend(match.params.userId);

        const extra = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
        };

        const response = await fetch(url, extra);
        const data = await response.json();
        console.log('await data', data);

        if (data.success) {
            // show user message
            this.setState({
                success: true,
                successMessage: 'Removed friends successfully!',
            });
            this.props.dispatch(unfollow(match.params.userId));
        } else {
            this.setState({
                success: null,
                error: data.message,
            });
        }
    };

    render() {
        const {
            profile,
            auth,
        } = this.props;
        // console.log('this.props', params);
        // console.log('profile', profile);
        const user = profile.user;
        const loggedInUser = auth.user;
        const userPosts = profile.userPosts;

        if (Object.keys(user).length === 0 && user.constructor === Object) {
            return <h1>Loading!</h1>;
        }

        const isUserAFriend = this.checkIfUserIsAFriend();
        // const { success, error, successMessage } = this.state;

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
                            &emsp;&emsp;
                            {loggedInUser._id === user._id ? (
                                <div className="profile-user-btns">
                                    <button className="mr-10">
                                        <Link
                                            to="/settings"
                                            className="black-text"
                                        >
                                            Edit Profile
                                        </Link>
                                    </button>
                                    <button>
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
                                            className="follow-btn no-btn medium-text mr-8 bold-text"
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

                                    <button className="msg-btn bold-text">
                                        Message
                                    </button>
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
                        <Link to={user.website} className="profile-bio large-text mb-8">
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
                        &copy; {new Date().getFullYear()} Friendlink From Amir
                        Khan
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ profile, friends, auth }) {
    return {
        profile,
        friends,
        auth,
    };
}
export default connect(mapStateToProps)(UserProfile);
