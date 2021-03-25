import React, { Component } from 'react';

class TeamScheduleListItem extends Component {
    state = {
        calendar: {
            id: this.props.propId,
            name: this.props.propName,
            description: this.props.propColor
        }
    }
    updateHomeTeamSchedule = () => {
        this.props.updateTeamSchedule(this.state.calendar.id, this.state.calendar.name)
    }
    render() { 
        let isActive = (this.state.calendar.id === this.props.activeTeamSchedule[0])
        let selected = {
            backgroundColor: this.state.calendar.description,
            width: "20px",
            height: "20px"
        }
        let deselected = {
            border: "2px solid "+this.state.calendar.description,
            width: "16px",
            height: "16px"
        }
        return (
            <div key={"div"+this.state.calendar.id} className={this.props.view === "Team Schedule" ? "hoverClass" : ""} onClick={this.props.view === "Team Schedule" ? this.updateHomeTeamSchedule : ()=>{}}>
                <div key={"color"+this.state.calendar.id} className="scheduleNameColor" style={isActive ? selected : deselected}></div>
                <p key={"name"+this.state.calendar.id}  className="calendarNames">
                    {this.state.calendar.name}
                </p>
            </div>
        );
    }
}
 
export default TeamScheduleListItem;