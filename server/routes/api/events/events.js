const express = require("express");
const router = express.Router();

let guest_router = require("./guests/guests");
router.use("/guests", guest_router);

const query = require("../../global/query");
const response = require("../../global/response");

/**
 * post: /api/events/delete
 *
 * Delete an existing event form the database
 *
 * @param event_id distinct id of the event to be deleted
 */
router.post("/delete", (req, res) => {
	try {
		let db = new query();

		let event_id = req.body.event_id;

		if (isEmpty(event_id)) {
			return res.send(
				new response(
					"The provided event_id was not provided correctly",
					false,
					`event_id: ${event_id}`
				).body
			);
		} else {
			let sql = "delete from events where id = ?";
			let p = [event_id];

			db.query(sql, p, true)
				.then(() => {
					return db.end();
				})
				.then(
					() => {
						return res.send(
							new response("The event was successfully deleted").body
						);
					},
					(err) => {
						return res.send(
							new resonse(
								"There was an error deleting the event.",
								false,
								err.message
							).body
						);
					}
				);
		}
	} catch (err) {
		return res.send(
			new response("There was an error deleting the event.", false, err.message)
				.body
		);
	}
});

/**
 * post: /api/events/create
 *
 * Create a new event in the database
 *
 * @param name (string) name of the event
 * @param capacity (int) Capacity of people that are allowed at the event (can also be the amount of people on a shift)
 * @param duration (int) The amount of time in minutes that the meeting will be
 * @param schedule_id (int) The id of the schedule that this event will be a part of
 * @param type (int) The id of what type of event this is (event_type table)
 *
 * @param description (string) OPTIONAL The description of the current
 * @param time (datetime) OPTIONAL The starting time of the event
 */
router.post("/create", (req, res) => {
	try {
		let db = new query();

		let name = req.body.name;
		let description = req.body.description;
		let capacity = req.body.capacity;
		let duration = req.body.duration;
		let schedule_id = req.body.schedule_id;
		let time = req.body.time;
		let type = req.body.type;

		if (
			isEmpty(name) ||
			isEmpty(capacity) ||
			isEmpty(duration) ||
			isEmpty(schedule_id) ||
			isEmpty(type)
		) {
			return res.send(
				new response(
					"Some of the required fields were not provided correctly",
					false,
					`name: ${name} capacity: ${capacity} duration: ${duration} schedule_id: ${schedule_id}`
				).body
			);
		} else {
			let sql =
				"insert into events (name, description, type, time, schedule_id, duration, capacity) values (?, ?, ?, ?, ?, ?, ?)";
			let p = [name, description, type, time, schedule_id, duration, capacity];

			db.query(sql, p, true)
				.then(() => {
					return db.end();
				})
				.then(
					() => {
						return res.send(
							new response("The event was successfully created").body
						);
					},
					(err) => {
						return res.send(
							new response(
								"There was an error creating the new event",
								false,
								err.message
							).body
						);
					}
				);
		}
	} catch (err) {
		return res.send(
			new response(
				"There was an error creating the new event",
				false,
				err.message
			).body
		);
	}
});

/**
 * get: /api/events
 *
 * Get all the events that are in the database
 *
 * @params There are no parameters needed for this route
 */
router.get("/", (req, res) => {
	try {
		let db = new query();
		var rows;

		let sql =
			"select e.id as id, e.name as name, e.description as description, e.capacity as capacity, e.duration as duration, e.schedule_id as schedule_id, e.time as time, et.name as type, et.description as type_description from events e  inner join event_types et on e.type = et.id";
		let p = [];

		db.query(sql, p, false)
			.then((result) => {
				rows = result;
				return db.end();
			})
			.then(
				() => {
					let r = new response(
						"All events were succesfully retreived from the database"
					).body;
					r.body.events = rows;
					return res.send(r);
				},
				(err) => {
					return res.send(
						new response(
							"Error while pulling events from the database",
							false,
							err.message
						).body
					);
				}
			);
	} catch (err) {
		return res.send(
			new response(
				"Error while pulling events from the database",
				false,
				err.message
			).body
		);
	}
});

/**
 * get: /api/events/:id
 *
 * Get all the events that are in the database
 *
 * @param id The id of the specific event to pull from the database
 */
