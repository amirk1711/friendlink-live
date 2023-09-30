import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MessageOutlined } from '@material-ui/icons';

class Navbar extends React.Component {
    render() {
        const { auth } = this.props;
        return (
            <nav className="nav">
                <div className="left-div">
                    <Link to="/">
                        <span className="logo">Friendlink</span>
                    </Link>
                </div>

                <div className="right-nav">
                    {auth.isLoggedin && (
                        <div className="nav-icons">                            
                            <Link to="/messages">
                                <div className="nav-icon-item">
                                    <MessageOutlined className="msg-icon" />
                                </div>
                            </Link>
                        </div>
                    )}

                    {auth.isLoggedin && (
                        <div className="user">
                            <Link to={`/user/${auth.user._id}`}>
                                <img
                                    src={auth.user.avatar}
                                    alt="user-dp"
                                    id="user-dp"
                                />
                            </Link>
                        </div>
                    )}
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
