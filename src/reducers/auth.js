import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTHENTICATE_USER,
    LOG_OUT,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    CLEAR_AUTH_STATE,
    EDIT_USER_SUCCESSFUL,
    EDIT_USER_FAILED,
    EDIT_USER_START,
    CHANGE_USER_PROFILE_SUCCESSFUL,
    START_UPLOAD_PROFILE,
    CHANGE_PASSWORD_SUCCESSFULL,
    CHANGE_PASSWORD_START,
    START_DELETE_ACCOUNT,
    DELETE_ACCOUNT_SUCCESSFULL,
    CHECK_USERNAME,
} from '../actions/actionTypes';

const initialAuthState = {
    user: {},
    error: null,
    isLoggedin: false,
    inProgress: false,
    isUpdating: false,
    isUploading: false,
    isUploaded: false,
    isUsernameUnique: null,
};

export default function auth(state = initialAuthState, action) {
    switch (action.type) {
        case CHECK_USERNAME:
            return {
                ...state,
                isUsernameUnique: action.isUnique,
            };
        case CLEAR_AUTH_STATE:
            return {
                ...state,
                error: null,
            };
        case LOGIN_START:
        case SIGNUP_START:
            return {
                ...state,
                inProgress: true,
            };
        case START_UPLOAD_PROFILE:
            return {
                ...state,
                isUploading: true,
            };
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoggedin: true,
                inProgress: false,
                error: null,
                isUsernameUnique: null,
            };
        case LOGIN_FAILED:
        case SIGNUP_FAILED:
            return {
                ...state,
                inProgress: false,
                error: action.error,
                isUsernameUnique: null,
            };
        case AUTHENTICATE_USER:
            return {
                ...state,
                user: action.user,
                isLoggedin: true,
                isUsernameUnique: null,
            };
        case LOG_OUT:
            return {
                ...state,
                user: {},
                isLoggedin: false,
                isUsernameUnique: null,
            };
        case EDIT_USER_START:
            return {
                ...state,
                isUpdating: true,
            };
        case EDIT_USER_SUCCESSFUL:
            return {
                ...state,
                user: action.user,
                isUpdating: false,
                error: false,
            };
        case CHANGE_USER_PROFILE_SUCCESSFUL:
            return {
                ...state,
                user: action.user,
                isUploading: false,
                isUploaded: true,
            };
        case EDIT_USER_FAILED:
            return {
                ...state,
                error: action.error,
                isUpdating: false,
            };
        case CHANGE_PASSWORD_SUCCESSFULL:
            return {
                ...state,
                user: action.user,
                isUpdating: false,
            };
        case CHANGE_PASSWORD_START:
            return {
                ...state,
                isUpdating: true,
            };
        case START_DELETE_ACCOUNT:
            return {
                ...state,
                isUpdating: true,
            };
        case DELETE_ACCOUNT_SUCCESSFULL:
            return {
                ...state,
                isUpdating: false,
                isUsernameUnique: null,
            };
        default:
            return state;
    }
}
