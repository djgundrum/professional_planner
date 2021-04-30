import "./createCalendar.css";
import xIcon from "../../images/x.svg";
import addPersonIcon from "../../images/addPerson.svg";
import axios from "axios";
import React, { Component } from "react";

class CreateCalendar extends Component {
  state = {
    name: "",
    color: "",
    //Needs to be updated
    sharedContacts: [],
    //0) red 1) orange 2) yellow 3) light green 4) dark green 5) light blue 6) dark blue 7) purple 8) pink 9) grey
    colors: [
      "#ff3200",
      "#ff7f0a",
      "#ffe174",
      "#4bdf00",
      "#009f1a",
      "#0acbff",
      "#5f71ff",
      "#dd5fff",
      "#ff7bd5",
      "#777777",
    ],
    isEditLoad: true,
  };
  addContacts = () => {
    let contactString = document.getElementById("addContactInput").value;
    let contacts = contactString.split(",").map(function (item) {
      return item.trim();
    });
    let contactNames = [];
    let errorNames = [];

    for (let i = 0; i < contacts.length; i++) {
      let url = `/api/user/email/${contacts[i]}`;
      axios.get(url).then((result) => {
        if (result.data.valid) {
          contactNames.push({
            id: result.data.body.user.id,
            name: result.data.body.user.name,
            email: result.data.body.user.email,
          });
        } else {
          errorNames.push(contacts[i]);
        }
        if (i == contacts.length - 1) {
          if (contactNames.length > 0) {
            if (this.props.calendarContacts) {
              this.props.updateCalendarContacts(contactNames, false, "");
            } else {
              let newContacts = this.state.sharedContacts.concat(contactNames);
              this.setState({
                //sharedContacts: this.state.sharedContacts.push(contactNames),
                sharedContacts: newContacts,
                isEditLoad: false,
                name: document.getElementById("calendarNameInput").value,
              });
            }
          }
          if (errorNames.length > 0) {
            console.log("Email does not exist");
            //error here
          }
        }
      });
    }
  };
  deletePerson = (pId) => {
    if (this.props.calendarContacts) {
      this.props.updateCalendarContacts([], true, pId);
    } else {
      let newContacts = this.state.sharedContacts;
      for (let i = 0; i < newContacts.length; i++) {
        if (newContacts[i].id == pId) {
          newContacts.splice(i, 1);
          this.setState({
            sharedContacts: newContacts,
          });
        }
      }
    }
  };
  addCalendar = () => {
    let url1 = "/api/user/account";
    axios.get(url1).then((result1) => {
      let url2 = "/api/schedules/create";
      let data = {
        creator_id: result1.data.body.user.user.id,
        name: this.props.createCalendarInfo.name,
        type: 1,
        description: this.props.createCalendarInfo.description,
      };
      axios.post(url2, data).then((result2) => {
        //console.log(result2);
        if (result2.data.valid) {
          this.props.toggleCreateCalendarScreen();
          this.props.clearCreateCalendarInfo();
          this.setState({
            name: "",
            color: "",
          });

          let url3 = "/api/events/guests/add";
          let data3 = {
            user_id: result1.data.body.user.user.id,
            schedule_id: result2.data.body.schedule.id,
          };
          // Adds yourself to guest list
          axios.post(url3, data3).then((result3) => {});
          // Adds everyone in specified to guest list
          for (let i = 0; i < this.state.sharedContacts.length; i++) {
            let data3 = {
              user_id: this.state.sharedContacts[i].id,
              schedule_id: result2.data.body.schedule.id,
            };
            axios.post(url3, data3).then((result3) => {});
          }
          this.props.updateSchedulesInState(result2.data.body.schedule);
          this.setState({ isEditLoad: true });
        }
      });
    });
  };
  editCalendar = () => {
    let url = "/api/schedules/update";
    let data = {
      name: this.state.name != "" ? this.state.name : this.props.calendarName,
      description:
        this.state.color != "" ? this.state.color : this.props.calendarColor,
      type: this.props.calendarType,
      schedule_id: this.props.calendarId,
    };

    axios.post(url, data).then((result) => {
      if (result.data.valid) {
        let url2 = `/api/events/guests/schedule/${this.props.calendarId}`;
        axios.get(url2).then((result2) => {
          for (let x = 0; x < result2.data.body.guests.length; x++) {
            let isStillHere = false;
            for (let y = 0; y < this.props.calendarContacts.length; y++) {
              if (
                result2.data.body.guests[x].user_id ==
                this.props.calendarContacts[y].id
              ) {
                isStillHere = true;
              }
            }
            if (!isStillHere) {
              let url3 = "/api/events/guests/delete";
              let data3 = {
                user_id: result2.data.body.guests[x].user_id,
                schedule_id: this.props.calendarId,
              };
              axios.post(url3, data3).then((result3) => {});
            }
          }

          for (let y = 0; y < this.props.calendarContacts.length; y++) {
            let isNew = true;
            for (let x = 0; x < result2.data.body.guests.length; x++) {
              if (
                result2.data.body.guests[x].user_id ==
                this.props.calendarContacts[y].id
              ) {
                isNew = false;
              }
            }
            if (isNew) {
              let url3 = "/api/events/guests/add";
              let data3 = {
                user_id: this.props.calendarContacts[y].id,
                schedule_id: this.props.calendarId,
              };
              axios.post(url3, data3).then((result3) => {});
            }
          }
          this.props.toggleCreateCalendarScreen();
          this.props.updateSchedulesInState(result.data.body.schedule);
          this.setState({ isEditLoad: true });
        });
      }
    });
  };
  updateFields = () => {
    this.setState({
      name: document.getElementById("calendarNameInput").value,
      isEditLoad: false,
    });
  };
  render() {
    let thisContactList = this.state.sharedContacts;
    if (this.props.calendarContacts) {
      thisContactList = this.props.calendarContacts;
    }
    return (
      <div
        id="createCalendarScreen"
        style={
          this.props.isCreateCalendarScreen
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div id="createCalendarBackground"></div>
        <div id="createCalendarDiv">
          <img
            src={xIcon}
            alt=""
            id="xIcon"
            onClick={() => {
              this.setState({
                name: "",
                color: "",
                isEditLoad: true,
              });
              this.props.toggleCreateCalendarScreen();
            }}
          />
          <input
            type="text"
            id="calendarNameInput"
            placeholder="Calendar Name..."
            value={
              this.props.calendarName && this.state.isEditLoad
                ? this.props.calendarName
                : this.state.name
            }
            onChange={(e) => {
              this.updateFields();
              if (!this.props.isEdit) {
                this.props.updateCreateCalendarInfo(e.target.value, "");
              }
            }}
          />
          <div id="calendarColors">
            {this.state.colors.map((color) => (
              <div
                key={color}
                className="calendarColor"
                style={
                  this.props.calendarColor === color && this.state.color === ""
                    ? { backgroundColor: color, height: "26px", width: "26px" }
                    : this.state.color === color ||
                      (this.state.color === "" &&
                        color === "#ff3200" &&
                        !this.props.calendarColor)
                    ? { backgroundColor: color, height: "26px", width: "26px" }
                    : {
                        border: "2px solid " + color,
                        height: "22px",
                        width: "22px",
                      }
                }
                onClick={() => {
                  this.setState({
                    color: color,
                    isEditLoad: false,
                    name: document.getElementById("calendarNameInput").value,
                  });
                  if (!this.props.isEdit) {
                    this.props.updateCreateCalendarInfo("", color);
                  }
                }}
              ></div>
            ))}
          </div>
          <div id="shareDiv">
            <div id="addPersonDiv">
              <img src={addPersonIcon} alt="" id="addPersonIcon" />
            </div>
            <p id="shareWithText">Share With:</p>
          </div>
          <div id="shareContacts">
            <input type="text" id="addContactInput" />
            <div id="addContactButton" onClick={this.addContacts}>
              Add
            </div>
            <div id="personsDiv">
              {thisContactList.map((contact) => (
                <div
                  key={contact.id}
                  className="personDiv"
                  style={{
                    display:
                      this.props.user.id == contact.id ? "none" : "block",
                  }}
                >
                  <p>{contact.name ? contact.name : contact.email}</p>
                  <img
                    src={xIcon}
                    alt=""
                    className="deletePerson"
                    onClick={() => {
                      this.deletePerson(contact.id);
                      //this.setState({ isEditLoad: false });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            id="createCalendarScreenButton"
            onClick={this.props.isEdit ? this.editCalendar : this.addCalendar}
          >
            {this.props.isEdit ? "Edit Calendar" : "Create Calendar"}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCalendar;
