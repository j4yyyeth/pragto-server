var express = require('express');
var router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated');

const Task = require('../models/Task');
const User = require('../models/User');

router.get('/', (req, res, next) => {
  Task.find()
  .sort({createdAt: -1})
  .then(response => res.json(response))
  .catch(err => res.json(err));   
});

//

router.post('/create/:userId', (req, res, next) => {

  let newTask = {
    task: req.body.task,
    reward: req.body.reward
  }

  Task.create(newTask)
  .then((createdTask) => {
    return User.findByIdAndUpdate(
      req.params.userId,
      { $push: { tasks: createdTask._id } },
      { new: true }
    )
  })
  .then((updatedUser) => {
    return updatedUser.populate('tasks');
  })
  .then((finalUser) => {
    res.json(finalUser);
  })  
  .catch((err) => {
    console.log(err);
  })
});

//

router.get('/delete/:id', isAuthenticated, (req, res, next) => {
  console.log("this is the user", req.user)
    Task.findByIdAndRemove(req.params.id)
      .then(() => {
        return User.findByIdAndUpdate(req.user._id,{
          $pull: {
            tasks: req.params.id
          }
        })
      })
      .then((updatedUser) => {
        return updatedUser.populate('tasks')
      })
      .then((populated) => {
        return populated.populate('leisures')
      })
      .then((finalUser) => {
        res.json(finalUser)
      })
      .catch(error => res.json(error));   
});

// 

router.put('/update/:id', (req, res, next) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedTask) => res.json(updatedTask))
      .catch(error => res.json(error));   
});

//

// router.post('/done/:id/:userId', (req, res, next) => {
//   Task.findById(req.params.id)
//     .then((foundTask) => {
//       User.findByIdAndUpdate(
//         req.params.userId,
//         { points: User.points + foundTask.reward },
//       )
//       console.log(foundTask.reward);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })

module.exports = router;