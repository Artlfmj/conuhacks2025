const { default: axios } = require("axios");

const { Router } = require("express");
const review = require("../../models/review");
const router = Router();

router.get("/review/:id", async(req, res, next) => {
    if(!req.params.id) return res.status(301).json({error : " You are not allowed to access this ressource"})
    const rs = await axios.get(`https://store.steampowered.com/appreviews/${req.params.id}?json=1&l=en`);
    const data = rs.data
    const rw = await review.find({gameId: req.params.id})

    return res.status(200).json({
        totalReviews: data.query_summary.total_reviews,
        rating: Number((5 * data.query_summary.total_positive / data.query_summary.total_reviews).toFixed(2)),
        reviews: rw || [],
        steamReviews: rs.data.reviews
    })
})


module.exports = router;