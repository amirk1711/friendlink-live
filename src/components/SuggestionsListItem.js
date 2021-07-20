import React from 'react';
import { Link } from 'react-router-dom';

function SuggestionsListItem(props) {
    const { suggestion } = props;
    return (
        <div className="friends-item">
            <Link to={`user/${suggestion._id}`}>
                <img
                    src={suggestion.avatar}
                    alt="user-pic"
                    className="medium profile-pic"
                />
            </Link>

            <div className="friends-detail">
                <div className="friends-name">
                    <Link to={`user/${suggestion._id}`} className="no-link">
                        <p className="black-text medium-text bold-text">
                            {suggestion.username}
                        </p>
                    </Link>
                    <p className="grey-text small-text">
                        {suggestion.name}
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
