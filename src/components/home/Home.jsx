import React, { Component } from 'react';
import MenuBar from './menu/Menubar';
import CalendarControls from './calendar_controls/CalendarControls'
import Calendar from './calendar/Calendar'
import CreateEvent from './create_event/CreateEvent'
import './home.css'
import CreateCalendar from './create_calendar/CreateCalendar';

class Home extends Component {
    state = {
        //mySchedules and myEvents are hardcoded currently, will be loaded from API call
        //myEvents should only contain events from active calendars
        myScheduless: [{
            "id": 1,
            "name": "CalendarCalendarCalendar1",
            "time": "CT",
            "type": 1,
            "description": "#ff5135",
            "color": ""
        },
        {
            "id": 2,
            "name": "Calendar2",
            "time": "CT",
            "type": 1,
            "description": "#00bf50",
            "color": ""
        },
        {
            "id": 3,
            "name": "Calendar3",
            "time": "CT",
            "type": 1,
            "description": "#3fa9f5",
            "color": ""
        }],
        activeCalendars: [],
        activeTeamSchedule: [],
        view: "Calendar",
        timeframe: "Week",
        dateInfo: {
            currentDate: new Date(),
            startDate: new Date(new Date().getTime()-((new Date().getDay())*24*60*60*1000)),
            endDate: new Date(new Date().getTime()+((6-new Date().getDay())*24*60*60*1000))
        },
        timezones: ["Timezone 1", "Timezone 2"],
        isCreateEventScreen: false,
        isCreateCalendarScreen: false,
        isCreateTeamScheduleScreen: true,
        isAddEmployeeScreen: false,
        isAddMeetingScreen: false
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
    toggleCreateEventScreen = () => {
        this.setState({isCreateEventScreen: !this.state.isCreateEventScreen})
    }
    toggleCreateCalendarScreen = () => {
        this.setState({isCreateCalendarScreen: !this.state.isCreateCalendarScreen})
    }
    toggleCreateTeamScheduleScreen = () => {
        this.setState({isCreateTeamScheduleScreen: !this.state.isCreateTeamScheduleScreen})
    }
    render() { 
        let request = new XMLHttpRequest()
        let key = "AIzaSyAVpFhty0wB6vrcALbaAzYSSMmU_LFsgGw"
        request.open("GET", "https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key="+key)
        request.send()
        request.onload = () => {}
        return ( 
            <div id="homeScreen">
                < MenuBar activeCalendars={this.state.activeCalendars} activeTeamSchedule={this.state.activeTeamSchedule} view={this.state.view} timeframe={this.state.timeframe} switchView={this.switchView} switchTimeframe={this.switchTimeframe} dateInfo={this.state.dateInfo} forwardTimeframe={this.forwardTimeframe} backwardTimeframe={this.backwardTimeframe}/>
                < Calendar dateInfo={this.state.dateInfo}/>
                < CalendarControls updateCalendars={this.updateCalendars} updateTeamSchedule={this.updateTeamSchedule} activeCalendars={this.state.activeCalendars} activeTeamSchedule={this.state.activeTeamSchedule} view={this.state.view} toggleCreateEventScreen={this.toggleCreateEventScreen} toggleCreateCalendarScreen={this.toggleCreateCalendarScreen} isCreateTeamScheduleScreen={this.state.isCreateTeamScheduleScreen} toggleCreateTeamScheduleScreen={this.toggleCreateTeamScheduleScreen}/>
                < CreateEvent mySchedules={this.state.myScheduless} timezones={this.state.timezones} toggleCreateEventScreen={this.toggleCreateEventScreen} isCreateEventScreen={this.state.isCreateEventScreen}/>
                < CreateCalendar mySchedules={this.state.myScheduless} timezones={this.state.timezones} toggleCreateCalendarScreen={this.toggleCreateCalendarScreen} isCreateCalendarScreen={this.state.isCreateCalendarScreen}/>
            </div>
        );
    }
}
 
export default Home;