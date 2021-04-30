import "./createEvent.css";
import xIcon from "../../images/x.svg";
import calendarIcon from "../../images/calendarIcon.svg";
import timezoneIcon from "../../images/timezoneIcon.svg";
import addPerson from "../../images/addPerson.svg";

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
          this.props.toggleCreateEventScreen(false, {}, false, false, false);
          this.setState({
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            editOnLoad: true,
          });
          this.props.updateEventsInState(result.data.body.event, false);
          //this.props.loadSchedulesToState();
        }
      });
    }
  };
  addEvent2 = (pName, pSchedule_id, pTime, pTimeEnd) => {
    this.props.addGeneratedEvent(pName, pSchedule_id, pTime, pTimeEnd);
    this.props.toggleCreateEventScreen(false, {}, false, false, false);
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
        this.props.toggleCreateEventScreen(false, {}, false, false, false);
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
            this.props.toggleCreateEventScreen(false, {}, false, false, false);
            this.setState({
              startDate: "",
              startTime: "",
              endDate: "",
              endTime: "",
              editOnLoad: true,
            });
            this.props.updateEventsInState(result.data.body.event, false);
            //this.props.loadSchedulesToState();
          }
        });
      }
    }
  };
  updateFields = () => {
    if (!this.props.isAddShift) {
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
    } else {
      this.setState({
        name: document.getElementById("employeeSelect").value,
        calendar: this.props.eventInfo.schedule,
        startDate: document.getElementById("startDateInput").value,
        startTime: document.getElementById("startTimeInput").value,
        endDate: document.getElementById("endDateInput").value,
        endTime: document.getElementById("endTimeInput").value,
        editOnLoad: false,
        // timezone: document.getElementById("timezoneSelect").value,
        // timezoneOffset: "",
      });
    }
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
    let selectOptions = [];
    for (let i = 0; i < this.props.mySchedules.length; i++) {
      if (this.props.mySchedules[i].creator_id === this.props.user.id) {
        selectOptions.push(this.props.mySchedules[i]);
      }
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
              this.props.toggleCreateEventScreen(
                false,
                {},
                false,
                false,
                false
              );
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
          {this.props.isAddShift ? (
            <></>
          ) : (
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
              readOnly={
                this.props.eventInfo.type_description == "Not happy"
                  ? true
                  : false
              }
            />
          )}
          {this.props.isAddShift ? (
            <img src={addPerson} alt="" id="employeeIcon" />
          ) : (
            <img
              src={calendarIcon}
              alt=""
              id="calendarIcon"
              style={{
                display:
                  this.props.eventInfo.type_description == "Not happy"
                    ? "none"
                    : "block",
              }}
            />
          )}

          {this.props.isAddShift ? (
            <select id="employeeSelect">
              {this.props.employees.map((employee) => (
                <option value={employee.name}>{employee.name}</option>
              ))}
            </select>
          ) : (
            <select
              id="calendarSelect"
              onChange={this.updateFields}
              value={
                this.props.isCreateEventEdit && this.state.editOnLoad
                  ? this.props.eventInfo.schedule
                  : this.state.calendar
              }
              style={{
                display:
                  this.props.eventInfo.type_description == "Not happy"
                    ? "none"
                    : "block",
              }}
            >
              {selectOptions.map((schedule) => (
                <option value={schedule.id}>{schedule.name}</option>
              ))}
            </select>
          )}

          <p id="startText">Start: </p>
          <input
            type="date"
            id="startDateInput"
            onChange={this.updateFields}
            value={editStartDate}
            readOnly={
              this.props.eventInfo.type_description == "Not happy"
                ? true
                : false
            }
          />
          <input
            type="time"
            id="startTimeInput"
            onChange={this.updateFields}
            value={editStartTime}
            readOnly={
              this.props.eventInfo.type_description == "Not happy"
                ? true
                : false
            }
          />
          <p id="endText">End: </p>
          <input
            type="date"
            id="endDateInput"
            onChange={this.updateFields}
            value={editEndDate}
            readOnly={
              this.props.eventInfo.type_description == "Not happy"
                ? true
                : false
            }
          />
          <input
            type="time"
            id="endTimeInput"
            onChange={this.updateFields}
            value={editEndTime}
            readOnly={
              this.props.eventInfo.type_description == "Not happy"
                ? true
                : false
            }
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
              display:
                this.props.isCreateEventEdit &&
                this.props.eventInfo.type_description != "Not happy"
                  ? "block"
                  : "none",
            }}
            onClick={
              this.props.isUpdatingGenerated
                ? () => {
                    this.props.updateGeneratedEvent(
                      "",
                      "",
                      "",
                      "",
                      this.props.eventInfo.id,
                      true
                    );
                    this.props.toggleCreateEventScreen(
                      false,
                      {},
                      false,
                      false,
                      false
                    );
                  }
                : () => {
                    let url = "/api/events/delete";
                    let data = {
                      event_id: this.props.eventInfo.id,
                    };
                    axios.post(url, data).then((result) => {
                      this.props.updateEventsInState(
                        this.props.eventInfo.id,
                        true
                      );
                      this.props.toggleCreateEventScreen(
                        false,
                        {},
                        false,
                        false,
                        false
                      );
                    });
                  }
            }
          >
            {this.props.isUpdatingGenerated ? "Remove Event" : "Delete Event"}
          </div>
          <div
            id="createEventScreenButton"
            style={{
              display:
                this.props.eventInfo.type_description == "Not happy"
                  ? "none"
                  : "block",
            }}
            onClick={
              this.props.isAddShift
                ? () => {
                    let pName = document.getElementById("employeeSelect").value;
                    let pSchedule_id = this.props.eventInfo.schedule;
                    let pTime1 = document
                      .getElementById("startDateInput")
                      .value.replaceAll("-", "");
                    let pTime2 = document.getElementById("startTimeInput")
                      .value;
                    let pTime = pTime1 + " " + pTime2;

                    let pTimeEnd1 = document
                      .getElementById("endDateInput")
                      .value.replaceAll("-", "");
                    let pTimeEnd2 = document.getElementById("endTimeInput")
                      .value;
                    let pTimeEnd = pTimeEnd1 + " " + pTimeEnd2;
                    this.addEvent2(pName, pSchedule_id, pTime, pTimeEnd);
                  }
                : () => {
                    let pName = document.getElementById("eventNameInput").value;
                    let pSchedule_id =
                      this.props.eventInfo.type_description == "Not happy"
                        ? this.props.eventInfo.schedule
                        : document.getElementById("calendarSelect").value;

                    let pTime1 = document
                      .getElementById("startDateInput")
                      .value.replaceAll("-", "");
                    let pTime2 = document.getElementById("startTimeInput")
                      .value;
                    let pTime = pTime1 + " " + pTime2;

                    let pTimeEnd1 = document
                      .getElementById("endDateInput")
                      .value.replaceAll("-", "");
                    let pTimeEnd2 = document.getElementById("endTimeInput")
                      .value;
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
                  }
            }
          >
            {this.props.isAddShift
              ? "Add Shift"
              : this.props.isCreateEventEdit
              ? "Edit Event"
              : "Create Event"}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
