import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
    FETCH_USER_PROFILE,
    USER_PROFILE_FAILURE,
    USER_PROFILE_SUCCESS,
    UPDATE_PROFILE,
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
        // console.log('userID in profile action', userId);
        dispatch(startUserProfileFetch());

        const url = APIUrls.userProfile(userId);

        // console.log('start fetching user profile', url);
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

export function followUser(id) {
    return (dispatch) => {
        const url = APIUrls.follow(id);

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Follow user data', data);
                if (data.success) {
                    dispatch(updateProfile(data.data.updated_profile));
                    if (data.data.token) {
                        localStorage.setItem('token', data.data.token);
                    }
                    return;
                }
                dispatch(userProfileFailed(data.message));
            });
    };
}

export function updateProfile(updated_profile) {
    return {
        type: UPDATE_PROFILE,
        updated_profile,
    };
}

export function unfollowUser(id) {
    return (dispatch) => {
        const url = APIUrls.unfollow(id);

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('UnFollow user data', data);
                if (data.success) {
                    dispatch(updateProfile(data.data.updated_profile));
                    if (data.data.token) {
                        localStorage.setItem('token', data.data.token);
                    }
                    return;
                }
                dispatch(userProfileFailed(data.message));
            });
    };
}
