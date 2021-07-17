import React, { Component } from 'react';
import { PostsList, Sidebar, Navbar } from './';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    render() {
        const { posts, isLoggedin, friends } = this.props;
        return (
            <div className="home">
                {!isLoggedin && (
                    <Redirect
                        to={{
                            pathname: '/login',
                        }}
                    />
                )}
                {isLoggedin && <Navbar />}
                {isLoggedin && <PostsList posts={posts} />}
                {isLoggedin && (
                    <Sidebar friends={friends} suggestions={friends} />
                )}
            </div>
        );
    }
}

export default Home;
