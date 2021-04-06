import React, { Component } from 'react';
import './profileBody.css'
import ProfileCalendarBody from './profile_calendar_body/ProfileCalendarBody'

class ProfileBody extends Component {
    state = {  }
    render() { 
        return (
            <div id="profileBody">
                {/* <div id="profileAccountDiv" className="profileBodies">
                    <div id="profileNamesDiv">
                        <div id="profileFirstDiv">
                            <p className="accountTitle">First Name</p>
                            <input type="text" name="" id="" className="accountInput"/>
                        </div>
                        <div id="profileLastDiv">
                            <p className="accountTitle">Last Name</p>
                            <input type="text" name="" id="" className="accountInput"/>
                        </div>
                    </div>
                    
                    <div id="profileEmailDiv">
                        <p className="accountTitle">Email</p>
                        <input type="text" name="" id="" className="accountInput"/>
                    </div>
                    <div id="profilePasswordDiv">
                        <p className="accountTitle">Password</p>
                        <input type="text" name="" id="" className="accountInput"/>
                    </div>
                </div> */}
                <ProfileCalendarBody></ProfileCalendarBody>
                <div id="profileTeamDiv">

                </div>
                <div id="profileContactsDiv">

                </div>
            </div>
        );
    }
}
 
export default ProfileBody;