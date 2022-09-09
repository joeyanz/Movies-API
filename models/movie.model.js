const { Schema, model } = require("mongoose");
const { isURL } = require("validator");

const movieSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
        },
        averageRating: {
            type: Number,
            required: true,
            default: 0,
        },
        numberOfReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        genre: {
            type: String,
            required: true,
            trim: true,
        },
        starring: {
            type: String,
            required: true,
            trim: true,
        },
        director: {
            type: String,
            required: true,
            trim: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        studio: {
            type: String,
            required: true,
        },
        trailer: {
            type: String,
            required: true,
            validate: [isURL, "invalid URL"],
        },
        poster: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

movieSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "movie",
    justOne: false,
});

module.exports = model("Movie", movieSchema);
