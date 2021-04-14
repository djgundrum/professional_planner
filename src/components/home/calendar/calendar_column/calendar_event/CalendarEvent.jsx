import React, { Component } from "react";
import "./calendarEvent.css";

class CalendarEvent extends Component {
  state = {};
  render() {
    let eventTime = this.props.eventInfo.time.split(" ");
    eventTime = eventTime[1].split(":");
    eventTime = parseFloat(eventTime[0]) + parseFloat(eventTime[1] / 60);
    let offset = (eventTime / 24) * 1464;
    return (
      <div className="calendarEvent" style={{ marginTop: offset + "px" }}>
        test
      </div>
    );
  }
}

export default CalendarEvent;
