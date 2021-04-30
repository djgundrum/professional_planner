import "./calendar.css";

import React, { Component } from "react";
import CalendarColumn from "./calendar_column/CalendarColumn";
import axios from "axios";

class Calendar extends Component {
  state = {
    //This will be populated from an API call
    isCalendar: true,

    // In Calendar View, will be populated with events (type: 1)
    // In Team Schedule View, will be populated with events (type: 2)
    // On settings screen when creating team schedule, will be populated with blocks (employee blocks type:1, meeting blocks type: 3)
    // On generated team schedule screen, will be populated with employee events (type: 2), employee blocks (type: 1), and meeting blocks (type: 3)
    activeEvents: [],
  };
  render() {
    let names = this.props.getNameColors(this.props.activeEvents);

    var times = [];
    var columns = [];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let c = 0; c < 7; c++) {
      let thisDate = new Date(
        this.props.dateInfo.startDate.getTime() + c * 24 * 60 * 60 * 1000
      );
      let columnDateInfo = [days[thisDate.getDay()], thisDate.getDate()];
      let thisDateInfo = [
        thisDate.getFullYear().toString(),
        (thisDate.getMonth() + 1).toString(),
        thisDate.getDate().toString(),
      ];
      while (thisDateInfo[1].length < 2) {
        thisDateInfo[1] = "0" + thisDateInfo[1];
      }
      while (thisDateInfo[2].length < 2) {
        thisDateInfo[2] = "0" + thisDateInfo[2];
      }
      let thisDateString = thisDateInfo[0] + thisDateInfo[1] + thisDateInfo[2];
      let theseEvents = [];

      if (!this.props.isCreateTeamScheduleScreen) {
        for (let i = 0; i < this.props.activeEvents.length; i++) {
          if (
            this.props.activeEvents[i].time.substring(0, 8) == thisDateString ||
            this.props.activeEvents[i].time_end.substring(0, 8) ==
              thisDateString ||
            (this.props.activeEvents[i].time.substring(0, 8) < thisDateString &&
              this.props.activeEvents[i].time_end.substring(0, 8) >
                thisDateString)
          ) {
            theseEvents = theseEvents.concat(this.props.activeEvents[i]);
          }
        }
        for (let i = 0; i < theseEvents.length; i++) {
          if (theseEvents[i].type == "Schedule") {
            theseEvents[i].description = names[theseEvents[i].name];
          }
        }
      } else {
        for (let i = 0; i < this.props.employeeEvents.length; i++) {
          if (
            this.props.employeeEvents[i].time.substring(0, 8) ==
              thisDateString ||
            this.props.employeeEvents[i].time_end.substring(0, 8) ==
              thisDateString ||
            (this.props.employeeEvents[i].time.substring(0, 8) <
              thisDateString &&
              this.props.employeeEvents[i].time_end.substring(0, 8) >
                thisDateString)
          ) {
            let tempEv = this.props.employeeEvents[i];
            tempEv.id = tempEv.id + "v" + i;
            theseEvents = theseEvents.concat(tempEv);
          }
        }
        for (let i = 0; i < this.props.generatedEvents.length; i++) {
          if (
            this.props.generatedEvents[i].time.substring(0, 8) ==
              thisDateString ||
            this.props.generatedEvents[i].time_end.substring(0, 8) ==
              thisDateString ||
            (this.props.generatedEvents[i].time.substring(0, 8) <
              thisDateString &&
              this.props.generatedEvents[i].time_end.substring(0, 8) >
                thisDateString)
          ) {
            theseEvents = theseEvents.concat(this.props.generatedEvents[i]);
          }
        }
      }
      let isToday = false;
      if (
        new Date(
          this.props.dateInfo.startDate.getTime() + c * 24 * 60 * 60 * 1000
        ).getDate() === this.props.dateInfo.currentDate.getDate() &&
        new Date(
          this.props.dateInfo.startDate.getTime() + c * 24 * 60 * 60 * 1000
        ).getMonth() === this.props.dateInfo.currentDate.getMonth() &&
        new Date(
          this.props.dateInfo.startDate.getTime() + c * 24 * 60 * 60 * 1000
        ).getYear() === this.props.dateInfo.currentDate.getYear()
      ) {
        isToday = true;
      }
      columns.push(
        <CalendarColumn
          isLast={c !== 6 ? false : true}
          columnDateInfo={columnDateInfo}
          columnDate={thisDate}
          isToday={isToday}
          theseEvents={theseEvents}
          toggleCreateEventScreen={this.props.toggleCreateEventScreen}
          isCreateTeamScheduleScreen={this.props.isCreateTeamScheduleScreen}
        />
      );
    }
    for (let t = 1; t <= 23; t++) {
      t < 12
        ? times.push(t + " am")
        : t > 12
        ? times.push((t % 12) + " pm")
        : times.push("12 pm");
    }

    return (
      <div id="calendarDiv">
        <div id="timeColumn">
          {times.map((time) => {
            return <p key={time}>{time}</p>;
          })}
        </div>
        {columns}
      </div>
    );
  }
}

export default Calendar;
