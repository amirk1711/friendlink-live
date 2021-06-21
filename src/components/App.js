// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/posts';
import { PostsList } from './';

import PropTypes from 'prop-types';

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
      <div>
        <PostsList posts={posts} />
      </div>
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
}

// connect our app componnet to the redux store
export default connect(mapStateToProps)(App);
