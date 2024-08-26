const { model, Schema } = require("mongoose");

const AbilitySchema = new Schema(
    {
        abilityName: {
            type: String,
            required: true
        },
        skillLevels: {
            type: String,
            required: false
        },
        tripodRowOne: {
            type: String,
            required: false
        },
        tripodRowTwo: {
            type: String,
            required: false
        },
        tripodRowThree: {
            type: String,
            required: false
        },
    }
)

module.exports = model("Ability", AbilitySchema);