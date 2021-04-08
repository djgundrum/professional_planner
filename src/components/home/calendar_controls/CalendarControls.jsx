import React, { Component } from "react";
import CalendarControlsDropdown from "./calendar_controls_dropdown/CalendarControlsDropdown";
import MyCalendars from "./my_calendars/MyCalendars";
import MyTeamSchedules from "./my_team_schedules/MyTeamSchedules";
import MyContacts from "./my_contacts/MyContacts";
import EmployeeList from "./employee_list/EmployeeList";
import MeetingList from "./meetings_list/MeetingList";
import "./calendarControls.css";

class CalendarControls extends Component {
  state = {
    showCalendars: true,
    showTeamSchedules: true,
    showContacts: true,
  };
  toggleCalendars = () => {
    this.setState({ showCalendars: !this.state.showCalendars });
  };
  toggleTeamSchedules = () => {
    this.setState({ showTeamSchedules: !this.state.showTeamSchedules });
  };
  toggleContacts = () => {
    this.setState({ showContacts: !this.state.showContacts });
  };
  render() {
    return (
      <div id="calendarControls">
        <div id="calendarControlsTop">
          {this.props.isCreateTeamScheduleScreen ? (
            <>
              <div
                id="addEmployeesButton"
                className="calendarControlsButton hoverClass"
                onClick={this.props.toggleCreateTeamScheduleScreen}
              >
                Back
              </div>
              <div
                id="backToCalendar"
                className="calendarControlsButton hoverClass"
                onClick={this.props.toggleCreateEventScreen}
              >
                Add Employees
              </div>
              <div
                id="addMeetingButton"
                className="calendarControlsButton hoverClass"
                onClick={this.props.toggleCreateCalendarScreen}
              >
                Add Meeting Block
              </div>
            </>
          ) : (
            <>
              <div
                id="addEventButton"
                className="calendarControlsButton hoverClass"
                onClick={this.props.toggleCreateEventScreen}
              >
                Create Event
              </div>
              <div
                id="createCalendarButton"
                className="calendarControlsButton hoverClass"
                onClick={this.props.toggleCreateCalendarScreen}
              >
                Create Calendar
              </div>
              <div
                id="createTeamScheduleButton"
                className="calendarControlsButton hoverClass"
                onClick={this.props.toggleCreateTeamScheduleScreen}
              >
                Create Team Schedule
              </div>
            </>
          )}
        </div>
        <div id="calendarControlsBottom" className="scrollbox">
          <div id="calendarControlsBottomContent" className="scrollbox-content">
            {this.props.isCreateTeamScheduleScreen ? (
              <>
                <div onClick={this.toggleCalendars}>
                  <CalendarControlsDropdown
                    title="Employees"
                    propShow={this.state.showCalendars}
                    section="first"
                  />
                </div>
                {this.state.showCalendars && (
                  <EmployeeList
                    updateCalendars={this.props.updateCalendars}
                    activeCalendars={this.props.activeCalendars}
                    view={this.props.view}
                  />
                )}

                <div onClick={this.toggleTeamSchedules}>
                  <CalendarControlsDropdown
                    title="Meeting Blocks"
                    propShow={this.state.showTeamSchedules}
                  />
                </div>
                {this.state.showTeamSchedules && (
                  <MeetingList
                    updateTeamSchedule={this.props.updateTeamSchedule}
                    activeTeamSchedule={this.props.activeTeamSchedule}
                    view={this.props.view}
                  />
                )}
              </>
            ) : (
              <>
                <div onClick={this.toggleCalendars}>
                  <CalendarControlsDropdown
                    title="My Calendars"
                    propShow={this.state.showCalendars}
                    section="first"
                  />
                </div>
                {this.state.showCalendars && (
                  <MyCalendars
                    updateCalendars={this.props.updateCalendars}
                    activeCalendars={this.props.activeCalendars}
                    view={this.props.view}
                  />
                )}

                <div onClick={this.toggleTeamSchedules}>
                  <CalendarControlsDropdown
                    title="My Team Schedules"
                    propShow={this.state.showTeamSchedules}
                  />
                </div>
                {this.state.showTeamSchedules && (
                  <MyTeamSchedules
                    updateTeamSchedule={this.props.updateTeamSchedule}
                    activeTeamSchedule={this.props.activeTeamSchedule}
                    view={this.props.view}
                  />
                )}

                <div onClick={this.toggleContacts}>
                  <CalendarControlsDropdown
                    title="My Contacts"
                    propShow={this.state.showContacts}
                    view={this.props.view}
                    section={"Contacts"}
                  />
                </div>
                {this.state.showContacts && <MyContacts />}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarControls;
