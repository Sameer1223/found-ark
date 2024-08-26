const { model, Schema } = require("mongoose");

const classSchema = new Schema(
  {
    className: {
        type: String,
        required: true,
    },
    abilities: {
        type: [String],
        required: true,
    },
  }
)

module.exports = model("Class", classSchema)