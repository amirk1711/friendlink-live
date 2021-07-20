import React from 'react';
import { FriendsListItem } from './';

const FriendsList = (props) => {
    console.log('props gggg', props);
    return (
        <div className="friends-list">
            {props.friends && props.friends.length === 0 && (
                <div className="no-friends">No friends found!</div>
            )}

            {props.friends &&
                props.friends.map((friend) => (
                    <FriendsListItem friend={friend} key={friend._id} />
                ))}
        </div>
    );
};

export default FriendsList;