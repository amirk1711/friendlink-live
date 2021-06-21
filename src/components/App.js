import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup } from './';

class App extends React.Component {
  // to fetch the post from an api
  componentDidMount() {
    // dispatch an async action to fetch posts from an api
    // and store those posts in the redux store
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
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
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
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
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

// connect our app componnet to the redux store
export default connect(mapStateToProps)(App);