router.get("/:id", (req, res) => {
	try {
		let db = new query();
		var rows;

		let event_id = req.params.id;

		if (isEmpty(event_id)) {
			return res.send(
				new response(
					"The required event_id was not valid",
					false,
					`event_id: ${event_id}`
				).body
			);
		} else {
			let sql =
				"select e.id as id, e.name as name, e.description as description, e.capacity as capacity, e.duration as duration, e.schedule_id as schedule_id, e.time as time, et.name as type, et.description as type_description from events e  inner join event_types et on e.type = et.id where e.id = ?";
			let p = [event_id];

			db.query(sql, p, false)
				.then((results) => {
					rows = results;
					return db.end();
				})
				.then(
					() => {
						let r = new response(
							"Event was succesfully retreived from the database"
						).body;
						r.body.events = rows;
						return res.send(r);
					},
					(err) => {
						return res.send(
							"There was an error retriving the event from the database",
							false,
							err.message
						).body;
					}
				);
		}
	} catch (err) {
		return res.send(
			"There was an error retriving the event from the database",
			false,
			err.message
		).body;
	}
});

/**
 * get: /api/events/user/:id
 *
 * Get all the events that this user is a part of
 *
 * @param id The id of the specific user
 */
router.get("/user/:id", (req, res) => {
	try {
		let db = new query();
		var rows;

		let id = req.params.id;

		if (isEmpty(id)) {
			return res.send(
				new response(`The user id provided was not valid`, false, `id: ${id}`)
					.body
			);
		} else {
			let sql =
				"select e.id as id, e.name as name, e.description as description, e.capacity as capacity, e.duration as duration, e.schedule_id as schedule_id, e.time as time, et.name as type, et.description as type_description from events e inner join event_types et on e.type = et.id inner join guests g on g.event_id = e.id where g.user_id = ?;";
			let p = [id];

			db.query(sql, p, false)
				.then((results) => {
					rows = results;
					return db.end();
				})
				.then(
					() => {
						let r = new response(
							`All events were succesfully retreived for user: ${id}`
						).body;
						r.body.events = rows;
						return res.send(r);
					},
					(err) => {
						return res.send(
							new response(
								`There was an error getting the events for user: ${id}`,
								false,
								err.message
							).body
						);
					}
				);
		}
	} catch (err) {
		return res.send(
			new response(
				"There was an error getting the schedule",
				false,
				err.message
			).body
		);
	}
});

/**
 * get: /api/events/schedule/:id
 *
 * Get all the events that this schedule has in it
 *
 * @param id The id of the specific schedule
 */
router.get("/schedule/:id", (req, res) => {
	try {
		let db = new query();
		var rows;

		let id = req.params.id;

		if (isEmpty(id)) {
			return res.send(
				new response(
					`The schedule id provided was not valid`,
					false,
					`id: ${id}`
				).body
			);
		} else {
			let sql =
				"select e.id as id, e.name as name, e.description as description, e.capacity as capacity, e.duration as duration, e.schedule_id as schedule_id, e.time as time, et.name as type, et.description as type_description from events e inner join event_types et on e.type = et.id where e.schedule_id = ?";
			let p = [id];

			db.query(sql, p, false)
				.then((results) => {
					rows = results;
					return db.end();
				})
				.then(
					() => {
						/* 						let data = [];

						for (let row of rows) {
							data.push({
								id: row.id,
								name: row.name,
								description: row.description,
								capacity: row.capacity,
								duration: row.duration,
								schedule_id: row.schedule_id,
								time: row.time,
								type: row.type,
								type_description: row.type_description,
							});
						}
 */
						let r = new response(
							`All events were succesfully retreived for schedule: ${id}`
						).body;
						r.body.events = rows;
						return res.send(r);
					},
					(err) => {
						return res.send(
							new response(
								`There was an error getting the events for schedule_id: ${id}`,
								false,
								err.message
							).body
						);
					}
				);
		}
	} catch (err) {
		return res.send(
			new response(
				"There was an error getting the schedule",
				false,
				err.message
			).body
		);
	}
});

function isEmpty(str) {
	return str === "" || str === undefined || str === null;
}

module.exports = router;
