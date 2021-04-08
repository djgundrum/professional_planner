import React, { Component } from 'react';
import './profileBody.css'
import ProfileCalendarBody from './profile_calendar_body/ProfileCalendarBody'
import ProfileTeamBody from './profile_team_body/ProfileTeamBody'
import ProfileContactBody from './profile_contact_body/ProfileContactBody'

class ProfileBody extends Component {
    state = {
        user: {
            "id": 1234,
            "name": "Justin",
            "email": "jb@gmail.com",
            "password": "Passward1234"
        }
    }
    render() { 
        switch(this.props.activeScreen) {
            case "information":
                return (
                    <div id="profileAccountDiv" className="profileBodies">
                        <div id="profileNamesDiv">
                            <div id="profileFirstDiv">
                                <p className="accountTitle">First Name</p>
                                <input type="text" name="" id="" className="accountInput" value={this.state.user.name}/>
                            </div>
                            <div id="profileEmailDiv">
                                <p className="accountTitle">Email</p>
                                <input type="text" name="" id="" className="accountInput" value={this.state.user.email}/>
                            </div>
                        </div>
                        <div id="profilePasswordDiv">
                            <p className="accountTitle">Password</p>
                            <input type="password" name="" id="" className="accountInput" value={this.state.user.password} disabled={true}/>
                            <div id="changePasswordDiv">
                                Change
                            </div>
                        </div>
                    </div>
                )
            case "calendar":
                return (
                    <ProfileCalendarBody></ProfileCalendarBody>
                )
            case "team":
                return (
                    <ProfileTeamBody></ProfileTeamBody>
                )
            case "contact":
                return (
                    <ProfileContactBody></ProfileContactBody>
                )
        }
    }
}
 
export default ProfileBody;