import {
    FETCH_USER_PROFILE,
    UPDATE_PROFILE,
    USER_PROFILE_FAILURE,
    USER_PROFILE_SUCCESS,
} from '../actions/actionTypes';

const intialProfileState = {
    user: {},
    userPosts: [],
    error: null,
    success: null,
    inProgress: false,
};

export default function profile(state = intialProfileState, action) {
    switch (action.type) {
        case FETCH_USER_PROFILE:
            return {
                ...state,
                inProgress: true,
            };
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                success: true,
                user: action.user,
                userPosts: action.userPosts,
                inProgress: false,
            };
        case USER_PROFILE_FAILURE:
            return {
                ...state,
                error: action.error,
                inProgress: false,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                user: action.updated_profile,
                inProgress: false,
            }
        default:
            return state;
    }
}