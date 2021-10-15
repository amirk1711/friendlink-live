import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    createChat,
    fetchChats,
    fetchChatUsers,
    addChat,
    createChatUser,
} from '../actions/chat';
import { io } from 'socket.io-client';

// import { format } from 'timeago.js';
const dateformat = require('dateformat');

function Chat(props) {
    const { dispatch, auth, chat } = props;
    const { user } = auth;
    const { chatUsers, chats, isFetchingChats, isFetchingChatUsers } = chat;

    const [currentChatUser, setCurrentChatUser] = useState(null);
    const [newChat, setNewChat] = useState('');
    const socket = useRef();
    const scrollRef = useRef();

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(chat.redirectedUser);
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        setCurrentChatUser(chat.currentChatUser);
    }, [chat.currentChatUser]);

    useEffect(() => {
        console.log('setting up socket in client side');
        socket.current = io('https://fl-chat.herokuapp.com/');
        // removed ws with https

        socket.current.on('getMessage', (data) => {
            // console.log('data in getMessage', data);
            setArrivalMessage({
                sender: data.senderId,
                message: data.message,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        // console.log('inside, a hook', arrivalMessage, currentChatUser);
        arrivalMessage &&
            (Object.values(currentChatUser?.connections[0]).includes(
                arrivalMessage.sender
            ) ||
                Object.values(currentChatUser?.connections[1]).includes(
                    arrivalMessage.sender
                )) &&
            dispatch(addChat(arrivalMessage));
    }, [arrivalMessage, currentChatUser, dispatch]);

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        // console.log('before setting online users', user);
        socket.current.on('getUsers', (users) => {
            setOnlineUsers(
                user.following.filter((f) =>
                    users.some((u) => u.userId === f._id)
                )
            );
        });
    }, [user]);

    useEffect(() => {
        dispatch(fetchChatUsers(user._id));
    }, [user._id, dispatch]);

    const handleChatClick = async (user, otherUser) => {
        await setCurrentChatUser(user);
        await setSelectedUser(otherUser);
        dispatch(fetchChats(user._id));
    };

    const handleOnlineChatClick = async (onlineUser) => {
        // console.log('online user', onlineUser);
        // console.log('sender :', user);

        // fetch currentChatUser from chat store
        // await setCurrentChatUser(chat.currentChatUser);

        await setSelectedUser(onlineUser);
        await dispatch(createChatUser(user._id, onlineUser._id));
    };

    const handleSendBtn = async (e) => {
        e.preventDefault();
        // console.log('Indide send btn current chat user', currentChatUser);
        const chatObj = await {
            sender: user._id,
            message: newChat,
            chatUserId: currentChatUser._id,
        };

        const receiver = currentChatUser.connections.find(
            (chatUser) => chatUser._id !== user._id
        );

        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId: receiver._id,
            message: newChat,
        });

        // console.log('chtobj', chatObj);
        setNewChat('');

        await props.dispatch(createChat(chatObj));
    };

    useEffect(() => {
        // to scroll the last message into the viewport
        scrollRef.current?.scrollIntoView();
    }, [chats]);

    let currentChatDate = null;

    return (
        <div className="chat">
            <div className="chat-menu">
                <div className="chat-account">
                    <Link to="/#">
                        <img
                            src={user.avatar}
                            alt="user-pic"
                            className="medium profile-pic"
                        />
                    </Link>
                    &ensp;&ensp;
                    <Link to="/#">
                        <span>{user.username}</span>
                    </Link>
                </div>

                <div className="post-actions">
                    <button
                        autoFocus
                        className="post-like no-btn chat-tab"
                        onClick={() => {
                            setActiveTab(1);
                        }}
                    >
                        Messages
                    </button>
                    <button
                        className="post-comments no-btn chat-tab"
                        onClick={() => {
                            setActiveTab(2);
                        }}
                    >
                        Online
                    </button>
                </div>

                {!isFetchingChatUsers && activeTab === 1 && (
                    <div className="chat-users">
                        {chatUsers?.map((chatuser) => {
                            let otherUser =
                                chatuser.connections[0]._id === user._id
                                    ? chatuser.connections[1]
                                    : chatuser.connections[0];

                            return (
                                <div
                                    tabIndex="0"
                                    className="chat-users-list"
                                    onClick={() => {
                                        handleChatClick(chatuser, otherUser);
                                    }}
                                >
                                    <img
                                        src={otherUser.avatar}
                                        alt="user-pic"
                                        className="large profile-pic"
                                    />
                                    &ensp;&nbsp;
                                    <div>
                                        <p className="black-text medium-text bold-text">
                                            {otherUser.username}
                                        </p>
                                        <p className="grey-text medium-text">
                                            {otherUser.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {isFetchingChatUsers && activeTab === 1 && (
                    <div>Fetching Chat Users </div>
                )}

                {activeTab === 2 && (
                    <div className="chat-users">
                        {onlineUsers.map((onlineUser) => {
                            // let otherUser =
                            //     onlineUser.connections[0]._id === user._id
                            //         ? onlineUser.connections[1]
                            //         : onlineUser.connections[0];

                            return (
                                <div
                                    className="chat-users-list"
                                    onClick={() => {
                                        handleOnlineChatClick(onlineUser);
                                    }}
                                >
                                    <img
                                        src={onlineUser.avatar}
                                        alt="user-pic"
                                        className="large profile-pic"
                                    />
                                    &ensp;&nbsp;
                                    <div>
                                        <p className="black-text medium-text bold-text">
                                            {onlineUser.username}
                                        </p>
                                        <p className="grey-text medium-text">
                                            {onlineUser.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {currentChatUser && selectedUser ? (
                <div className="chat-box">
                    <div className="selected-chat-user">
                        <Link to="/#">
                            <img
                                src={selectedUser.avatar}
                                alt="user-pic"
                                className="medium profile-pic"
                            />
                        </Link>
                        &ensp;&ensp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                {selectedUser.username}
                            </p>
                            <p className="grey-text small-text">3m ago</p>
                        </Link>
                    </div>

                    <div className="chat-messages">
                        {isFetchingChats && <div>Fetching Chats...</div>}
                        {!isFetchingChats &&
                            chats.map((chat) => {
                                let changed = false;

                                if (
                                    !currentChatDate ||
                                    dateformat(
                                        chat.createdAt,
                                        'mmmm d, yyyy'
                                    ) !== currentChatDate
                                ) {
                                    changed = true;

                                    currentChatDate = dateformat(
                                        chat.createdAt,
                                        'mmmm d, yyyy'
                                    );
                                }

                                return (
                                    <div>
                                        {changed && (
                                            <p className="chats-date small-text grey-text">
                                                {currentChatDate}
                                            </p>
                                        )}
                                        <div
                                            className={
                                                chat.sender._id === user._id
                                                    ? `my-message`
                                                    : `message`
                                            }
                                        >
                                            <div
                                                className="message-text-container"
                                                ref={scrollRef}
                                            >
                                                <p className="message-text">
                                                    {chat.message}
                                                </p>
                                                <span className="message-time">
                                                    {dateformat(
                                                        chat.createdAt,
                                                        'h:MM TT'
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="chat-message-input">
                        <textarea
                            className="chat-message-text"
                            placeholder="Type a message..."
                            onChange={(e) => setNewChat(e.target.value)}
                            value={newChat}
                        ></textarea>
                        <button
                            className="chat-message-send no-btn"
                            onClick={handleSendBtn}
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <div className="chat-box no-chat">
                    Open a chat to send your messages.
                </div>
            )}
        </div>
    );
}

function mapStateToProps({ auth, chat }) {
    return {
        auth,
        chat,
    };
}
export default connect(mapStateToProps)(Chat);
