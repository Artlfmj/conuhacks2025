const { Router } = require("express");
const fetchFeatured = require("../../middlewares/fetchFeatured");

const router = Router();

router.get("/search", async (req, res, next) => {
    const params = req.query.params;
    if(!params || !params.text) {
        const featured = await fetchFeatured();
        if(featured.status == 200) {
            return res.status(200).json(featured)
        } else {
            return res.status(300).json({
                status: 300,
                games: []
            })
        }
    } else {

    }
});

module.exports =  router