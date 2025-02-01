const router = require("express").Router();
const gameRoutes = require('./api/game');

// Mount game routes under /api/game
router.use('/api/game', gameRoutes);

module.exports = router;

