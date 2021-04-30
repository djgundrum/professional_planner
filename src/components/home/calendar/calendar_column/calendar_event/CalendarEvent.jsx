import React, { Component } from "react";
import "./calendarEvent.css";

class CalendarEvent extends Component {
  state = {};
  render() {
    const convert_time = (start, end) => {
      let start_first = parseInt(start.substring(9, 11));
      let start_second = start.substring(12, 14);

      let end_first = parseInt(end.substring(9, 11));
      let end_second = end.substring(12, 14);

      let time = "";

      if (start_first === 0) time += `12:${start_second} AM`;
      else if (start_first < 12) time += `${start_first}:${start_second} AM`;
      else if (start_first === 12) time += `12:${start_second} PM`;
      else time += `${start_first % 12}:${start_second} PM`;

      time += " - ";

      if (end_first === 0) time += `12:${end_second} AM`;
      else if (end_first < 12) time += `${end_first}:${end_second} AM`;
      else if (end_first === 12) time += `12:${end_second} PM`;
      else time += `${end_first % 12}:${end_second} PM`;

      return time;
    };

    return (
      <div
        className="calendarEvent"
        style={{
          backgroundColor: this.props.eventInfo.description,
          opacity:
            this.props.eventInfo.type_description == "employeeEvent" ? 0.25 : 1,
          "--tooltip-color": this.props.eventInfo.description,
          "--tooltip-display":
            this.props.eventInfo.type_description == "employeeEvent"
              ? "none"
              : "block",
        }}
        data-before-content={`${this.props.eventInfo.name}
          ${convert_time(
            this.props.eventInfo.time,
            this.props.eventInfo.time_end
          )}`}
        onClick={
          this.props.eventInfo.type_description == "employeeEvent" ||
          (!this.props.isCreateTeamScheduleScreen &&
            this.props.eventInfo.type_description == "Not happy")
            ? () => {
                this.props.toggleCreateEventScreen(
                  true,
                  this.props.eventInfo,
                  true,
                  false,
                  true
                );
              }
            : () => {
                if (this.props.eventInfo.type_description == "generatedEvent") {
                  this.props.toggleCreateEventScreen(
                    true,
                    this.props.eventInfo,
                    true,
                    false,
                    false
                  );
                } else {
                  this.props.toggleCreateEventScreen(
                    true,
                    this.props.eventInfo,
                    false,
                    false,
                    false
                  );
                }
              }
        }
      ></div>
    );
  }
}

export default CalendarEvent;
