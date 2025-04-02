const mongoose = require('mongoose');

const HatchSchema = new mongoose.Schema({
    id: String,
    egg_id: String,
    ku_id: Number,
    ku_address: String,
    mb_address: String,
    hatchStatus: Boolean,
    airdropStatus: Boolean,
    created_at: Date,
    updated_at: Date,
});
// event
HatchSchema.pre('save', function (next) {
    this.id = this._id.toString();
    next();
});

module.exports.Hatch = mongoose.model('hatches', HatchSchema);
