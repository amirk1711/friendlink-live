import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, editUser, logoutUser } from '../actions/auth';
import { EditProfile, ChangePassword, DeleteAccount } from './';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.auth.user.name,
            password: '',
            confirmPassword: '',
            editMode: false,
            activeTab: 1,
        };
    }

    handleChange = (fieldName, val) => {
        this.setState({
            [fieldName]: val,
        });
    };

    handleSave = () => {
        const { password, confirmPassword, name } = this.state;
        const { user } = this.props.auth;
        // TODO: Add error handling

        this.props.dispatch(
            editUser(name, password, confirmPassword, user._id)
        );
    };

    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    logOut = () => {
        localStorage.removeItem('token');
        this.props.dispatch(logoutUser());
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <div className="settings">
                    <div className="setting-btns">
                        <button autoFocus onClick={() => {this.setState({activeTab: 1})}}>Edit Profile</button>
                        <button onClick={() => {this.setState({activeTab: 2})}}>Change Password</button>
                        <button onClick={() => {this.setState({activeTab: 3})}}>Delete Account</button>
                        <button onClick={() => {this.logOut()}}>Logout</button>
                    </div>

                    {activeTab === 1 && <EditProfile />}
                    {activeTab === 2 && <ChangePassword />}
                    {activeTab === 3 && <DeleteAccount />}
                </div>

                <div className="text-center footer-text">
                    <span className="copy-text medium-text">
                        &copy; {new Date().getFullYear()} Friendlink By Amir Khan
                    </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return {
        auth,
    };
}
export default connect(mapStateToProps)(Settings);
