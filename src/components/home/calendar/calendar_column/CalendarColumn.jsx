import "./calendarColumn.css";
import React, { Component } from "react";
import CalendarCell from "./calendar_cell/CalendarCell";
import CalendarEvent from "./calendar_event/CalendarEvent";

class CalendarColumn extends Component {
  state = {};
  testEvents = (events) => {
    let divs = [];
    var eventsLength = events.length;
    let timeslots = new Array(1464)
      .fill(0)
      .map(() => new Array(eventsLength).fill(0));
    let eventsById = [];

    var event, i, j;

    // Step 0: Sort events by id.
    events = events.sort(function (a, b) {
      var nameA = a.time.toUpperCase(); // ignore upper and lowercase
      var nameB = b.time.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    Date.prototype.yyyymmdd = function () {
      var mm = this.getMonth() + 1; // getMonth() is zero-based
      var dd = this.getDate();

      return [
        this.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd,
      ].join("");
    };

    let columnDateString = this.props.columnDate.yyyymmdd();

    // Step 2: Arrange the events by timeslot.
    for (i = 0; i < eventsLength; i++) {
      let event = events[i];
      //gets start time offset in pixels

      if (event.time.substring(0, 8) < columnDateString) {
        event.start = 0;
      } else {
        let eventTime = events[i].time.split(" ");
        eventTime = eventTime[1].split(":");
        eventTime = parseFloat(eventTime[0]) + parseFloat(eventTime[1] / 60);
        event.start = Math.floor((eventTime / 24) * 1464);
      }

      //gets end time offset in pixels
      if (event.time_end.substring(0, 8) > columnDateString) {
        event.end = 1464;
      } else {
        let eventTime2 = events[i].time_end.split(" ");
        eventTime2 = eventTime2[1].split(":");
        eventTime2 = parseFloat(eventTime2[0]) + parseFloat(eventTime2[1] / 60);
        event.end = Math.floor((eventTime2 / 24) * 1464);
      }
      eventsById[event.id] = {
        id: event.id,
        start: event.start,
        end: event.end,
        description: event.description,
        name: event.name,
        schedule: event.schedule_id,
        time: events[i].time,
        time_end: events[i].time_end,
        type_description: events[i].type_description,
      };

      // Checks if current event overlaps previous event
      let freeCol = 0;
      for (let x = 0; x < timeslots[0].length; x++) {
        for (let y = event.start; y < event.end; y++) {
          if (timeslots[y][x] != 0) {
            freeCol += 1;
            break;
          }
        }
        if (freeCol === x) {
          break;
        }
      }
      // Inserts event into free column in timeslots 2d array
      for (let j = event.start; j < event.end; j++) {
        timeslots[j][freeCol] = event.id;
      }
    }

    let groups = [[events[0].id]];
    let groupIds = [];
    events.map((event) => {
      groupIds[event.id] = "";
    });
    for (let x = 1; x < eventsLength; x++) {
      let gIds = [];
      for (let y = 0; y < eventsLength; y++) {
        if (x != y) {
          //Checks to see if current event overlaps another
          if (
            (events[x].start >= events[y].start &&
              events[x].start < events[y].end) ||
            (events[x].end > events[y].start &&
              events[x].end < events[y].end) ||
            (events[x].start <= events[y].start &&
              events[x].end >= events[y].end)
          ) {
            //Push the conflicting group number into gIds
            for (let g = 0; g < groups.length; g++) {
              if (groups[g].includes(events[y].id)) {
                if (!gIds.includes(g)) {
                  gIds.push(g);
                }
              }
            }
          }
        }
      }
      if (gIds.length == 0) {
        groupIds[events[x].id] = groups.length;
        groups.push([events[x].id]);
      } else if (gIds.length == 1) {
        groupIds[events[x].id] = gIds[0];
        groups[gIds[0]].push(events[x].id);
      } else {
        for (let g = 1; g < gIds.length; g++) {
          groups[gIds[0]] = groups[gIds[g - 1]].concat(groups[gIds[g]]);
        }
        groups[gIds[0]].push(events[x].id);
      }
    }
    //console.log(groups);

    let groupStructure = [];
    for (let g = 0; g < groups.length; g++) {
      if (groups[g].length > 1) {
        groups[g] = groups[g].sort(function (a, b) {
          let timeA = eventsById[a].start; // ignore upper and lowercase
          let timeB = eventsById[b].start; // ignore upper and lowercase
          if (timeA < timeB) {
            return -1;
          }
          if (timeA > timeB) {
            return 1;
          }

          // names must be equal
          return 0;
        });

        for (let gg = 0; gg < groups[g].length; gg++) {
          if (gg === 0) {
            groupStructure[g] = [[groups[g][gg]]];
          } else {
            let is = true;
            for (let gs = 0; gs < groupStructure[g].length; gs++) {
              if (
                eventsById[groups[g][gg]].start >=
                eventsById[
                  groupStructure[g][gs][groupStructure[g][gs].length - 1]
                ].end
              ) {
                groupStructure[g][gs].push(groups[g][gg]);
                is = false;
                break;
              }
            }
            if (is) {
              groupStructure[g].push([groups[g][gg]]);
            }
          }
        }
      } else {
        groupStructure[g] = [[groups[g][0]]];
      }
    }

    for (let g = 0; g < groupStructure.length; g++) {
      for (let gg = 0; gg < groupStructure[g].length; gg++) {
        for (let ggg = 0; ggg < groupStructure[g][gg].length; ggg++) {
          let thisStyle = {
            width: 100 / groupStructure[g].length + "%",
            height:
              eventsById[groupStructure[g][gg][ggg]].end -
              eventsById[groupStructure[g][gg][ggg]].start +
              "px",
            marginTop: eventsById[groupStructure[g][gg][ggg]].start + "px",
            left: (100 / groupStructure[g].length) * gg + "%",
            position: "absolute",
          };
          divs.push(
            <div style={thisStyle} key={g + "" + gg + "" + ggg}>
              <CalendarEvent
                eventInfo={eventsById[groupStructure[g][gg][ggg]]}
                toggleCreateEventScreen={this.props.toggleCreateEventScreen}
                isCreateTeamScheduleScreen={
                  this.props.isCreateTeamScheduleScreen
                }
              ></CalendarEvent>
            </div>
          );
        }
      }
    }
    return divs;
  };
  render() {
    var cells = [];
    let eventList = [];
    if (this.props.theseEvents[0]) {
      eventList = this.testEvents(this.props.theseEvents);
    }
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
        <div className="columnOverlay">{eventList}</div>
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
