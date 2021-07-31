import React from 'react';
import { SuggestionsListItem } from './';

const SuggestionsList = (props) => {
    return (
        <div className="friends-list">
            {props.suggestions && props.suggestions.length === 0 && (
                <div className="no-friends grey-text medium-text">No more suggestions to show!</div>
            )}

            {props.suggestions &&
                props.suggestions.map((suggestion) => (
                    <SuggestionsListItem
                        suggestion={suggestion}
                        key={suggestion._id}
                    />
                ))}
        </div>
    );
};

export default SuggestionsList;
