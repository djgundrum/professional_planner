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
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/profile" component={Profile}></Route>
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
