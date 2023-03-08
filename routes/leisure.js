var express = require('express');
var router = express.Router();

const User = require('../models/User');
const Leisure = require('../models/Leisure');


router.get('/', (req, res, next) => {
    Leisure.find()
    .sort({createdAt: -1})
    .then(response => res.json(response))
    .catch(err => res.json(err));   
  });
  
  //
  
  router.post('/create/:userId', (req, res, next) => {
  
    let newLeisure = {
      leisure: req.body.leisure,
      cost: req.body.cost
    }
  
    Leisure.create(newLeisure)
    .then((createdLeisure) => {
      return User.findByIdAndUpdate(
        req.params.userId,
        { $push: { leisures: createdLeisure._id } },
        { new: true }
      )
    })
    .then((updatedUser) => {
      const user = User.findById(updatedUser._id)
      res.json(updatedUser);
    })  
    .catch((err) => {
      console.log(err);
    })
  });
  
  //
  
  router.put('/update/:id', (req, res, next) => {
  
    Leisure.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedLeisure) => res.json(updatedLeisure))
      .catch(error => res.json(error));   
});
  
  // 
  
  router.get('/delete/:id', (req, res, next) => {
      Leisure.findByIdAndRemove(req.params.id)
        .then((removedLeisure) => res.json({ message: `Leisure was removed successfully.`, removedLeisure }))
        .catch(error => res.json(error));   
  });



module.exports = router;