const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    id: {type: Number, index: true},
    startBlock: Number,
    syncBlock: Number,
    timestamp: {type: Number, required: true, default: 1},
});

module.exports.Setting = mongoose.model('settings', SettingSchema);
