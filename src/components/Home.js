import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { PostsList, Sidebar } from './';
import { fetchPosts } from '../actions/posts';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserSuggestions } from '../actions/suggestions';


class Home extends Component {
    componentDidMount() {
        const token = getAuthTokenFromLocalStorage();
        if (token) {
            const user = jwtDecode(token);
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

            // dispatch async actions to fetch data from the server and store it in the redux store
            this.props.dispatch(fetchPosts());
            this.props.dispatch(fetchUserSuggestions(user._id));
        }
    }
    render() {
        const {  isLoggedin } = this.props.auth;
        return (
            <div className="home">
                {!isLoggedin && (
                    <Redirect
                        to={{
                            pathname: '/login',
                        }}
                    />
                )}
                {isLoggedin && <PostsList />}
                {isLoggedin && <Sidebar />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Home);
