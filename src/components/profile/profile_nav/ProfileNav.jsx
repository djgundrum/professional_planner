import React, { Component } from 'react';
import './profileNav.css';
import profileIcon from '../../images/profileIcon.png'
import calendarIconPNG from '../../images/calendarIconPNG.png'
import teamIcon from '../../images/teamIcon.png'
import contactsIcon from '../../images/contactsIcon.png'
import backArrow from '../../images/dropdownArrowWhite.png'

class ProfileNav extends Component {
    state = {  }
    render() { 
        return (
            <div id="profileNav">
                <div className="profileBack">
                    <div id="profileBackContainer">
                        <img src={backArrow} alt="" className="profileBackArrow"/>
                        <p>
                            {"Back"}
                        </p>
                    </div>
                </div>
                <div className="profileNavOption">
                    <div>
                        <img src={profileIcon} alt="" className="profileNavIcon" style={{height: "40px", width: "40px"}}/>
                        <p>Account Information</p>
                    </div>
                </div>
                <div className="profileNavOption">
                    <div>
                        <img src={calendarIconPNG} alt="" className="profileNavIcon" style={{height: "30px", width: "30px", marginTop: "5px"}}/>
                        <p>Calendars</p>
                    </div>
                </div>
                <div className="profileNavOption">
                    <div>
                        <img src={teamIcon} alt="" className="profileNavIcon" style={{height: "40px", width: "40px"}}/>
                        <p>Team Schedules</p>
                    </div>
                </div>
                <div className="profileNavOption">
                    <div>
                        <img src={contactsIcon} alt="" className="profileNavIcon" style={{height: "30px", width: "30px", marginTop: "5px"}}/>
                        <p>Contacts</p>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ProfileNav;