const router = require("express").Router();
const { Exercise, ExerciseRecord, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
    const body = req.body
    ExerciseRecord.create({
        ...body,
        user_id: req.session.user_id
    })
    .then(
        newRecord => {
            res.json(newRecord)
        }
    ).catch((err)=>{
        console.log(err)
    })
  });


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