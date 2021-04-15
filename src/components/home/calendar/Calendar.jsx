import "./calendar.css";

import React, { Component } from "react";
import CalendarColumn from "./calendar_column/CalendarColumn";

class Calendar extends Component {
  state = {
    //This will be populated from an API call
    isCalendar: true,

    // In Calendar View, will be populated with events (type: 1)
    // In Team Schedule View, will be populated with events (type: 2)
    // On settings screen when creating team schedule, will be populated with blocks (employee blocks type:1, meeting blocks type: 3)
    // On generated team schedule screen, will be populated with employee events (type: 2), employee blocks (type: 1), and meeting blocks (type: 3)
    activeEvents: [
      {
        id: 1,
        name: "Test",
        schedule_id: 29,
        time: "20210413 12:00",
        timeEnd: "20210413 12:30",
      },
      {
        id: 2,
        name: "Test2",
        schedule_id: 29,
        time: "20210413 10:00",
        timeEnd: "20210413 12:30",
      },
      {
        id: 3,
        name: "Test3",
        schedule_id: 29,
        time: "20210413 11:00",
        timeEnd: "20210413 13:30",
      },
      {
        id: 4,
        name: "Test3",
        schedule_id: 29,
        time: "20210413 06:00",
        timeEnd: "20210413 11:30",
      },
      {
        id: 5,
        name: "Test3",
        schedule_id: 29,
        time: "20210413 04:00",
        timeEnd: "20210413 6:00",
      },
      {
        id: 6,
        name: "Test3",
        schedule_id: 29,
        time: "20210413 12:45",
        timeEnd: "20210413 14:00",
      },
    ],
  };
  render() {
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
      for (let i = 0; i < this.state.activeEvents.length; i++) {
        if (
          this.state.activeEvents[i].time.substring(0, 8) == thisDateString ||
          this.state.activeEvents[i].time.substring(0, 8) == thisDateString
        ) {
          theseEvents = theseEvents.concat(this.state.activeEvents[i]);
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
          isToday={isToday}
          theseEvents={theseEvents}
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
            return <p>{time}</p>;
          })}
        </div>
        {columns}
      </div>
    );
  }
}

export default Calendar;
