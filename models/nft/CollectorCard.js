const mongoose = require('mongoose');
// Collector NFT
const CollectorCard = new mongoose.Schema({
    sId: String,  // account address - collector id
    collectorId: Number,
    model: Number, // male = 1, female = 2
    timestamp: Number,  // epoch time
});
CollectorCard.index({sId: 1, collectorId: 1, timestamp: 1});
module.exports.CollectorCard = mongoose.model('collector_cards', CollectorCard);
