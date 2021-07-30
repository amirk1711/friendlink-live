import {
    FOLLOW_FRIEND,
    FETCH_SUGGESTIONS_SUCCESS,
    UNFOLLOW_FRIEND,
} from '../actions/actionTypes';

const defaultProfileState = [];

// profile reducer
export default function suggestions(state = defaultProfileState, action) {
    switch (action.type) {
        case FETCH_SUGGESTIONS_SUCCESS:
            return [...action.suggestions];
        case FOLLOW_FRIEND:
            const newArr = state.filter(
                (suggestion) => suggestion._id !== action.userId
            );
            return newArr;
        case UNFOLLOW_FRIEND:
            return state.concat(action.userId);
        default:
            return state;
    }
}
