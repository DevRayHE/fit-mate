const router = require("express").Router();
const { Exercise, ExerciseRecord, User } = require("../models");
const withAuth = require("../utils/auth");

// Render the main dashboard for the req.loggedin user
router.get("/", withAuth, async (req, res) => {
	try {
		const user_id = req.session.user_id;
		// const user_id=3;
		// console.log("dashboard homeroute user_id: " + user_id);

		const userData = await User.findOne({
			where: { user_id: user_id },
		});

		// console.log("dashboard homeroute user Data: " + userData);

		// Find all exercise record under current logged in user
		const exerciseRecordData = await ExerciseRecord.findAll({
			where: { user_id: user_id },
			order: [[("date"), "DESC"]]
		});

		//seralize data
		const userRecord = userData.get({ plain: true });
		// console.log(exerciseRecordData);
		const exerciseRecord = exerciseRecordData.map((record) =>
			record.get({ plan: true })
		);

		// const exerciseData = await Exercise.findOne({
		// 	where: { exercise_id: exerciseRecord.exercise_id}
		// });
	// 	const exerciseData = exerciseRecordData.exercise.map((record) =>
	// 	record.get({ plan: true })
	// );

		// console.log("exercise_id: " + exerciseRecord.exercise_id);
		// console.log("exerciseDat name and type: " + exerciseData);
		// console.log(JSON.stringify(exerciseRecord.exercise));
		// console.log(typeof(exerciseRecord));
		// console.log(exerciseData);

		// const loginStatus = req.session.logged_in;
		// console.log("dashboard homeroute login status: " + loginStatus);

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
				const editProfile = true;

				res.render("editProfile", {
					...userRecord,
					logged_in: req.session.logged_in,
					editProfile,
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
