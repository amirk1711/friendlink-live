import React from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import {
    Home,
    Page404,
    Login,
    Signup,
    Settings,
    UserProfile,
    Navbar,
} from './';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserSuggestions } from '../actions/suggestions';


// PrivateRoute is a functional component
const PrivateRoute = (privateRouteProps) => {
    // console.log('dispatch', useDispatch());
    // rename component as Component while destructuring props
    const { isLoggedin, path, component: Component } = privateRouteProps;
    // const dispatch = useDispatch();
    return (
        <Route
            path={path}
            render={(props) => {
                // console.log('check propss if it has user id from params', props);

                // console.log('path', path);

                // if(path === '/user/:userId'){
                //     console.log('b4 disp');
                //     dispatch(fetchUserProfile(props.match.params.userId));
                //     console.log('after disp');
                // }
                // this props is props passed by React Router
                // if user is logged in, render the passed component
                // otherwise redirect to the login component
                return isLoggedin ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            // in state whatever data we pass will be
                            // given to the login component
                            state: {
                                // from: path from which user is coming to log in
                                from: props.location,
                                //this from will have an object like { pathname: '/settings'} if i am accessing settings page without logging in
                            },
                        }}
                    />
                );
            }}
        />
    );
};

class App extends React.Component {
    // to fetch the post from an api
    componentDidMount() {
        const token = getAuthTokenFromLocalStorage();
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
        const { posts, auth, suggestions } = this.props;
        const { isLoggedin } = auth;
        return (
            <Router>
                <div>
                    {isLoggedin && <Navbar />}
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => {
                                // this props is props passed by React Router
                                // here we can use some logic to render
                                // different components and pass props
                                return (
                                    <Home
                                        {...props}
                                        posts={posts}
                                        suggestions={suggestions}
                                        isLoggedin={auth.isLoggedin}
                                    />
                                    // now Home component will get posts, friends, isLoggedin
                                    // and history, locations, match, etc as props
                                );
                            }}
                        />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        {/* private route : settings component is accessible only when user is logged in */}
                        <PrivateRoute
                            path="/settings"
                            component={Settings}
                            isLoggedin={auth.isLoggedin}
                        />
                        <PrivateRoute
                            path="/user/:userId"
                            component={UserProfile}
                            isLoggedin={auth.isLoggedin}
                        />
                        <Route component={Page404} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

// take any state from the redux store and
// pass it to the props of the app component
function mapStateToProps(state) {
    return {
        posts: state.posts,
        auth: state.auth,
        suggestions: state.suggestions,
    };
}

// validate prop types
App.propTypes = {
    posts: PropTypes.array.isRequired,
};

// connect our react app component to the redux store
export default connect(mapStateToProps)(App);

/*
App >
	Navbar
	Home(/) >
		PostList >
			CreatePost
			Post >
				Comment
		FriendList >
			FriendListItem
	Login(/login)
	Signup(/signup)
	Settings(/settings)
	UserProfile(/user/:id)
    Page404(/random)
*/