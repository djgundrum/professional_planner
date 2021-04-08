import React, { Component } from 'react';
import dropdownWhite from '../../images/dropdownArrowWhite.png'
import './menuBar.css'
import { NavLink } from 'react-router-dom'

class MenuBar extends Component {
    state = {
        viewUp: true,
        timeframeUp: true,
        user: {
            name: "Justin"
        }
    }
    dropdownView = () => {
        this.setState({viewUp: !this.state.viewUp})
        if(!this.state.timeframeUp){
            this.dropdownTimeframe()
        }
    }
    dropdownTimeframe = () => {
        this.setState({timeframeUp: !this.state.timeframeUp})
        if(!this.state.viewUp){
            this.dropdownView()
        }
    }
    render() {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        
        return ( 
            <div id="menuBar">
                <p id="activeCalendarsTopLeft">
                    {
                        this.props.view === "Calendar" ? 
                            (
                                this.props.activeCalendars.length > 0 ? 
                                    (
                                        this.props.activeCalendars.length > 1 ? 
                                            this.props.activeCalendars[0][1]+" and " + (this.props.activeCalendars.length - 1) + " more" 
                                            : 
                                            this.props.activeCalendars[0][1]
                                    )
                                    : 
                                    ""
                            ) 
                            : 
                            this.props.activeTeamSchedule[1]
                    }
                </p>
                <div id="dateDiv">
                    <img src={dropdownWhite} id="dateLeft" className="hoverClass" alt="" onClick={this.props.backwardTimeframe}/>
                    <p id="dateTitle">
                        {
                            this.props.dateInfo.startDate.getMonth() === this.props.dateInfo.endDate.getMonth() ?
                            months[this.props.dateInfo.startDate.getMonth()] + " " + this.props.dateInfo.startDate.getDate() + " - " + this.props.dateInfo.endDate.getDate()
                            :
                            months[this.props.dateInfo.startDate.getMonth()] + " " + this.props.dateInfo.startDate.getDate() + " - " +
                            months[this.props.dateInfo.endDate.getMonth()] + " " + this.props.dateInfo.endDate.getDate()
                        }
                    </p>
                    <img src={dropdownWhite} id="dateRight" className="hoverClass" alt="" onClick={this.props.forwardTimeframe}/>
                </div>
                {/* <div id="timeFrameDiv" className="hoverClass" onClick={this.dropdownTimeframe}>
                    <p className="menuRightText1">{this.props.timeframe}</p>
                    <img src={dropdownWhite} className="menuDropdown" alt=""/>
                    <div id="changeTimeframeDiv" onClick={this.props.switchTimeframe} style={this.state.timeframeUp ? {display: "none"} : {display: "block"}}>
                        <p className="menuRightText12">{this.props.timeframe === "Week" ? "Month" : "Week"}</p>
                    </div>
                </div> */}
                <div id="viewDiv" className="hoverClass" onClick={this.dropdownView}>
                    <p className="menuRightText2">{this.props.view}</p>
                    <img src={dropdownWhite} className="menuDropdown2" alt=""/>
                    <div id="changeViewDiv" onClick={this.props.switchView} style={this.state.viewUp ? {display: "none"} : {display: "block"}}>
                        <p className="menuRightText22">{this.props.view === "Calendar" ? "Team Schedule" : "Calendar"}</p>
                    </div>
                </div>     
                <NavLink to="/profile" id="accountDiv" className="hoverClass">
                    <p>{this.state.user.name.substring(0,1)}</p>
                </NavLink>
            </div>
        );
    }
}
 
export default MenuBar;