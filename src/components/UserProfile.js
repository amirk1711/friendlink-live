import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { follow, unfollow } from '../actions/suggestions';
import { ProfilePostCard, FriendsList } from './';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { ProfilePostCard, FriendsList } from './';
=======
>>>>>>> parent of 9d740bd (UserProfile works!)

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
        const { match, friends } = this.props;
        const userId = match.params.userId;

        const index = friends
            .map((friend) => friend.to_user._id)
            .indexOf(userId);

        if (index !== -1) {
            return true;
        }

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
        let activeTab = 1;
        const {
            profile,
            auth,
            friends,
        } = this.props;
<<<<<<< HEAD
    
=======
        
        console.log('props in profile', this.props);
        console.log('this.props', params);
>>>>>>> parent of 9d740bd (UserProfile works!)
        const user = profile.user;
        console.log('auth user', auth.user);
        console.log('profile user', user);
        const loggedInUser = auth.user;

        if (profile.inProgress) {
            return <h1>Loading...</h1>;
        }

        const isUserAFriend = this.checkIfUserIsAFriend();
        // const { success, error, successMessage } = this.state;

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
                    {activeTab === 1 && <ProfilePostCard />}
                    {activeTab === 2 && <FriendsList friends={friends} />}
                    {activeTab === 3 && <FriendsList friends={friends} />}
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

function mapStateToProps({ profile, friends, auth, posts }) {
    return {
        profile,
        friends,
        auth,
        posts,
    };
}
export default connect(mapStateToProps)(UserProfile);
<<<<<<< HEAD

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchUserProfile } from '../actions/profile';
// import { APIUrls } from '../helpers/urls';
// import { getAuthTokenFromLocalStorage } from '../helpers/utils';
// import { follow, unfollow } from '../actions/suggestions';
// import { ProfilePostCard, FriendsList } from './';
// import { Link } from 'react-router-dom';

// class UserProfile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             success: null,
//             error: null,
//             successMessage: null,
//         };
//     }
//     componentDidMount() {
//         const { match } = this.props;
//         if (match.params.userId) {
//             // dispatch an action
//             this.props.dispatch(fetchUserProfile(match.params.userId));
//         }
//     }

//     // to fix the search issue
//     componentDidUpdate(prevProps) {
//         const {
//             match: { params: prevParams },
//         } = prevProps;
//         const {
//             match: { params: currentParams },
//         } = this.props;
//         if (
//             prevParams &&
//             currentParams &&
//             prevParams.userId !== currentParams.userId
//         ) {
//             this.props.dispatch(fetchUserProfile(currentParams.userId));
//         }
//     }

//     checkIfUserIsAFriend = () => {
//         const { match, friends } = this.props;
//         const userId = match.params.userId;

//         const index = friends
//             .map((friend) => friend.to_user._id)
//             .indexOf(userId);

//         if (index !== -1) {
//             return true;
//         }

//         return false;
//     };

//     handleAddFriendClick = async () => {
//         const userId = this.props.match.params.userId;
//         const url = APIUrls.addFriend(userId);

//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//             },
//         };

//         const response = await fetch(url, options);
//         const data = await response.json();

//         if (data.success) {
//             this.setState({
//                 success: true,
//                 successMessage: 'Added friend successfully!',
//             });

//             this.props.dispatch(follow(data.data.friendship));
//         } else {
//             this.setState({
//                 success: null,
//                 error: data.message,
//             });
//         }
//     };

//     handleRemoveFriendClick = async () => {
//         const { match } = this.props;
//         const url = APIUrls.removeFriend(match.params.userId);

//         const extra = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
//             },
//         };

//         const response = await fetch(url, extra);
//         const data = await response.json();
//         console.log('await data', data);

//         if (data.success) {
//             // show user message
//             this.setState({
//                 success: true,
//                 successMessage: 'Removed friends successfully!',
//             });
//             this.props.dispatch(unfollow(match.params.userId));
//         } else {
//             this.setState({
//                 success: null,
//                 error: data.message,
//             });
//         }
//     };

