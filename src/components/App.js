import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
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

class App extends React.Component {
    render() {
        const { isLoggedin } = this.props.auth;
        return (
            <Router>
                <div>
                    {isLoggedin && <Navbar />}
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/settings" exact component={Settings} />
                        <Route path="/user/:userId" exact component={UserProfile} />
                        <Route path="/messages" exact component={Chat} />
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

Component Hierarchy Structure

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
