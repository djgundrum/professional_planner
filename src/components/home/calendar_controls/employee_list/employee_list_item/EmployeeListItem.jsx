import React, { Component } from 'react';
import './employeeListItem.css'

class EmployeeListItem extends Component {
    state = {
        employee: {
            id: this.props.propId,
            name: this.props.propName,
            description: this.props.propColor
        }
    }
    render() { 
        return (
            <>
                <div key={"div"+this.state.employee.id}>
                    <p key={"name"+this.state.employee.id}  className="employeeNames">
                        {this.state.employee.name}
                    </p>
                </div>
                <div className="employeeBlock">
                    <div className="employeeBlockColor"></div>
                    <p className="employeeBlockName">
                        Block Name Here
                    </p>
                </div>
            </>
        );
    }
}
 
export default EmployeeListItem;