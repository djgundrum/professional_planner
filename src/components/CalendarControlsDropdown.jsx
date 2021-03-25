import React, { Component } from 'react';
import dropdown from './images/dropdownArrow.svg'

class CalendarControlsDropdown extends Component {
    state = {}
    render() { 
        return (
            <div className="calendarControlsDropdown hoverClass">    
                    <p className="titles" >{this.props.title}</p>
                    {this.props.propShow ? <img className="dropdownArrow dropdownDown" src={dropdown} alt=""/> : <img className="dropdownArrow dropdownRight" src={dropdown} alt=""/>}                         
            </div>
            
        );
    }
}
 
export default CalendarControlsDropdown;