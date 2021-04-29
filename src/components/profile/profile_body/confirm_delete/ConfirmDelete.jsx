import React, { Component } from "react";
import "../confirm_delete/confirmDelete.css";

class ConfirmDelete extends Component {
  state = {};
  render() {
    return (
      <>
        <div id="confirmDeleteBackground"></div>
        <div id="confirmDeleteDiv">
          <div id="deleteQuestionDiv">
            {this.props.isRemove ? <p>Remove &nbsp;</p> : <p>Delete &nbsp;</p>}

            <p
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {this.props.calendarToDelete[1]}
            </p>
            <p>?</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              id="confirmDeleteCalendarButton"
              onClick={() => {
                this.props.toggleDeleteCalendar(
                  this.props.calendarToDelete[0],
                  this.props.isRemove
                );
              }}
            >
              {this.props.isRemove ? "Remove" : "Delete"}
            </div>
            <div
              id="cancelDeleteCalendarButton"
              onClick={() => {
                this.props.toggleDeleteCalendar();
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ConfirmDelete;
