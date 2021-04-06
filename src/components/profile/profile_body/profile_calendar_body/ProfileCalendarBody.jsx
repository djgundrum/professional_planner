import React, { Component } from 'react';
import './profileCalendarBody.css'

class ProfileCalendarBody extends Component {
    state = {
        mySchedules: [
			{
				id: 1,
				name: "CalendarCalendarCalendar1",
				time: "CT",
				type: 1,
				description: "#ff5135",
				color: "",
			},
			{
				id: 2,
				name: "Calendar2",
				time: "CT",
				type: 1,
				description: "#00bf50",
				color: "",
			},
			{
				id: 3,
				name: "Calendar3",
				time: "CT",
				type: 1,
				description: "#3fa9f5",
				color: "",
			},
		]
    }
    render() { 
        return (
            <div id="profileCalendarDiv" className="profileBodies">
                <div className="profileCalendars" id="profileAddCalendar">
                    +
                </div>
                {
                    this.state.mySchedules.map((calendar) => (
                        <div key={"profileCalendar"+calendar.id} className="profileCalendars" style={{backgroundColor: calendar.description+"99"}}>
                            <p className="profileCalendarNames">{calendar.name}</p>
                            <div className="profileEditCalendar">
                                Edit
                            </div>
                            <div className="profileDeleteCalendar">
                                Delete
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}
 
export default ProfileCalendarBody;