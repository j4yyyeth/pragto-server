const {Schema, model} = require('mongoose');

const leisureSchema = new Schema (
    {
        leisure: String,
        cost: Number,
        added: {type: Boolean, default: false}
    },
      
      {
        timeseries: true,
        timestamps: true
      }
    )

const Leisure = model("Leisure", leisureSchema);

module.exports = Leisure;