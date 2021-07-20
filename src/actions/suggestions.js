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

export function follow(userId){
    return (dispatch) => {
        const url = APIUrls.follow(userId);
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Follow User Data', data);
            if(data.success){
                dispatch(followSuccess(userId));
            }
            // else{
            //     dispatch(followFailed());
            // }
        })
    }
}

export function followSuccess(userId) {
    return {
        type: FOLLOW_FRIEND,
        userId,
    };
}

export function unfollow(userId){
    return (dispatch) => {
        const url = APIUrls.unfollow(userId);
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            console.log('UnFollow User Data', data);
            if(data.success){
                dispatch(unfollowSuccess(userId));
            }
            // else{
            //     dispatch(followFailed());
            // }
        })
    }
}

export function unfollowSuccess(userId) {
    return {
        type: UNFOLLOW_FRIEND,
        userId,
    };
}
