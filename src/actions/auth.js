import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from './actionTypes';

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
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
