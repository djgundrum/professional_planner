import React, { Component } from "react";
import MenuBar from "./menu/Menubar";
import CalendarControls from "./calendar_controls/CalendarControls";
import Calendar from "./calendar/Calendar";
import CreateEvent from "./create_event/CreateEvent";
import "./home.css";
import CreateCalendar from "./create_calendar/CreateCalendar";
import axios from "axios";
import AddEmployee from "./add_employee/AddEmployee";
import EditHours from "./calendar_controls/edit_hours/EditHours";

class Home extends Component {
  state = {
    //mySchedules and myEvents are hardcoded currently, will be loaded from API call
    //myEvents should only contain events from active calendars
    mySchedules: [],
    myTeamSchedules: [],
    activeCalendars: [],
    activeTeamSchedule: [],
    calendarEvents: [],
    teamEvents: [],
    activeEvents: [],
    view: "Calendar",
    timeframe: "Week",
    dateInfo: {
      currentDate: new Date(),
      startDate: new Date(
        new Date().getTime() - new Date().getDay() * 24 * 60 * 60 * 1000
      ),
      endDate: new Date(
        new Date().getTime() + (6 - new Date().getDay()) * 24 * 60 * 60 * 1000
      ),
    },
    timezones: ["Timezone 1", "Timezone 2"],
    isCreateEventScreen: false,
    isCreateCalendarScreen: false,
    isCreateTeamScheduleScreen: false,
    isAddEmployeeScreen: false,
    isAddMeetingScreen: false,
    createCalendarInfo: {
      name: "",
      type: 1,
      description: "#ff3200",
      time: "",
    },
    isCreateEventEdit: false,
    isCreateEventInfo: {},
    isAddEmployeeScreen: false,
    isEmployeeEdit: false,
    employees: [],
    employeeIdCount: 0,
    editEmployeeID: "",
    isEditHoursScreen: false,
    hours: [
      {
        start: "",
        end: "",
      },
      {
        start: "",
        end: "",
      },
      {
        start: "",
        end: "",
      },
      {
        start: "",
        end: "",
      },
      {
        start: "",
        end: "",
      },
      {
        start: "",
        end: "",
      },
      {
        start: "",
        end: "",
      },
    ],
  };
  componentDidMount() {
    this.loadSchedulesToState();
  }

