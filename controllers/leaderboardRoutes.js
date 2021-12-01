const router = require("express").Router();
const { Exercise, ExerciseRecord, User } = require("../models");
const withAuth = require("../utils/auth");


// Get route to update leader borad with Top 5 or 10 users
router.get("/", withAuth, (req, res) => {
    ExerciseRecord.findAll({
        group: 'user_id',
          attributes: [
            [sequelize.fn('SUM', sequelize.col('calories_burnt')), 'calories']
          ]
        })
    .then((exerciseData) => {
      const exercises = exerciseData.map((exercise) => exercise.get({ plain: true }));
      res.render("leaderboard", { 
        // layout: "dashboard", 
        logged_in: req.session.logged_in,
        exercises });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("login");
    });
});

module.exports = router;