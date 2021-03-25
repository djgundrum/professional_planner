import React, { Component } from 'react';
import './contactListItem.css'

class ContactListItem extends Component {
    state = {
        contact: {
            name: this.props.propName
        }
    }
    render() { 
        return (
            <div className="hoverClass">
                <p className="contactNames">
                    {this.state.contact.name}
                </p>
            </div>
        );
    }
}
 
export default ContactListItem;