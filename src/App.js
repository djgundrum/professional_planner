import React from "react";
import Login from './components/Login';
import Home from './components/Home'

import './styles/home.css'
import './styles/menuBar.css'
import './styles/login.css';
import './styles/calendarControls.css'
import './styles/calendar.css'
import './styles/teamScheduleControls.css'
import './styles/teamSchedule.css'
import './styles/myCalendars.css'
import './styles/calendarListItem.css'
import './styles/calendarControlsDropdown.css'

//Do call to backend to see if user is logged in
// If logged in, take to homescreen, or else return login screen
var loggedIn = true;

export default function App() {
  if (loggedIn) {
    return (
      < Home />
    );
  }
  else {
    return (
      <Login />
    );
  }
}
