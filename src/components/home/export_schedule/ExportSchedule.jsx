import "./exportSchedule.css";
import xIcon from "../../images/x.svg";
import addPersonIcon from "../../images/addPerson.svg";

import React, { Component } from "react";
import axios from "axios";

class ExportSchedule extends Component {
  state = {
    name: "",
    sharedContacts: [],
  };
  addContacts = () => {
    let contactString = document.getElementById("addContactInput2").value;
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
              sharedContacts: newContacts,
              isEditLoad: false,
              name: document.getElementById("scheduleNameInput").value,
            });
          }
          if (errorNames.length > 0) {
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
  export = () => {
    let url1 = "/api/user/account";
    axios.get(url1).then((result1) => {
      let url2 = "/api/schedules/create";
      let data = {
        creator_id: result1.data.body.user.user.id,
        name: this.state.name,
        type: 2,
        description: "#29abe2",
      };
      axios.post(url2, data).then((result2) => {
        if (result2.data.valid) {
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
          // Adds all events to schedule
          let url4 = "/api/events/create";
          for (let x = 0; x < this.props.generatedEvents.length; x++) {
            let data4 = {
              name: this.props.generatedEvents[x].name,
              capacity: 1,
              schedule_id: result2.data.body.schedule.id,
              time: this.props.generatedEvents[x].time,
              time_end: this.props.generatedEvents[x].time_end,
              type: 2,
            };
            axios.post(url4, data4).then((result4) => {});
          }
          this.props.clearGenerated();
          this.props.updateSchedulesInState(result2.data.body.schedule);
          this.props.toggleExportScreen();
          this.setState({ isEditLoad: true });
        }
      });
    });
  };
  render() {
    return (
      <div
        id="exportScreen"
        style={
          this.props.isExportScreen ? { display: "block" } : { display: "none" }
        }
      >
        <div id="exportBackground"></div>
        <div id="exportDiv">
          <img
            src={xIcon}
            alt=""
            id="xIconE"
            onClick={() => {
              this.props.toggleExportScreen();
            }}
          />
          <input
            type="text"
            id="scheduleNameInput"
            placeholder="Schedule Name..."
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <div id="shareDiv2">
            <div id="addPersonDiv2">
              <img src={addPersonIcon} alt="" id="addPersonIcon2" />
            </div>
            <p id="shareWithText2">Share With:</p>
          </div>
          <div id="shareContacts2">
            <input type="text" id="addContactInput2" />
            <div id="addContactButton2" onClick={this.addContacts}>
              Add
            </div>
            <div id="personsDiv2">
              {this.state.sharedContacts.map((contact) => (
                <div key={contact.id} className="personDiv">
                  <p>{contact.name ? contact.name : contact.email}</p>
                  <img
                    src={xIcon}
                    alt=""
                    className="deletePerson"
                    onClick={() => {
                      this.deletePerson(contact.id);
                      this.setState({ isEditLoad: false });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            id="exportScreenButton"
            className="exportButton"
            onClick={this.export}
          >
            Export
          </div>
        </div>
      </div>
    );
  }
}

export default ExportSchedule;
