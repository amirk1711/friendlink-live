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
} from '../actions/actionTypes';

const initialChatState = {
    chatUsers: [],
    chats: [],
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
        default:
            return state;
    }
}
