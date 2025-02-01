const router = require("express").Router();
const gameRoutes = require('./api/game');
const ratingRoutes = require("./api/rating")

// Mount game routes under /api/game
router.use('/api/game', gameRoutes);
router.use('/api/steam', ratingRoutes)

module.exports = router;

