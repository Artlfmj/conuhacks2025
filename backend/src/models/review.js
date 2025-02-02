const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    rating: Number,
    comment: String,
    gameId: String,
});

module.exports = model('Review', reviewSchema);