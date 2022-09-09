const { NotFoundError, UnauthorizedError } = require("../utils/error-classes");
const { StatusCodes } = require("http-status-codes");
const reviewModel = require("../models/review.model");
const movieModel = require("../models/movie.model");

const moviePopulation = { path: "movie", select: "name year" };
const userPopulation = { path: "user", select: "name" };

module.exports.getAllReviews = async (req, res) => {
    const reviews = await reviewModel.find().populate(moviePopulation).populate(userPopulation);
    res.status(StatusCodes.OK).json({ reviews, amount: reviews.length });
};
module.exports.createReview = async (req, res) => {
    const user = req.user._id;
    const { movie: movieId } = req.body;
    const movie = await movieModel.findOne({ _id: movieId });
    if (!movie) {
        throw new NotFoundError(`Movie not found with id ${movieId}`);
    }
    const review = await reviewModel.create({ ...req.body, user });
    res.status(StatusCodes.CREATED).json(review);
};
module.exports.getSingleReview = async (req, res) => {
    const { reviewId: _id } = req.params;
    console.log(_id);
    const review = await reviewModel
        .findOne({ _id })
        .populate(moviePopulation)
        .populate(userPopulation);
    if (!review) {
        throw new NotFoundError(`Review not found with id ${_id}`);
    }
    res.status(StatusCodes.OK).json(review);
};
module.exports.updateReview = async (req, res) => {
    const { reviewId: _id } = req.params;
    const review = await reviewModel.findOne({ _id });
    if (!review) {
        throw new NotFoundError(`Review not found with id ${_id}`);
    }
    if (!review.user.equals(req.user._id) || req.user.role !== "admin") {
        throw new UnauthorizedError("you don't have permission to update this review");
    }
    const { rating, title, comment } = req.body;
    review.rating = rating ? rating : review.rating;
    review.title = title ? title : review.title;
    review.comment = comment ? comment : review.comment;
    await review.save();
    res.status(StatusCodes.OK).json(review);
};
module.exports.deleteReview = async (req, res) => {
    const { reviewId: _id } = req.params;
    const review = await reviewModel.findOne({ _id });
    if (!review) {
        throw new NotFoundError(`no review found with id ${_id}`);
    }
    if (!review.user.equals(req.user._id) || req.user.role !== "admin") {
        throw new UnauthorizedError("you don't have permission to delete this review");
    }
    await review.remove();
    res.status(StatusCodes.OK).json(review);
};
