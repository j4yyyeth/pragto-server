var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.get('/dashboard/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .populate('tasks')
  .populate('leisures')
      .then((foundUser) => {
        res.json(foundUser)
      })
      .catch((err) => {
        console.log(err)
      })
});

router.get('/shop/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .populate('leisures')
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        console.log(err)
      })
})

router.post('/shop/create', (req, res, next) => {
  let newLeisure = {
    leisure: req.body.leisure,
    cost: req.body.cost
  }

  // maybe conditional here to make sure user has enough points
  Leisure.create(newLeisure)
  .then(response => res.json(response))
  .catch(err => res.json(err)); 
})

module.exports = router;
