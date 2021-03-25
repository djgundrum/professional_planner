import React, { Component } from 'react';
import './calendarListItem.css'

class CalendarListItem extends Component {
    state = {
        calendar: {
            id: this.props.propId,
            name: this.props.propName,
            description: this.props.propColor
        }
    }
    updateHomeCalendars = () => {
        this.props.updateCalendars(this.state.calendar.id, this.state.calendar.name)
    }
    render() { 
        let isActive = false
        for (let i=0; i<this.props.activeCalendars.length; i++){
            if (this.state.calendar.id === this.props.activeCalendars[i][0]) {
                isActive = true
            }
        }
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
            <div key={"div"+this.state.calendar.id} className={this.props.view === "Calendar" ? "hoverClass" : ""} onClick={this.props.view === "Calendar" ? this.updateHomeCalendars : ()=>{}}>
                <div key={"color"+this.state.calendar.id} className="calendarNameColor" style={isActive ? selected : deselected}></div>
                <p key={"name"+this.state.calendar.id}  className="calendarNames">
                    {this.state.calendar.name}
                </p>
            </div>
        );
    }
}
 
export default CalendarListItem;