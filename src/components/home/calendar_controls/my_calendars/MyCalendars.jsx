import React, { Component } from "react";
import CalendarListItem from "./calendar_list_item/CalendarListItem";
import "./myCalendars.css";

class MyCalendars extends Component {
  state = {};
  render() {
    return (
      <div
        className="listItemsDiv"
        style={
          this.props.view === "Calendar" ? { opacity: 1 } : { opacity: 0.3 }
        }
      >
        {this.props.mySchedules.map((calendar) => (
          <div key={calendar.id}>
            <CalendarListItem
              propId={calendar.id}
              propName={calendar.name}
              propColor={calendar.description}
              updateCalendars={this.props.updateCalendars}
              activeCalendars={this.props.activeCalendars}
              view={this.props.view}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default MyCalendars;
