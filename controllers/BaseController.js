const _ = require("underscore");
const config = require('../config')();
const jwt = require('jsonwebtoken');
const {ethers} = require("ethers");
const {UserModel} = require('../models/user');

module.exports = {
    name: "BaseController",
    extend: function (child) {
        return _.extend({}, this, child);
    },
    authenticateToken: function (req, res, next) {
        // console.log(req.headers);
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401); // if there isn't any token
        jwt.verify(token, config.jwtToken, (err, payload) => {
            if (err) return res.sendStatus(403);
            let address = payload.data;
            UserModel.findOne({address: address})
                .then(user => {
                    if (!user) return res.sendStatus(404);
                    req.user = user;
                    next();
                });

        })
    },
    toEth: function (amount) {
        return ethers.utils.formatEther(String(amount), {commify: true});
    },
    toWei: function (amount) {
        return ethers.utils.parseEther(String(amount));
    },
    sleep: async function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    createIndex: function (number, index) {
        let indexString = index.toString();
        return "0".repeat(number - indexString.length) + indexString;
    },
    sortByBlockNumber: function (events) {
        return (events || []).sort((a, b) => a.blockNumber - b.blockNumber);
    },
    sortByTimeStamp: function (nodes) {
        return (nodes || []).sort((a, b) => a.timestamp - b.timestamp);
    },
    NON_VALUE: 1000000000,
    PLAYER_KU: 1,
    BACKPACK_KU: 2,
    PLAYER_ITEM: 3,
    BACKPACK_ITEM: 4,
    KU_ITEM: 5,
};