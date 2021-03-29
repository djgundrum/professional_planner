import React, { Component } from 'react';
import EmployeeListItem from './employee_list_item/EmployeeListItem'
import './employeeList.css'

class EmployeeList extends Component {
    state = {
        employees: [{
            "id": 1,
            "name": "EmployeeEmployeeEmployee1",
            "time": "CT",
            "type": 1,
            "description": "#ff5135"
        },
        {
            "id": 2,
            "name": "Employee2",
            "time": "CT",
            "type": 1,
            "description": "#00bf50"
        },
        {
            "id": 3,
            "name": "Employee3",
            "time": "CT",
            "type": 1,
            "description": "#3fa9f5"
        }],
        colors: ["#ff3200", "#ff7f0a", "#ffe174", "#4bdf00", "#009f1a", "#0acbff", "#5f71ff", "#dd5fff", "#ff7bd5", "#777777"]
    }
    render() { 
        return (
            <div className="listItemsDiv">
                {
                this.state.employees.map((employee) => (
                    <div key={employee.id}>
                        <EmployeeListItem propId = {employee.id} propName = {employee.name} propColor = {employee.description}/>
                    </div>
                ))}
            </div>
        );
    }
    
}
 
export default EmployeeList;