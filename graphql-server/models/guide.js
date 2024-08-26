const { model, Schema } = require("mongoose");
const AbilitySchema = require("./ability").schema;

const GuideSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        laClass: {
            type: String,
            required: true
        },
        gamemode: {
            type: String,
            required: true
        },
        abilities: {
            type: [AbilitySchema],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        upvotes: {
            type: Number,
            required: true
        },
        crit: {
            type: String,
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        domination: {
            type: String,
            required: true
        },
        swiftness: {
            type: String,
            required: true
        },
        endurance: {
            type: String,
            required: true
        },
        expertise: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = model("Guide", GuideSchema)