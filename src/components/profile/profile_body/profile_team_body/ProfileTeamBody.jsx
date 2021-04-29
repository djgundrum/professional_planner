import React, { Component } from "react";
import "./profileTeamBody.css";
import ConfirmDelete from "../confirm_delete/ConfirmDelete";

class ProfileTeamBody extends Component {
  state = {};
  render() {
    return (
      <>
        <div id="profileTeamDiv" className="profileBodies">
          {this.props.myTeamSchedules.map((calendar) => (
            <div key={"profileTeam" + calendar.id} className="profileTeams">
              <p className="profileTeamNames">{calendar.name}</p>
              {this.props.user.id == calendar.creator_id ? (
                <div
                  className="profileDeleteTeam"
                  onClick={() => {
                    this.props.askDeleteCalendar(
                      calendar.id,
                      calendar.name,
                      false
                    );
                  }}
                >
                  Delete
                </div>
              ) : (
                <div
                  className="profileDeleteTeam"
                  onClick={() => {
                    this.props.askDeleteCalendar(
                      calendar.id,
                      calendar.name,
                      true
                    );
                  }}
                >
                  Remove
                </div>
              )}
            </div>
          ))}
        </div>
        {this.props.isDeleteCalendarScreen ? (
          <ConfirmDelete
            isRemove={this.props.isRemove}
            calendarToDelete={this.props.calendarToDelete}
            toggleDeleteCalendar={this.props.toggleDeleteCalendar}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default ProfileTeamBody;
