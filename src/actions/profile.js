import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
    FETCH_USER_PROFILE,
    USER_PROFILE_FAILURE,
    USER_PROFILE_SUCCESS,
} from './actionTypes';

export function startUserProfileFetch() {
    return {
        type: FETCH_USER_PROFILE,
    };
}

export function userProfileSuccess(user, userPosts) {
    return {
        type: USER_PROFILE_SUCCESS,
        user,
        userPosts,
    };
}

export function userProfileFailed(error) {
    return {
        type: USER_PROFILE_FAILURE,
        error,
    };
}

export function fetchUserProfile(userId) {
    return (dispatch) => {
        dispatch(startUserProfileFetch());

        const url = APIUrls.userProfile(userId);
        
        // Get request
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => {
                console.log('Response fetch user', response);
                return response.json();
            })
            .then((data) => {
                console.log('USER PROFILE data', data);
                if (data.success) {
                    dispatch(
                        userProfileSuccess(
                            data.data.profile_user,
                            data.data.profile_posts
                        )
                    );
                    return;
                }
                dispatch(userProfileFailed(data.message));
            });
    };
}
