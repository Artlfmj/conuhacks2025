const mongoose = require("mongoose");
const axios = require("axios");

const gameSchema = new mongoose.Schema({
    gameid: { type: String, unique: true, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: false },
    updatedAt: { type: Date, default: Date.now, expires: 86400 } // Cache expiration: 24h
});

const Game = mongoose.model("Game", gameSchema);

async function fetchGameInfo(gameid) {
    // Vérifier le cache
    const cachedGame = await Game.findOne({ gameid });
    if (cachedGame) {
        return cachedGame.data;
    }

    // Faire la requête à Steam
    const req = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameid}`);
    const gameData = req.data[gameid].data;

    // Sauvegarder dans le cache
    await Game.create({ gameid, data: gameData });

    return gameData;
}

module.exports = fetchGameInfo;
