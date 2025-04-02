const mongoose = require('mongoose');
let crypto = require('crypto');

const AdminSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    reset_flag: Number,  // 1: usable token,  2: unusable token
    reset_token: String,
    avatar: String,
    created_at: Date,
    updated_at: Date,
});
// event
AdminSchema.pre('save', function (next) {
    this.id = this._id.toString();
    next();
});
// Methods
AdminSchema.methods.verifyPassword = function (password) {
    return this.password === crypto.createHash('md5').update(password).digest("hex")
};
module.exports.Admin = mongoose.model('admins', AdminSchema);
