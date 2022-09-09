const calculateAverageRating = async function (movieId) {
    const result = await this.aggregate([
        { $match: { movie: movieId } },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
                numberOfReviews: { $sum: 1 },
            },
        },
    ]);

    try {
        data = {
            averageRating: result[0]?.averageRating.toFixed(1) || 0,
            numberOfReviews: result[0]?.numberOfReviews || 0,
        };

        await this.model("Movie").findOneAndUpdate({ _id: movieId }, data);
    } catch (error) {
        console.log(error);
    }
};
module.exports = calculateAverageRating;
