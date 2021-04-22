import React, { Component } from "react";
import EmployeeListItem from "./employee_list_item/EmployeeListItem";
import "./employeeList.css";

class EmployeeList extends Component {
  state = {};
  render() {
    let colors = [
      "#ff3200",
      "#ff7f0a",
      "#ffe174",
      "#4bdf00",
      "#009f1a",
      "#0acbff",
      "#5f71ff",
      "#dd5fff",
      "#ff7bd5",
      "#777777",
    ];
    return (
      <div className="listItemsDiv">
        {this.props.employees.map((employee) => (
          <div key={employee.id}>
            <EmployeeListItem
              employee={employee}
              toggleAddEmployeeScreen={this.props.toggleAddEmployeeScreen}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default EmployeeList;
