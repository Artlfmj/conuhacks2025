const { Router } = require("express");
const fetchFeatured = require("../../middlewares/fetchFeatured");
const fetchGames = require("../../middlewares/fetchGames");
const fetchGameInfo = require("../../middlewares/fetchGameInfo");
const rateLimit = require('express-rate-limit');

const router = Router();

// Create rate limiter for Steam API calls
const steamApiLimiter = rateLimit({
    windowMs: 1000, // 1 second window
    max: 5, // 5 requests per window
    message: "Too many requests to Steam API, please try again later"
});

let games = []

router.get("/search", async (req, res, next) => {
    const params = req.query;
    if(!params || !params.text || params.text.length < 3) {
        console.log(params)
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
        if(games.length){
            const searchText = params.text.toLowerCase();
            const regex = new RegExp(searchText, 'i');
            let filteredGames = games.filter(game => regex.test(game.name));

            filteredGames = filteredGames.slice(0, 40)

            // Process games in batches of 5 to respect rate limit
            const detailedGames = [];
            for (let i = 0; i < filteredGames.length; i += 5) {
                const batch = filteredGames.slice(i, i + 5);
                const batchResults = await Promise.all(
                    batch.map(async (game) => {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between batches
                            const gameDetails = await fetchGameInfo(game.appid);
                            return {
                                ...game,
                                details: gameDetails
                            };
                        } catch (error) {
                            console.log(`Error fetching details for game ${game.appid}:`, error);
                            return game;
                        }
                    })
                );
                detailedGames.push(...batchResults);
            }

            const gamesWithoutDLCs = detailedGames.filter(game => 
                game.details && game.details.type === "game"
            );

            filteredGames = gamesWithoutDLCs;
            
            return res.status(200).json({
                status: 200,
                games: filteredGames
            });
        } else{
            const gms = await fetchGames();
            games = gms
            const searchText = params.text.toLowerCase();
            const regex = new RegExp(searchText, 'i');
            let filteredGames = games.filter(game => regex.test(game.name));

            filteredGames = filteredGames.slice(0, 40)

            // Process games in batches of 5 to respect rate limit
            const detailedGames = [];
            for (let i = 0; i < filteredGames.length; i += 5) {
                const batch = filteredGames.slice(i, i + 5);
                const batchResults = await Promise.all(
                    batch.map(async (game) => {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between batches
                            const gameDetails = await fetchGameInfo(game.appid);
                            return {
                                ...game,
                                details: gameDetails
                            };
                        } catch (error) {
                            console.log(`Error fetching details for game ${game.appid}:`, error);
                            return game;
                        }
                    })
                );
                detailedGames.push(...batchResults);
            }

            const gamesWithoutDLCs = detailedGames.filter(game => 
                game.details && game.details.type === "game"
            );
            
            filteredGames = gamesWithoutDLCs;
            
            return res.status(200).json({
                status: 200,
                games: filteredGames
            });
        }
    }
});

module.exports =  router