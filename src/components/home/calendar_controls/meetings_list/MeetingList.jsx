import React, { Component } from 'react';
import MeetingListItem from './meeting_list_item/MeetingListItem'
import './meetingList.css'

class MeetingList extends Component {
    state = {
        meetings: [{
            "id": 1,
            "name": "MeetingMeetingMeeting1",
            "time": "CT",
            "type": 1,
            "description": "#ff5135"
        },
        {
            "id": 2,
            "name": "Meeting2",
            "time": "CT",
            "type": 1,
            "description": "#00bf50"
        },
        {
            "id": 3,
            "name": "Meeting3",
            "time": "CT",
            "type": 1,
            "description": "#3fa9f5"
        }],
        colors: ["#ff3200", "#ff7f0a", "#ffe174", "#4bdf00", "#009f1a", "#0acbff", "#5f71ff", "#dd5fff", "#ff7bd5", "#777777"]
    }
    render() { 
        return (
            <div className="listItemsDiv">
                {
                this.state.meetings.map((meeting) => (
                    <div key={meeting.id}>
                        <MeetingListItem propId = {meeting.id} propName = {meeting.name} propColor = {meeting.description}/>
                    </div>
                ))}
            </div>
        );
    }
    
}
 
export default MeetingList;