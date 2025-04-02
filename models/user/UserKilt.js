const mongoose = require('mongoose');

const UserKiltSchema = new mongoose.Schema({
    address: {type: String, lowercase: true}, //user address
    nonce: {type: Number, default: Math.floor(Math.random() * 1000000)},
    web3name: {type: String, default: ""},
    web3email: {type: String, default: ""},
    web3did: {type: String, default: ""},
    name: {type: String, default: ""},
    bio: {type: String, default: ""},
    profilePic: {type: String, default: ""},
    profileCover: {type: String, default: ""},
});

UserKiltSchema.index({address: 1}, {unique: true});

module.exports.UserKilt = mongoose.model('user_kilts', UserKiltSchema);
