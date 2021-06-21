// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import { PostsList, Navbar } from './';

const Login = () => <div>Log in</div>;

const Signup = () => <div>Sign up</div>;

const Home = () => <div>Home</div>;

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

          <ul>
              <li>
                  <Link to="/">Home</Link>
              </li>
              <li>
                  <Link to="/login">Log in</Link>
              </li>
              <li>
                  <Link to="/signup">Sign up</Link>
              </li>
          </ul>

          {/* whatever is above this will be common for every route */}
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
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
