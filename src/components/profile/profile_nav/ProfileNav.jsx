import React, { Component } from "react";
import "./profileNav.css";
import profileIcon from "../../images/profileIcon.png";
import calendarIconPNG from "../../images/calendarIconPNG.png";
import teamIcon from "../../images/teamIcon.png";
import contactsIcon from "../../images/contactsIcon.png";
import backArrow from "../../images/dropdownArrowWhite.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Error from "../../global/error/error";
import { Redirect } from "react-router-dom";

class ProfileNav extends Component {
  state = {
    error: {
      error: false,
      message: "",
    },
    isLoggedIn: true,
  };
  setInformation = () => {
    this.props.updateScreen("information");
  };
  setCalendar = () => {
    this.props.updateScreen("calendar");
  };
  setTeam = () => {
    this.props.updateScreen("team");
  };
  setContact = () => {
    this.props.updateScreen("contact");
  };
  logOut = () => {
    let url = "/api/user/logout";
    axios.post(url).then((result) => {
      if (!result.data.valid) {
        this.setState({
          error: {
            error: true,
            message: "Could not log out",
          },
        });
      } else {
        this.setState({
          isLoggedIn: false,
        });
      }
    });
  };
  render() {
    return this.state.isLoggedIn ? (
      <div id="profileNav">
        <Error
          error={this.state.error.error}
          message={this.state.error.message}
          close={() => {
            this.setState({
              error: {
                error: false,
                message: "",
              },
            });
          }}
        ></Error>
        <NavLink to={"/home"} className="profileBack">
          <div id="profileBackContainer" onClick={this.goHome}>
            <img src={backArrow} alt="" className="profileBackArrow" />
            <p>{"Back"}</p>
          </div>
        </NavLink>
        <div className="profileNavOption" onClick={this.setInformation}>
          <div>
            <img
              src={profileIcon}
              alt=""
              className="profileNavIcon"
              style={{ height: "40px", width: "40px" }}
            />
            <p>Account Information</p>
          </div>
        </div>
        <div className="profileNavOption" onClick={this.setCalendar}>
          <div>
            <img
              src={calendarIconPNG}
              alt=""
              className="profileNavIcon"
              style={{ height: "30px", width: "30px", marginTop: "5px" }}
            />
            <p>Calendars</p>
          </div>
        </div>
        <div className="profileNavOption" onClick={this.setTeam}>
          <div>
            <img
              src={teamIcon}
              alt=""
              className="profileNavIcon"
              style={{ height: "40px", width: "40px" }}
            />
            <p>Team Schedules</p>
          </div>
        </div>
        {/* <div className="profileNavOption" onClick={this.setContact}>
          <div>
            <img
              src={contactsIcon}
              alt=""
              className="profileNavIcon"
              style={{ height: "30px", width: "30px", marginTop: "5px" }}
            />
            <p>Contacts</p>
          </div>
        </div> */}
        <div id="logoutDiv" onClick={this.logOut}>
          Logout
        </div>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default ProfileNav;
