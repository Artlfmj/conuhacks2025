const axios = require("axios");

async function fetchFeatured() {
    try {
        const req = await axios("http://store.steampowered.com/api/featured/", {
            method: "GET"
        })
        if(!req) {
            throw new Error("Featured request did not work")
        } else {
            let gms = []
            gms.push(req.data["featured_win"])
            gms.push(req.data["featured_mac"])
            gms.push(req.data["featured_linux"])

            // Remove duplicate games by filtering based on id
            const uniqueGames = gms.flat().filter((game, index, self) =>
                index === self.findIndex((g) => g.id === game.id)
            );

            gms = uniqueGames;
            return {
                status: 200,
                games : gms
            }
        }
    } catch(e) {
        console.log(e)
        return {
            status: 300,
            games: []
        }
    }
}
module.exports =  fetchFeatured 