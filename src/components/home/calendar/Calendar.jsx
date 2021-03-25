import './calendar.css'

import React, { Component } from 'react';
import CalendarColumn from './calendar_column/CalendarColumn';

class Calendar extends Component {
    state = {}
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
            c!==6 ? 
            columns.push(
                <CalendarColumn isLast={false} columnDateInfo={columnDateInfo} isToday={isToday}/>
            )
            :
            columns.push(
                <CalendarColumn isLast={true} columnDateInfo={columnDateInfo} isToday={isToday}/>
            )
        }
        for (let t=1; t<=23; t++){
            t<12 ? times.push(t+"am") : (t>12 ? times.push(t%12+"pm") : times.push("12pm"))
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