//     render() {
//         let activeTab = 1;
//         const {
//             match: { params },
//             profile,
//             auth,
//             friends,
//         } = this.props;

//         console.log('props in profile', this.props);
//         console.log('this.props', params);
//         const user = profile.user;
//         console.log('auth user', auth.user);
//         console.log('profile user', user);
//         const loggedInUser = auth.user;

//         if (profile.inProgress) {
//             return <h1>Loading...</h1>;
//         }

//         const isUserAFriend = this.checkIfUserIsAFriend();
//         // const { success, error, successMessage } = this.state;

//         return (
// <div className="user-profile">
//     <div className="user-profile-upper">
//         <div className="profile-img-container">
//             <img
//                 src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
//                 alt="user-dp"
//                 className="extra-large profile-pic"
//             />
//         </div>

//         <div className="profile-user-details">
//             <div className="username-row">
//                 <span className="profile-username black-text">
//                     amirkhann.17
//                 </span>
//                 &emsp;&emsp;
//                 {loggedInUser._id === user._id ? (
//                     <div className="profile-user-btns">
//                         <button className="mr-10">
//                             {/* link to /settings */}
//                             <Link to='/settings'>Edit Profile</Link>
//                         </button>
//                         <button>Settings</button>
//                     </div>
//                 ) : (
//                     <div className="btn-grp">
//                         {!isUserAFriend ? (
//                             <button
//                                 className="follow-btn no-btn medium-text mr-8 bold-text"
//                                 onClick={this.handleAddFriendClick}
//                             >
//                                 Follow
//                             </button>
//                         ) : (
//                             <button
//                                 className="unfollow-btn no-btn medium-text mr-10 bold-text"
//                                 onClick={
//                                     this.handleRemoveFriendClick
//                                 }
//                             >
//                                 Following
//                             </button>
//                         )}

//                         <button className="msg-btn bold-text">
//                             Message
//                         </button>
//                     </div>
//                 )}
//             </div>

//             <div className="profile-stat-btns">
//                 <button className="stat-btn no-btn mr-10 large-text">
//                     <span className="large-text bold-text">16</span>{' '}
//                     &nbsp;Posts
//                 </button>
//                 <button className="stat-btn no-btn mr-10 large-text">
//                     <span className="large-text bold-text">67</span>{' '}
//                     &nbsp;Followers
//                 </button>
//                 <button className="stat-btn no-btn mr-10 large-text">
//                     <span className="large-text bold-text">94</span>{' '}
//                     &nbsp;Following
//                 </button>
//             </div>

//             <span className="profile-fullname black-text large-text bold-text">
//                 Amir Khan
//             </span>
//             <span className="profile-bio large-text mb-8">
//                 JMI'22 <br />
//                 New Delhi
//             </span>
//         </div>
//     </div>

//     <div className="user-profile-lower">
//         <div className="profile-action-btns">
//             <button className="large-text tab-btn">Posts</button>
//             <button className="large-text tab-btn">
//                 Followers
//             </button>
//             <button className="large-text tab-btn">
//                 Following
//             </button>
//         </div>
//         {activeTab === 1 && <ProfilePostCard />}
//         {activeTab === 2 && <FriendsList friends={friends} />}
//         {activeTab === 3 && <FriendsList friends={friends} />}
//     </div>

//     <div className="text-center footer-text">
//         <span className="copy-text medium-text">
//             &copy; {new Date().getFullYear()} Friendlink From Amir
//             Khan
//         </span>
//     </div>
// </div>
//         );
//     }
// }

// function mapStateToProps({ profile, friends, auth, posts }) {
//     return {
//         profile,
//         friends,
//         auth,
//         posts,
//     };
// }
// export default connect(mapStateToProps)(UserProfile);
=======
>>>>>>> parent of 9d740bd (UserProfile works!)
