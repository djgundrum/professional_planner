import React, { Component } from "react";
import "./profileBody.css";
import ProfileCalendarBody from "./profile_calendar_body/ProfileCalendarBody";
import ProfileTeamBody from "./profile_team_body/ProfileTeamBody";
import ProfileContactBody from "./profile_contact_body/ProfileContactBody";
import axios from "axios";
import editIcon from "../../images/editIcon.svg";
import { Redirect } from "react-router";

class ProfileBody extends Component {
  // constructor() {
  //   super();
  //   let url = "/api/user/account";
  //   axios.get(url).then((result) => {
  //     if (result.data.valid) {
  //       // this.setState({
  //       //   user: result.data.body.user,
  //       //   isLoggedIn: true,
  //       // });
  //     }
  //   });
  // }
  state = {
    user: {},
    mySchedules: [],
    myTeamSchedules: [],
    isDeleteCalendarScreen: false,
    calendarToDelete: ["", ""],
    isEditingName: false,
    isEditingEmail: false,
    tempName: "",
    tempEmail: "",
  };
  componentDidMount() {
    this.loadSchedulesToState();
  }

  loadSchedulesToState = () => {
    let url1 = "/api/user/account";
    let schedules = [];
    let teamSchedules = [];
    let isEmpty = true;
    axios.get(url1).then((result1) => {
      console.log(result1);
      let url2 = `/api/events/guests/user/${result1.data.body.user.user.id}`;
      axios.get(url2).then((guestListResult) => {
        //console.log(guestListResult.data.body.guests.length);
        let getSchedule = (pX, pLength, nextFunc) => {
          isEmpty = false;
          let url3 = `/api/schedules/${guestListResult.data.body.guests[pX].schedule_id}`;
          //let url3 = "/api/schedules";
          axios.get(url3).then((result3) => {
            //schedules = schedules.concat(result3.data.body.schedules);
            if (result3.data.valid) {
              result3.data.body.schedules.type == "Calendar"
                ? (schedules = schedules.concat(result3.data.body.schedules))
                : (teamSchedules = teamSchedules.concat(
                    result3.data.body.schedules
                  ));

              if (pX === pLength - 1) {
                this.setState({
                  user: result1.data.body.user.user,
                  tempName: result1.data.body.user.user.name,
                  tempEmail: result1.data.body.user.user.email,
                  mySchedules: schedules,
                  //Change array to 'teamSchedules'
                  myTeamSchedules: [
                    {
                      id: 4,
                      name: "Team ScheduleScheduleSchedule 1",
                      time: "CT",
                      type: 2,
                      description: "#3fa9f5",
                    },
                    {
                      id: 5,
                      name: "Team Schedule 2",
                      time: "CT",
                      type: 2,
                      description: "#3fa9f5",
                    },
                    {
                      id: 6,
                      name: "Team Schedule 3",
                      time: "CT",
                      type: 2,
                      description: "#3fa9f5",
                    },
                  ],
                });
              } else {
                nextFunc(pX + 1, pLength, nextFunc);
              }
            }
          });
        };
        if (guestListResult.data.body.guests.length > 0) {
          getSchedule(0, guestListResult.data.body.guests.length, getSchedule);
        } else {
          this.setState({
            user: result1.data.body.user.user,
            tempName: result1.data.body.user.user.name,
            tempEmail: result1.data.body.user.user.email,
            mySchedules: schedules,
            //Change array to 'teamSchedules'
            myTeamSchedules: teamSchedules,
          });
        }
      });
    });
  };
  updateProfileInfo = (pName) => {
    if (pName != "") {
    }
  };
  askDeleteCalendar = (pId, pName) => {
    this.setState({
      isDeleteCalendarScreen: !this.state.isDeleteCalendarScreen,
      calendarToDelete: [pId, pName],
    });
  };
  toggleDeleteCalendar = (pId) => {
    if (pId) {
      let url = "/api/schedules/delete";
      axios.post(url, { schedule_id: pId }).then((result) => {
        let url2 = "/api/events/guests/delete";
        let data = {
          schedule_id: pId,
          user_id: this.state.user.id,
        };
        axios.post(url2, data).then((result2) => {
          this.loadSchedulesToState();
          this.askDeleteCalendar("", "");
        });
      });
    } else {
      this.askDeleteCalendar("", "");
    }
  };
  toggleEditName = (isSave) => {
    this.setState({
      isEditingName: !this.state.isEditingName,
    });
    if (isSave) {
      this.saveInfo();
    }
  };
  toggleEditEmail = (isSave) => {
    this.setState({
      isEditingEmail: !this.state.isEditingEmail,
    });
    if (isSave) {
      this.saveInfo();
    }
  };
  updateName = () => {
    this.setState({
      tempName: document.getElementById("editNameInput").value,
    });
  };
  updateEmail = () => {
    this.setState({
      tempEmail: document.getElementById("editEmailInput").value,
    });
  };
  saveInfo = () => {
    let uName = this.state.user.name;
    let uEmail = this.state.user.email;
    if (
      document.getElementById("editNameInput").value != uName ||
      document.getElementById("editEmailInput").value != uEmail
    ) {
      uName = document.getElementById("editNameInput").value;
      uEmail = document.getElementById("editEmailInput").value;
      let url = "/api/user/update_user";
      let data = {
        id: this.state.user.id,
        name: uName,
        email: uEmail,
        role: this.state.user.role,
      };
      axios.post(url, data).then((result) => {
        console.log(result);
        if (result.data.valid) {
        }
      });
    }
  };
  render() {
    switch (this.props.activeScreen) {
      case "information":
        return (
          <div id="profileAccountDiv" className="profileBodies">
            <div id="profileNamesDiv">
              <div id="profileFirstDiv">
                <p className="accountTitle">First Name</p>
                <div className="editProfileDiv">
                  {this.state.isEditingName ? (
                    <p
                      className="editProfileSave"
                      onClick={() => {
                        this.toggleEditName(true);
                      }}
                    >
                      Save
                    </p>
                  ) : (
                    <img
                      src={editIcon}
                      className="editProfileIcon"
                      alt=""
                      onClick={() => {
                        this.toggleEditName(false);
                      }}
                    />
                  )}
                </div>
                <input
                  type="text"
                  name=""
                  id="editNameInput"
                  className="accountInput"
                  value={this.state.tempName}
                  onChange={this.updateName}
                  disabled={this.state.isEditingName ? false : true}
                />
              </div>
              <div id="profileEmailDiv">
                <p className="accountTitle">Email</p>
                <div className="editProfileDiv">
                  {this.state.isEditingEmail ? (
                    <p
                      className="editProfileSave"
                      onClick={() => {
                        this.toggleEditEmail(true);
                      }}
                    >
                      Save
                    </p>
                  ) : (
                    <img
                      src={editIcon}
                      className="editProfileIcon"
                      alt=""
                      onClick={() => {
                        this.toggleEditEmail(false);
                      }}
                    />
                  )}
                </div>
                <input
                  type="text"
                  name=""
                  id="editEmailInput"
                  className="accountInput"
                  value={this.state.tempEmail}
                  onChange={this.updateEmail}
                  disabled={this.state.isEditingEmail ? false : true}
                />
              </div>
            </div>
            <div id="profilePasswordDiv">
              <div
                id="changePasswordDiv"
                onClick={() => {
                  this.props.toggleChangePasswordScreen(this.state.user);
                }}
              >
                Change Password
              </div>
            </div>
          </div>
        );
      case "calendar":
        return (
          <ProfileCalendarBody
            mySchedules={this.state.mySchedules}
            askDeleteCalendar={this.askDeleteCalendar}
            toggleDeleteCalendar={this.toggleDeleteCalendar}
            isDeleteCalendarScreen={this.state.isDeleteCalendarScreen}
            calendarToDelete={this.state.calendarToDelete}
            loadSchedulesToState={this.loadSchedulesToState}
          ></ProfileCalendarBody>
        );
      case "team":
        return (
          <ProfileTeamBody
            myTeamSchedules={this.state.myTeamSchedules}
          ></ProfileTeamBody>
        );
      case "contact":
        return <ProfileContactBody></ProfileContactBody>;
    }
  }
}

export default ProfileBody;
