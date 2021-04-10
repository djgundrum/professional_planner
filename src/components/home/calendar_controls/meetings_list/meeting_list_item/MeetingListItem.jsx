import React, { Component } from 'react';
import './meetingListItem.css'

class MeetingListItem extends Component {
    state = {
        meeting: {
            id: this.props.propId,
            name: this.props.propName,
            description: this.props.propColor
        }
    }
    render() { 
        return (
            <>
                <div key={"div"+this.state.meeting.id}>
                    <div className="meetingNameColor">

                    </div>
                    <p key={"name"+this.state.meeting.id}  className="meetingNames">
                        {this.state.meeting.name}
                    </p>
                </div>
            </>
        );
    }
}
 
export default MeetingListItem;