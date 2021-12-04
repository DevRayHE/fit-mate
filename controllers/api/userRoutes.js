const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to get a user data with ID

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
router.put("/:id", (req, res) => {
	User.update({

		first_name: req.body.firstName,
		last_name: req.body.lastName,
		email: req.body.email,
		age: req.body.age,
		weight: req.body.weight

	}).then((userData) => {
		req.session.save(() => {
			req.session.user_id = userData.user_id;
			req.session.email = userData.email;
			req.session.logged_in = true;
      
			res.json(userData);
		});
	});
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


// Route to update user's password??

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
		if (!validPassword) {
			res.status(400).json({
				message: "Incorrect Password",
			});
			return;
		}
		req.session.save(() => {
			req.session.user_id = userData.id;
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

// Route to delete a user profile
router.delete("/user/:id", (req, res) => {
	User.destroy({
		where: { id: req.params.id },
	}).then((userData) => {
		if (!userData) {
			res.status(404).json({ message: "No user found" });
			return;
		}
		res.json(userData);
	});
});

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

router.delete("/user/:id", (req, res) => {
	User.destroy({
		where: { id: req.params.id },
	}).then((userData) => {
		if (!userData) {
			res.status(404).json({ message: "No user found" });
			return;
		}
		res.json(userData);
	});
});

module.exports = router;