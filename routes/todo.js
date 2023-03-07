var express = require('express');
var router = express.Router();

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

  // testing!

  let newTask = {
    task: req.body.task,
    reward: req.body.reward
  }

  Task.create(newTask)
  .then((createdTask) => {
    User.findByIdAndUpdate(
      req.params.userId,
      { $push: { tasks: createdTask._id } },
      { new: true }
    ) 
    console.log(newTask);
  })
  .then((updatedUser) => {
    console.log(updatedUser);
  })
  .catch(err => res.json(err));
});

// 

router.put('/update/:id', (req, res, next) => {
    const { taskId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Task.findByIdAndUpdate(taskId, req.body, { new: true })
      .then((updatedTask) => res.json(updatedTask))
      .catch(error => res.json(error));   
});

// 

router.get('/delete/:id', (req, res, next) => {
    const { taskId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Task.findByIdAndRemove(taskId)
      .then(() => res.json({ message: `Task was removed successfully.` }))
      .catch(error => res.json(error));   
});

module.exports = router;