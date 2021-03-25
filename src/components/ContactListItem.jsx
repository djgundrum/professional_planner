import React, { Component } from 'react';

class ContactListItem extends Component {
    state = {
        contact: {
            name: this.props.propName
        }
    }
    render() { 
        return (
            <div className="hoverClass">
                <p className="calendarNames">
                    {this.state.contact.name}
                </p>
            </div>
        );
    }
}
 
export default ContactListItem;