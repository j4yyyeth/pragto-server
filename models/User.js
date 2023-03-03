const {Schema, model} = require('mongoose');

const userSchema = new Schema (
    {
        email: {
        type: String,
        required: true,
        unique: true
        },
        password: {
          type: String,
          required: true,
        },
        
        points: Number,

        tasks: [{type: Schema.Types.ObjectId, ref: "Task"}]
    },
      
      {
        timeseries: true,
        timestamps: true,
      }
)

const User = model("User", userSchema);

module.exports = User;