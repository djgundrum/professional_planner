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

    // Step 2: Arrange the events by timeslot.
    for (i = 0; i < eventsLength; i++) {
      event = events[i];

      //gets start time offset in pixels
      let eventTime = events[i].time.split(" ");
      eventTime = eventTime[1].split(":");
      eventTime = parseFloat(eventTime[0]) + parseFloat(eventTime[1] / 60);
      event.start = Math.floor((eventTime / 24) * 1464);

      //gets end time offset in pixels
      let eventTime2 = events[i].timeEnd.split(" ");
      eventTime2 = eventTime2[1].split(":");
      eventTime2 = parseFloat(eventTime2[0]) + parseFloat(eventTime2[1] / 60);
      event.end = Math.floor((eventTime2 / 24) * 1464);

      eventsById[event.id] = {
        start: event.start,
        end: event.end,
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
    //console.log(groupStructure);
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
            <div style={thisStyle}>
              <CalendarEvent></CalendarEvent>
            </div>
          );
        }
      }
    }

    // for (let g = 0; g < groups.length; g++) {
    //   for (let gg = 0; gg < groups[g].length; gg++) {
    //     let thisStyle = {
    //       width: 100 / groups[g].length + "%",
    //       height:
    //         eventsById[groups[g][gg]].end -
    //         eventsById[groups[g][gg]].start +
    //         "px",
    //       marginTop: eventsById[groups[g][gg]].start + "px",
    //       left: (100 / groups[g].length) * gg + "%",
    //       position: "absolute",
    //       backgroundColor: "red",
    //     };
    //     divs.push(
    //       <div style={thisStyle}>
    //         <CalendarEvent></CalendarEvent>
    //       </div>
    //     );
    //   }
    // }
    return divs;

    // // Creating conflict groups
    // for (let y = 0; y < timeslots.length; y++) {
    //   // Go through the current row of timeslots and find ids of schedule in row
    //   let currentRowIds = [];
    //   for (let x = 0; x < timeslots[0].length; x++) {
    //     if (timeslots[y][x] != 0) {
    //       currentRowIds.push(timeslots[y][x]);
    //     }
    //   }
    //   // Go through all ids in the current row
    //   for (let z = 0; z < currentRowIds.length; z++) {
    //     // If the id is not in a conflict group yet

    //     if (!groupIds[currentRowIds[z]]) {
    //       // If the id is only one in row, create new group
    //       console.log("current row: " + y + ", conflicts:" + currentRowIds[z]);
    //       if (currentRowIds.length == 1) {
    //         groupIds[currentRowIds[z]] = groups.length;
    //         groups.push([currentRowIds[0]]);
    //       }
    //       // Otherwise, find the group of a conflicting id
    //       else {
    //         let found = false;
    //         for (let zz = 0; zz < currentRowIds.length; zz++) {
    //           if (z != zz && groupIds[currentRowIds[zz]]) {
    //             console.log(currentRowIds[z] + ", " + currentRowIds[zz]);
    //             groupIds[currentRowIds[z]] = groupIds[currentRowIds[zz]];
    //             groups[groupIds[currentRowIds[z]]].push(currentRowIds[z]);
    //             found = true;
    //           }
    //         }
    //         if (!found) {
    //           groupIds[currentRowIds[z]] = groups.length;
    //           groups.push([currentRowIds[z]]);
    //         }
    //       }
    //     }
    //   }
    // }
    // console.log(groups);
    /*
    // Step 3: Get each event it's horizontal position,
    //         and figure out the max number of conflicts it has.
    for (i = 0; i < 1464; i++) {
      var next_hindex = 0;
      var timeslotLength = timeslots[i].length;

      // If there's at least one event in the timeslot,
      // we know how many events we will have going across for that slot.
      if (timeslotLength > 0) {
        // Store the greatest concurrent event count (cevc) for each event.
        for (j = 0; j < timeslotLength; j++) {
          event = events[timeslots[i][j] - 1];

          if (!event.cevc || event.cevc < timeslotLength) {
            event.cevc = timeslotLength;

            // Now is also a good time to coordinate horizontal ordering.
            // If this is our first conflict, start at the current index.
            if (!event.hindex) {
              event.hindex = next_hindex;

              // We also want to boost the index,
              // so that whoever we conflict with doesn't get the same one.
              next_hindex++;
            }
          }
        }
      }
    }

    // Step 4: Calculate event coordinates and dimensions,
    // and generate DOM.
    for (i = 0; i < events.length; i++) {
      event = events[i];

      // Height and y-coordinate are already known.
      event.pxh = event.end - event.start;
      event.pxy = event.start;

      // Width is based on calendar width and the cevc.
      event.pxw = 100 / event.cevc;

      // Height uses the same calendar/cevc figure,
      // multiplied by the horizontal index to prevent overlap.
      event.pxx = event.hindex * event.pxw;

      // Now, the easy part.
      let thisStyle = {
        width: event.pxw + "%",
        height: event.pxh + "px",
        top: event.pxy + "px",
        left: event.pxx + "%",
        position: "absolute",
      };
      divs.push(
        <div style={thisStyle}>
          <CalendarEvent></CalendarEvent>
        </div>
      );
    }
    return divs;
    */
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
        <div className="columnOverlay">
          {eventList}
          {/* {this.props.theseEvents.map((event) => {
            return <CalendarEvent eventInfo={event} />;
          })} */}
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
