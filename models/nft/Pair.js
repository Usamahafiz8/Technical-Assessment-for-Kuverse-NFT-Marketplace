const mongoose = require('mongoose');

const PairSchema = new mongoose.Schema({
    id: {type: Number, index: true},
    timestamp: {type: Number, index: true},
    itemCollection: {type: String, index: true, lowercase: true},
    tokenId: {type: Number, index: true},
    creator: {type: String, lowercase: true,}, //address of the creator
    owner: {type: String, lowercase: true,},
    price: Number,
    royalty: Number,
    bValid: Boolean,
});

PairSchema.index({id: 1, tokenId: 1, itemCollection: 1});

module.exports.Pair = mongoose.model('pairs', PairSchema);
