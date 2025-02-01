const { default: axios } = require("axios");

async function fetchGames() {
    const req = await axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json")
    return req.data.applist.apps
}

module.exports = fetchGames