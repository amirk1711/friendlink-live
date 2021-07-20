import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
    FETCH_SUGGESTIONS_SUCCESS,
    FOLLOW_FRIEND,
    UNFOLLOW_FRIEND,
} from './actionTypes';

export function fetchUserSuggestions(userId) {
    return (dispatch) => {
        const url = APIUrls.fetchSuggestions(userId);
        fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('FETCH Suggestions data', data);
                if (data.success) {
                    dispatch(fetchSuggestionsSucces(data.data.suggestions));
                }
            });
    };
}

export function fetchSuggestionsSucces(suggestions) {
    return {
        type: FETCH_SUGGESTIONS_SUCCESS,
        suggestions,
    };
}

export function follow(friend) {
    return {
        type: FOLLOW_FRIEND,
        friend,
    };
}

export function unfollow(userId) {
    return {
        type: UNFOLLOW_FRIEND,
        userId,
    };
}
