const { Router } = require("express");
const upload = require("../utils/file-upload");
const moviesController = require("../controllers/movies.controller");
const adminPermission = require("../middlewares/permission");
const authenticate = require("../middlewares/authentication");
const movieRouter = Router();

// public
movieRouter.get("/", moviesController.getAllMovies);
movieRouter.get("/:movieId", moviesController.getSingleMovie);
movieRouter.get("/:movieId/reviews", moviesController.getSingleMovieReviews);
// admin
movieRouter.use(authenticate, adminPermission);
movieRouter.post("/", upload.single("poster"), moviesController.addMovie);
movieRouter.patch("/:movieId", upload.single("poster"), moviesController.updateMovie);
movieRouter.delete("/:movieId", moviesController.deleteMovie);

module.exports = movieRouter;
