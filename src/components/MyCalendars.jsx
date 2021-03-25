import React, { Component } from 'react';
import CalendarListItem from './CalendarListItem'

class MyCalendars extends Component {
    state = {
        calendars: [{
            "id": 1,
            "name": "CalendarCalendarCalendar1",
            "time": "CT",
            "type": 1,
            "description": "#ff5135"
        },
        {
            "id": 2,
            "name": "Calendar2",
            "time": "CT",
            "type": 1,
            "description": "#00bf50"
        },
        {
            "id": 3,
            "name": "Calendar3",
            "time": "CT",
            "type": 1,
            "description": "#3fa9f5"
        }]
    }
    render() { 
        return (
            <div className="listItemsDiv" style={this.props.view === "Calendar" ? {opacity: 1} : {opacity: .3}}>
                {
                this.state.calendars.map((calendar) => (
                    <div key={calendar.id}>
                        <CalendarListItem propId = {calendar.id} propName = {calendar.name} propColor = {calendar.description} updateCalendars={this.props.updateCalendars} activeCalendars={this.props.activeCalendars} view={this.props.view}/>
                    </div>
                ))}
            </div>
        );
    }
    
}
 
export default MyCalendars;