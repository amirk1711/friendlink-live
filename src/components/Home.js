import React, { Component } from 'react';
import { PostsList, Sidebar } from './';

class Home extends Component {
    render() {
        const { posts, isLoggedin, friends } = this.props;
        return (
            <div className="home">
                {isLoggedin && <PostsList posts={posts} />}
                {isLoggedin && (
                    <Sidebar friends={friends} suggestions={friends} />
                )}
            </div>
        );
    }
}

export default Home;
