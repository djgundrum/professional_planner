import React, { Component } from 'react';
import MenuBar from './Menubar';
import CalendarControls from './CalendarControls'

class Home extends Component {
    state = {
        activeCalendars: [],
        activeTeamSchedule: [],
        view: "Calendar",
        timeframe: "Week",
        dateInfo: {
            currentDate: new Date(),
            startDate: new Date(new Date().getTime()-((new Date().getDay())*24*60*60*1000)),
            endDate: new Date(new Date().getTime()+((6-new Date().getDay())*24*60*60*1000))
        }
    }
    forwardTimeframe = () => {
        // ONLY WORKS FOR WEEK TIMEFRAME
        this.setState({
            dateInfo: {
                currentDate: new Date(),
                startDate: new Date(this.state.dateInfo.startDate.getTime()+(7*24*60*60*1000)),
                endDate: new Date(this.state.dateInfo.endDate.getTime()+(7*24*60*60*1000))
            }
        })
    }
    backwardTimeframe = () => {
        // ONLY WORKS FOR WEEK TIMEFRAME
        this.setState({
            dateInfo: {
                currentDate: new Date(),
                startDate: new Date(this.state.dateInfo.startDate.getTime()-(7*24*60*60*1000)),
                endDate: new Date(this.state.dateInfo.endDate.getTime()-(7*24*60*60*1000))
            }
        })
    }
    updateCalendars = (id, name) => {
        let newList = this.state.activeCalendars
        let inArray = false
        for (let i=0; i<newList.length; i++){
            if (newList[i][0] === id) {
                newList.splice(i, 1)
                inArray = true
                break
            }
        }
        if (!inArray) {
            newList.push([id, name])
        }
        this.setState({
            activeCalendars: newList
        })
        
    }
    updateTeamSchedule = (id, name) => {
        this.state.activeTeamSchedule[0] === id ?
            this.setState({
                activeTeamSchedule: []
            })
            :
            this.setState({
                activeTeamSchedule: [id, name]
            })
    }
    switchView = () => {
        this.state.view === "Calendar" ? this.setState({view: "Team Schedule"}) : this.setState({view: "Calendar"})
    }
    switchTimeframe = () => {
        this.state.timeframe === "Week" ? this.setState({timeframe: "Month"}) : this.setState({timeframe: "Week"})
    }
    render() { 
        return ( 
            <div id="homeScreen">
                < MenuBar activeCalendars={this.state.activeCalendars} activeTeamSchedule={this.state.activeTeamSchedule} view={this.state.view} timeframe={this.state.timeframe} switchView={this.switchView} switchTimeframe={this.switchTimeframe} dateInfo={this.state.dateInfo} forwardTimeframe={this.forwardTimeframe} backwardTimeframe={this.backwardTimeframe}/>
                < CalendarControls updateCalendars={this.updateCalendars} updateTeamSchedule={this.updateTeamSchedule} activeCalendars={this.state.activeCalendars} activeTeamSchedule={this.state.activeTeamSchedule} view={this.state.view}/>
            </div>
        );
    }
}
 
export default Home;