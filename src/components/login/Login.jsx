import React, { Component } from "react";
import "./login.css";
import axios from "axios";
import Loading from "../global/loading/loading";
import Error from "../global/error/error";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    isSignin: true,
    signinEmail: "",
    signinPassword: "",
    signupEmail: "",
    signupPassword: "",
    signupConfirmPassword: "",
    error: {
      error: false,
      message: "",
    },
    loading: false,
    isLoggedIn: false,
  };
  forgot_password = () => {
    let email = this.state.signinEmail;

    if (email === "") {
      this.setState({
        error: {
          error: true,
          message: "Please enter your email address into the input.",
        },
      });
    }

    let url = "/api/user/forgot_password";
    let data = { email: email };

    axios.post(url, data).then((result) => {
      if (!result.data.valid) {
        this.setState({
          error: { error: true, message: result.data.body.message },
        });
      } else {
      }
    });
  };
  signIn = () => {
    let url = "/api/user/login";
    let data = {
      email: this.state.signinEmail,
      password: this.state.signinPassword,
    };
    axios.post(url, data).then((result) => {
      if (result.data.valid) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({
          error: {
            error: true,
            message: result.data.body.message,
          },
        });
      }
    });
  };
  signup = () => {
    if (this.state.signupPassword != this.state.signupConfirmPassword) {
      this.setState({
        error: {
          error: true,
          message: "Passwords do not match",
        },
      });
    } else if (
      this.state.signupEmail.match(/^w+([.-]?w+)@w+([.-]?w+)(.w{2,3})+$/) &&
      this.state.signupPassword.match(/^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/)
    ) {
      this.setState({
        error: {
          error: true,
          message:
            "Invalid password. Password must be between 6-20 characters and contain at least one uppercase, one lowercase, and one number",
        },
      });
    }
    let url = "/api/user/create_user";
    let data = {
      name: "",
      email: this.state.signupEmail,
      password: this.state.signupPassword,
      role: 0,
    };
    axios.post(url, data).then((result) => {
      console.log(result);
      if (result.data.valid) {
        this.setState({
          signinEmail: data.email,
          signinPassword: data.password,
        });
        this.signIn();
      } else {
        this.setState({
          error: {
            error: true,
            message: result.data.body.message,
          },
        });
      }
    });
  };
  render() {
    return this.state.isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <div id="loginScreen">
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
        <div id="signInBackgroundBubble1"></div>
        <div id="signInBackgroundBubble2"></div>
        <div id="signInBackgroundBubble3"></div>
        <div id="signInBackgroundBubble4"></div>
        <div id="signInShadow1"></div>
        <div id="signInShadow2"></div>
        <div id="signInDiv1">
          <p id="welcomeTitle">Welcome to the Perfect Professional Planner</p>
          <p id="welcomeText">
            Create calendars, share them with others, and generate team
            schedules that seamlessly fit around your employees' busy lives.
            Perfect for business and personal use to maximize efficiency and
            free time.
          </p>
        </div>
        <div id="signInDiv2">
          <div id="signInDiv21">
            <p className="signInTitle">Login</p>
            <p className="signInText">Email</p>
            <input
              type="text"
              className="signInInput"
              onChange={(e) => {
                this.setState({ signinEmail: e.target.value });
              }}
            />
            <p className="signInText">Password</p>
            <input
              type="text"
              type="password"
              className="signInInput"
              onChange={(e) => {
                this.setState({ signinPassword: e.target.value });
              }}
            />

            <div className="signInButton hoverClass" onClick={this.signIn}>
              <p>Sign In</p>
            </div>
            <div className="signUpDiv">
              <p id="signUpText1">Don't have an account?</p>
              <p
                id="signUpText2"
                className="hoverClass"
                onClick={this.switchLogin}
              >
                Sign Up
              </p>
            </div>
            <div className="signUpDiv">
              <p id="forgotPassword" onClick={this.forgot_password}>
                Forgot Your Password?
              </p>
            </div>
          </div>
          <div id="signUpDiv1">
            <p className="signUpTitle">Sign Up</p>
            <p className="signInText">Email</p>
            <input
              type="text"
              className="signInInput"
              onChange={(e) => {
                this.setState({ signupEmail: e.target.value });
              }}
            />
            <p className="signInText">Password</p>
            <input
              type="text"
              type="password"
              className="signInInput"
              onChange={(e) => {
                this.setState({ signupPassword: e.target.value });
              }}
            />
            <p className="signInText">Confirm Password</p>
            <input
              type="text"
              type="password"
              className="signInInput"
              onChange={(e) => {
                this.setState({ signupConfirmPassword: e.target.value });
              }}
            />

            <div className="signInButton hoverClass" onClick={this.signup}>
              <p>Sign Up</p>
            </div>

            <div className="signUpDiv">
              <p
                id="signUpText3"
                className="hoverClass"
                onClick={this.switchLogin}
              >
                Back To Login
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  switchLogin = () => {
    if (this.state.isSignin) {
      document.getElementById("signInDiv21").classList.remove("signInIn");
      document.getElementById("signUpDiv1").classList.remove("signUpOut");
      document.getElementById("signInDiv21").classList.add("signInOut");
      document.getElementById("signUpDiv1").classList.add("signUpIn");
      this.setState({ isSignin: false });
    } else {
      document.getElementById("signInDiv21").classList.remove("signInOut");
      document.getElementById("signUpDiv1").classList.remove("signUpIn");
      document.getElementById("signInDiv21").classList.add("signInIn");
      document.getElementById("signUpDiv1").classList.add("signUpOut");
      this.setState({ isSignin: true });
    }
  };
}

export default Login;
