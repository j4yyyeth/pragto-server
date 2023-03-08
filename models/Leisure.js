const {Schema, model} = require('mongoose');

const leisureSchema = new Schema (
    {
        leisure: String,
        cost: Number
    },
      
      {
        timeseries: true,
        timestamps: true
      }
    )

const Leisure = model("Leisure", leisureSchema);

module.exports = Leisure;