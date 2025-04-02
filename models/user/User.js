const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    address: {type: String, lowercase: true}, //user address
    nonce: {type: Number, defuault: Math.floor(Math.random() * 1000000)},
    name: String,
    bio: String,
    facebookLink: String,
    twitterLink: String,
    googleLink: String,
    vineLink: String,
    profilePic: String,
    profileCover: String,
    isApproved: {type: Boolean, default: false},
    last_login: {type: Date},
});

UserSchema.index({address: 1}, {unique: true});

module.exports.User = mongoose.model('users', UserSchema);
