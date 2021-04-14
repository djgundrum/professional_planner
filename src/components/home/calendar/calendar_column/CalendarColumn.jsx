import "./calendarColumn.css";
import React, { Component } from "react";
import CalendarCell from "./calendar_cell/CalendarCell";
import CalendarEvent from "./calendar_event/CalendarEvent";

class CalendarColumn extends Component {
  state = {};
  render() {
    var cells = [];

    for (let c = 1; c <= 24; c++) {
      c !== 24
        ? cells.push(<CalendarCell isLast={false} />)
        : cells.push(<CalendarCell isLast={true} />);
    }
    return (
      <div
        className={
          this.props.isLast
            ? "calendarColumn"
            : "calendarColumn calendarColumnNotLast"
        }
      >
        <div className="columnOverlay">
          {this.props.theseEvents.map((event) => {
            return <CalendarEvent eventInfo={event} />;
          })}
        </div>
        <div
          className={
            this.props.isToday
              ? "columnDateHeader currentDate"
              : "columnDateHeader"
          }
        >
          <p className="columnDay">{this.props.columnDateInfo[0]}</p>
          <p className="columnDate">{this.props.columnDateInfo[1]}</p>
        </div>
        {cells}
      </div>
    );
  }
}

export default CalendarColumn;
