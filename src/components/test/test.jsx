import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./test.module.css";

const Test = () => {
	const [routes, setRoutes] = useState([
		// These are the event routes
		<Post
			title={"Create an event: /api/events/create"}
			route={"/api/events/create"}
			data={{ name: "Justin's going away party" }}
		/>,
		<Post
			title={"Delete an event: /api/events/delete"}
			route={"/api/events/delete"}
			data={{ event_id: 2 }}
		/>,
		<Get
			title={"Get all events: /api/events"}
			route={"/api/events"}
			data={{}}
		/>,
		<Get
			title={"Get a specific event: /api/events/3"}
			route={"/api/events/3"}
			data={{}}
		/>,
		<Get
			title={"Get events for a user: /api/events/user/3"}
			route={"/api/events/user/3"}
			data={{}}
		/>,
		<Get
			title={"Get events for a schedule: /api/events/schedule/3"}
			route={"/api/events/schedule/3"}
			data={{}}
		/>,

		// These are the guest routes
		<Post
			title={"Add someone new to an event: /api/events/guests/add"}
			route={"/api/events/guests/add"}
			data={{ user_id: 3, event_id: 5 }}
		/>,
		<Post
			title={"Delete someone from the guest list: /api/events/guests/delete"}
			route={"/api/events/guests/delete"}
			data={{ user_id: 3, event_id: 5 }}
		/>,
		<Get
			title={"Get all the guests to a specific event: /api/events/guests/5"}
			route={"/api/events/guests/5"}
			data={{}}
		/>,
		<Get
			title={"Get all the guests in the database: /api/events/guests"}
			route={"/api/events/guests"}
			data={{}}
		/>,

		// These are the preference routes
		<Get
			title={"Get all the different preference types: /api/preferences"}
			route={"/api/preferences"}
			data={{}}
		/>,
		<Get
			title={
				"Get all the different types of preference categories: /api/preferences/category"
			}
			route={"/api/preferences/category"}
			data={{}}
		/>,
		<Post
			title={"Create a new preference type: /api/preferences/create"}
			route={"/api/preferences/create"}
			data={{
				name: "Dark",
				description: "User interface will be dark instead of light",
			}}
		/>,
		<Post
			title={"Delete an existing preference type: /api/preferences/delete"}
			route={"/api/preferences/delete"}
			data={{
				id: 8,
			}}
		/>,

		// These are the roles routes
		<Post
			title={"Delete an existing role: /api/roles/delete"}
			route={"/api/roles/delete"}
			data={{
				role_id: "",
			}}
		/>,
		<Post
			title={"Create a role: /api/roles/create"}
			route={"/api/roles/create"}
			data={{
				description: "Dishwashing is an artform",
			}}
		/>,
		<Get
			title={"Get all the roles in the database: /api/roles"}
			route={"/api/roles"}
			data={{}}
		/>,

		// These are the schedules routes
		<Post
			title={"Updates an existing schedule: /api/schedules/update"}
			route={"/api/schedules/update"}
			data={{
				name: "Justin",
				type: 2,
			}}
		/>,
		<Post
			title={"Creates a new schedule: /api/schedules/create"}
			route={"/api/schedules/create"}
			data={{
				name: "Justin",
				type: 2,
			}}
		/>,
		<Post
			title={
				"Deletes a specified schedule from the database: /api/schedules/delete"
			}
			route={"/api/schedules/delete"}
			data={{
				schedule_id: 2,
			}}
		/>,
		<Get
			title={"Gets all of the schedules within the database: /api/schedules"}
			route={"/api/schedules"}
			data={{}}
		/>,
		<Get
			title={"Gets a specific schedule: /api/schedules/:id"}
			route={"/api/schedules/3"}
			data={{}}
		/>,

		// All of the shift routes
		<Get
			title={"Returns list of all shifts: /api/shifts/"}
			route={"/api/shifts/"}
			data={{}}
		/>,
		<Get
			title={"Returns a specific shift: /api/shifts/:id"}
			route={"/api/shifts/4"}
			data={{}}
		/>,

		//TODO this api call needs to be fixed
		<Post
			title={"Creates a new shift: /api/shifts/create"}
			route={"/api/shifts/create"}
			data={{
				user_id: 2,
				schedule_id: 1,
			}}
		/>,
		<Post
			title={"Updates a shift in the database: /api/shifts/create"}
			route={"/api/shifts/update"}
			data={{
				user_id: 2,
				schedule_id: 1,
			}}
		/>,
		<Post
			title={"Deletes a specified shift from the database: /api/shift/delete"}
			route={"/api/shifts/update"}
			data={{
				user_id: 2,
				schedule_id: 1,
			}}
		/>,

		//User routes
		<Get
			title={
				"Will return all the information about the user including preferences: /api/user/account"
			}
			route={"/api/user/account"}
			data={{}}
		/>,
		<Post
			title={
				"Will check to see if there is a user in the database and return if they have logged in successfully: /api/user/login"
			}
			route={"/api/user/login"}
			data={{
				email: "declan.gundrum.17@gmail.com",
				password: "Redrider1",
			}}
		/>,
	]);

	return <React.Fragment>{routes}</React.Fragment>;
};

const Get = (props) => {
	const [response, setResponse] = useState("");

	useEffect(() => {
		let url = props.route;
		let data = props.data;

		axios.get(url, data).then((response) => {
			setResponse(JSON.stringify(response.data));
		});
	}, []);

	return (
		<div className={styles.holder}>
			<h3>{props.title}</h3>
			<p>{response}</p>
		</div>
	);
};

const Post = (props) => {
	const [response, setResponse] = useState("");

	useEffect(() => {
		let url = props.route;
		let data = props.data;

		axios.post(url, data).then((response) => {
			setResponse(JSON.stringify(response.data));
		});
	}, []);

	return (
		<div className={styles.holder}>
			<h3>{props.title}</h3>
			<p>{response}</p>
		</div>
	);
};

export default Test;
