import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FriendsList, SuggestionsList} from './';
class Sidebar extends Component {
    render() {
        const { friends, suggestions } = this.props;
        console.log('porps from sidebar', this.props);
        return (
            <div className="side-bar">
                <div className="friends-list-wrapper">
                    <p className="grey-text mb-8 medium-text">Friends</p>
                    <FriendsList friends={friends}/>
                </div>

                <div className="suggestions-list-wrapper">
                    <p className="grey-text mb-8 medium-text">Suggestions For You</p>
                    <SuggestionsList suggestions={suggestions}/>
                </div>

                <div className="text-center">
                    <span className="copy-text small-text">&copy; {new Date().getFullYear()} AMIR KHAN FRIENDLINK</span>
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
