const express = require("express");
const router = express.Router();

const query = require("../../global/query");
const response = require("../../global/response");

/**
 * post /api/roles/delete
 *
 * Will delte a specified role from the database
 *
 * @param role_id (int) id of the role that is to be deleted
 */
router.post("/delete", (req, res) => {
	try {
		let db = new query();
		let role_id = req.body.role_id;

		if (isEmpty(role_id)) {
			let r = new response(
				"The role was not specified correctly",
				false,
				`role_id: ${role_id}`
			);
			return res.send(r.body);
		} else {
			let sql = "delete from user_roles where id = ?";
			let p = [role_id];

			db.query(sql, p, true)
				.then(() => {
					db.end();
				})
				.then(
					() => {
						return res.send(
							new response("The role was successfully deleted").body
						);
					},
					(err) => {
						return res.send(
							new response(
								"There was an error deleting the role.",
								false,
								err.message
							).body
						);
					}
				);
		}
	} catch (err) {
		return res.send(
			new response("There was an error deleting the user.", false, err.message)
				.body
		);
	}
});

/**
 * post: /api/roles/create
 *
 * Will create a new role that can be applied to a user
 *
 * @param name (string) The name of the role
 * @param description (string) The description of the role. NOT required
 */
router.post("/create", (req, res) => {
	try {
		let db = new query();

		let name = req.body.name;
		let description = req.body.description;

		if (isEmpty(name)) {
			return res.send(
				new response(
					"Some of the required fields were not provided correctly",
					false,
					`name: ${name}`
				).body
			);
		} else {
			let sql = "insert into user_roles (name, description) values (?, ?)";
			let p = [name, description];

			db.query(sql, p, true)
				.then(() => {
					return db.end();
				})
				.then(
					() => {
						return res.send(
							new response(`The ${name} role was successfully created`).body
						);
					},
					(err) => {
						return res.send(
							new response(
								`There was an error creating the ${name} role`,
								false,
								err.message
							).body
						);
					}
				);
		}
	} catch (err) {
		return res.send(
			new response(`There was an error creating the role`, false, err.message)
				.body
		);
	}
});

/**
 * get: /api/roles
 *
 * Will return the list of all the roles
 *
 * @params No parameters needed for this request
 */
router.get("/", (req, res) => {
	try {
		let db = new query();
		var rows;

		let sql = "select * from user_roles";
		let p = [];

		db.query(sql, p, false)
			.then((result) => {
				rows = result;
				return db.end();
			})
			.then(
				() => {
					let r = new response(
						"The roles were successfully pulled from the database"
					).body;
					r.body.roles = rows;

					return res.send(r);
				},
				(err) => {
					return res.send(
						new response(
							"There was an error getting all the roles.",
							false,
							err.message
						).body
					);
				}
			);
	} catch (err) {
		return res.send(
			new response(
				"There was an error getting all the roles.",
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
