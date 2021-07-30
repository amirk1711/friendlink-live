import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {
    FETCH_CHAT_USERS_FAILED,
    FETCH_CHAT_USERS_START,
    FETCH_CHAT_USERS_SUCCESSFULL,
    FETCH_CHATS_FAILED,
    FETCH_CHATS_START,
    FETCH_CHATS_SUCCESSFULL,
    CREATE_CHAT_FAILED,
    CREATE_CHAT_START,
    CREATE_CHAT_SUCCESSFULL,
    ADD_CHAT,
    CREATE_CHAT_USERS_FAILED,
    CREATE_CHAT_USERS_START,
    CREATE_CHAT_USERS_SUCCESSFULL,
    CLEAR_FETCH_STATE,
    SEND_CURRENT_CHAT_USER,
} from './actionTypes';

export function fetchChatUsers(id) {
    return (dispatch) => {
        const url = APIUrls.fetchChatUser(id);
        dispatch(fetchChatUserStart());
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetch Chat User Data...', data);
                if (data.success) {
                    dispatch(fetchChatUserSuccessfull(data.data.chatUsers));
                    return;
                }
                dispatch(fetchChatUserFailed());
            });
    };
}

export function fetchChatUserStart() {
    return {
        type: FETCH_CHAT_USERS_START,
    };
}

export function fetchChatUserFailed() {
    return {
        type: FETCH_CHAT_USERS_FAILED,
    };
}

export function fetchChatUserSuccessfull(chatUsers) {
    return {
        type: FETCH_CHAT_USERS_SUCCESSFULL,
        chatUsers,
    };
}

export function createChatUser(senderId, receiverId) {
    return (dispatch) => {
        const url = APIUrls.createChatUser();
        dispatch(createChatUserStart());
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
            body: getFormBody({ senderId, receiverId }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                console.log('Chat User Data in create Chat ', data);
                if (data.success) {
                    if (data.alreadyExist) {
                        await dispatch(sendCurrentChatUser(data.data.chatUser));
                        await dispatch(fetchChats(data.data.chatUser._id));
                        await dispatch(clearFetchState());
                        return;
                    }
                    await dispatch(createChatUserSuccessfull(data.data.newChatUser));
                    await dispatch(sendCurrentChatUser(data.data.newChatUser));
                    await dispatch(fetchChats(data.data.newChatUser._id));
                    return;
                }
                dispatch(createChatUserFailed());
            });
    };
}

export function clearFetchState() {
    return {
        type: CLEAR_FETCH_STATE,
    };
}

export function sendCurrentChatUser(chatUser) {
    return {
        type: SEND_CURRENT_CHAT_USER,
        chatUser,
    }
}
export function createChatUserStart() {
    return {
        type: CREATE_CHAT_USERS_START,
    };
}

export function createChatUserFailed() {
    return {
        type: CREATE_CHAT_USERS_FAILED,
    };
}

export function createChatUserSuccessfull(chatUser) {
    return {
        type: CREATE_CHAT_USERS_SUCCESSFULL,
        chatUser,
    };
}

export function fetchChats(id) {
    return (dispatch) => {
        const url = APIUrls.fetchChat(id);
        dispatch(fetchChatStart());
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Fetch Chat Data', data);
                if (data.success) {
                    dispatch(fetchChatSuccessfull(data.data.chats));
                    return;
                }
                dispatch(fetchChatFailed());
            });
    };
}

export function fetchChatStart() {
    return {
        type: FETCH_CHATS_START,
    };
}

export function fetchChatFailed() {
    return {
        type: FETCH_CHATS_FAILED,
    };
}

export function fetchChatSuccessfull(chats) {
    return {
        type: FETCH_CHATS_SUCCESSFULL,
        chats,
    };
}

export function createChat(chatObj) {
    return (dispatch) => {
        const url = APIUrls.createChat();
        dispatch(createChatStart());
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
            },
            body: getFormBody(chatObj),
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log('Create Chat Data', data);
                if (data.success) {
                    dispatch(createChatSuccessfull(data.data.chat));
                    return;
                }
                dispatch(createChatFailed());
            });
    };
}

export function createChatStart() {
    return {
        type: CREATE_CHAT_START,
    };
}

export function createChatFailed() {
    return {
        type: CREATE_CHAT_FAILED,
    };
}

export function createChatSuccessfull(chat) {
    return {
        type: CREATE_CHAT_SUCCESSFULL,
        chat,
    };
}

export function addChat(chat) {
    console.log('Chat passed in new dispatch', chat);
    return {
        type: ADD_CHAT,
        chat,
    };
}
