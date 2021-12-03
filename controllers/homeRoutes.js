const router = require('express').Router();

const { Exercise, ExerciseRecord, User } = require('../models');
const withAuth = require('../utils/auth');

// Render home page only
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

router.get("/", async (req, res) => {
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

module.exports = router;


// Comment the below block of conflict for now.
// const { Exericse, User } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const exerciseData = await Exericse.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['first_name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const exercises = exerciseData.map((exercise) => exercise.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     // render login page for now, to be changed to 'homepage'.
//     res.render('login', { 
//       exercises, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }

// });

// route to handle signup
router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});


module.exports = router;

