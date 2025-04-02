const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
    id: {type: Number, index: true},
    rate: {type: Number, required: true, default: 1},
});

module.exports.Rate = mongoose.model('rates', RateSchema);
