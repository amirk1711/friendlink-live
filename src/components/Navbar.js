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
                    <div className="nav-icons">
                        <div className="nav-icon-item">
                            <HomeOutlined />
                        </div>
                        <div className="nav-icon-item">
                            <NotificationsOutlined />
                            <span className="nav-icon-badge"></span>
                        </div>
                        <div className="nav-icon-item">
                            <MessageOutlined />
                            <span className="nav-icon-badge"></span>
                        </div>
                        
                    </div>

                    {auth.isLoggedin && (
                        <div className="user">
                            <Link to="/settings">
                                {/* <Person id="user-dp"/> */}
                                <img
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
                                    alt="user-dp"
                                    id="user-dp"
                                />
                            </Link>
                            <span>{auth.user.name}</span>
                        </div>
                    )}

                    <div className="nav-links">
                        <ul>
                            {!auth.isLoggedin && (
                                <li>
                                    <Link to="/login">Log in</Link>
                                </li>
                            )}

                            {auth.isLoggedin && (
                                <li onClick={this.logOut}>
                                    <LogoutOutlined />
                                </li>
                            )}

                            {!auth.isLoggedin && (
                                <li>
                                    <Link to="/signup">Register</Link>
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
