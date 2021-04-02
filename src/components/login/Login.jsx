import React, { Component } from 'react';
import './login.css'

class Login extends Component {
    state = {
        isSignin: true
    }
    render() { 
        return ( 
            <div id="loginScreen">
                <div id="signInBackgroundBubble1"></div>
                <div id="signInBackgroundBubble2"></div>
                <div id="signInBackgroundBubble3"></div>
                <div id="signInBackgroundBubble4"></div>
                <div id="signInShadow1">
        
                </div>
                <div id="signInShadow2">
        
                </div>
                <div id="signInDiv1">
                <p id="welcomeTitle">Welcome to the Perfect Professional Planner</p>
                <p id="welcomeText">
                    Create calendars, share them with others, and generate team schedules 
                    that seamlessly fit around your employees' busy lives. Perfect for business 
                    and personal use to maximize efficiency and free time.
                </p>
                </div>
                <div id="signInDiv2">
                    <div id="signInDiv21">
                        <p className="signInTitle">Login</p>
                        <p className="signInText">Email</p>
                        <input type="text" className="signInInput"/>
                        <p className="signInText">Password</p>
                        <input type="text" className="signInInput"/>

                        <div className="signInButton hoverClass">
                            <p>Sign In</p>
                        </div>
                        <div className="signUpDiv">
                            <p id="signUpText1">Don't have an account?</p>
                            <p id="signUpText2" className="hoverClass" onClick={this.switchLogin}>Sign Up</p>
                        </div>
                    </div>
                    <div id="signUpDiv1">
                        <p className="signUpTitle">Sign Up</p>
                        <p className="signInText">Email</p>
                        <input type="text" className="signInInput"/>
                        <p className="signInText">Password</p>
                        <input type="text" className="signInInput"/>
                        <p className="signInText">Confirm Password</p>
                        <input type="text" className="signInInput"/>

                        <div className="signInButton hoverClass">
                            <p>Sign Up</p>
                        </div>
                        <div className="signUpDiv">
                            <p id="signUpText3" className="hoverClass" onClick={this.switchLogin}>Back To Login</p>
                        </div>
                    </div>
                </div>
            </div> 
          );
    }
    switchLogin = () => {
        if (this.state.isSignin) {
            document.getElementById("signInDiv21").classList.remove("signInIn")
            document.getElementById("signUpDiv1").classList.remove("signUpOut")
            document.getElementById("signInDiv21").classList.add("signInOut")
            document.getElementById("signUpDiv1").classList.add("signUpIn")
            this.setState({isSignin: false})
        }
        else {
            document.getElementById("signInDiv21").classList.remove("signInOut")
            document.getElementById("signUpDiv1").classList.remove("signUpIn")
            document.getElementById("signInDiv21").classList.add("signInIn")
            document.getElementById("signUpDiv1").classList.add("signUpOut")
            this.setState({isSignin: true})
        }
    }
}
 
export default Login;