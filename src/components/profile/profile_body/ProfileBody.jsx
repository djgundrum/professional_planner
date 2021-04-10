import React, { Component } from "react";
import "./profileBody.css";
import ProfileCalendarBody from "./profile_calendar_body/ProfileCalendarBody";
import ProfileTeamBody from "./profile_team_body/ProfileTeamBody";
import ProfileContactBody from "./profile_contact_body/ProfileContactBody";
import axios from "axios";
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
      let url2 = `/api/events/guests/user/${result1.data.body.user.user.id}`;
      axios.get(url2).then((guestListResult) => {
        for (let i = 0; i < guestListResult.data.body.guests.length; i++) {
          isEmpty = false;
          let url3 = `/api/schedules/${guestListResult.data.body.guests[i].schedule_id}`;
          //let url3 = "/api/schedules";
          axios.get(url3).then((result3) => {
            //schedules = schedules.concat(result3.data.body.schedules);
            result3.data.body.schedules.type == "Calendar"
              ? (schedules = schedules.concat(result3.data.body.schedules))
              : (teamSchedules = teamSchedules.concat(
                  result3.data.body.schedules
                ));

            if (i == guestListResult.data.body.guests.length - 1) {
              console.log(schedules);
              this.setState({
                user: {
                  id: result1.data.body.user.user.id,
                  name: result1.data.body.user.user.name,
                  email: result1.data.body.user.user.email,
                  password: result1.data.body.user.user.id,
                },
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
            }
          });
        }
        if (isEmpty) {
          this.setState({
            mySchedules: [],
          });
        }
      });
    });
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
  render() {
    switch (this.props.activeScreen) {
      case "information":
        return (
          <div id="profileAccountDiv" className="profileBodies">
            <div id="profileNamesDiv">
              <div id="profileFirstDiv">
                <p className="accountTitle">First Name</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="accountInput"
                  value={this.state.user.name}
                />
              </div>
              <div id="profileEmailDiv">
                <p className="accountTitle">Email</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="accountInput"
                  value={this.state.user.email}
                />
              </div>
            </div>
            <div id="profilePasswordDiv">
              <p className="accountTitle">Password</p>
              <input
                type="password"
                name=""
                id=""
                className="accountInput"
                value={this.state.user.password}
                disabled={true}
              />
              <div id="changePasswordDiv">Change</div>
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
