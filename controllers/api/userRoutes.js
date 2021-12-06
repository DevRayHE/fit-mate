const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to get a user data with logged in user's ID
router.get("/", withAuth, async (req, res) => {
	try {
		const user_id = req.session.user_id;

		const resData = User.findOne({
			where: { user_id: user_id },
		});

		const userData = (await resData).get({ plan: true });

		if (userData) {
			res.status(200).json({
				totalCalories: userData.total_calories_burnt,
			});
		}
	} catch (err) {
		console.log(err);
	}
});

// Create new user route
router.post("/", async (req, res) => {
	try {
		const userData = await User.create({
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			age: req.body.age,
			weight: req.body.weight,
		});

		req.session.save(() => {
			req.session.user_id = userData.user_id;
			req.session.email = userData.email;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		console.log(err);
	}
});

// Route to edit/Update a user data with ID
// Route to update user info
router.put("/", withAuth, (req, res) => {
	User.update(
		{
			...req.body,
		},
		{
			where: {
				user_id: req.session.user_id,
			},
		}
	)
		.then((userData) => {
			res.json(userData);
		})
		.catch((err) => res.json(err));
});

// Login route
router.post("/login", (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	}).then((userData) => {
		if (!userData) {
			res.status(400).json({
				message: "No user found",
			});
			return;
		}
		const validPassword = userData.checkPassword(req.body.password);
		console.log(validPassword);
		if (!validPassword) {
			res.status(400).json({
				message: "Incorrect Password",
			});
			return;
		}
		req.session.save(() => {
			req.session.user_id = userData.user_id;
			req.session.email = userData.email;
			req.session.logged_in = true;

			res.json({ user: userData, message: "You are now logged in" });
		});
	});
});

// Logout route
router.post("/logout", (req, res) => {
	console.log(req.session);
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// Feature to be implemented
// Route to delete a user profile
// router.delete("/user/:id", (req, res) => {
// 	User.destroy({
// 		where: { id: req.params.id },
// 	}).then((userData) => {
// 		if (!userData) {
// 			res.status(404).json({ message: "No user found" });
// 			return;
// 		}
// 		res.json(userData);
// 	});
// });

// Route to update user's password??

module.exports = router;
