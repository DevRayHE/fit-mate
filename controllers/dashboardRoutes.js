const router = require("express").Router();
const { Exercise, ExerciseRecord, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  ExerciseRecord.findAll({
    where: { user_id: req.session.user_id },
  })
    .then((exerciseData) => {
      const exercises= exerciseData.map((exercise) => exercise.get({ plain: true }));
      res.render("dashboard", { 
        // layout: "dashboard", 
        logged_in: req.session.logged_in,
        exercises });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("login");
    });
});

router.get("/new", withAuth, (req, res) => {
  res.render("newrecord", {
    loggedIn: req.session.logged_in
  });
});


router.get("/edit/:id", withAuth, (req, res) => {
  ExerciseRecord.findByPk(req.params.id)
    .then(exerciseData => {
      if (exerciseData) {
        const exerciseRecord = exerciseData.get({ plain: true });
        
        res.render("editrecord", {
          
          exerciseRecord, logged_in: req.session.logged_in
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router