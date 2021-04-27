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
    employeeEvents: [],
    generatedEvents: [],
    employeeIdCount: 0,
    editEmployeeID: "",
    isEditHoursScreen: false,
    hoursStartDate: "",
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
                    if (this.state.activeCalendars.length != 0) {
                      this.updateActiveEvents();
                    }
                  } else {
                    nextFunc(pX + 1, pLength, nextFunc);
                  }
                }
              });
            }
          });
        };
        if (guestListResult.data.body.guests.length > 0) {
          getSchedule(0, guestListResult.data.body.guests.length, getSchedule);
        } else {
          this.setState({
            user: result1.data.body.user.user,
            tempName: result1.data.body.user.user.name,
            tempEmail: result1.data.body.user.user.email,
            mySchedules: schedules,
            //Change array to 'teamSchedules'
            myTeamSchedules: teamSchedules,
          });
        }
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
  updateActiveEvents = () => {
    let aEvents = [];
    for (let e = 0; e < this.state.calendarEvents.length; e++) {
      for (let a = 0; a < this.state.activeCalendars.length; a++) {
        if (
          this.state.calendarEvents[e].schedule_id ===
          this.state.activeCalendars[a][0]
        ) {
          aEvents = aEvents.concat(this.state.calendarEvents[e]);
        }
      }
    }
    this.setState({
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
    if (this.state.isCreateTeamScheduleScreen) {
      this.setState({
        isCreateTeamScheduleScreen: !this.state.isCreateTeamScheduleScreen,
        dateInfo: {
          currentDate: new Date(),
          startDate: new Date(
            new Date().getTime() - new Date().getDay() * 24 * 60 * 60 * 1000
          ),
          endDate: new Date(
            new Date().getTime() +
              (6 - new Date().getDay()) * 24 * 60 * 60 * 1000
          ),
        },
      });
    } else {
      let teamSundayDate = new Date(
        new Date().getTime() - new Date().getDay() * 24 * 60 * 60 * 1000
      );
      let teamSaturdayDate = new Date(
        new Date().getTime() + (6 - new Date().getDay()) * 24 * 60 * 60 * 1000
      );
      if (this.state.hoursStartDate != "") {
        teamSundayDate = new Date();
        teamSundayDate.setTime(
          this.state.hoursStartDate.getTime() - 24 * 60 * 60 * 1000
        );
        teamSaturdayDate = new Date();
        teamSaturdayDate.setTime(
          this.state.hoursStartDate.getTime() + 5 * 24 * 60 * 60 * 1000
        );
      }
      this.setState({
        isCreateTeamScheduleScreen: !this.state.isCreateTeamScheduleScreen,

        dateInfo: {
          currentDate: new Date(),
          startDate: teamSundayDate,
          endDate: teamSaturdayDate,
        },
      });
    }
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
  updateHoursStartDate = (start) => {
    let teamSundayDate = new Date(
      new Date().getTime() - new Date().getDay() * 24 * 60 * 60 * 1000
    );
    let teamSaturdayDate = new Date(
      new Date().getTime() + (6 - new Date().getDay()) * 24 * 60 * 60 * 1000
    );

    for (let i = 0; i < 7; i++) {
      let d = new Date();

      d.setTime(start.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
      //d.setDate(start.getDate() + 1 + i);
      if (d.getDay() == 1) {
        teamSundayDate = new Date();
        teamSundayDate.setTime(d.getTime() - 24 * 60 * 60 * 1000);
        teamSaturdayDate = new Date();
        teamSaturdayDate.setTime(d.getTime() + 5 * 24 * 60 * 60 * 1000);
        this.setState({
          hoursStartDate: d,
          dateInfo: {
            currentDate: new Date(),
            startDate: teamSundayDate,
            endDate: teamSaturdayDate,
          },
        });
      }
    }
  };
  addEmployee = (newEmployee) => {
    let colors = [
      "#ff3200",
      "#ff7f0a",
      "#ffe174",
      "#4bdf00",
      "#009f1a",
      "#0acbff",
      "#5f71ff",
      "#dd5fff",
      "#ff7bd5",
      "#777777",
    ];
    let newnewEmployee = {
      id: this.state.employeeIdCount + 1,
      name: newEmployee.name,
      description: colors[this.state.employeeIdCount % 10],
      calendar_id: newEmployee.calendar_id,
      calendar_name: newEmployee.calendar_name,
      calendar_description: newEmployee.calendar_description,
    };
    this.toggleAddEmployeeScreen(false);
    let newEmployeeList = this.state.employees.concat(newnewEmployee);

    let employeeEvents = [];
    let loadEmployeeEvents = (i) => {
      if (i == newEmployeeList.length) {
        this.setState({
          employees: newEmployeeList,
          employeeIdCount: this.state.employeeIdCount + 1,
          employeeEvents: employeeEvents,
        });
      } else {
        let url = `/api/events/schedule/${newEmployeeList[i].calendar_id}`;
        axios.get(url).then((result) => {
          if (result.data.valid) {
            for (let e = 0; e < result.data.body.events.length; e++) {
              let tempE = result.data.body.events[e];
              tempE.description = newEmployeeList[i].description;
              tempE.type_description = "employeeEvent";
              employeeEvents.push(tempE);
            }
            loadEmployeeEvents(i + 1);
          }
        });
      }
    };
    loadEmployeeEvents(0);
  };
  editEmployee = (editEmployee) => {
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

    let employeeEvents = [];
    let loadEmployeeEvents2 = (i) => {
      if (i == tempEs.length) {
        this.toggleAddEmployeeScreen(false);
        this.setState({
          employees: tempEs,
          employeeEvents: employeeEvents,
        });
      } else {
        let url = `/api/events/schedule/${tempEs[i].calendar_id}`;
        axios.get(url).then((result) => {
          if (result.data.valid) {
            for (let e = 0; e < result.data.body.events.length; e++) {
              let tempE = result.data.body.events[e];
              tempE.description = tempEs[i].description;
              tempE.type_description = "employeeEvent";
              employeeEvents.push(tempE);
            }
            loadEmployeeEvents2(i + 1);
          }
        });
      }
    };
    loadEmployeeEvents2(0);
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
  generateSchedules = () => {
    let dayLetters = ["", "m", "t", "w", "r", "f"];
    let maxHrs = document.getElementById("maxHrsInput").value;
    let minHrs = document.getElementById("minHrsInput").value;
    let prefHrs = document.getElementById("prefHrsInput").value;
    let maxShift = document.getElementById("maxShiftInput").value;
    let minShift = document.getElementById("minShiftInput").value;
    let prefShift = document.getElementById("prefShiftInput").value;
    let maxEmploy = document.getElementById("maxEmployInput").value;
    let minEmploy = document.getElementById("minEmployInput").value;
    let prefEmploy = document.getElementById("prefEmployInput").value;
    let generatedEvents = [];
    Date.prototype.yyyymmdd = function () {
      var mm = this.getMonth() + 1; // getMonth() is zero-based
      var dd = this.getDate();

      return [
        this.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd,
      ].join("");
    };
    let intToDate = function (day, d) {
      let first = Math.floor(d);
      let second = d - Math.floor(d);
      second = Math.ceil(second.toFixed(5) * 60);
      second = second.toString();
      if (second.length == 1) {
        second = "0" + second;
      }
      return day.yyyymmdd() + " " + first + ":" + second;
    };
    if (
      maxHrs != "" &&
      minHrs != "" &&
      prefHrs != "" &&
      maxShift != "" &&
      minShift != "" &&
      prefShift != "" &&
      maxEmploy != "" &&
      minEmploy != "" &&
      prefEmploy != ""
    ) {
      let hrs = [];
      for (let i = 1; i <= 5; i++) {
        if (this.state.hours[i].start == "") {
          hrs[i] = [0, 0];
        } else {
          let hr0 = this.state.hours[i].start;
          let hr1 = parseInt(hr0.substring(0, 2));
          let hr2 = parseInt(hr0.substring(3, 5)) / 60;
          let hr00 = this.state.hours[i].end;
          let hr11 = parseInt(hr00.substring(0, 2));
          let hr22 = parseInt(hr00.substring(3, 5)) / 60;
          hrs[i] = [hr1 + hr2, hr11 + hr22];
        }
      }
      let constraints = {
        minHrs: minHrs,
        maxHrs: maxHrs,
        minShift: minShift,
        maxShift: maxShift,
        normalShift: prefShift,
        minEmployees: minEmploy,
        maxEmployees: maxEmploy,
        prefferedNumberOfEmployees: prefEmploy,
        businessHrs: {
          m: { start: hrs[1][0], end: hrs[1][1] },
          t: { start: hrs[2][0], end: hrs[2][1] },
          w: { start: hrs[3][0], end: hrs[3][1] },
          r: { start: hrs[4][0], end: hrs[4][1] },
          f: { start: hrs[5][0], end: hrs[5][1] },
        },
      };
      let employees = {};
      let addConflicts = (index) => {
        if (index == this.state.employees.length) {
          let data = {
            constraints: constraints,
            employees: employees,
          };
          let dayLetters = ["m", "t", "w", "r", "f"];
          let url = "/api/algorithm";
          axios.post(url, data).then((result) => {
            console.log(result.data.body.response);
            for (let x = 0; x < 5; x++) {
              for (
                let y = 0;
                y < result.data.body.response[dayLetters[x]].length;
                y++
              ) {
                if (result.data.body.response[dayLetters[x]][y][0] != -1) {
                  let tDate = new Date();
                  tDate.setTime(
                    this.state.dateInfo.startDate.getTime() +
                      (x + 1) * 24 * 60 * 60 * 1000
                  );
                  let tStart =
                    result.data.body.response[dayLetters[x]][y][1][0];
                  let tEnd = result.data.body.response[dayLetters[x]][y][1][1];

                  let time0 = intToDate(tDate, tStart);
                  let time_end0 = intToDate(tDate, tEnd);
                  let tEvent = {
                    capacity: 1,
                    description: "#111111",
                    end: (tEnd / 24) * 1464,
                    id: x + "" + y,
                    name: "",
                    schedule_id: "",
                    start: (tStart / 24) * 1464,
                    time: time0,
                    time_end: time_end0,
                    type: "TeamSchedule",
                    type_description: "",
                  };
                  generatedEvents.push(tEvent);
                }
              }
            }
            this.setState({ generatedEvents: generatedEvents });
          });
        } else {
          let url = `/api/events/schedule/${this.state.employees[index].calendar_id}`;
          axios.get(url).then((result) => {
            let ee = "e" + index;
            let tempEmployee = {
              preferredMinHrs: 3,
              preferredMaxHrs: 6,
              preferredHrs: 10,
              conflicts: {
                m: [],
                t: [],
                w: [],
                r: [],
                f: [],
              },
            };

            //Go through all events in employee's calendar
            for (let e = 0; e < result.data.body.events.length; e++) {
              //Go through all days in the work week
              for (let d = 1; d < 6; d++) {
                let tempDate = new Date();
                tempDate.setTime(
                  this.state.dateInfo.startDate.getTime() +
                    d * 24 * 60 * 60 * 1000
                );
                //tempDate is the date of the current column
                tempDate = tempDate.yyyymmdd();

                //If the event's date starts and ends on tempDate, add the conflict
                if (
                  result.data.body.events[e].time.substring(0, 8) == tempDate &&
                  result.data.body.events[e].time_end.substring(0, 8) ==
                    tempDate
                ) {
                  let startInt0 = result.data.body.events[e].time.substring(
                    9,
                    14
                  );
                  let startInt1 = parseInt(startInt0.substring(0, 2));
                  let startInt2 = parseInt(startInt0.substring(3, 5)) / 60;
                  let endInt0 = result.data.body.events[e].time_end.substring(
                    9,
                    14
                  );
                  let endInt1 = parseInt(endInt0.substring(0, 2));
                  let endInt2 = parseInt(endInt0.substring(3, 5)) / 60;
                  startInt0 = startInt1 + startInt2;
                  endInt0 = endInt1 + endInt2;
                  tempEmployee.conflicts[dayLetters[d]].push([
                    startInt0,
                    endInt0,
                  ]);
                }
                //If the event starts before tempDate and ends after tempDate, add a conflict that lasts all day
                else if (
                  result.data.body.events[e].time.substring(0, 8) < tempDate &&
                  result.data.body.events[e].time_end.substring(0, 8) > tempDate
                ) {
                  tempEmployee.conflicts[dayLetters[d]].push([0, 23.9]);
                }
                //If the event starts before tempDate and ends on tempDate, add a conflict that goes all day until the end time
                else if (
                  result.data.body.events[e].time.substring(0, 8) < tempDate &&
                  result.data.body.events[e].time_end.substring(0, 8) ==
                    tempDate
                ) {
                  let endInt0 = result.data.body.events[e].time_end.substring(
                    9,
                    14
                  );
                  let endInt1 = parseInt(endInt0.substring(0, 2));
                  let endInt2 = parseInt(endInt0.substring(3, 5)) / 60;
                  endInt0 = endInt1 + endInt2;
                  tempEmployee.conflicts[dayLetters[d]].push([0, endInt0]);
                }
                //If the event starts on tempDate and ends after tempDate, add a conflict that starts at the time and goes the rest of the day
                else if (
                  result.data.body.events[e].time.substring(0, 8) == tempDate &&
                  result.data.body.events[e].time_end.substring(0, 8) > tempDate
                ) {
                  let startInt0 = result.data.body.events[e].time.substring(
                    9,
                    14
                  );
                  let startInt1 = parseInt(startInt0.substring(0, 2));
                  let startInt2 = parseInt(startInt0.substring(3, 5)) / 60;
                  startInt0 = startInt1 + startInt2;
                  tempEmployee.conflicts[dayLetters[d]].push([startInt0, 23.9]);
                }
              }
            }
            employees[ee] = tempEmployee;
            addConflicts(index + 1);
          });
        }
      };
      addConflicts(0);
    }
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
          isCreateTeamScheduleScreen={this.state.isCreateTeamScheduleScreen}
          hoursStartDate={this.state.hoursStartDate}
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
          isCreateTeamScheduleScreen={this.state.isCreateTeamScheduleScreen}
          employees={this.state.employees}
          employeeEvents={this.state.employeeEvents}
          generatedEvents={this.state.generatedEvents}
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
          generateSchedules={this.generateSchedules}
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
          updateHoursStartDate={this.updateHoursStartDate}
          hoursStartDate={this.state.hoursStartDate}
        ></EditHours>
      </div>
    );
  }
}

export default Home;
