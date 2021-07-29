import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createChat, fetchChats, fetchChatUsers } from '../actions/chat';
// import { format } from 'timeago.js';
const dateformat = require('dateformat');

function Chat(props) {
    console.log('Props in Chat', props);
    const { dispatch, auth, chat } = props;
    const { user } = auth;
    const { chatUsers, chats, isFetchingChats, isFetchingChatUsers } = chat;

    const [currentChatUser, setCurrentChatUser] = useState(null);
    // const [currentChatDate, setCurrentChatDate] = useState(null);
    const [newChat, setNewChat] = useState('');
    const scrollRef = useRef();

    useEffect(() => {
        dispatch(fetchChatUsers(user._id));
    }, [user._id, dispatch]);

    const handleChatClick = async (user) => {
        await setCurrentChatUser(user._id);
        dispatch(fetchChats(user._id));
    };

    const handleSendBtn = async (e) => {
        e.preventDefault();
        console.log('Indide sedn btn current chat user', currentChatUser);
        const chatObj = await {
            sender: user._id,
            message: newChat,
            chatUserId: currentChatUser,
        };

        console.log('chtobj', chatObj);
        setNewChat('');

        await props.dispatch(createChat(chatObj));
    };

    useEffect(() => {
        // to scroll the last message into the viewport
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);
    let currentChatDate = null;

    return (
        <div className="chat">
            <div className="chat-menu">
                <div className="chat-account">
                    <Link to="/#">
                        <img
                            src="https://image.flaticon.com/icons/png/512/848/848043.png"
                            alt="user-pic"
                            className="medium profile-pic"
                        />
                    </Link>
                    &ensp;&ensp;
                    <Link to="/#">
                        <span>amirkhann.17</span>
                    </Link>
                </div>

                <div className="post-actions">
                    <button className="post-like no-btn">Messages</button>
                    <button className="post-comments no-btn">Online</button>
                </div>

                {!isFetchingChatUsers && (
                    <div className="chat-users">
                        {chatUsers.map((user) => {
                            return (
                                <div
                                    className="chat-users-list"
                                    onClick={() => {
                                        handleChatClick(user);
                                    }}
                                >
                                    <img
                                        src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                        alt="user-pic"
                                        className="large profile-pic"
                                    />
                                    &ensp;&nbsp;
                                    <div>
                                        <p className="black-text medium-text bold-text">
                                            amirkhann.17
                                        </p>
                                        <p className="grey-text medium-text">
                                            You sent a message &bull; 17m
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {isFetchingChatUsers && <div>Fetching Chat Users </div>}
            </div>

            {currentChatUser ? (
                <div className="chat-box">
                    <div className="selected-chat-user">
                        <Link to="/#">
                            <img
                                src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                alt="user-pic"
                                className="medium profile-pic"
                            />
                        </Link>
                        &ensp;&ensp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                amirkhann.17
                            </p>
                            <p className="grey-text small-text">3m ago</p>
                        </Link>
                    </div>

                    {!isFetchingChats && (
                        <div className="chat-messages">
                            {chats.map((chat) => {
                                // console.log('chat in map', chat);
                                let changed = false;

                                // console.log('currentChatDate', currentChatDate);
                                // console.log(
                                //     dateformat(
                                //         chat.createdAt,
                                //         'mmmm d, yyyy'
                                //     ) !== currentChatDate
                                // );
                                if (
                                    !currentChatDate ||
                                    dateformat(
                                        chat.createdAt,
                                        'mmmm d, yyyy'
                                    ) !== currentChatDate
                                ) {
                                    // console.log('Inside if');
                                    changed = true;
                                    // setCurrentChatDate(
                                    //     dateformat(
                                    //         chat.createdAt,
                                    //         'mmmm dS yyyy'
                                    //     )
                                    // );

                                    currentChatDate = dateformat(
                                        chat.createdAt,
                                        'mmmm d, yyyy'
                                    );
                                }

                                // console.log(
                                //     'changed before every chat render',
                                //     changed
                                // );
                                return (
                                    <div>
                                        {changed && (
                                            <p className="chats-date small-text grey-text">
                                                {currentChatDate}
                                            </p>
                                        )}
                                        <div
                                            className={
                                                chat.sender === user._id
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
                    )}

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
                    Open a conversation to start a chat.
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











/*
There is a socket server.

whenever users connect to our application, 
its gonna connect the socket server and 
the users will have their own socket ID 
and inside the scoket server there is no db,
socket server using tcp/ip connection 

*/