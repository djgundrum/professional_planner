import React, { Component } from 'react';
import ProfileNav from './profile_nav/ProfileNav';
import ProfileBody from './profile_body/ProfileBody'
import './profile.css'

class Profile extends Component {
    state = {  }
    render() { 
        return (
            <div id="profileScreen">
                <ProfileNav></ProfileNav>
                <ProfileBody></ProfileBody>
            </div>
        );
    }
}
 
export default Profile;