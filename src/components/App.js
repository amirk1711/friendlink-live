// import React from 'react';
import React from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/posts';

class App extends React.Component {
  // to fetch the post from an api
  componentDidMount() {
    // dispatch an async action to fetch posts from an api
    // and store those posts in the redux store
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log('PROPS', this.props);
    return <div>APP</div>;
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

// connect our app componnet to the redux store
export default connect(mapStateToProps)(App);
