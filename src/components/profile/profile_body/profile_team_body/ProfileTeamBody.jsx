import React, { Component } from 'react';
import './profileTeamBody.css'
import ConfirmDelete from '../confirm_delete/ConfirmDelete'

class ProfileTeamBody extends Component {
    state = {
        mySchedules: [
			{
				id: 1,
				name: "Team ScheduleScheduleSchedule 1",
				time: "CT",
				type: 1,
				description: "#ff5135",
				color: "",
			},
			{
				id: 2,
				name: "Team Schedule 2",
				time: "CT",
				type: 1,
				description: "#00bf50",
				color: "",
			},
			{
				id: 3,
				name: "Team Schedule 3",
				time: "CT",
				type: 1,
				description: "#3fa9f5",
				color: "",
			},
		],
        isDeleteCalendarScreen: false,
        calendarToDelete: ["", ""]
    }
    askDeleteCalendar = (pId, pName) => {
		this.setState({
			isDeleteCalendarScreen: !this.state.isDeleteCalendarScreen,
			calendarToDelete: [pId, pName]
		})
	}
	toggleDeleteCalendar = (pId) => {
		if(pId){
			//DELETE CALENDAR HERE
		}
		this.askDeleteCalendar("", "")
	}
    render() { 
        return (
            <>
                <div id="profileTeamDiv" className="profileBodies">
                    <div className="profileTeams" id="profileAddTeam">
                        +
                    </div>
                    {
                        this.state.mySchedules.map((calendar) => (
                            <div key={"profileTeam"+calendar.id} className="profileTeams">
                                <p className="profileTeamNames">{calendar.name}</p>
                                <div className="profileEditTeam">
                                    Edit
                                </div>
                                <div className="profileDeleteTeam" onClick={()=>{
									this.askDeleteCalendar(calendar.id, calendar.name)
								}}>
                                    Delete
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    this.state.isDeleteCalendarScreen ? <ConfirmDelete calendarToDelete={this.state.calendarToDelete} toggleDeleteCalendar={this.toggleDeleteCalendar}/> : <></>
                }
            </>
        );
    }
}
 
export default ProfileTeamBody;