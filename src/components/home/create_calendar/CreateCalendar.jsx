import './createCalendar.css'
import xIcon from '../../images/x.svg'
import calendarIcon from '../../images/calendarIcon.svg'
import timezoneIcon from '../../images/timezoneIcon.svg'

import React, { Component } from 'react';

class CreateCalendar extends Component {
    state = {
        name: "",
        calendar: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        timezone: "",
        timezoneOffset: ""
    }
    addCalendar = () => {
        //Send parameters
        this.props.toggleCreateCalendarScreen()
    }
    updateFields = () => {
        this.setState({
            name: document.getElementById("calendarNameInput").value
            
        })
    }
    render() { 
        return (
            <div id="createCalendarScreen" style={this.props.isCreateCalendarScreen ? {display: "block"} : {display: "none"}}>
                <div id="createCalendarBackground">

                </div>
                <div id="createCalendarDiv">
                    <img src={xIcon} alt="" id="xIcon" onClick={this.props.toggleCreateCalendarScreen}/>
                    <input type="text" id="calendarNameInput" placeholder="Calendar Name..." onChange={this.updateFields}/>
                    <img src={calendarIcon} alt="" id="calendarIcon"/>
                    <select id="calendarSelect">
                        {this.props.mySchedules.map((schedule) => (
                            <option value={schedule.name}>{schedule.name}</option>
                        ))}
                    </select>    
                    <p id="startText">Start: </p>
                    <input type="date" id="startDateInput"/>
                    <input type="time" id="startTimeInput"/>
                    <p id="endText">End: </p>
                    <input type="date" id="endDateInput"/>
                    <input type="date" id="endTimeInput"/>
                    <img src={timezoneIcon} alt="" id="timezoneIcon"/>
                    <select id="timezoneSelect">
                        {this.props.timezones.map((timezone) => (
                            
                            <option value={timezone}>{timezone}</option>
                        ))}
                    </select>
                    <div id="createCalendarScreenButton" onClick={this.addCalendar}>
                        Create Calendar
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CreateCalendar;