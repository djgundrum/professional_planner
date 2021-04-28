import "./addEmployee.css";
import xIcon from "../../images/x.svg";
import calendarIcon from "../../images/calendarIcon.svg";

import React, { Component } from "react";
import axios from "axios";

class AddEmployee extends Component {
  state = {};

  render() {
    return (
      <div
        id="addEmployeeScreen"
        style={
          this.props.isAddEmployeeScreen
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div id="addEmployeeBackground"></div>
        <div id="addEmployeeDiv">
          <img
            src={xIcon}
            alt=""
            id="xIconE"
            onClick={() => {
              this.props.toggleAddEmployeeScreen(false);
            }}
          />
          <input
            type="text"
            id="employeeNameInput"
            placeholder="Employee Name..."
            onChange={this.updateFields}
            value={
              this.props.isCreateEventEdit && this.state.editOnLoad
                ? this.props.eventInfo.name
                : this.state.name
            }
          />
          <img src={calendarIcon} alt="" id="calendarIcon" />
          <select
            id="calendarSelectE"
            value={
              this.props.isCreateEventEdit && this.state.editOnLoad
                ? this.props.eventInfo.schedule
                : this.state.calendar
            }
          >
            {this.props.mySchedules.map((schedule) => (
              <option value={schedule.id}>{schedule.name}</option>
            ))}
          </select>
          {!this.props.isEmployeeEdit ? (
            <div
              id="addEmployeeScreenButton"
              onClick={() => {
                let sel = document.getElementById("calendarSelectE");
                let text = sel.options[sel.selectedIndex].text;
                let newEmployee = {
                  name: document.getElementById("employeeNameInput").value,
                  calendar_id: sel.value,
                  calendar_name: text,
                };
                this.props.addEmployee(newEmployee);
              }}
            >
              Add Employee
            </div>
          ) : (
            <div>
              <div
                id="editEmployeeScreenButton"
                className="editEmployeeButton"
                onClick={() => {
                  let sel = document.getElementById("calendarSelectE");
                  let text = sel.options[sel.selectedIndex].text;
                  let newEmployee = {
                    id: this.props.editEmployeeID,
                    name: document.getElementById("employeeNameInput").value,
                    calendar_id: sel.value,
                    calendar_name: text,
                  };
                  this.props.editEmployee(newEmployee);
                }}
              >
                Edit
              </div>
              <div
                id="deleteEmployeeScreenButton"
                className="editEmployeeButton"
                onClick={() => {
                  this.props.deleteEmployee(this.props.editEmployeeID);
                }}
              >
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AddEmployee;
