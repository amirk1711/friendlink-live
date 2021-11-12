import {
    RESET_PASS_FAILED,
    RESET_PASS_START,
    RESET_PASS_SUCCESS,
    SEND_RESET_LINK_FAILED,
    SEND_RESET_LINK_START,
    SEND_RESET_LINK_SUCCESS,
    VALIDATE_RESET_LINK_FAILED,
    VALIDATE_RESET_LINK_START,
    VALIDATE_RESET_LINK_SUCCESS,
} from '../actions/actionTypes';

const initialAccountState = {
    sentLinkError: null,
    sentLinkSuccess: null,
    sentLinkInProgress: false,
    resetPassError: null,
    resetPassSuccess: null,
    resetPassInProgress: false,
    isResetLinkValidated: null,
    validatingResetLink: false,
    validationError: null,
};

export default function accounts(state = initialAccountState, action) {
    switch (action.type) {
        case SEND_RESET_LINK_START:
            return {
                ...state,
                sentLinkError: null,
                sentLinkSuccess: null,
                sentLinkInProgress: true,
            };
        case SEND_RESET_LINK_FAILED:
            return {
                ...state,
                sentLinkInProgress: false,
                sentLinkSuccess: false,
                sentLinkError: action.error,
            };
        case SEND_RESET_LINK_SUCCESS:
            return {
                ...state,
                sentLinkInProgress: false,
                sentLinkSuccess: action.success,
                sentLinkError: false,
            };
        case VALIDATE_RESET_LINK_START:
            return {
                ...state,
                validatingResetLink: true,
                isResetLinkValidated: null,
                validationError: null,
            };
        case VALIDATE_RESET_LINK_FAILED:
            return {
                ...state,
                validatingResetLink: false,
                isResetLinkValidated: false,
                validationError: action.error,
            };
        case VALIDATE_RESET_LINK_SUCCESS:
            return {
                ...state,
                validatingResetLink: false,
                isResetLinkValidated: true,
                validationError: null,
            };
        case RESET_PASS_START:
            return {
                ...state,
                resetPassError: null,
                resetPassSuccess: null,
                resetPassInProgress: true,
            };
        case RESET_PASS_FAILED:
            return {
                ...state,
                resetPassInProgress: false,
                resetPassSuccess: false,
                resetPassError: action.error,
            };
        case RESET_PASS_SUCCESS:
            return {
                ...state,
                resetPassInProgress: false,
                resetPassError: false,
                resetPassSuccess: action.success,
            };
        default:
            return state;
    }
}
