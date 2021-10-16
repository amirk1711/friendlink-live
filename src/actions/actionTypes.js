// login action types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const GOOGLE_AUTH = "GOOGLE_AUTH";

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const LOG_OUT = 'LOG_OUT';

// signup
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const CLEAR_AUTH_STATE = 'CLEAR_AUTH_STATE';

export const EDIT_USER_SUCCESSFUL = 'EDIT_USER_SUCCESSFUL';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';
export const EDIT_USER_START = 'EDIT_USER_START';
export const CHANGE_USER_PROFILE_SUCCESSFUL = 'CHANGE_USER_PROFILE_SUCCESSFUL';
export const START_UPLOAD_PROFILE = 'START_UPLOAD_PROFILE';

export const CHANGE_PASSWORD_START = 'CHANGE_PASSWORD_START';
export const CHANGE_PASSWORD_SUCCESSFULL = 'CHANGE_PASSWORD_SUCCESSFULL';
export const START_DELETE_ACCOUNT = 'START_DELETE_ACCOUNT';
export const DELETE_ACCOUNT_SUCCESSFULL = 'DELETE_ACCOUNT_SUCCESSFULL';

export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';

export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';
export const FOLLOW_FRIEND = 'FOLLOW_FRIEND';
export const UNFOLLOW_FRIEND = 'UNFOLLOW_FRIEND';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPDATE_POST_LIKE = 'UPDATE_POST_LIKE';
export const DELETE_POST_SUCCESSFULL = 'DELETE_POST_SUCCESSFULL';

export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';

export const FETCH_CHAT_USERS_SUCCESSFULL = 'FETCH_CHAT_USERS_SUCCESSFULL';
export const FETCH_CHAT_USERS_START = 'FETCH_CHAT_USERS_START';
export const FETCH_CHAT_USERS_FAILED = 'FETCH_CHAT_USERS_FAILED';

export const CREATE_CHAT_USERS_SUCCESSFULL = 'CREATE_CHAT_USERS_SUCCESSFULL';
export const CREATE_CHAT_USERS_START = 'CREATE_CHAT_USERS_START';
export const CREATE_CHAT_USERS_FAILED = 'CREATE_CHAT_USERS_FAILED';

export const FETCH_CHATS_SUCCESSFULL = 'FETCH_CHATS_SUCCESSFULL';
export const FETCH_CHATS_START = 'FETCH_CHATS_START';
export const FETCH_CHATS_FAILED = 'FETCH_CHATS_FAILED';

export const CREATE_CHAT_SUCCESSFULL = 'CREATE_CHAT_SUCCESSFULL';
export const CREATE_CHAT_START = 'CREATE_CHAT_START';
export const CREATE_CHAT_FAILED = 'CREATE_CHAT_FAILED';

export const ADD_CHAT = 'ADD_CHAT';

export const CLEAR_FETCH_STATE = 'CLEAR_FETCH_STATE';

export const SEND_CURRENT_CHAT_USER = 'SEND_CURRENT_CHAT_USER';
export const SET_REDIRECTED_USER = "SET_REDIRECTED_USER";
export const UPDATE_PROFILE = 'UPDATE_PROFILE';