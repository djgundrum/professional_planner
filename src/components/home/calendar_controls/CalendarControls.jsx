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
    //showContacts: true,
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
    let noHours = true;
    let hoursToShow = [];
    let isChain = true;
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let x = 0; x < this.props.hours.length; x++) {
      if (this.props.hours[x].start != "") {
        noHours = false;
        if (hoursToShow.length === 0) {
          hoursToShow.push({
            startDay: x,
            endDay: x,
            startTime: this.props.hours[x].start,
            endTime: this.props.hours[x].end,
          });
        } else {
          if (
            this.props.hours[x].start ===
              hoursToShow[hoursToShow.length - 1].startTime &&
            this.props.hours[x].end ===
              hoursToShow[hoursToShow.length - 1].endTime &&
            isChain
          ) {
            hoursToShow[hoursToShow.length - 1].endDay = x;
          } else {
            hoursToShow.push({
              startDay: x,
              endDay: x,
              startTime: this.props.hours[x].start,
              endTime: this.props.hours[x].end,
            });
          }
        }
        isChain = true;
      } else {
        isChain = false;
      }
    }
    return (
      <div id="calendarControls">
        <div id="calendarControlsTop">
          {this.props.isCreateTeamScheduleScreen ? (
            <>
              <div
                id="backToCalendar"
                className="calendarControlsButton hoverClass"
                onClick={this.props.toggleCreateTeamScheduleScreen}
              >
                Back
              </div>
              <div
                id="addEmployeesButton"
                className="calendarControlsButton hoverClass"
                onClick={() => {
                  this.props.toggleAddEmployeeScreen(false);
                }}
              >
                Add Employees
              </div>
              <div
                id="addShiftButton"
                className={
                  this.props.isSave && this.props.employees.length > 0
                    ? "calendarControlsButton"
                    : "calendarControlsButtonDisabled"
                }
                onClick={
                  this.props.isSave && this.props.employees.length > 0
                    ? () => {
                        this.props.toggleCreateEventScreen(
                          false,
                          {},
                          true,
                          true,
                          false
                        );
                      }
                    : () => {}
                }
              >
                Add Shift
              </div>
            </>
          ) : (
            <>
              <div
                id="addEventButton"
                className="calendarControlsButton hoverClass"
                onClick={() => {
                  this.props.toggleCreateEventScreen(
                    false,
                    {},
                    false,
                    false,
                    false
                  );
                }}
              >
                Create Event
              </div>
              <div
                id="createCalendarButton"
                className="calendarControlsButton hoverClass"
                onClick={() => {
                  this.props.toggleCreateCalendarScreen();
                }}
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
        <div
          id="calendarControlsBottom"
          className={
            this.props.isCreateTeamScheduleScreen
              ? "scrollbox calendarControlsBottom1"
              : "scrollbox calendarControlsBottom2"
          }
        >
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
                    employees={this.props.employees}
                    view={this.props.view}
                    toggleAddEmployeeScreen={this.props.toggleAddEmployeeScreen}
                  />
                )}
                <div id="generateSettingsDiv">
                  <div id="hoursDiv" className="generateSettingSection">
                    <div>
                      <p>Maximum Daily Hours:</p>
                      <input type="text" maxLength="2" id="maxHrsInput" />
                    </div>
                    <div>
                      <p>Minimum Daily Hours:</p>
                      <input type="text" maxLength="2" id="minHrsInput" />
                    </div>
                    <div>
                      <p>Preferred Weekly Hours:</p>
                      <input type="text" maxLength="2" id="prefHrsInput" />
                    </div>
                  </div>
                  <div id="shiftLengthDiv" className="generateSettingSection">
                    <div>
                      <p>Maximum Shift Length:</p>
                      <input type="text" maxLength="2" id="maxShiftInput" />
                    </div>
                    <div>
                      <p>Minimum Shift Length:</p>
                      <input type="text" maxLength="2" id="minShiftInput" />
                    </div>
                    <div>
                      <p>Preferred Shift Length:</p>
                      <input type="text" maxLength="2" id="prefShiftInput" />
                    </div>
                  </div>
                  <div
                    id="employeeNumberDiv"
                    className="generateSettingSection"
                  >
                    <div>
                      <p>Maximum # Employees:</p>
                      <input type="text" maxLength="2" id="maxEmployInput" />
                    </div>
                    <div>
                      <p>Minimum # Employees:</p>
                      <input type="text" maxLength="2" id="minEmployInput" />
                    </div>
                    <div>
                      <p>Preferred # Employees:</p>
                      <input type="text" maxLength="2" id="prefEmployInput" />
                    </div>
                  </div>
                  {noHours ? (
                    <div
                      id="weeklyHoursDiv"
                      className="generateSettingSection generateSettingSectionHeight"
                    >
                      <div onClick={this.props.toggleEditHoursScreen}>
                        <p id="addHoursText">Add Hours</p>
                      </div>
                    </div>
                  ) : (
                    <div id="weeklyHoursDiv" className="generateSettingSection">
                      <div
                        id="hoursListDiv"
                        onClick={this.props.toggleEditHoursScreen}
                      >
                        {hoursToShow.map((item) => (
                          <p>
                            {item.startDay === item.endDay
                              ? days[item.startDay] +
                                ": " +
                                this.props.formatTime(item.startTime) +
                                " - " +
                                this.props.formatTime(item.endTime)
                              : days[item.startDay] +
                                " - " +
                                days[item.endDay] +
                                ": " +
                                this.props.formatTime(item.startTime) +
                                " - " +
                                this.props.formatTime(item.endTime)}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* <div onClick={this.toggleTeamSchedules}>
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
                )} */}
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
                    mySchedules={this.props.mySchedules}
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
                    myTeamSchedules={this.props.myTeamSchedules}
                    view={this.props.view}
                    teamEvents={this.props.teamEvents}
                    getNameColors={this.props.getNameColors}
                  />
                )}

                {/* <div onClick={this.toggleContacts}>
                  <CalendarControlsDropdown
                    title="My Contacts"
                    propShow={this.state.showContacts}
                    view={this.props.view}
                    section={"Contacts"}
                  />
                </div>
                {this.state.showContacts && <MyContacts />} */}
              </>
            )}
          </div>
        </div>
        {this.props.isCreateTeamScheduleScreen ? (
          <div id="generateButtonsDiv">
            <div
              id="exportScheduleButton"
              className={
                this.props.isSave
                  ? "exportScheduleActive"
                  : "exportScheduleDisabled"
              }
              onClick={() => {
                //if (this.props.isSave) {
                this.props.toggleExportScreen();
                //}
              }}
            >
              Export Schedule
            </div>
            <div
              id="generateSchedulesButton"
              onClick={() => {
                this.props.generateSchedules();
              }}
            >
              Generate Schedule
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default CalendarControls;
