import React, { Component } from "react";
import TeamScheduleListItem from "./team_schedule_list_item/TeamScheduleListItem";
import "./myTeamSchedules.css";

class MyTeamSchedules extends Component {
  state = {};
  render() {
    return (
      <div className="listItemsDiv">
        {this.props.myTeamSchedules.map((calendar) => (
          <div
            key={calendar.id}
            style={
              this.props.view === "Team Schedule"
                ? { opacity: 1 }
                : { opacity: 0.3 }
            }
          >
            <TeamScheduleListItem
              propId={calendar.id}
              propName={calendar.name}
              propColor={calendar.description}
              propOtherSchedules={this.state.ids}
              updateTeamSchedule={this.props.updateTeamSchedule}
              activeTeamSchedule={this.props.activeTeamSchedule}
              view={this.props.view}
              teamEvents={this.props.teamEvents}
              getNameColors={this.props.getNameColors}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default MyTeamSchedules;
