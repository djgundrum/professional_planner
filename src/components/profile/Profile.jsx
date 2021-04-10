import React, { Component } from 'react';
import ProfileNav from './profile_nav/ProfileNav';
import ProfileBody from './profile_body/ProfileBody'
import './profile.css'

class Profile extends Component {
    state = {
        activeScreen: "information"
    }
    updateScreen = (p) => {
        this.setState({activeScreen: p})
    }
    render() { 
        return (
            <div id="profileScreen">
                <ProfileNav activeScreen={this.state.activeScreen} updateScreen={this.updateScreen}></ProfileNav>
                <ProfileBody activeScreen={this.state.activeScreen} updateScreen={this.updateScreen}></ProfileBody>
            </div>
        );
    }
}
 
export default Profile;