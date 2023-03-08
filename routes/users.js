var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.get('/dashboard', (req, res, next) => {
  User.findById(req.params.userId)
  .populate('tasks')
  .populate('leisures')
      .then((foundUser) => {
        res.json( "This is the found user JSON:", foundUser)
      })
      .catch((err) => {
        console.log(err)
      })
});

module.exports = router;
