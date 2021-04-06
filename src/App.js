import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/global/protected/protected";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Test from "./components/test/test";
import Profile from "./components/profile"

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/test" component={Test} />
				<Route exact path="profile" component={Profile}></Route>
			</Switch>
		</Router>
	);
}

export default App;
