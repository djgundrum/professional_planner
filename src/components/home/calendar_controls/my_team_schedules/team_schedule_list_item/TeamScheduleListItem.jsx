import React, { Component } from 'react';
import './teamScheduleListItem.css'
import dropdown from '../../../../images/dropdownArrow.svg'

class TeamScheduleListItem extends Component {
    state = {
        calendar: {
            id: this.props.propId,
            name: this.props.propName,
            description: this.props.propColor
        },
        //will have to be filled somehow with API
        members: [
            {
                id: "1189232",
                name: "Cam",
                color: "#ff3200"
            },
            {
                id: "1189432",
                name: "Declan",
                color: "#ff7f0a"
            },
            {
                id: "11123232",
                name: "Jacob",
                color: "#ffe174"
            },
            {
                id: "1189234562",
                name: "Justin",
                color: "#4bdf00"
            },
            {
                id: "11812312",
                name: "Roberto",
                color: "#009f1a"
            },
            {
                id: "1144232",
                name: "Sam",
                color: "#0acbff"
            },
        ],
        isShowing: false
    }
    updateHomeTeamSchedule = () => {
        this.props.updateTeamSchedule(this.state.calendar.id, this.state.calendar.name)
    }
    updateShowing = () => {
        this.setState({
            isShowing: !this.state.isShowing
        })
    }
    render() { 
        let isActive = (this.state.calendar.id === this.props.activeTeamSchedule[0])
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
            <div style={{marginBottom: "20px"}}>
                <div key={"div"+this.state.calendar.id} className="scheduleListItem">
                    <div key={"color"+this.state.calendar.id} className="scheduleNameColor" style={isActive ? selected : deselected} onClick={this.props.view === "Team Schedule" ? this.updateHomeTeamSchedule : ()=>{}}></div>
                    <p key={"name"+this.state.calendar.id}  className="scheduleNames">
                        {this.state.calendar.name}
                    </p>
                    <img className={this.state.isShowing ? "dropdownArrow dropdownDown" : "dropdownArrow dropdownRight"} src={dropdown} alt="" onClick={this.updateShowing}/>
                </div>
                {
                    !this.state.isShowing ? <></> : 
                    <div className="scheduleMembers">
                    {
                        this.state.members.map((member) => (
                            <div className="memberListItem">
                                <div key={member.id} className="memberNameColor" style={isActive ? {
                                    backgroundColor: member.color,
                                    width: "16px",
                                    height: "16px"
                                } : {
                                    border: "2px solid "+member.color,
                                    width: "12px",
                                    height: "12px"
                                }}></div>
                                <p key={"name"+this.state.calendar.id}  className="memberName">
                                    {member.name}
                                </p>
                            </div>
                        ))
                    }
                </div>
                }
                
            </div>
            
        );
    }
}
 
export default TeamScheduleListItem;