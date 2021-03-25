import './calendarCell.css'

import React, { Component } from 'react';

class CalendarCell extends Component {
    state = {}
    render() { 
        return (
            <div className={this.props.isLast ? "calendarCell" : "calendarCell calendarCellNotLast"}>
                
            </div>
        );
    }
}
 
export default CalendarCell;