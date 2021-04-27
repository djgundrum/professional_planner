import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/global/protected/protected";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Test from "./components/test/test";
import Profile from "./components/profile/Profile";
import Forgot_Password from "./components/forgot_password/forgot_password";

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact={true} path="/" component={Home} />
        <ProtectedRoute exact={true} path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={Test} />
        <ProtectedRoute exact={true} path="/profile" component={Profile} />
        <Route
          exact
          path="/forgot_password/:hash"
          component={Forgot_Password}
        />
      </Switch>
    </Router>
  );
}

export default App;
