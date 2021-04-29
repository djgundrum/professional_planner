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
  updateCalendarContacts = (contactsList, isDelete, pId) => {
    let tempContacts = this.state.editCalendarContacts;
    if (isDelete) {
      for (let i = 0; i < tempContacts.length; i++) {
        if (tempContacts[i].id == pId) {
          tempContacts.splice(i, 1);
          this.setState({
            editCalendarContacts: tempContacts,
          });
          return;
        }
      }
    } else {
      for (let i = 0; i < contactsList.length; i++) {
        tempContacts.push({
          id: contactsList[i].id,
          name: contactsList[i].name,
          email: contactsList[i].email,
        });
      }
      this.setState({
        editCalendarContacts: tempContacts,
      });
    }
  };
  render() {
    return (
      <>
        <div id="profileCalendarDiv" className="profileBodies">
          {this.props.mySchedules.map((calendar) => (
            <div
              key={"profileCalendar" + calendar.id}
              className="profileCalendars"
              style={{ backgroundColor: calendar.description + "99" }}
            >
              <p className="profileCalendarNames">{calendar.name}</p>
              {this.props.user.id == calendar.creator_id ? (
                <div
                  className="profileEditCalendar"
                  onClick={() => {
                    let url = `/api/events/guests/schedule/${calendar.id}`;
                    axios.get(url).then((result) => {
                      let tempContacts = [];
                      let addGuestToContacts = (i) => {
                        if (i < result.data.body.guests.length) {
                          let url2 = `/api/user/id/${result.data.body.guests[i].user_id}`;
                          axios.get(url2).then((result2) => {
                            tempContacts.push(result2.data.body.user);
                            addGuestToContacts(i + 1);
                          });
                        } else {
                          this.toggleCreateCalendarScreen(
                            calendar.id,
                            calendar.name,
                            calendar.description,
                            tempContacts
                          );
                        }
                      };
                      addGuestToContacts(0);
                    });
                  }}
                >
                  Edit
                </div>
              ) : (
                <></>
              )}

              {this.props.user.id == calendar.creator_id ? (
                <div
                  className="profileDeleteCalendar"
                  onClick={() => {
                    this.props.askDeleteCalendar(
                      calendar.id,
                      calendar.name,
                      false
                    );
                  }}
                >
                  Delete
                </div>
              ) : (
                <div
                  className="profileDeleteCalendar"
                  onClick={() => {
                    this.props.askDeleteCalendar(
                      calendar.id,
                      calendar.name,
                      true
                    );
                  }}
                >
                  Remove
                </div>
              )}
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
          calendarContacts={this.state.editCalendarContacts}
          calendarType={1}
          loadSchedulesToState={this.props.loadSchedulesToState}
          updateSchedulesInState={this.props.updateSchedulesInState}
          isEdit={true}
          updateCalendarContacts={this.updateCalendarContacts}
          user={this.props.user}
        />
        {this.props.isDeleteCalendarScreen ? (
          <ConfirmDelete
            isRemove={this.props.isRemove}
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
