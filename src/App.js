import React from "react";
import Login from './components/login/Login';
import Home from './components/home/Home'

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
      < Login />
    );
  }
}
