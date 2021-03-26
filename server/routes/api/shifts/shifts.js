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
	} catch (err) {
		return res.send(
			new response("Could not get all shifts", false, err.message).body
		);
	}
});

module.exports = router;
