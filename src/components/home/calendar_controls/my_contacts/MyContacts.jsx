import React, { Component } from 'react';
import ContactListItem from './contact_list_item/ContactListItem'
import './myContacts.css'

class MyContacts extends Component {
    state = {
        contacts: [{
            "id": 1,
            "name": "ContactContactContact 1",
        },
        {
            "id": 2,
            "name": "Contact 2",
        },
        {
            "id": 3,
            "name": "Contact 3",
        },
        {
            "id": 4,
            "name": "Contact 4",
        },
        {
            "id": 5,
            "name": "Contact 5",
        },
        {
            "id": 6,
            "name": "Contact 6",
        },
        {
            "id": 7,
            "name": "Contact 7",
        }]
    }
    render() { 
        return (
            <div className="listItemsDiv">
                {
                this.state.contacts.map((contact) => (
                    <div key={contact.id}>
                        <ContactListItem propName = {contact.name}/>
                    </div>
                    
                ))}
            </div>
        );
    }
    
}
 
export default MyContacts;