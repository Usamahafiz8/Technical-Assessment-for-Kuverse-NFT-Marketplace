const mongoose = require('mongoose');

const BackpackCard = new mongoose.Schema({
    sId: String,  // account address - backpack id
    backpackId: Number,
    slotModels: Array,  // BACKPACK_KU, BACKPACK_ITEM
    slotIds: Array,
    timestamp: Number,  // epoch time
});
BackpackCard.index({sId: 1, backpackId: 1, timestamp: 1});
module.exports.BackpackCard = mongoose.model('backpack_cards', BackpackCard);
