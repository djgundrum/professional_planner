import React, { Component } from "react";
import "./employeeListItem.css";

class EmployeeListItem extends Component {
  state = {
    employee: {
      id: this.props.employee.id,
      name: this.props.employee.name,
      calendar_name: this.props.employee.calendar_name,
    },
  };
  render() {
    return (
      <>
        <div key={"div" + this.state.employee.id}>
          <p key={"name" + this.state.employee.id} className="employeeNames">
            {this.state.employee.name}
          </p>
        </div>
        <div className="employeeBlock">
          <div className="employeeBlockColor"></div>
          <p className="employeeBlockName">
            {this.state.employee.calendar_name}
          </p>
        </div>
      </>
    );
  }
}

export default EmployeeListItem;
