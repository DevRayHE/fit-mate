const router = require("express").Router();
const { Exercise, ExerciseRecord } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all the exercise record
router.get("/", withAuth, (req, res) => {
	ExerciseRecord.findAll().then((exerciseRecordData) => {
		if (exerciseRecordData) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	});
});

// Get the exercise with the ID as req.params.id to fetch the specific record data
router.get("/:id", withAuth, (req, res) => {
	ExerciseRecord.update(req.body, {
		where: { id: req.params.id },
	}).then((affectedRows) => {
		if (affectedRows > 0) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	});
});

// find the matching exercise record and return the Met value
router.get("/MET/:name/:type", withAuth, async (req, res) => {
	// console.log(req.params.name, req.params.type)

	try {
		const matchedExercise = await Exercise.findOne({
			where: { name: req.params.name, type: req.params.type },
		});

		// console.log(matchedExercise);
		const exerciseRecord = matchedExercise.get({ plain: true });
		// console.log(exerciseRecord);

		if (exerciseRecord) {
			res.status(200).json({
				MET: exerciseRecord.MET,
				ID: exerciseRecord.exercise_id,
			});
		}
	} catch (err) {
		console.log(err);
		res.redirect("exerciseNewForm");
	}
});

// Display the form to input a new exercise record
router.get("/new", withAuth, async (req, res) => {
	res.render("exerciseNewForm");
});

// New exercise route with POST
router.post("/new", withAuth, (req, res) => {
	const body = req.body;
	ExerciseRecord.create({
		...body,
		user_id: req.session.user_id,
	})
		.then((newRecord) => {
			res.json(newRecord);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Update exercise route with PUT and ID as req.params.id to update the specific record
router.put("/:id", withAuth, (req, res) => {
	ExerciseRecord.update(req.body, {
		where: { id: req.params.id },
	}).then((affectedRows) => {
		if (affectedRows > 0) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	});
});

// New exercise route with POST
router.post("/", withAuth, (req, res) => {
	const body = req.body;
	ExerciseRecord.create({
		...body,
		user_id: req.session.user_id,
	})
		.then((newRecord) => {
			res.json(newRecord);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Update exercise route with PUT and ID as req.params.id to update the specific record
router.put("/:id", withAuth, (req, res) => {
	ExerciseRecord.update(req.body, {
		where: { id: req.params.id },
	}).then((affectedRows) => {
		if (affectedRows > 0) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	});
});

module.exports = router;

// Feature to be implemented
// router.delete("/:id", withAuth, (req, res) => {
// 	ExerciseRecord.destroy({
// 		where: { id: req.params.id },
// 	}).then((affectedRows) => {
// 		if (affectedRows > 0) {
// 			res.status(200).end();
// 		} else {
// 			res.status(404).end();
// 		}
// 	});
// });
