const { default: axios } = require("axios");

async function fetchGameInfo(gameid) {
    const req = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameid}`)
    return req.data[gameid].data
}

module.exports = fetchGameInfo