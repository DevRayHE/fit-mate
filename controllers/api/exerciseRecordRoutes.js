const router = require("express").Router();
const { Exercise, ExerciseRecord, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all the exercise record
router.get("/", withAuth, (req, res) => {
	ExerciseRecord.findAll()
    .then((exerciseRecordData) => {
		if (exerciseRecordData) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	});
});


// Get the exercise route with the ID as req.params.id to fetch the specific record data
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


// Decided to not use it for now
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

router.put("/:id", withAuth, (req, res) => {
   
    ExerciseRecord.update(req.body,{
            where:{id: req.params.id}
    })
    .then(
        affectedRows => {
            if(affectedRows>0){
                res.status(200).end()
            }else{
                res.status(404).end()
            }
        }
    )
  });

  router.delete("/:id", withAuth, (req, res) => {
    
    ExerciseRecord.destroy({
            where:{id: req.params.id}
    })
    .then(
        affectedRows => {
            if(affectedRows>0){
                res.status(200).end()
            }else{
                res.status(404).end()
            }
        }
    )
  });

  module.exports = router;