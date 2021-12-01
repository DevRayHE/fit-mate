const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../Utils/auth");

router.post("/", (req, res) => {
	User.create({
		email: req.body.email,
		password: req.body.password,
	}).then((userData) => {
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.email = userData.email;
			req.session.logged_in = true;
			res.json(userData);
		});
	});
});

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
