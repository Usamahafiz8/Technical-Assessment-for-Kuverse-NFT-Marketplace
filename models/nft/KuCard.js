const mongoose = require('mongoose');
// Ku NFT
const KuCard = new mongoose.Schema({
    sId: String,  // account address - ku id
    kuId: Number,
    slotIds: Array,
    timestamp: Number,  // epoch time
});
KuCard.index({sId: 1, kuId: 1, timestamp: 1});
module.exports.KuCard = mongoose.model('ku_cards', KuCard);
