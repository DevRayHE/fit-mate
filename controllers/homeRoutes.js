const router = require('express').Router();
const { Exercise, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  Exercise.findAll({
    include: [User],
  }).then((exerciseData) => {
    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true }));
    res.render("homepage", { exercises });
  }).catch((err)=>{
    res.status(500).json(err);
  })
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});


module.exports = router;
