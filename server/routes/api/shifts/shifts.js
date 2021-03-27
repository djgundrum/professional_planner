const express = require("express");
const router = express.Router();

const query = require("../../global/query");
const response = require("../../global/response");

/**
 * get /api/shifts/
 *
 * Returns list of all shifts
 *
 * @params None needed
 */
router.get("/", (req, res) => {
	try {
		let db = new query();
		var rows;

		let sql = "select * from shifts";
		let p = [];

		db.query(sql, p, false)
			.then((result) => {
				rows = result;
				return db.end();
			})
			.then(
				() => {
					let r = new response(
						"The shifts were successfully retrieved from the database"
					).body;
					r.body.shifts = rows;

					return res.send(r);
				},
				(err) => {
					return res.send(
						new response("Could not get all shifts", false, err.message).body
					);
				}
			);
	} catch (err) {
		return res.send(
			new response("Could not get all shifts", false, err.message).body
		);
	}
});

/**
 * get /api/shifts/:id
 *
 * Returns a specific shift
 *
 * @param id Id of the shift to return
 */
router.get("/:id", (req, res) => {
	try {
		let db = new query();
		var rows;

		let shift_id = req.params.id;

		let sql = "select * from shifts where id=?";
		let p = [shift_id];

		db.query(sql, p, false)
			.then((result) => {
				rows = result;
				return db.end();
			})
			.then(
				() => {
					let r = new response(
						"Successfully returned the shift from the database"
					).body;
					r.body.shifts = rows;
					return res.send(r);
				},
				(err) => {
					return res.send(
						new response(
							"Error pulling the specific shift from the database",
							false,
							err.message
						).body
					);
				}
			);
	} catch (err) {
		return res.send(
			new response(
				"Error pulling the specific shift from the database",
				false,
				err.message
			).body
		);
	}
});

/**
 * post: /api/shifts/create
 *
 * Creates a new shift in the database
 *
 * @param user_id (int) ID of the user the shift pertains to
 * @param schedule_id (int) ID of the schedule that has the shift
 * @param event_id (int) ID of the specific event
 */
router.post("/create", (req, res) => {
	try {
		let db = new query();

		let user_id = req.body.user_id;
		let schedule_id = req.body.schedule_id;
		let event_id = req.body.event_id;

		if (isEmpty(user_id) || isEmpty(schedule_id) || isEmpty(event_id)) {
			return res.send(
				new response(
					"Some of the required fields were not provided correctly",
					false,
					`user_id: ${user_id} schedule_id: ${schedule_id} event_id: ${event_id}`
				).body
			);
		} else {
			let sql =
				"insert into shifts (user_id, schedule_id, event_id) values (?, ?, ?)";
			let p = [user_id, schedule_id, event_id];

			db.query(sql, p, true)
				.then(() => {
					return db.end();
				})
				.then(
					() => {
						return res.send(
							new response("Shift was created successfully").body
						);
					},
					(err) => {
						return res.send(
							new response(
								"Could not create a new shift in the database",
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
				"Could not create a new shift in the database",
				false,
				err.message
			).body
		);
	}
});

/**
 * post: /api/shifts/update
 *
 * Updates a shift in the database
 *
 * @param user_id (int) ID of the user the shift pertains to
 * @param schedule_id (int) ID of the schedule that has the shift
 * @param event_id (int) ID of the specific event
 * @param start_time (datatime) Optional, start time of the shift
 * @param end_time (datatime) Optional. end time of the shift
 */
router.post("/update", (req, res) => {
	try {
		let db = new query();

		let user_id = req.body.user_id;
		let schedule_id = req.body.schedule_id;
		let event_id = req.body.event_id;
		let start_time = req.body.start_time;
		let end_time = req.body.end_time;

		if (isEmpty(user_id) || isEmpty(schedule_id) || isEmpty(event_id)) {
			// No need to check if optional fields start/end are empty
			return res.send(
				new response(
					"Some of the required fields were not provided correctly",
					false,
					`user_id: ${user_id} schedule_id: ${schedule_id} event_id: ${event_id}`
				).body
			);
		} else {
			let sql =
				"update shifts set start_time = ?, end_time = ?, user_id = ? where schedule_id = ? AND event_id = ?";
			let p = [start_time, end_time, user_id, schedule_id, event_id];

			db.query(sql, p, true)
				.then(() => {
					return db.end();
				})
				.then(
					() => {
						return res.send(
							new response("Shift was updated successfully").body
						);
					},
					(err) => {
						return res.send(
							new response(
								"Could not update the shift in the database",
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
				"Could not update the shift in the database",
				false,
				err.message
			).body
		);
	}
});

/**
 * post: /api/shift/delete
 *
 * Deletes a specified shift from the database
 *
 * To find the specific schedule, the following two paramaters must match
 * @param schedule_id (int) ID of the schedule that has the shift
 * @param event_id (int) ID of the specific event
 */
router.post("/delete", (req, res) => {
	try {
		let db = new query();

		let schedule_id = req.body.schedule_id;
		let event_id = req.body.event_id;

		if (isEmpty(schedule_id) || isEmpty(event_id)) {
			// No need to check if optional fields start/end are empty
			return res.send(
				new response(
					"Some of the required fields were not provided correctly",
					false,
					`schedule_id: ${schedule_id} event_id: ${event_id}`
				).body
			);
		} else {
			let sql = "delete from shifts where schedule_id = ? AND event_id = ?"; // Delete the shift with matching schedule and event ids
			let p = [schedule_id, event_id];

			db.query(sql, p, true)
				.then(() => {
					return db.end();
				})
				.then(
					() => {
						return res.send(
							new response(
								`Shift with event_id: ${event_id} and schedule_id: ${schedule_id} was deleted successfully`
							).body
						);
					},
					(err) => {
						return res.send(
							new response(
								"There was an error deleting the specified shift",
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
				"There was an error deleting the specified shift",
				false,
				err.message
			).body
		);
	}
});

function isEmpty(str) {
	return str === undefined || str === null || str === "";
}

module.exports = router;
