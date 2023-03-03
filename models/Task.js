const {Schema, model} = require('mongoose');

const taskSchema = new Schema (
    {
        task: String,
        reward: Number
    },
      
      {
        timeseries: true,
        timestamps: true
      }
)

const Task = model("Task", taskSchema);

module.exports = Task;