import React from 'react';
import { Link } from 'react-router-dom';

function Chat(props) {
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

                <div className="chat-users">
                    <div className="chat-users-list">
                        <Link to="/#">
                            <img
                                src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                alt="user-pic"
                                className="large profile-pic"
                            />
                        </Link>
                        &ensp;&nbsp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                amirkhann.17
                            </p>
                            <p className="grey-text medium-text">
                                You sent a message &bull; 17m
                            </p>
                        </Link>
                    </div>

                    <div className="chat-users-list">
                        <Link to="/#">
                            <img
                                src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                alt="user-pic"
                                className="large profile-pic"
                            />
                        </Link>
                        &ensp;&nbsp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                amirkhann.17
                            </p>
                            <p className="grey-text medium-text">
                                You sent a message &bull; 17m
                            </p>
                        </Link>
                    </div>

                    <div className="chat-users-list">
                        <Link to="/#">
                            <img
                                src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                alt="user-pic"
                                className="large profile-pic"
                            />
                        </Link>
                        &ensp;&nbsp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                amirkhann.17
                            </p>
                            <p className="grey-text medium-text">
                                You sent a message &bull; 17m
                            </p>
                        </Link>
                    </div>

                    <div className="chat-users-list">
                        <Link to="/#">
                            <img
                                src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                alt="user-pic"
                                className="large profile-pic"
                            />
                        </Link>
                        &ensp;&nbsp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                amirkhann.17
                            </p>
                            <p className="grey-text medium-text">
                                You sent a message &bull; 17m
                            </p>
                        </Link>
                    </div>

                    <div className="chat-users-list">
                        <Link to="/#">
                            <img
                                src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                alt="user-pic"
                                className="large profile-pic"
                            />
                        </Link>
                        &ensp;&nbsp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                amirkhann.17
                            </p>
                            <p className="grey-text medium-text">
                                You sent a message &bull; 17m
                            </p>
                        </Link>
                    </div>

                    <div className="chat-users-list">
                        <Link to="/#">
                            <img
                                src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                alt="user-pic"
                                className="large profile-pic"
                            />
                        </Link>
                        &ensp;&nbsp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                amirkhann.17
                            </p>
                            <p className="grey-text medium-text">
                                You sent a message &bull; 17m
                            </p>
                        </Link>
                    </div>

                    <div className="chat-users-list">
                        <Link to="/#">
                            <img
                                src="https://image.flaticon.com/icons/png/512/848/848043.png"
                                alt="user-pic"
                                className="large profile-pic"
                            />
                        </Link>
                        &ensp;&nbsp;
                        <Link to="/#">
                            <p className="black-text medium-text bold-text">
                                amirkhann.17
                            </p>
                            <p className="grey-text medium-text">
                                You sent a message &bull; 17m
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

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

                <div className="chat-messages">
                    <p className="chats-date small-text grey-text">Jul 26, 2021</p>
                    <div className="message">
                        <div className="message-text-container">
                            <p className="message-text">
                                It was popularised in the 1960s
                            </p>
                            <span className="message-time">8:34 PM</span>
                        </div>
                    </div>
                    <div className="message">
                        <div className="message-text-container">
                            <p className="message-text">
                                All the Lorem Ipsum generators on the Internet
                                tend to repeat predefined chunks as necessary,
                                making this the first true generator on the
                                Internet.
                            </p>
                            <span className="message-time">10:35 PM</span>
                        </div>
                    </div>
                    <div className="my-message">
                        <div className="message-text-container">
                            <p className="message-text">
                                Contrary to popular belief, Lorem Ipsum is not
                                simply random text. It has roots in a piece of
                                classical Latin literature from 45 BC, making it
                                over 2000 years old.
                            </p>
                            <span className="message-time">10:35 PM</span>
                        </div>
                    </div>

                    <p className="chats-date small-text grey-text">Jul 27, 2021</p>
                    <div className="message">
                        <div className="message-text-container">
                            <p className="message-text">
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable.
                            </p>
                            <span className="message-time">12:48 PM</span>
                        </div>
                    </div>

                    <div className="my-message">
                        <div className="message-text-container">
                            <p className="message-text">
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                            </p>
                            <span className="message-time">1:08 AM</span>
                        </div>
                    </div>

                    <div className="my-message">
                        <div className="message-text-container">
                            <p className="message-text">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s,
                            </p>
                            <span className="message-time">1:16 AM</span>
                        </div>
                    </div>

                    <div className="my-message">
                        <div className="message-text-container">
                            <p className="message-text">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit
                            </p>
                            <span className="message-time">1:16 AM</span>
                        </div>
                    </div>

                    <div className="message">
                        <div className="message-text-container">
                            <p className="message-text">Lorem ipsum dolor sit amet</p>
                            <span className="message-time">1:16 AM</span>
                        </div>
                    </div>
                </div>

                <div className="chat-message-input">
                    <textarea
                        className="chat-message-text"
                        placeholder="Type a message..."
                    ></textarea>
                    <button className="chat-message-send no-btn">Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
