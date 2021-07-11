import React from 'react';
import { Link } from 'react-router-dom';

function SuggestionsListItem(props) {
    return (
        <div className="friends-item">
            <Link to={`user/${props.suggestion._id}`}>
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    alt="user-pic"
                    className="medium profile-pic"
                />
            </Link>

            <div className="friends-detail">
                <div className="friends-name">
                    <Link to={`user/${props.suggestion._id}`} className="no-link">
                        <p className="black-text medium-text bold-text">
                            amirkhann.17
                        </p>
                    </Link>
                    <p className="grey-text small-text">
                        {props.suggestion.name}
                    </p>
                </div>
            </div>

            <div className="follow-suggestion">
                <span className="blue-text small-text">Follow</span>
            </div>
        </div>
    );
}

export default SuggestionsListItem;
