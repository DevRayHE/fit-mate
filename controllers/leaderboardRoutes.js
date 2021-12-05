const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

// Get route to update leader board with Top 5 or 10 users
router.get("/", (req, res) => {
	User.findAll({
		// Group by user id
		group: "user_id",
		// Select these three attributes only
		attributes: ["first_name", "last_name", "total_calories_burnt"],
		// Order by total calories burnt in descending order
		order: [["total_calories_burnt", "DESC"]],
	})
		.then((sortbycaloriesburnt) => {
			const rank = sortbycaloriesburnt.map((eachUser) =>
				eachUser.get({ plain: true })
			);
			console.log(rank);
			res.render("leaderboard", {
				logged_in: req.session.logged_in,
				rank,
			});
		})
		.catch((err) => {
			console.log(err);
			res.redirect("login");
		});
});

module.exports = router;
