import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions/auth';
import { searchUsers } from '../actions/search';

import {
    Search,
    PersonOutlined,
    MessageOutlined,
    NotificationsOutlined,
    HomeOutlined,
    LogoutOutlined,
} from '@material-ui/icons';

class Navbar extends React.Component {
    logOut = () => {
        localStorage.removeItem('token');
        this.props.dispatch(logoutUser());
    };

    handleSearch = (e) => {
        const searchText = e.target.value;
        this.props.dispatch(searchUsers(searchText));
    };

    render() {
        const { auth, results } = this.props;
        return (
            <nav className="nav">
                <div className="left-div">
                    <Link to="/">
                        <span className="logo">Friendlink</span>
                    </Link>
                </div>
                <div className="search-container">
                    <Search className="search-icon" />
                    <input placeholder="Search" onChange={this.handleSearch} />

                    {results.length > 0 && (
                        <div className="search-results">
                            <ul>
                                {results.map((user) => (
                                    <li
                                        className="search-results-row"
                                        key={user._id}
                                    >
                                        <Link to={`/user/${user._id}`}>
                                            {/* <img
                                                src="user.avatar"
                                                alt="user-dp"
                                            /> */}
                                            <PersonOutlined />
                                            <span>{user.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="right-nav">
                    {auth.isLoggedin && (
                        <div className="nav-icons">
                            <div className="nav-icon-item">
                                <HomeOutlined className="home-icon" />
                            </div>
                            <div className="nav-icon-item">
                                <NotificationsOutlined className="noti-icon" />
                                <span className="nav-icon-badge">&bull;</span>
                            </div>
                            <div className="nav-icon-item">
                                <MessageOutlined className="msg-icon" />
                                <span className="nav-icon-badge">&bull;</span>
                            </div>
                        </div>
                    )}

                    {auth.isLoggedin && (
                        <div className="user">
                            {/* /settings */}
                            <Link to={`/user/${auth.user._id}`}>
                                {/* <Person id="user-dp"/> */}
                                <img
                                    src={auth.user.avatar}
                                    alt="user-dp"
                                    id="user-dp"
                                />
                            </Link>
                            <span>{auth.user.name}</span>
                        </div>
                    )}

                    <div className="nav-links">
                        <ul>
                            {auth.isLoggedin && (
                                <li onClick={this.logOut}>
                                    <LogoutOutlined />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        results: state.search.results,
    };
}
export default connect(mapStateToProps)(Navbar);