  loadSchedulesToState = () => {
    let url1 = "/api/user/account";
    let schedules = [];
    let cEvents = [];
    let teamSchedules = [];
    let tEvents = [];
    axios.get(url1).then((result1) => {
      let url2 = `/api/events/guests/user/${result1.data.body.user.user.id}`;
      axios.get(url2).then((guestListResult) => {
        let getSchedule = (pX, pLength, nextFunc) => {
          let url3 = `/api/schedules/${guestListResult.data.body.guests[pX].schedule_id}`;
          //let url3 = "/api/schedules";
          axios.get(url3).then((result3) => {
            //schedules = schedules.concat(result3.data.body.schedules);
            if (result3.data.valid) {
              let url4 = `/api/events/schedule/${result3.data.body.schedules.id}`;
              axios.get(url4).then((result4) => {
                if (result4.data.valid) {
                  if (result3.data.body.schedules.type === "Calendar") {
                    schedules = schedules.concat(result3.data.body.schedules);
                    for (let e = 0; e < result4.data.body.events.length; e++) {
                      let ev = result4.data.body.events[e];
                      ev.description = result3.data.body.schedules.description;
                      cEvents = cEvents.concat(ev);
                    }
                  } else {
                    teamSchedules = teamSchedules.concat(
                      result3.data.body.schedules
                    );
                    for (let e = 0; e < result4.data.body.events.length; e++) {
                      let ev = result4.data.body.events[e];
                      ev.description = result3.data.body.schedules.description;
                      tEvents = tEvents.concat(ev);
                    }
                  }

                  if (pX == pLength - 1) {
                    this.setState({
                      mySchedules: schedules,
                      calendarEvents: cEvents,
                      teamEvents: tEvents,
                      //Change array to 'teamSchedules'
                      myTeamSchedules: [
                        {
                          id: 4,
                          name: "Team ScheduleScheduleSchedule 1",
                          time: "CT",
                          type: 2,
                          description: "#3fa9f5",
                        },
                        {
                          id: 5,
                          name: "Team Schedule 2",
                          time: "CT",
                          type: 2,
                          description: "#3fa9f5",
                        },
                        {
                          id: 6,
                          name: "Team Schedule 3",
                          time: "CT",
                          type: 2,
                          description: "#3fa9f5",
                        },
                      ],
                    });
                  } else {
                    nextFunc(pX + 1, pLength, nextFunc);
                  }
                }
              });
            }
          });
        };
        getSchedule(0, guestListResult.data.body.guests.length, getSchedule);
      });
    });
  };
  updateCreateCalendarInfo = (pName, pDescription) => {
    this.setState({
      createCalendarInfo: {
        name: pName ? pName : this.state.createCalendarInfo.name,
        type: 1,
        description: pDescription
          ? pDescription
          : this.state.createCalendarInfo.description,
        time: "",
      },
    });
  };
  clearCreateCalendarInfo = () => {
    this.setState({
      createCalendarInfo: {
        name: "",
        type: 1,
        description: "#ff3200",
        time: "",
      },
    });
  };
  forwardTimeframe = () => {
    // ONLY WORKS FOR WEEK TIMEFRAME
    this.setState({
      dateInfo: {
        currentDate: new Date(),
        startDate: new Date(
          this.state.dateInfo.startDate.getTime() + 7 * 24 * 60 * 60 * 1000
        ),
        endDate: new Date(
          this.state.dateInfo.endDate.getTime() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    });
  };
  backwardTimeframe = () => {
    // ONLY WORKS FOR WEEK TIMEFRAME
    this.setState({
      dateInfo: {
        currentDate: new Date(),
        startDate: new Date(
          this.state.dateInfo.startDate.getTime() - 7 * 24 * 60 * 60 * 1000
        ),
        endDate: new Date(
          this.state.dateInfo.endDate.getTime() - 7 * 24 * 60 * 60 * 1000
        ),
      },
    });
  };
  updateCalendars = (id, name) => {
    let newList = this.state.activeCalendars;
    let inArray = false;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i][0] === id) {
        newList.splice(i, 1);
        inArray = true;
        break;
      }
    }
    if (!inArray) {
      newList.push([id, name]);
    }
    let aEvents = [];
    for (let e = 0; e < this.state.calendarEvents.length; e++) {
      for (let a = 0; a < newList.length; a++) {
        if (this.state.calendarEvents[e].schedule_id === newList[a][0]) {
          aEvents = aEvents.concat(this.state.calendarEvents[e]);
        }
      }
    }
    this.setState({
      activeCalendars: newList,
      activeEvents: aEvents,
    });
  };
  updateTeamSchedule = (id, name) => {
    this.state.activeTeamSchedule[0] === id
      ? this.setState({
          activeTeamSchedule: [],
        })
      : this.setState({
          activeTeamSchedule: [id, name],
        });
  };
  switchView = () => {
    this.state.view === "Calendar"
      ? this.setState({ view: "Team Schedule" })
      : this.setState({ view: "Calendar" });
  };
  switchTimeframe = () => {
    this.state.timeframe === "Week"
      ? this.setState({ timeframe: "Month" })
      : this.setState({ timeframe: "Week" });
  };
  toggleCreateEventScreen = (isEdit, eventInfo) => {
    this.setState({
      isCreateEventScreen: !this.state.isCreateEventScreen,
      isCreateEventEdit: isEdit ? true : false,
      isCreateEventInfo: eventInfo,
    });
  };
  toggleCreateCalendarScreen = () => {
    this.setState({
      isCreateCalendarScreen: !this.state.isCreateCalendarScreen,
    });
  };
  toggleCreateTeamScheduleScreen = () => {
    this.setState({
      isCreateTeamScheduleScreen: !this.state.isCreateTeamScheduleScreen,
    });
  };
  toggleAddEmployeeScreen = (isEdit, editEmployee) => {
    if (this.state.isAddEmployeeScreen) {
      document.getElementById("employeeNameInput").value = "";
      document.getElementById("calendarSelectE").selectedIndex = 0;
    }
    if (isEdit) {
      document.getElementById("employeeNameInput").value = editEmployee.name;
      document.getElementById("calendarSelectE").value =
        editEmployee.calendar_id;
      this.setState({
        isAddEmployeeScreen: !this.state.isAddEmployeeScreen,
        isEmployeeEdit: isEdit ? true : false,
        editEmployeeID: editEmployee.id,
      });
    } else {
      this.setState({
        isAddEmployeeScreen: !this.state.isAddEmployeeScreen,
        isEmployeeEdit: isEdit ? true : false,
      });
    }
  };
  addEmployee = (newEmployee) => {
    let newnewEmployee = {
      id: this.state.employeeIdCount + 1,
      name: newEmployee.name,
      calendar_id: newEmployee.calendar_id,
      calendar_name: newEmployee.calendar_name,
      calendar_description: newEmployee.calendar_description,
    };
    this.toggleAddEmployeeScreen(false);
    this.setState({
      employees: this.state.employees.concat(newnewEmployee),
      employeeIdCount: this.state.employeeIdCount + 1,
    });
  };
  editEmployee = (editEmployee) => {
    //console.log(this.state.employees);
    //console.log(editEmployee);
    let index = 0;
    for (let e = 0; e < this.state.employees.length; e++) {
      if (this.state.employees[e].id === editEmployee.id) {
        index = e;
        break;
      }
    }
    let tempEs = this.state.employees;
    tempEs[index] = editEmployee;
    this.toggleAddEmployeeScreen(false);
    this.setState({
      employees: tempEs,
    });
  };
  deleteEmployee = (removeId) => {
    let index = 0;
    for (let e = 0; e < this.state.employees.length; e++) {
      if (this.state.employees[e].id === removeId) {
        index = e;
        break;
      }
    }
    let tempEs = this.state.employees;
    tempEs.splice(index, 1);
    this.toggleAddEmployeeScreen(false);
    this.setState({
      employees: tempEs,
    });
  };
  toggleEditHoursScreen = () => {
    this.setState({
      isEditHoursScreen: !this.state.isEditHoursScreen,
    });
  };
  updateHours = (activeDays, start, end) => {
    let newHours = this.state.hours;
    for (let a = 0; a < activeDays.length; a++) {
      if (activeDays[a]) {
        newHours[a].start = start;
        newHours[a].end = end;
      }
    }
    this.setState({
      hours: newHours,
    });
  };
  formatTime = (time) => {
    let start = parseInt(time.substring(0, 2));
    let end = time.substring(3, 5);
    if (start === 0) {
      return "12:" + end + " AM";
    } else if (start < 12) {
      return start + ":" + end + " AM";
    } else if (start === 12) {
      return start + ":" + end + " PM";
    }
    start = start % 12;
    return start + ":" + end + " PM";
  };
  render() {
    return (
      <div id="homeScreen">
        <MenuBar
          activeCalendars={this.state.activeCalendars}
          activeTeamSchedule={this.state.activeTeamSchedule}
          view={this.state.view}
          timeframe={this.state.timeframe}
          switchView={this.switchView}
          switchTimeframe={this.switchTimeframe}
          dateInfo={this.state.dateInfo}
          forwardTimeframe={this.forwardTimeframe}
          backwardTimeframe={this.backwardTimeframe}
        />
        <Calendar
          dateInfo={this.state.dateInfo}
          calendarEvents={this.state.calendarEvents}
          teamEvents={this.state.teamEvents}
          activeCalendars={this.state.activeCalendars}
          activeTeamSchedule={this.state.activeTeamSchedule}
          activeEvents={this.state.activeEvents}
          view={this.state.view}
          toggleCreateEventScreen={this.toggleCreateEventScreen}
        />
        <CalendarControls
          updateCalendars={this.updateCalendars}
          updateTeamSchedule={this.updateTeamSchedule}
          activeCalendars={this.state.activeCalendars}
          activeTeamSchedule={this.state.activeTeamSchedule}
          view={this.state.view}
          toggleCreateEventScreen={this.toggleCreateEventScreen}
          toggleCreateCalendarScreen={this.toggleCreateCalendarScreen}
          isCreateTeamScheduleScreen={this.state.isCreateTeamScheduleScreen}
          toggleCreateTeamScheduleScreen={this.toggleCreateTeamScheduleScreen}
          toggleAddEmployeeScreen={this.toggleAddEmployeeScreen}
          mySchedules={this.state.mySchedules}
          myTeamSchedules={this.state.myTeamSchedules}
          employees={this.state.employees}
          hours={this.state.hours}
          toggleEditHoursScreen={this.toggleEditHoursScreen}
          formatTime={this.formatTime}
        />
        <CreateEvent
          mySchedules={this.state.mySchedules}
          timezones={this.state.timezones}
          toggleCreateEventScreen={this.toggleCreateEventScreen}
          isCreateEventScreen={this.state.isCreateEventScreen}
          isCreateEventEdit={this.state.isCreateEventEdit}
          eventInfo={this.state.isCreateEventInfo}
          loadSchedulesToState={this.loadSchedulesToState}
        />
        <CreateCalendar
          mySchedules={this.state.mySchedules}
          timezones={this.state.timezones}
          toggleCreateCalendarScreen={this.toggleCreateCalendarScreen}
          isCreateCalendarScreen={this.state.isCreateCalendarScreen}
          updateCreateCalendarInfo={this.updateCreateCalendarInfo}
          createCalendarInfo={this.state.createCalendarInfo}
          clearCreateCalendarInfo={this.clearCreateCalendarInfo}
          loadSchedulesToState={this.loadSchedulesToState}
        />
        <AddEmployee
          mySchedules={this.state.mySchedules}
          isAddEmployeeScreen={this.state.isAddEmployeeScreen}
          isEmployeeEdit={this.state.isEmployeeEdit}
          toggleAddEmployeeScreen={this.toggleAddEmployeeScreen}
          addEmployee={this.addEmployee}
          editEmployee={this.editEmployee}
          deleteEmployee={this.deleteEmployee}
          editEmployeeID={this.state.editEmployeeID}
        ></AddEmployee>
        <EditHours
          isEditHoursScreen={this.state.isEditHoursScreen}
          toggleEditHoursScreen={this.toggleEditHoursScreen}
          updateHours={this.updateHours}
          hours={this.state.hours}
          formatTime={this.formatTime}
        ></EditHours>
      </div>
    );
  }
}

export default Home;
