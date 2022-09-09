require("dotenv").config();
require("express-async-errors");
const express = require("express");

const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const path = require("path");

const routeNotFound = require("./middlewares/route-not-found");
const errorHandler = require("./middlewares/error-handler");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/users.routes");
const movieRouter = require("./routes/movies.routes");
const reviewRouter = require("./routes/reviews.routes");
// setup express app
const app = express();

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(xss());
app.use(helmet());

// routes
app.get("/", (req, res) => {
    res.send("Movies API");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/reviews", reviewRouter);

// error handlers
app.use(routeNotFound);
app.use(errorHandler);

module.exports = app;
