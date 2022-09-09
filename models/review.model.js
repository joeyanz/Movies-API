const { Schema, model, Types } = require("mongoose");
const calculateAverageRating = require("../utils/calculate-average-rating");

const reviewSchema = new Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        movie: {
            type: Types.ObjectId,
            ref: "Movie",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.index({ movie: 1, user: 1 }, { unique: true });
reviewSchema.statics.calculateAverageRating = calculateAverageRating;
reviewSchema.post("save", async function () {
    await this.constructor.calculateAverageRating(this.movie);
});
reviewSchema.post("remove", async function () {
    await this.constructor.calculateAverageRating(this.movie);
});

module.exports = model("Review", reviewSchema);
