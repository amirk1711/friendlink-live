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
} from '../actions/actionTypes';

const initialChatState = {
    currentChatUser: {},
    chatUsers: [],
    chats: [],
    isSettingCurrentChatUser: false,
    isFetchingChatUsers: false,
    isFetchingChats: false,
    isCreatingChat: false,
};

export default function chat(state = initialChatState, action) {
    switch (action.type) {
        case FETCH_CHAT_USERS_START:
            return {
                ...state,
                isFetchingChatUsers: true,
            };
        case FETCH_CHAT_USERS_SUCCESSFULL:
            return {
                ...state,
                chatUsers: action.chatUsers,
                isFetchingChatUsers: false,
            };
        case FETCH_CHAT_USERS_FAILED:
            return {
                ...state,
                isFetchingChatUsers: false,
            };
        case FETCH_CHATS_START:
            return {
                ...state,
                isFetchingChats: true,
                isSettingCurrentChatUser: true,
            };
        case FETCH_CHATS_SUCCESSFULL:
            return {
                ...state,
                chats: action.chats,
                isFetchingChats: false,
            };
        case FETCH_CHATS_FAILED:
            return {
                ...state,
                isFetchingChats: false,
            };
        case CREATE_CHAT_START:
            return {
                ...state,
                isCreatingChat: true,
            };
        case CREATE_CHAT_SUCCESSFULL:
            return {
                ...state,
                chats: [...state.chats, action.chat],
                isCreatingChat: false,
            };
        case CREATE_CHAT_FAILED:
            return {
                ...state,
                isCreatingChat: false,
            };
        case ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, action.chat],
            };
        case CREATE_CHAT_USERS_START:
            return {
                ...state,
                isFetchingChatUsers: true,
            };
        case CREATE_CHAT_USERS_SUCCESSFULL:
            return {
                ...state,
                chatUsers: [...state.chatUsers, action.chatUser],
                isFetchingChatUsers: false,
            };
        case CREATE_CHAT_USERS_FAILED:
            return {
                ...state,
                isFetchingChatUsers: false,
            };

        case CLEAR_FETCH_STATE:
            return {
                ...state,
                isFetchingChatUsers: false,
            }
        case SEND_CURRENT_CHAT_USER:
            return {
                ...state,
                currentChatUser: action.chatUser,
                isSettingCurrentChatUser: false,
            }
        default:
            return state;
    }
}
