import React, { Component } from "react";
import xIcon from "../../../images/x.svg";
import "./editHours.css";

class EditHours extends Component {
  state = {
    activeDays: [false, false, false, false, false, false, false],
  };
  toggleDay = (d) => {
    let aDays = this.state.activeDays;
    aDays[d] = !aDays[d];
    this.setState({
      activeDays: aDays,
    });
  };
  setDays = () => {
    if (
      document.getElementById("dayStartTime").value != "" &&
      document.getElementById("dayEndTime").value != "" &&
      document.getElementById("dayStartTime").value <
        document.getElementById("dayEndTime").value
    ) {
      this.props.updateHours(
        this.state.activeDays,
        document.getElementById("dayStartTime").value,
        document.getElementById("dayEndTime").value
      );
    }
  };
  render() {
    return (
      <div
        id="editHoursScreen"
        style={
          this.props.isEditHoursScreen
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div id="editHoursBackground"></div>
        <div id="editHoursDiv">
          <img
            src={xIcon}
            alt=""
            id="xIcon"
            onClick={() => {
              this.setState({
                name: "",
                color: "",
                isEditLoad: true,
              });
              this.props.toggleEditHoursScreen();
            }}
          />
          <div id="dayCirclesDiv">
            <div
              className={
                this.state.activeDays[0]
                  ? "dayCircle dayCircleOn"
                  : "dayCircle dayCircleOff"
              }
              onClick={() => {
                this.toggleDay(0);
              }}
            >
              S
            </div>
            <div
              className={
                this.state.activeDays[1]
                  ? "dayCircle dayCircleOn"
                  : "dayCircle dayCircleOff"
              }
              onClick={() => {
                this.toggleDay(1);
              }}
            >
              M
            </div>
            <div
              className={
                this.state.activeDays[2]
                  ? "dayCircle dayCircleOn"
                  : "dayCircle dayCircleOff"
              }
              onClick={() => {
                this.toggleDay(2);
              }}
            >
              T
            </div>
            <div
              className={
                this.state.activeDays[3]
                  ? "dayCircle dayCircleOn"
                  : "dayCircle dayCircleOff"
              }
              onClick={() => {
                this.toggleDay(3);
              }}
            >
              W
            </div>
            <div
              className={
                this.state.activeDays[4]
                  ? "dayCircle dayCircleOn"
                  : "dayCircle dayCircleOff"
              }
              onClick={() => {
                this.toggleDay(4);
              }}
            >
              T
            </div>
            <div
              className={
                this.state.activeDays[5]
                  ? "dayCircle dayCircleOn"
                  : "dayCircle dayCircleOff"
              }
              onClick={() => {
                this.toggleDay(5);
              }}
            >
              F
            </div>
            <div
              className={
                this.state.activeDays[6]
                  ? "dayCircle dayCircleOn"
                  : "dayCircle dayCircleOff"
              }
              onClick={() => {
                this.toggleDay(6);
              }}
            >
              S
            </div>
          </div>
          <div id="editHoursTimeDiv">
            <p>Start: </p>
            <input type="time" id="dayStartTime" />
            <p>End: </p>
            <input type="time" id="dayEndTime" />
          </div>
          <div
            id="editHoursScreenButton"
            onClick={() => {
              this.setDays();
            }}
          >
            Set
          </div>
          <div id="sundayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[0].start != ""
                ? "Sunday: " +
                  this.props.formatTime(this.props.hours[0].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[0].end)
                : ""}
            </p>
          </div>
          <div id="mondayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[1].start != ""
                ? "Monday: " +
                  this.props.formatTime(this.props.hours[1].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[1].end)
                : "Monday: "}
            </p>
          </div>
          <div id="tuesdayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[2].start != ""
                ? "Tuesday: " +
                  this.props.formatTime(this.props.hours[2].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[2].end)
                : "Tuesday: "}
            </p>
          </div>
          <div id="wednesdayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[3].start != ""
                ? "Wednesday: " +
                  this.props.formatTime(this.props.hours[3].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[3].end)
                : "Wednesday: "}
            </p>
          </div>
          <div id="thursdayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[4].start != ""
                ? "Thursday: " +
                  this.props.formatTime(this.props.hours[4].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[4].end)
                : "Thursday: "}
            </p>
          </div>
          <div id="fridayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[5].start != ""
                ? "Friday: " +
                  this.props.formatTime(this.props.hours[5].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[5].end)
                : "Friday: "}
            </p>
          </div>
          <div id="saturdayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[6].start != ""
                ? "Saturday: " +
                  this.props.formatTime(this.props.hours[6].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[6].end)
                : "Saturday: "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default EditHours;
