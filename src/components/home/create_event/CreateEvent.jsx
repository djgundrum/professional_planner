import "./createEvent.css";
import xIcon from "../../images/x.svg";
import calendarIcon from "../../images/calendarIcon.svg";
import timezoneIcon from "../../images/timezoneIcon.svg";

import React, { Component } from "react";
import axios from "axios";

class CreateEvent extends Component {
  state = {
    name: "",
    calendar: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    timezone: "",
    timezoneOffset: "",
  };
  addEvent = (pName, pDuration, pSchedule_id, pTime) => {
    //Send parameters
    if (pName && pDuration && pSchedule_id && pTime) {
      let url = "/api/events/create";
      let data = {
        name: pName,
        capacity: 1,
        duration: pDuration,
        schedule_id: pSchedule_id,
        time: pTime,
        type: 1,
      };
      axios.post(url, data).then((result) => {
        this.props.toggleCreateEventScreen();
      });
    }
  };
  updateFields = () => {
    this.setState({
      name: document.getElementById("eventNameInput").value,
      calendar: document.getElementById("calendarSelect").value,
      startDate: document.getElementById("startDateInput").value,
      startTime: document.getElementById("startTimeInput").value,
      endDate: document.getElementById("endDateInput").value,
      endTime: document.getElementById("endTimeInput").value,
      timezone: document.getElementById("timezoneSelect").value,
      timezoneOffset: "",
    });
  };
  render() {
    return (
      <div
        id="createEventScreen"
        style={
          this.props.isCreateEventScreen
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div id="createEventBackground"></div>
        <div id="createEventDiv">
          <img
            src={xIcon}
            alt=""
            id="xIcon"
            onClick={this.props.toggleCreateEventScreen}
          />
          <input
            type="text"
            id="eventNameInput"
            placeholder="Event Name..."
            onChange={this.updateFields}
          />
          <img src={calendarIcon} alt="" id="calendarIcon" />
          <select id="calendarSelect">
            {this.props.mySchedules.map((schedule) => (
              <option value={schedule.id}>{schedule.name}</option>
            ))}
          </select>
          <p id="startText">Start: </p>
          <input type="date" id="startDateInput" />
          <input type="time" id="startTimeInput" />
          <p id="endText">End: </p>
          <input type="date" id="endDateInput" />
          <input type="time" id="endTimeInput" />
          <img src={timezoneIcon} alt="" id="timezoneIcon" />
          <select id="timezoneSelect">
            {this.props.timezones.map((timezone) => (
              <option value={timezone}>{timezone}</option>
            ))}
          </select>
          <div
            id="createEventScreenButton"
            onClick={() => {
              let pName = document.getElementById("eventNameInput").value;
              let pDuration = "";
              let pSchedule_id = document.getElementById("calendarSelect")
                .value;

              let pTime1 = document
                .getElementById("startDateInput")
                .value.replaceAll("-", "");
              let pTime2 = document.getElementById("startTimeInput").value;
              let pTime = pTime1 + " " + pTime2;
              console.log("name: " + pName);
              console.log("duration: " + pDuration);
              console.log("id: " + pSchedule_id);
              console.log("time: " + pTime);
              //this.addEvent(pName, pDuration, pSchedule_id, pTime);
            }}
          >
            Create Event
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
