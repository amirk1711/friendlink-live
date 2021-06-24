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
import { Home, Navbar, Page404, Login, Signup, Settings, UserProfile } from './';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

const PrivateRoute = (privateRouteProps) => {
    // rename component as Component while destructuring props
    const { isLoggedin, path, component: Component } = privateRouteProps;

    // this props is the one passed by react-router-dom to Route component
    return (
        <Route
            path={path}
            render={(props) => {
                // if user is logged in render the component
                // otherwise redirect to login component
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
        // dispatch an async action to fetch posts from an api
        // and store those posts in the redux store
        this.props.dispatch(fetchPosts());

        const token = getAuthTokenFromLocalStorage();
        if (token) {
            // user is logged in
            // get user out of token
            const user = jwtDecode(token);
            console.log('user', user);
            this.props.dispatch(
                authenticateUser({
                    email: user.email,
                    _id: user._id,
                    name: user.name,
                })
            );
        }
    }

    render() {
        const { posts, auth } = this.props;
        return (
            <Router>
                <div>
                    <Navbar />
                    {/* <PostsList posts={posts} /> */}

                    {/* whatever is above this will be common for every route */}
                    {/* <Route exact path="/" component={Home} /> */}
                    {/* to pass props into Home */}
                    {/* this props is provided by react router */}
                    {/* switch will render only the first route that matches 
          the path and wont go further down in the Route list */}
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => {
                                // here we can use some logic to render
                                // different components and pass props
                                return <Home {...props} posts={posts} />;
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

function mapStateToProps(state) {
    return {
        posts: state.posts,
        auth: state.auth,
    };
}

App.propTypes = {
    posts: PropTypes.array.isRequired,
};

// connect our app componnet to the redux store
export default connect(mapStateToProps)(App);
