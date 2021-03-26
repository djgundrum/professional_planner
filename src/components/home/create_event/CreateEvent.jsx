import './createEvent.css'
import xIcon from '../../images/x.svg'
import calendarIcon from '../../images/calendarIcon.svg'
import timezoneIcon from '../../images/timezoneIcon.svg'

import React, { Component } from 'react';

class CreateEvent extends Component {
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
    addEvent = () => {
        //Send parameters
        this.props.toggleCreateEventScreen()
    }
    updateFields = () => {
        this.setState({
            name: document.getElementById("eventNameInput").value,
            calendar: document.getElementById("calendarSelect").value,
            startDate: document.getElementById("startDateInput").value,
            startTime: document.getElementById("startTimeInput").value,
            endDate: document.getElementById("endDateInput").value,
            endTime: document.getElementById("endTimeInput").value,
            timezone: document.getElementById("timezoneSelect").value,
            timezoneOffset: ""
        })
    }
    render() { 
        return (
            <div id="createEventScreen" style={this.props.isCreateEventScreen ? {display: "block"} : {display: "none"}}>
                <div id="createEventBackground">

                </div>
                <div id="createEventDiv">
                    <img src={xIcon} alt="" id="xIcon" onClick={this.props.toggleCreateEventScreen}/>
                    <input type="text" id="eventNameInput" placeholder="Event Name..." onChange={this.updateFields}/>
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
                    <div id="createEventScreenButton" onClick={this.addEvent}>
                        Create Event
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CreateEvent;