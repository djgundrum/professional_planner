import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/global/protected/protected";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Test from "./components/test/test";

//Do call to backend to see if user is logged in
// If logged in, take to homescreen, or else return login screen
var loggedIn = false;

/* export default function App() {
	if (loggedIn) {
		return <Home />;
	} else {
		return <Login />;
	}
} */

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/test" component={Test} />
			</Switch>
		</Router>
	);
}

export default App;
