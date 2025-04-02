const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: {type: String, index: true},
    timestamp: {type: Number, index: true},
    txHash: {type: String, index: true},
    itemCollection: {type: String, index: true, lowercase: true},
    tokenId: {type: Number, index: true},
    creator: {type: String, lowercase: true},
    owner: {type: String, lowercase: true},
    itemOwner: {type: String, lowercase: true}, // pair, auction owner
    royalty: Number,
    tokenURI: String,
    model: Number,  // Kuberry, Samanut, Moonmelon, IronBeak for Item, etc.
    position: Number,

    assetType: String,
    name: {type: String, index: true},
    description: String, //item description
    mainData: String, //item data link
    coverImage: String, //cover image link
    attributes: Object,
    gameStats: Object,

    itemStatus: {type: Boolean, default: true},
    likeCount: {type: Number, default: 0},
    likes: [{type: String, lowercase: true}], //addresses
    created_at: Date,
    updated_at: Date,
});

ItemSchema.pre('save', function (next) {
    this.id = this._id.toString();
    next();
});
ItemSchema.index({name: 1, tokenId: 1});

module.exports.Item = mongoose.model('items', ItemSchema);
