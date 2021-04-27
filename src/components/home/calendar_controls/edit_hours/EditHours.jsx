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
    let weekDates = ["", "", "", "", ""];
    if (this.props.hoursStartDate != "") {
      for (let i = 0; i < 5; i++) {
        let d = new Date();
        //d.setDate(this.props.hoursStartDate.getDate() + i);
        d.setTime(
          this.props.hoursStartDate.getTime() + i * 24 * 60 * 60 * 1000
        );
        weekDates[i] = d.getMonth() + 1 + "/" + d.getDate();
      }
    }
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
          <div id="weekRangeDiv">
            <p>Start:</p>
            <input
              type="date"
              onChange={(e) => {
                this.props.updateHoursStartDate(e.target.valueAsDate);
              }}
            />
          </div>
          <div id="mondayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[1].start != ""
                ? "Monday" +
                  " " +
                  weekDates[0] +
                  ": " +
                  this.props.formatTime(this.props.hours[1].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[1].end)
                : "Monday" + " " + weekDates[0] + ": "}
            </p>
          </div>
          <div id="tuesdayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[2].start != ""
                ? "Tuesday" +
                  " " +
                  weekDates[1] +
                  ": " +
                  this.props.formatTime(this.props.hours[2].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[2].end)
                : "Tuesday" + " " + weekDates[1] + ": "}
            </p>
          </div>
          <div id="wednesdayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[3].start != ""
                ? "Wednesday" +
                  " " +
                  weekDates[2] +
                  ": " +
                  this.props.formatTime(this.props.hours[3].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[3].end)
                : "Wednesday" + " " + weekDates[2] + ": "}
            </p>
          </div>
          <div id="thursdayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[4].start != ""
                ? "Thursday" +
                  " " +
                  weekDates[3] +
                  ": " +
                  this.props.formatTime(this.props.hours[4].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[4].end)
                : "Thursday" + " " + weekDates[3] + ": "}
            </p>
          </div>
          <div id="fridayDiv" className="editHoursDayDiv">
            <p>
              {this.props.hours[5].start != ""
                ? "Friday" +
                  " " +
                  weekDates[4] +
                  ": " +
                  this.props.formatTime(this.props.hours[5].start) +
                  " - " +
                  this.props.formatTime(this.props.hours[5].end)
                : "Friday" + " " + weekDates[4] + ": "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default EditHours;
