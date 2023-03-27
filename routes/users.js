var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const Leisure = require("../models/Leisure")
const { response } = require("express");

router.get("/points", (req, res, next) => {
  User.points
    .find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/update/points/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const task = await Task.findById(req.body.taskId);

    if (task.done === false) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { points: user.points + req.body.points },
        { new: true }
      );
      await Task.findByIdAndUpdate(
        req.body.taskId,
        { done: true },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    }else{
      return res.status(400).json({msg: "You've already completed this task"})
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.put("/subtract/points/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const leisure = await Leisure.findById(req.body.leisureId);

    if (leisure.cost <= user.points) {
      if (leisure.added === false) {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { points: user.points - req.body.points },
          { new: true }
        );
        await Leisure.findByIdAndUpdate(
          req.body.leisureId,
          { added: true },
          { new: true }
        );
        return res.status(200).json(updatedUser);
      } else{
        return res.status(400).json({msg: "You've already added this leisure"})
      }
    } else {
      return res.status(400).json({msg: "Not enough points!"})
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
