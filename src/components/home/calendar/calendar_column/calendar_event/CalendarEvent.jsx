import React, { Component } from "react";
import "./calendarEvent.css";

class CalendarEvent extends Component {
  state = {};
  render() {
    return (
      <div
        className="calendarEvent"
        style={{
          backgroundColor: this.props.eventInfo.description,
          opacity:
            this.props.eventInfo.type_description == "employeeEvent" ? 0.25 : 1,
        }}
        onClick={
          this.props.eventInfo.type_description == "employeeEvent"
            ? () => {}
            : () => {
                if (this.props.eventInfo.type_description == "generatedEvent") {
                  this.props.toggleCreateEventScreen(
                    true,
                    this.props.eventInfo,
                    true
                  );
                } else {
                  this.props.toggleCreateEventScreen(
                    true,
                    this.props.eventInfo,
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
