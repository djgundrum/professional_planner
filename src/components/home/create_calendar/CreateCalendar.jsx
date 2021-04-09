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
    sharedContacts: [
      {
        id: 1,
        name: "ContactContactContact 1",
      },
      {
        id: 2,
        name: "Contact 2",
      },
      {
        id: 3,
        name: "Contact 3",
      },
      {
        id: 4,
        name: "Contact 4",
      },
      {
        id: 5,
        name: "Contact 5",
      },
      {
        id: 6,
        name: "Contact 6",
      },
      {
        id: 7,
        name: "Contact 7",
      },
    ],
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
        if (result2.data.valid) {
          this.props.toggleCreateCalendarScreen();
          this.props.clearCreateCalendarInfo();
          this.setState({
            name: "",
            color: "#ff3200",
          });
          //Figure out how to get schedule id of calendar that was just created, the create guest list entry with user id and that schedule id
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
            {this.state.sharedContacts.map((contact) => (
              <div key={contact.id} className="personDiv">
                <p>{contact.name}</p>
                <img src={xIcon} alt="" className="deletePerson" />
              </div>
            ))}
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
