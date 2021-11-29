const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get("/", async (req, res) => {
  Post.findAll({
    include: [User],
  }).then((dbPostData) => {
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("all-posts", { posts });
  });
});

router.get("/post/:id", async (req, res) => {
  Post.findByPk(req.params.id, {
    include: [User, { model: Comment, include: [User] }],
  }).then((dbPostData) => {
    if (dbPostData) {
      const post = dbPostData.get({ plain: true });
      res.render("single-post", { post });
    } else {
      res.status(404).end();
    }
  });
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
