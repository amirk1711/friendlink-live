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
        let activeTab = 4;
        return (
            <div className="settings">
                <div className="setting-btns">
                    <button>Edit Profile</button>
                    <button>Change Password</button>
                    <button>Delete Account</button>
                    <button>Help</button>
                </div>

                {activeTab === 1 && <EditProfile />}
                {activeTab === 2 && <ChangePassword />}
                {activeTab === 3 && <DeleteAccount />}
                {activeTab === 4 && <Help />}
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
