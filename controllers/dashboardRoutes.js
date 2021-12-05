const router = require("express").Router();
const { ExerciseRecord, User } = require("../models");
const withAuth = require("../utils/auth");

// Render the main dashboard for the req.loggedin user
router.get("/", withAuth, async (req, res) => {
	try {
		const user_id = req.session.user_id;
		// console.log("dashboard homeroute user_id: " + user_id);

		const userData = await User.findOne({
			where: { user_id: user_id },
		});

		// console.log("dashboard homeroute user Data: " + userData);

		// Find all exercise record under current logged in user, sort by date in descending order
		const exerciseRecordData = await ExerciseRecord.findAll({
			where: { user_id: user_id },
			order: [["date", "DESC"]],
		});

		//seralize data
		const userRecord = userData.get({ plain: true });
		// console.log(exerciseRecordData);
		const exerciseRecord = exerciseRecordData.map((record) =>
			record.get({ plan: true })
		);

		res.render("dashboard", {
			logged_in: req.session.logged_in,
			...userRecord,
			exerciseRecord,
		});
	} catch (err) {
		console.log(err);
		// Redirect to login page if any error
		res.redirect("login");
	}
});

// Route to display edit profile form
router.get("/edit", withAuth, (req, res) => {
	const user_id = req.session.user_id;

	User.findByPk(user_id)
		.then((userData) => {
			if (userData) {
				const userRecord = userData.get({ plain: true });

				res.render("editProfile", {
					...userRecord,
					logged_in: req.session.logged_in,
				});
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
