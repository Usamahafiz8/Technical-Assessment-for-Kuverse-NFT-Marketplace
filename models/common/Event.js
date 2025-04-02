const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    id: {type: String, index: true},
    timestamp: {type: Number, index: true},
    txHash: {type: String, index: true},
    itemCollection: {type: String, index: true, lowercase: true},
    tokenId: {type: Number, index: true},
    name: String,
    from: String,
    to: String,
    price: Number
});

EventSchema.index({id: 1, timestamp: 1});
EventSchema.index({tokenId: 1, itemCollection: 1, timestamp: 1});
EventSchema.index({itemCollection: 1, name: 1, timestamp: 1});
EventSchema.index({itemCollection: 1, from: 1, timestamp: 1});
EventSchema.index({itemCollection: 1, to: 1, timestamp: 1});

module.exports.Event = mongoose.model('events', EventSchema);
