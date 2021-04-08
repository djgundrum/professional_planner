import React, { Component } from 'react';
import './profileContactBody.css'
import trashIcon from '../../../images/trashIcon.png'

class ProfileContactBody extends Component {
    state = {
        contacts: [
            {
                "name": "Justin",
                "email": "jb@gmail.com"
            },
            {
                "name": "Justin",
                "email": "jb@gmail.com"
            },
            {
                "name": "Justin",
                "email": "jb@gmail.com"
            }
        ],
        isAddContact: true
    }
    toggleAddContact = () => {
        this.setState({isAddContact: !this.state.isAddContact})
    }
    render() { 
        return (
            <div id="profileContactDiv" className="profileBodies">
                <table>
                    <tr>
                        <th style={{width: "30%"}}>Name</th>
                        <th style={{width: "60%"}}>Email</th>
                        <th style={{width: "10%"}}></th>
                    </tr>
                    {
                        this.state.contacts.map((contact) => (
                            <tr>
                                <td>
                                    <input type="text" className="accountTableInput" value={contact.name}/>
                                </td>
                                <td>
                                    <input type="text" className="accountTableInput" value={contact.email}/>
                                </td>
                                <td>
                                    <img src={trashIcon} alt="" className="trashIcon"/>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td id="addContactCell">
                            <div id="profileAddContact">
                                +
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
}
 
export default ProfileContactBody;