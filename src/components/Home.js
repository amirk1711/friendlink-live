import React, { Component } from 'react';
import {PostsList, FriendsList} from './';

class Home extends Component {
    render() {
        const { posts, friends, isLoggedin } = this.props;
        // here all the props by react router like history, 
        // are not getting passed to this props
        // console.log('props', this.props);
        return (
            <div className="home">
                <PostsList posts={posts}/>
                {isLoggedin && <FriendsList friends={friends} />}
            </div>
        );
    }
}

export default Home;