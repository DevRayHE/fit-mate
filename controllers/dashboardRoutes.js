const router = require("express").Router();
const { Exercise, ExerciseRecord, User } = require("../models");
const withAuth = require("../utils/auth");

// Render the main dashboard for the req.loggedin user
router.get("/:id", withAuth, (req, res) => {
	User.findAll({
		where: { user_id: req.session.user_id },
	})
		.then((userData) => {
      const userRecord = userData.get({ plain: true });
	
			res.render(`dashboard/${user_id}`, {
				// layout: "dashboard",
				logged_in: req.session.logged_in,
				userRecord,
			});
		})
		.catch((err) => {
			console.log(err);
			res.redirect("login");
		});
});

// ?? Use this route to create new record or FE logic eventlistener on the + button on dashboard to render the new exercise record form ??
// router.get("/new", withAuth, (req, res) => {
// 	res.render("newrecord", {
// 		loggedIn: req.session.logged_in,
// 	});
// });

// Route to display edit profile with ID as paramater
router.put("/edit/:id", withAuth, (req, res) => {
	User.findByPk(req.params.id)
		.then((userData) => {
			if (userData) {
				const userRecord = userData.get({ plain: true });
				const editProfile = true;

				res.render("userinfoForm", {
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
