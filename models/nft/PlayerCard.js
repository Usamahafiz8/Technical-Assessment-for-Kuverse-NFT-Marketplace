const mongoose = require('mongoose');

const PlayerCard = new mongoose.Schema({
    sId: String,  // account address
    collectorId: Number,
    backpackId: Number,
    itemId: Number,
    kuId1: Number,
    kuId2: Number,
    kuId3: Number,
    timestamp: Number,  // epoch time
});
PlayerCard.index({sId: 1, collectorId: 1, backpackId: 1, itemId: 1, kuId1: 1, kuId2: 1, kuId3: 1, timestamp: 1});
module.exports.PlayerCard = mongoose.model('player_cards', PlayerCard);
