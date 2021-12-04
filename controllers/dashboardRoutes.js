const router = require("express").Router();
const { Exercise, ExerciseRecord, User } = require("../models");
const withAuth = require("../utils/auth");

// Render the main dashboard for the req.loggedin user
router.get("/", withAuth, async (req, res) => {
	try {
		const user_id = req.session.user_id;
		// const user_id=3;
		console.log("dashboard homeroute user_id: " + user_id);

		const userData = await User.findOne({
			where: { user_id: user_id },
		});

		console.log("dashboard homeroute user Data: " + userData);

		const exerciseRecordData = await ExerciseRecord.findAll({
			where: { user_id: user_id },
		});

		//seralize data
		const userRecord = userData.get({ plain: true });
		// console.log(exerciseRecordData);
		const exerciseRecord = exerciseRecordData.map((record) =>
			record.get({ plan: true })
		);
		// console.log(exerciseRecord);

		const loginStatus = req.session.logged_in;
		console.log("dashboard homeroute login status: " + loginStatus);

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

// Render the main dashboard with user id
// router.get("/:id", withAuth, async (req, res) => {

// 	// Only run when req.params.id is provided.
// 	if (req.params.id) {
// 		try {
// 			const user_id = req.params.id;
// 			console.log("dashboard homeroute user_id: " + user_id);

// 			const userData = await User.findOne({
// 				where: { user_id: user_id },
// 			});

// 			const exerciseRecordData = await ExerciseRecord.findAll({
// 				where: { user_id: req.session.user_id },
// 			});

// 			//seralize data
// 			const userRecord = userData.get({ plain: true });
// 			// console.log(exerciseRecordData);
// 			const exerciseRecord = exerciseRecordData.map((record) =>
// 				record.get({ plan: true })
// 			);
// 			// console.log(exerciseRecord);

// 			res.render("dashboard", {
// 				logged_in: req.session.logged_in,
// 				...userRecord,
// 				exerciseRecord,
// 			});
// 		} catch (err) {
// 			console.log(err);
// 			// Redirect to login page if any error
// 			res.redirect("login");
// 		}
// 	}
// });

// ?? Use this route to create new record or FE logic eventlistener on the + button on dashboard to render the new exercise record form ??
// router.get("/new", withAuth, (req, res) => {
// 	res.render("newrecord", {
// 		loggedIn: req.session.logged_in,
// 	});
// });

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
