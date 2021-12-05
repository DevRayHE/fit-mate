const router = require('express').Router();

const { Exercise, ExerciseRecord, User } = require('../models');
const withAuth = require('../utils/auth');

// Render home page only - old version
// router.get("/", async (req, res) => {

//   ExerciseRecord.findAll({
//     include: [{ model: User },],
//   }).then((exerciseData) => {
//     // console.log(exerciseData);
//     const exercises = exerciseData.map((exercise) => exercise.get({ plain: true }));
//     // console.log(exercises);
//     res.render("homepage", { exercises });
//     // console.log(exercises);
//   }).catch((err)=>{
//     res.status(500).json(err);
//   })
// });

router.get("/", (req, res) => {
    res.render("homepage", {
      layout: 'home'
    });
});

// Login
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// route to handle signup
router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  const signUp = true;
  res.render("signUp", { signUp });
});

// leaderboard route

// Display the form to input a new exercise record
router.get("/newexerciserecord", withAuth, (req, res) => {

	console.log("new clicked!!");
	res.render("exerciseNewForm", {
    logged_in: req.session.logged_in
  });
});

module.exports = router;




