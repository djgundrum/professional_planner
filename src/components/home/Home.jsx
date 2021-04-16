import React, { Component } from "react";
import MenuBar from "./menu/Menubar";
import CalendarControls from "./calendar_controls/CalendarControls";
import Calendar from "./calendar/Calendar";
import CreateEvent from "./create_event/CreateEvent";
import "./home.css";
import CreateCalendar from "./create_calendar/CreateCalendar";
import axios from "axios";
import { Redirect } from "react-router";

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
        // for (let i = 0; i < guestListResult.data.body.guests.length; i++) {
        //   let url3 = `/api/schedules/${guestListResult.data.body.guests[i].schedule_id}`;
        //   //let url3 = "/api/schedules";
        //   axios.get(url3).then((result3) => {
        //     console.log(result3);
        //     //schedules = schedules.concat(result3.data.body.schedules);
        //     result3.data.body.schedules.type == "Calendar"
        //       ? (schedules = schedules.concat(result3.data.body.schedules))
        //       : (teamSchedules = teamSchedules.concat(
        //           result3.data.body.schedules
        //         ));
        //     if (i == guestListResult.data.body.guests.length - 1) {
        //       this.setState({
        //         mySchedules: schedules,
        //         //Change array to 'teamSchedules'
        //         myTeamSchedules: [
        //           {
        //             id: 4,
        //             name: "Team ScheduleScheduleSchedule 1",
        //             time: "CT",
        //             type: 2,
        //             description: "#3fa9f5",
        //           },
        //           {
        //             id: 5,
        //             name: "Team Schedule 2",
        //             time: "CT",
        //             type: 2,
        //             description: "#3fa9f5",
        //           },
        //           {
        //             id: 6,
        //             name: "Team Schedule 3",
        //             time: "CT",
        //             type: 2,
        //             description: "#3fa9f5",
        //           },
        //         ],
        //       });
        //     }
        //   });
        // }
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
    //console.log(newList);
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
    console.log(isEdit);
    console.log(eventInfo);
    let test = isEdit ? true : false;
    console.log("test: " + test);
    this.setState({
      isCreateEventScreen: !this.state.isCreateEventScreen,
      isCreateEventEdit: isEdit ? true : false,
      isCreateEventInfo: eventInfo,
    });
    console.log("here " + this.state.isCreateEventEdit);
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
  render() {
    console.log("here2: " + this.state.isCreateEventEdit);
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
          mySchedules={this.state.mySchedules}
          myTeamSchedules={this.state.myTeamSchedules}
        />
        <CreateEvent
          mySchedules={this.state.mySchedules}
          timezones={this.state.timezones}
          toggleCreateEventScreen={this.toggleCreateEventScreen}
          isCreateEventScreen={this.state.isCreateEventScreen}
          isCreateEventEdit={this.state.isCreateEventEdit}
          eventInfo={this.state.isCreateEventInfo}
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
      </div>
    );
  }
}

export default Home;
