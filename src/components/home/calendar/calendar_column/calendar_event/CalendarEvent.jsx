import React, { Component } from "react";
import "./calendarEvent.css";

class CalendarEvent extends Component {
  state = {};
  render() {
    return (
      <div
        className="calendarEvent"
        style={{ backgroundColor: this.props.eventColor }}
      ></div>
    );
  }
}

export default CalendarEvent;
