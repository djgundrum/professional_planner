import React, { Component } from "react";
import ProfileNav from "./profile_nav/ProfileNav";
import ProfileBody from "./profile_body/ProfileBody";
import "./profile.css";
import xIcon from "../images/x.svg";
import axios from "axios";
import Loading from "../global/loading/loading";

class Profile extends Component {
  state = {
    isLoading: true,
    activeScreen: "information",
    isChangePassword: false,
    updateUser: {},
  };
  isLoadingOff = () => {
    this.setState({ isLoading: false });
  };
  updateScreen = (p) => {
    this.setState({ activeScreen: p });
  };
  toggleChangePasswordScreen = (user) => {
    this.setState({
      isChangePassword: !this.state.isChangePassword,
    });
    this.setState({
      updateUser: user,
    });
  };
  render() {
    return (
      <>
        <div id="profileScreen">
          <Loading loading={this.state.isLoading}></Loading>
          <ProfileNav
            activeScreen={this.state.activeScreen}
            updateScreen={this.updateScreen}
          ></ProfileNav>
          <ProfileBody
            activeScreen={this.state.activeScreen}
            updateScreen={this.updateScreen}
            toggleChangePasswordScreen={this.toggleChangePasswordScreen}
            isLoadingOff={this.isLoadingOff}
          ></ProfileBody>
        </div>
        <div
          id="changePassword2Screen"
          style={
            this.state.isChangePassword
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <div id="changePassword2Background"></div>
          <div id="changePassword2Div">
            <img
              src={xIcon}
              alt=""
              id="xIcon"
              onClick={() => {
                this.toggleChangePasswordScreen({});
                this.setState({
                  name: "",
                  calendar: "",
                  startDate: "",
                  startTime: "",
                  endDate: "",
                  endTime: "",
                  editOnLoad: true,
                });
              }}
            />
            <input
              type="text"
              id="p1"
              placeholder="Enter New Password..."
              className="updatePasswordInput"
            />
            <input
              type="text"
              id="p2"
              placeholder="Confirm New Password..."
              className="updatePasswordInput"
            />
            <div
              id="updatePasswordButton2"
              onClick={() => {
                let url = "/api/user/update_user";
                let data = {
                  id: this.state.updateUser.id,
                  name: this.state.updateUser.name,
                  email: this.state.updateUser.email,
                  role: this.state.updateUser.role,
                  password: document.getElementById("p2").value,
                };
                if (
                  document.getElementById("p1").value ==
                  document.getElementById("p2").value
                ) {
                  axios.post(url, data).then((result) => {
                    if (result.data.valid) {
                      this.toggleChangePasswordScreen({});
                    }
                  });
                }
              }}
            >
              Update Password
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
