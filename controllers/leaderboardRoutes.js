const router = require("express").Router();
const { Exercise, ExerciseRecord, User } = require("../models");
const withAuth = require("../utils/auth");
const sequelize = require("sequelize");

// Get route to update leader board with Top 5 or 10 users
router.get("/", withAuth, (req, res) => {
  User.findAll({
    group: "user_id",
    attributes: [
      "first_name",
      "last_name", 
       //[sequelize.fn("SUM", sequelize.col("calories_burnt")), "calories"],
      "total_calories_burnt"     
    ],
    order: [[("total_calories_burnt"), "DESC"]]
  })
    .then((sortbycaloriesburnt) => {
      const rank = sortbycaloriesburnt.map((eachUser) =>
      eachUser.get({ plain: true })
      );
      console.log(rank);
      res.render("leaderboard", {
        // layout: "dashboard",
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
