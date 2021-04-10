import "./createCalendar.css";
import xIcon from "../../images/x.svg";
import addPersonIcon from "../../images/addPerson.svg";
import axios from "axios";
import React, { Component } from "react";

class CreateCalendar extends Component {
  state = {
    name: "",
    color: "#ff3200",
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
            let newContacts = this.state.sharedContacts.concat(contactNames);
            this.setState({
              //sharedContacts: this.state.sharedContacts.push(contactNames),
              sharedContacts: newContacts,
            });
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
    let newContacts = this.state.sharedContacts;
    for (let i = 0; i < newContacts.length; i++) {
      if (newContacts[i].id == pId) {
        newContacts.splice(i, 1);
        this.setState({
          sharedContacts: newContacts,
        });
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
            color: "#ff3200",
          });
          let url3 = "/api/events/guests/add";
          let data3 = {
            user_id: result1.data.body.user.user.id,
            schedule_id: result2.data.body.schedule.id,
          };
          axios.post(url3, data3).then((result3) => {
            this.props.loadSchedulesToState();
          });
        }
      });
    });
  };
  updateFields = () => {
    this.setState({
      name: document.getElementById("calendarNameInput").value,
    });
  };
  render() {
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
            onClick={this.props.toggleCreateCalendarScreen}
          />
          <input
            type="text"
            id="calendarNameInput"
            placeholder="Calendar Name..."
            value={this.state.name}
            onChange={(e) => {
              this.updateFields();
              this.props.updateCreateCalendarInfo(e.target.value, "");
            }}
          />
          <div id="calendarColors">
            {this.state.colors.map((color) => (
              <div
                key={color}
                className="calendarColor"
                style={
                  this.state.color === color
                    ? { backgroundColor: color, height: "26px", width: "26px" }
                    : {
                        border: "2px solid " + color,
                        height: "22px",
                        width: "22px",
                      }
                }
                onClick={() => {
                  this.setState({ color: color });
                  this.props.updateCreateCalendarInfo("", color);
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
              {this.state.sharedContacts.map((contact) => (
                <div key={contact.id} className="personDiv">
                  <p>{contact.name ? contact.name : contact.email}</p>
                  <img
                    src={xIcon}
                    alt=""
                    className="deletePerson"
                    onClick={() => {
                      this.deletePerson(contact.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div id="createCalendarScreenButton" onClick={this.addCalendar}>
            Create Calendar
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCalendar;
