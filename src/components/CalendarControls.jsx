import React, { Component } from 'react';
import CalendarControlsDropdown from './CalendarControlsDropdown';
import MyCalendars from "./MyCalendars";
import MyTeamSchedules from './MyTeamSchedules';
import MyContacts from './MyContacts'

class CalendarControls extends Component {
    state = {
        showCalendars: true,
        showTeamSchedules: true,
        showContacts: true
    }
    toggleCalendars = () => {
        this.setState({ showCalendars: !this.state.showCalendars });
    }
    toggleTeamSchedules = () => {
        this.setState({ showTeamSchedules: !this.state.showTeamSchedules });
    }
    toggleContacts = () => {
        this.setState({ showContacts: !this.state.showContacts });
    }
    render() { 
        return (
            <div id="calendarControls">
                <div id="addEventButton" className="calendarControlsButton hoverClass">
                    Add Event
                </div>
                <div id="createCalendarButton" className="calendarControlsButton hoverClass">
                    Create Calendar
                </div>
                <div id="createTeamScheduleButton" className="calendarControlsButton hoverClass">
                    Create Team Schedule
                </div>

                <div onClick={this.toggleCalendars}>
                    <CalendarControlsDropdown title="My Calendars" propShow={this.state.showCalendars}/>
                </div>
                {this.state.showCalendars && <MyCalendars updateCalendars={this.props.updateCalendars} activeCalendars={this.props.activeCalendars} view={this.props.view}/>}

                <div onClick={this.toggleTeamSchedules}>
                    <CalendarControlsDropdown title="My Team Schedules" propShow={this.state.showTeamSchedules}/>
                </div>
                {this.state.showTeamSchedules && <MyTeamSchedules updateTeamSchedule={this.props.updateTeamSchedule} activeTeamSchedule={this.props.activeTeamSchedule} view={this.props.view}/>}

                <div onClick={this.toggleContacts}>
                    <CalendarControlsDropdown title="My Contacts" propShow={this.state.showContacts} view={this.props.view} section={"Contacts"}/>
                </div>
                {this.state.showContacts && <MyContacts/>}
            </div>
        );
    }
}
 
export default CalendarControls;