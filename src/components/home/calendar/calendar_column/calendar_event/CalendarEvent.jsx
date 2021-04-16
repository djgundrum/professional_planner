import React, { Component } from "react";
import "./calendarEvent.css";

class CalendarEvent extends Component {
  state = {};
  render() {
    return (
      <div
        className="calendarEvent"
        style={{ backgroundColor: this.props.eventInfo.description }}
        onClick={() => {
          this.props.toggleCreateEventScreen(true, this.props.eventInfo);
        }}
      ></div>
    );
  }
}

export default CalendarEvent;
