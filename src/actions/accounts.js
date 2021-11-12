import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
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
} from './actionTypes';

export function startSendingResetLink() {
    return {
        type: SEND_RESET_LINK_START,
    };
}

export function sendingResetLinkFailed(errorMessage) {
    return {
        type: SEND_RESET_LINK_FAILED,
        error: errorMessage,
    };
}

export function sendResetLinkSuccess(successMessage) {
    return {
        type: SEND_RESET_LINK_SUCCESS,
        success: successMessage,
    };
}

export function sendResetLink(email) {
    return (dispatch) => {
        dispatch(startSendingResetLink());
        const url = APIUrls.confirmEmail();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({ email }),
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch(sendResetLinkSuccess(data.message));
                } else {
                    dispatch(sendingResetLinkFailed(data.message));
                }
            });
    };
}

export function startValidateLink() {
    return {
        type: VALIDATE_RESET_LINK_START,
    };
}

export function validateLinkFailed(errorMessage) {
    return {
        type: VALIDATE_RESET_LINK_FAILED,
        error: errorMessage,
    };
}

export function validateLinkSuccess() {
    return {
        type: VALIDATE_RESET_LINK_SUCCESS,
    };
}

export function validateLink(token) {
    return (dispatch) => {
        dispatch(startValidateLink());
        const url = APIUrls.validateResetLink(token);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch(validateLinkSuccess());
                } else {
                    dispatch(validateLinkFailed(data.message));
                }
            });
    };
}

export function startResetPass() {
    return {
        type: RESET_PASS_START,
    };
}

export function resetPassFailed(errorMessage) {
    return {
        type: RESET_PASS_FAILED,
        error: errorMessage,
    };
}

export function resetPassSuccess(successMessage) {
    return {
        type: RESET_PASS_SUCCESS,
        success: successMessage,
    };
}

export function resetPass(accessToken, password, confirmPassword) {
    return (dispatch) => {
        dispatch(startResetPass());
        if (password !== confirmPassword) {
            dispatch(resetPassFailed('Passwords do not match!'));
            return;
        }
        const url = APIUrls.resetPassword();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: getFormBody({ accessToken, password }),
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch(resetPassSuccess(data.message));
                } else {
                    dispatch(resetPassFailed(data.message));
                }
            });
    };
}
