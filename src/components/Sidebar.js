import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SuggestionsList } from './';


class Sidebar extends Component {
    render() {
        const { suggestions } = this.props;
        return (
            <div className="side-bar">
                {/* <div className="friends-list-wrapper">
                    <p className="grey-text mb-8 medium-text">Friends</p>
                    <FriendsList friends={friends} />
                </div> */}

                <div className="suggestions-list-wrapper">
                    <p className="grey-text mb-8 medium-text">
                        Suggestions For You
                    </p>
                    <SuggestionsList suggestions={suggestions} />
                </div>

                <div className="text-center footer-text">
                    <span className="copy-text medium-text">
                        &copy; {new Date().getFullYear()} Friendlink By Amir
                        Khan
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Sidebar);
