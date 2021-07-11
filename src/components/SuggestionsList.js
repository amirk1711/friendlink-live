import React from 'react';
import { SuggestionsListItem } from './';

const SuggestionsList = (props) => {
    return (
        <div className="friends-list">
            {props.suggestions && props.suggestions.length === 0 && (
                <div className="no-friends">No friends found!</div>
            )}

            {props.suggestions &&
                props.suggestions.map((suggestion) => (
                    <SuggestionsListItem
                        suggestion={suggestion.to_user}
                        key={suggestion._id}
                    />
                ))}
        </div>
    );
};

export default SuggestionsList;
