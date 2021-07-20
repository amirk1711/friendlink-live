import React, { Component } from 'react';
import { PostsList, Sidebar } from './';
import { Redirect } from 'react-router-dom';

class Home extends Component {
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
                {isLoggedin && (
                    <Sidebar suggestions={suggestions} />
                )}
            </div>
        );
    }
}

export default Home;
