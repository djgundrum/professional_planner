import React, { Component } from 'react';
import './profileCalendarBody.css'
import CreateCalendar from '../../../home/create_calendar/CreateCalendar'
import ConfirmDelete from '../confirm_delete/ConfirmDelete'

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
			}
		],
        isCreateCalendarScreen: false,
		isDeleteCalendarScreen: false,
		calendarToDelete: ["", ""]
    }
    toggleCreateCalendarScreen = () => {
		this.setState({
			isCreateCalendarScreen: !this.state.isCreateCalendarScreen,
		});
	};
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
                <div id="profileCalendarDiv" className="profileBodies">
                    <div className="profileCalendars" id="profileAddCalendar">
                        +
                    </div>
                    {
                        this.state.mySchedules.map((calendar) => (
                            <div key={"profileCalendar"+calendar.id} className="profileCalendars" style={{backgroundColor: calendar.description+"99"}}>
                                <p className="profileCalendarNames">{calendar.name}</p>
                                <div className="profileEditCalendar" onClick={this.toggleCreateCalendarScreen}>
                                    Edit
                                </div>
                                <div className="profileDeleteCalendar" onClick={()=>{
									this.askDeleteCalendar(calendar.id, calendar.name)
								}}>
                                    Delete
                                </div>
                            </div>
                        ))
                    }
                </div>
                <CreateCalendar
					mySchedules={this.state.mySchedules}
					timezones={this.state.timezones}
					toggleCreateCalendarScreen={this.toggleCreateCalendarScreen}
					isCreateCalendarScreen={this.state.isCreateCalendarScreen}
				/>
				{
					this.state.isDeleteCalendarScreen ? <ConfirmDelete calendarToDelete={this.state.calendarToDelete} toggleDeleteCalendar={this.toggleDeleteCalendar}/> : <></>
				}
                
            </>
        );
    }
}
 
export default ProfileCalendarBody;