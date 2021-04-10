import React, { Component } from "react";
import "./profileTeamBody.css";
import ConfirmDelete from "../confirm_delete/ConfirmDelete";

class ProfileTeamBody extends Component {
  state = {
    isDeleteCalendarScreen: false,
    calendarToDelete: ["", ""],
  };
  askDeleteCalendar = (pId, pName) => {
    this.setState({
      isDeleteCalendarScreen: !this.state.isDeleteCalendarScreen,
      calendarToDelete: [pId, pName],
    });
  };
  toggleDeleteCalendar = (pId) => {
    if (pId) {
      //DELETE CALENDAR HERE
    }
    this.askDeleteCalendar("", "");
  };
  render() {
    return (
      <>
        <div id="profileTeamDiv" className="profileBodies">
          <div className="profileTeams" id="profileAddTeam">
            +
          </div>
          {this.props.myTeamSchedules.map((calendar) => (
            <div key={"profileTeam" + calendar.id} className="profileTeams">
              <p className="profileTeamNames">{calendar.name}</p>
              <div className="profileEditTeam">Edit</div>
              <div
                className="profileDeleteTeam"
                onClick={() => {
                  this.askDeleteCalendar(calendar.id, calendar.name);
                }}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
        {this.state.isDeleteCalendarScreen ? (
          <ConfirmDelete
            calendarToDelete={this.state.calendarToDelete}
            toggleDeleteCalendar={this.toggleDeleteCalendar}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default ProfileTeamBody;
