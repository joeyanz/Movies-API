const movieModel = require("../models/movie.model");
const reviewModel = require("../models/review.model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../utils/error-classes");
const path = require("path");

module.exports.getAllMovies = async (req, res) => {
    const movies = await movieModel.find();
    res.status(StatusCodes.OK).json({ movies, amount: movies.length });
};
module.exports.addMovie = async (req, res) => {
    const movie = await movieModel.create(req.body);
    if (req.file) {
        movie.poster = path.join("uploads/", req.file.originalname);
        await movie.save();
    }
    res.status(StatusCodes.CREATED).json({ movie });
};
module.exports.getSingleMovie = async (req, res) => {
    const { movieId: _id } = req.params;
    const movie = await movieModel.findOne({ _id }).populate("reviews");
    if (!movie) {
        throw new NotFoundError(`Movie not found with id ${_id}`);
    }
    res.status(StatusCodes.OK).json({ movie });
};
module.exports.updateMovie = async (req, res) => {
    const { movieId: _id } = req.params;
    options = { new: true, runValidators: true };
    const movie = await movieModel.findOneAndUpdate({ _id }, req.body, options);
    if (!movie) {
        throw new NotFoundError(`Movie not found with id ${_id}`);
    }
    if (req.file) {
        movie.poster = path.join("uploads", req.file.originalname);
        await movie.save();
    }

    res.status(StatusCodes.OK).json({ movie });
};
module.exports.deleteMovie = async (req, res) => {
    const { movieId: _id } = req.params;
    const movie = await movieModel.findOneAndDelete({ _id });
    if (!movie) {
        throw new NotFoundError(`Movie not found with id ${_id}`);
    }

    res.status(StatusCodes.OK).json({ msg: "movie deleted" });
};
module.exports.getSingleMovieReviews = async (req, res) => {
    const { movieId: _id } = req.params;
    const movie = await movieModel.findOne({ _id });
    if (!movie) {
        throw new NotFoundError(`Movie not found with id ${_id}`);
    }
    const reviews = await reviewModel.find({ movie: _id });
    res.status(StatusCodes.OK).json({ reviews, amount: reviews.length });
};
