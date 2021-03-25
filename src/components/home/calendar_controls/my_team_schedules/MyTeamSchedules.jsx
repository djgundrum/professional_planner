import React, { Component } from 'react';
import TeamScheduleListItem from './team_schedule_list_item/TeamScheduleListItem'
import './myTeamSchedules.css'

class MyTeamSchedules extends Component {
    state = {
        calendars: [{
            "id": 4,
            "name": "Team ScheduleScheduleSchedule 1",
            "time": "CT",
            "type": 2,
            "description": "#3fa9f5"
        },
        {
            "id": 5,
            "name": "Team Schedule 2",
            "time": "CT",
            "type": 2,
            "description": "#3fa9f5"
        },
        {
            "id": 6,
            "name": "Team Schedule 3",
            "time": "CT",
            "type": 2,
            "description": "#3fa9f5"
        }]
    }
    render() { 
        return (
            <div className="listItemsDiv">
                {
                this.state.calendars.map((calendar) => (
                    <div key={calendar.id} style={this.props.view === "Team Schedule" ? {opacity: 1} : {opacity: .3}}>
                        <TeamScheduleListItem propId = {calendar.id} propName = {calendar.name} propColor = {calendar.description} propOtherSchedules = {this.state.ids} updateTeamSchedule = {this.props.updateTeamSchedule} activeTeamSchedule = {this.props.activeTeamSchedule} view={this.props.view}/>
                    </div> 
                ))}
            </div>
        );
    }
    
}
 
export default MyTeamSchedules;