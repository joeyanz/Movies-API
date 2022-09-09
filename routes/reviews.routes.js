const { Router } = require("express");
const reviewController = require("../controllers/reviews.controller");
const authenticate = require("../middlewares/authentication");

const reviewRouter = Router();

// public
reviewRouter.get("/", reviewController.getAllReviews);
reviewRouter.get("/:reviewId", reviewController.getSingleReview);

// user
reviewRouter.use(authenticate);
reviewRouter.post("/", reviewController.createReview);
reviewRouter.patch("/:reviewId", reviewController.updateReview);
reviewRouter.delete("/:reviewId", reviewController.deleteReview);

module.exports = reviewRouter;
