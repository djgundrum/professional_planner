import React, { Component } from "react";
import "./profileCalendarBody.css";
import CreateCalendar from "../../../home/create_calendar/CreateCalendar";
import ConfirmDelete from "../confirm_delete/ConfirmDelete";
import axios from "axios";

class ProfileCalendarBody extends Component {
  state = {
    isCreateCalendarScreen: false,
    editCalendarId: "",
    editCalendarName: "",
    editCalendarColor: "",
    editCalendarContacts: [],
  };
  // loadSchedulesToState = () => {
  //   let url1 = "/api/user/account";
  //   let schedules = [];
  //   let teamSchedules = [];
  //   axios.get(url1).then((result1) => {
  //     let url2 = `/api/events/guests/user/${result1.data.body.user.user.id}`;
  //     axios.get(url2).then((guestListResult) => {
  //       for (let i = 0; i < guestListResult.data.body.guests.length; i++) {
  //         let url3 = `/api/schedules/${guestListResult.data.body.guests[i].schedule_id}`;
  //         //let url3 = "/api/schedules";
  //         axios.get(url3).then((result3) => {
  //           //schedules = schedules.concat(result3.data.body.schedules);
  //           result3.data.body.schedules.type == "Calendar"
  //             ? (schedules = schedules.concat(result3.data.body.schedules))
  //             : (teamSchedules = teamSchedules.concat(
  //                 result3.data.body.schedules
  //               ));
  //           if (i == guestListResult.data.body.guests.length - 1) {
  //             this.setState({
  //               mySchedules: schedules,
  //             });
  //           }
  //         });
  //       }
  //     });
  //   });
  // };
  toggleCreateCalendarScreen = (pId, pName, pColor, pContacts) => {
    this.setState({
      isCreateCalendarScreen: !this.state.isCreateCalendarScreen,
      editCalendarId: pId,
      editCalendarName: pName,
      editCalendarColor: pColor,
      editCalendarContacts: pContacts,
    });
  };

  render() {
    return (
      <>
        <div id="profileCalendarDiv" className="profileBodies">
          <div
            className="profileCalendars"
            id="profileAddCalendar"
            onClick={() => {
              this.toggleCreateCalendarScreen();
            }}
          >
            +
          </div>
          {this.props.mySchedules.map((calendar) => (
            <div
              key={"profileCalendar" + calendar.id}
              className="profileCalendars"
              style={{ backgroundColor: calendar.description + "99" }}
            >
              <p className="profileCalendarNames">{calendar.name}</p>
              <div
                className="profileEditCalendar"
                onClick={() => {
                  this.toggleCreateCalendarScreen(
                    calendar.id,
                    calendar.name,
                    calendar.description,
                    []
                  );
                }}
              >
                Edit
              </div>
              <div
                className="profileDeleteCalendar"
                onClick={() => {
                  this.props.askDeleteCalendar(calendar.id, calendar.name);
                }}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
        <CreateCalendar
          mySchedules={this.props.mySchedules}
          timezones={this.state.timezones}
          toggleCreateCalendarScreen={this.toggleCreateCalendarScreen}
          isCreateCalendarScreen={this.state.isCreateCalendarScreen}
          calendarId={this.state.editCalendarId}
          calendarName={this.state.editCalendarName}
          calendarColor={this.state.editCalendarColor}
          calendarType={1}
          loadSchedulesToState={this.props.loadSchedulesToState}
          isEdit={true}
        />
        {this.props.isDeleteCalendarScreen ? (
          <ConfirmDelete
            calendarToDelete={this.props.calendarToDelete}
            toggleDeleteCalendar={this.props.toggleDeleteCalendar}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default ProfileCalendarBody;
