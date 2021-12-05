const router = require('express').Router();

const { Exercise, ExerciseRecord, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", (req, res) => {
    res.render("homepage", {
      layout: 'home'
    });
});

// Route to handle user Login
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Route to handle new user signup
router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signUp");
});


// Display the form to input a new exercise record
router.get("/newexerciserecord", withAuth, (req, res) => {

	console.log("new clicked!!");
	res.render("exerciseNewForm", {
    logged_in: req.session.logged_in
  });
});

module.exports = router;