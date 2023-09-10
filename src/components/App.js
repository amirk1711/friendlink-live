import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    Home,
    Page404,
    Login,
    Signup,
    Settings,
    UserProfile,
    Navbar,
    Chat,
} from './';

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
                                return (
                                    <Home
                                        {...props}
                                        posts={posts}
                                        suggestions={suggestions}
                                        isLoggedin={auth.isLoggedin}
                                    />
                                );
                            }}
                        />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        
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
                        <PrivateRoute
                            path="/messages"
                            component={Chat}
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
