import React, { Component } from "react";
import "./employeeListItem.css";
import editIcon from "../../../../images/editIcon.svg";

class EmployeeListItem extends Component {
  state = {};
  render() {
    return (
      <>
        <div key={"div" + this.props.employee.id}>
          <p key={"name" + this.props.employee.id} className="employeeNames">
            {this.props.employee.name}
          </p>
        </div>
        <div className="employeeBlock">
          <div
            className="employeeBlockColor"
            style={{ backgroundColor: this.props.employee.description }}
          ></div>
          <p className="employeeBlockName">
            {this.props.employee.calendar_name}
          </p>
          <img
            src={editIcon}
            alt=""
            id="editEmployeeIcon"
            onClick={() => {
              this.props.toggleAddEmployeeScreen(true, this.props.employee);
            }}
          />
        </div>
      </>
    );
  }
}

export default EmployeeListItem;
