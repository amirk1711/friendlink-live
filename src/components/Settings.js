import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, editUser } from '../actions/auth';
import { EditProfile, ChangePassword, DeleteAccount, Help } from './';

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
        // let we have field as name and value as Amir
        // it will automatically set name : Amir in the state
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

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <div className="settings">
                    <div className="setting-btns">
                        <button autoFocus onClick={() => {this.setState({activeTab: 1})}}>Edit Profile</button>
                        <button onClick={() => {this.setState({activeTab: 2})}}>Change Password</button>
                        <button onClick={() => {this.setState({activeTab: 3})}}>Delete Account</button>
                        <button onClick={() => {this.setState({activeTab: 4})}}>Help</button>
                    </div>

                    {/* {console.log('active tab', activeTab)} */}

                    {activeTab === 1 && <EditProfile />}
                    {activeTab === 2 && <ChangePassword />}
                    {activeTab === 3 && <DeleteAccount />}
                    {activeTab === 4 && <Help />}
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

function mapStateToProps({ auth }) {
    return {
        auth,
    };
}
export default connect(mapStateToProps)(Settings);
