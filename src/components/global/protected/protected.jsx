import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

//import environment from "../../../environment/environment";
import axios from "axios";

class ProtectedRoute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      isLoggedIn: false,
    };

    this.axios_call = this.axios_call.bind(this);

    this.axios_call();
  }

  axios_call() {
    let url = "/api/user/account";
    axios.get(url).then(
      (result) => {
        //console.log("The api call is being called at least");
        //console.log(result);
        //console.log(this.props);
        if (result.data.valid) {
          this.setState(() => ({ isLoading: false, isLoggedIn: true }));
        } else {
          this.setState(() => ({ isLoading: false, isLoggedIn: false }));
        }
      },
      (err) => {
        this.setState(() => ({ isLoading: false, isLoggedIn: false }));
      }
    );
  }

  render() {
    return this.state.isLoading ? null : this.state.isLoggedIn ? (
      <Route
        path={this.props.path}
        component={this.props.component}
        exact={this.props.exact}
      />
    ) : (
      <Redirect
        to={{ pathname: "/login", state: { from: this.props.location } }}
      />
    );
  }
}

export default ProtectedRoute;
