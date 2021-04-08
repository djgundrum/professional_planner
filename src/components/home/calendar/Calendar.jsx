import './calendar.css'

import React, { Component } from 'react';
import CalendarColumn from './calendar_column/CalendarColumn';

class Calendar extends Component {
    state = {
        //This will be populated from an API call
        isCalendar: true,

        // In Calendar View, will be populated with events (type: 1)
        // In Team Schedule View, will be populated with events (type: 2)
        // On settings screen when creating team schedule, will be populated with blocks (employee blocks type:1, meeting blocks type: 3)
        // On generated team schedule screen, will be populated with employee events (type: 2), employee blocks (type: 1), and meeting blocks (type: 3)
        
        activeEvents: [{
            "id": 1,
            "name": "lunch",
            "time": "2021-03-25 12:00:00",
            "type": 1,
            "capacity": 1,
            "length": 60,
            "description": "",
            "schedule_id": 2
        }]
    }
    render() { 
        var times = []
        var columns = []
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        for (let c=0; c<7; c++) {
            let columnDateInfo = [days[new Date(this.props.dateInfo.startDate.getTime()+(c*24*60*60*1000)).getDay()%7], new Date(this.props.dateInfo.startDate.getTime()+(c*24*60*60*1000)).getDate()]
            let isToday = false
            if (
                new Date(this.props.dateInfo.startDate.getTime()+(c*24*60*60*1000)).getDate() === this.props.dateInfo.currentDate.getDate() &&
                new Date(this.props.dateInfo.startDate.getTime()+(c*24*60*60*1000)).getMonth() === this.props.dateInfo.currentDate.getMonth() &&
                new Date(this.props.dateInfo.startDate.getTime()+(c*24*60*60*1000)).getYear() === this.props.dateInfo.currentDate.getYear()
            ) {
                isToday = true
            }
            columns.push(
                <CalendarColumn isLast={c!==6 ? false : true} columnDateInfo={columnDateInfo} isToday={isToday}/>
            )   
        }
        for (let t=1; t<=23; t++){
            t<12 ? times.push(t+" am") : (t>12 ? times.push(t%12+" pm") : times.push("12 pm"))
        }
        return (
            <div id="calendarDiv">
                <div id="timeColumn">
                    {times.map((time) => {
                        return <p>{time}</p>
                    })}
                </div>
                {columns}
            </div>
        );
    }
}
 
export default Calendar;