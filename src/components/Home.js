import React, { Component } from 'react';
import { PostsList, Sidebar } from './';
import { Redirect } from 'react-router-dom';

import { authenticateUser } from '../actions/auth';
import { fetchPosts } from '../actions/posts';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserSuggestions } from '../actions/suggestions';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';

class Home extends Component {
    componentDidMount() {
        const token = getAuthTokenFromLocalStorage();
        // console.log('Home mounted ');
        if (token) {
            // user is logged in
            // get user out of token
            const user = jwtDecode(token);
            // authenticate user
            // console.log('user here ',user);
            // pass the whole user if needed

            this.props.dispatch(
                authenticateUser({
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                    name: user.name,
                    avatar: user.avatar,
                    followers: user.followers,
                    following: user.following,
                    suggestions: user.suggestions,
                    bio: user.bio,
                    website: user.website,
                })
            );

            // dispatch an async action to fetch posts from an api
            // and store those posts in the redux store
            this.props.dispatch(fetchPosts());

            // fetch user suggestions
            this.props.dispatch(fetchUserSuggestions(user._id));

            // fetch user profile
            // this.props.dispatch(fetchUserProfile());
        }
    }
    render() {
        const { posts, isLoggedin, suggestions } = this.props;
        return (
            <div className="home">
                {!isLoggedin && (
                    <Redirect
                        to={{
                            pathname: '/login',
                        }}
                    />
                )}
                {isLoggedin && <PostsList posts={posts} />}
                {isLoggedin && <Sidebar suggestions={suggestions} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        auth: state.auth,
        suggestions: state.suggestions,
    };
}

export default connect(mapStateToProps)(Home);
