import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {
    LOGIN_START,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SIGNUP_START,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    AUTHENTICATE_USER,
    LOG_OUT,
    CLEAR_AUTH_STATE,
    EDIT_USER_SUCCESSFUL,
    EDIT_USER_FAILED,
    EDIT_USER_START,
    CHANGE_USER_PROFILE_SUCCESSFUL,
    START_UPLOAD_PROFILE,
} from './actionTypes';

export function startLogin() {
    return {
        type: LOGIN_START,
    };
}

export function loginFailed(errorMessage) {
    return {
        type: LOGIN_FAILED,
        error: errorMessage,
    };
}

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user,
    };
}

export function login(email, password) {
    return (dispatch) => {
        // first dispatch startLogin action
        dispatch(startLogin());
        const url = APIUrls.login();
        fetch(url, {
            method: 'POST',
            // send data to the server in a particular format(url-form-encoded)
            // this is the requirement of the API from which we are fetching
            // set the format in the headers of the fetch request
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // it defines that i am sending the content of type url-form-encoded
                // so if our APIs are defined to accept JSON data then i dont have to define content-type
                // i can, but it will not be neeeded
            },
            body: getFormBody({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                if (data.success) {
                    // dispatch action to save user
                    //   save the token to make user persisitent
                    localStorage.setItem('token', data.data.token);
                    dispatch(loginSuccess(data.data.user));
                    return;
                }
                dispatch(loginFailed(data.message));
            });
    };
}

export function authenticateUser(user) {
    return {
        type: AUTHENTICATE_USER,
        user,
    };
}

export function logoutUser() {
    return {
        type: LOG_OUT,
    };
}

export function signup(email, password, username, name) {
    // console.log('inside signup');
    return (dispatch) => {
        const url = APIUrls.signup();
        // console.log('url', url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({
                email,
                password,
                username,
                name,
            }),
        })
            .then((response) => {
                console.log('response', response);
                return response.json();
            })
            .then((data) => {
                console.log('data', data);
                if (data.success) {
                    localStorage.setItem('token', data.data.token);
                    dispatch(signupSuccessful(data.data.user));
                    return;
                }
                dispatch(signupFailed(data.message));
            });
    };
}

export function startSignup() {
    return {
        type: SIGNUP_START,
    };
}

export function signupFailed(error) {
    return {
        type: SIGNUP_FAILED,
        error,
    };
}

export function signupSuccessful(user) {
    return {
        type: SIGNUP_SUCCESS,
        user,
    };
}

export function clearAuthState() {
    return {
        type: CLEAR_AUTH_STATE,
    };
}

export function editUserSuccessful(user) {
    return {
        type: EDIT_USER_SUCCESSFUL,
        user,
    };
}

export function editUserFailed(error) {
    return {
        type: EDIT_USER_FAILED,
        error,
    };
}

export function startEdit() {
    return {
        type: EDIT_USER_START,
    };
}

// this is actual async action to request the server
// to change the user profile data
export function editUser(name, username, website, bio, userId) {
    return (dispatch) => {
        dispatch(startEdit());
        const url = APIUrls.editProfile(userId);
        fetch(url, {
            method: 'POST',
            headers: {
                //   this is a secure api so we need to pass the jwt as well
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            body: getFormBody({
                name,
                username,
                website,
                bio,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('EDIT PROFILE data', data);
                if (data.success) {
                    dispatch(editUserSuccessful(data.data.updated_profile));
                    if (data.data.token) {
                        // change the token as well
                        localStorage.setItem('token', data.data.token);
                    }
                    return;
                }
                dispatch(editUserFailed(data.message));
            });
    };
}

export function changeProfilePic(profileUrl) {
    return (dispatch) => {
        dispatch(startUploadProfile());
        const url = APIUrls.changeProfilePic();
        fetch(url, {
            method: 'PUT',
            headers: {
                //   this is a secure api so we need to pass the jwt as well
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            body: getFormBody({
                profileUrl,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Change PROFILE Pic data', data);
                if (data.success) {
                    dispatch(changeUserProfileSuccessful(data.data.updated_profile));
                    if (data.data.token) {
                        // change the token as well
                        localStorage.setItem('token', data.data.token);
                    }
                }
            });
    };
}

export function changeUserProfileSuccessful(user){
    return {
        type: CHANGE_USER_PROFILE_SUCCESSFUL,
        user,
    };
}

export function startUploadProfile() {
    return {
        type: START_UPLOAD_PROFILE,
    };
}