var express = require('express');
var router = express.Router();

const Task = require('../models/Task');

router.get('/', (req, res, next) => {
  Task.find()
  .then(response => res.json(response))
  .catch(err => res.json(err));   
});

//

router.post('/create', (req, res, next) => {

  let newTask = {
    task: req.body.task,
    reward: req.body.reward
  }

  Task.create(newTask)
  .then(response => res.json(response))
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