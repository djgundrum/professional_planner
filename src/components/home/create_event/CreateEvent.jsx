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
    editOnLoad: true,
  };
  addEvent = (pName, pSchedule_id, pTime, pTimeEnd) => {
    //Send parameters
    if (pName && pTimeEnd && pSchedule_id && pTime) {
      let url = "/api/events/create";
      let data = {
        name: pName,
        capacity: 1,
        schedule_id: pSchedule_id,
        time: pTime,
        time_end: pTimeEnd,
        type: 1,
      };
      axios.post(url, data).then((result) => {
        if (result.data.valid) {
          this.props.toggleCreateEventScreen(false, {}, false);
          this.setState({
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            editOnLoad: true,
          });
          this.props.loadSchedulesToState();
        }
      });
    }
  };
  updateEvent = (pName, pSchedule_id, pTime, pTimeEnd, pId) => {
    if (pName && pTimeEnd && pSchedule_id && pTime) {
      if (this.props.isUpdatingGenerated) {
        this.props.updateGeneratedEvent(
          pName,
          pSchedule_id,
          pTime,
          pTimeEnd,
          pId,
          false
        );
        this.props.toggleCreateEventScreen(false, {}, false);
      } else {
        let url = "/api/events/update";
        let data = {
          name: pName,
          schedule_id: pSchedule_id,
          time: pTime,
          time_end: pTimeEnd,
          id: pId,
        };
        axios.post(url, data).then((result) => {
          if (result.data.valid) {
            this.props.toggleCreateEventScreen(false, {}, false);
            this.setState({
              startDate: "",
              startTime: "",
              endDate: "",
              endTime: "",
              editOnLoad: true,
            });
            this.props.loadSchedulesToState();
          }
        });
      }
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
      editOnLoad: false,
      // timezone: document.getElementById("timezoneSelect").value,
      // timezoneOffset: "",
    });
  };
  render() {
    let editStartDate = this.state.startDate;
    let editStartTime = this.state.startTime;
    let editEndDate = this.state.endDate;
    let editEndTime = this.state.endTime;

    if (this.props.isCreateEventEdit && this.state.editOnLoad) {
      editStartDate =
        this.props.eventInfo.time.substring(0, 4) +
        "-" +
        this.props.eventInfo.time.substring(4, 6) +
        "-" +
        this.props.eventInfo.time.substring(6, 8);
      editStartTime = this.props.eventInfo.time.substring(9);
      editEndDate =
        this.props.eventInfo.time_end.substring(0, 4) +
        "-" +
        this.props.eventInfo.time_end.substring(4, 6) +
        "-" +
        this.props.eventInfo.time_end.substring(6, 8);
      editEndTime = this.props.eventInfo.time_end.substring(9);
    }
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
            onClick={() => {
              this.props.toggleCreateEventScreen(false, {}, false);
              this.setState({
                name: "",
                calendar: "",
                startDate: "",
                startTime: "",
                endDate: "",
                endTime: "",
                editOnLoad: true,
              });
            }}
          />
          <input
            type="text"
            id="eventNameInput"
            placeholder="Event Name..."
            onChange={this.updateFields}
            value={
              this.props.isCreateEventEdit && this.state.editOnLoad
                ? this.props.eventInfo.name
                : this.state.name
            }
          />
          <img src={calendarIcon} alt="" id="calendarIcon" />
          <select
            id="calendarSelect"
            onChange={this.updateFields}
            value={
              this.props.isCreateEventEdit && this.state.editOnLoad
                ? this.props.eventInfo.schedule
                : this.state.calendar
            }
          >
            {this.props.mySchedules.map((schedule) => (
              <option value={schedule.id}>{schedule.name}</option>
            ))}
          </select>
          <p id="startText">Start: </p>
          <input
            type="date"
            id="startDateInput"
            onChange={this.updateFields}
            value={editStartDate}
          />
          <input
            type="time"
            id="startTimeInput"
            onChange={this.updateFields}
            value={editStartTime}
          />
          <p id="endText">End: </p>
          <input
            type="date"
            id="endDateInput"
            onChange={this.updateFields}
            value={editEndDate}
          />
          <input
            type="time"
            id="endTimeInput"
            onChange={this.updateFields}
            value={editEndTime}
          />
          {/* <img src={timezoneIcon} alt="" id="timezoneIcon" />
          <select id="timezoneSelect">
            {this.props.timezones.map((timezone) => (
              <option value={timezone}>{timezone}</option>
            ))}
          </select> */}
          <div
            id="removeEventButton"
            style={{
              display: this.props.isUpdatingGenerated ? "block" : "none",
            }}
            onClick={() => {
              this.props.updateGeneratedEvent(
                "",
                "",
                "",
                "",
                this.props.eventInfo.id,
                true
              );
              this.props.toggleCreateEventScreen(false, {}, false);
            }}
          >
            Remove Event
          </div>
          <div
            id="createEventScreenButton"
            onClick={() => {
              let pName = document.getElementById("eventNameInput").value;
              let pSchedule_id = document.getElementById("calendarSelect")
                .value;

              let pTime1 = document
                .getElementById("startDateInput")
                .value.replaceAll("-", "");
              let pTime2 = document.getElementById("startTimeInput").value;
              let pTime = pTime1 + " " + pTime2;

              let pTimeEnd1 = document
                .getElementById("endDateInput")
                .value.replaceAll("-", "");
              let pTimeEnd2 = document.getElementById("endTimeInput").value;
              let pTimeEnd = pTimeEnd1 + " " + pTimeEnd2;
              if (this.props.isCreateEventEdit) {
                this.updateEvent(
                  pName,
                  pSchedule_id,
                  pTime,
                  pTimeEnd,
                  this.props.eventInfo.id
                );
              } else {
                this.addEvent(pName, pSchedule_id, pTime, pTimeEnd);
              }
            }}
          >
            {this.props.isCreateEventEdit ? "Edit Event" : "Create Event"}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
