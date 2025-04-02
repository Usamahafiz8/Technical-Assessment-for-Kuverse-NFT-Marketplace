const config = require('../config')();
let path = require('path');
let fs = require('fs');
const jwt = require('jsonwebtoken');
const ethSignUtil = require('eth-sig-util');
const ethereumjsUtil = require('ethereumjs-util');
const BaseController = require('./BaseController');
const {UserModel} = require('../models/user');
const {EventModel} = require('../models/common');
const {ItemModel} = require('../models/nft');
const publicAbsPath = path.join(__dirname, '../public');

module.exports = BaseController.extend({
    name: 'UserController',
    login: async function (req, res, next) {
        let {address} = req.body;
        if (!address) return res.status(400).send({error: 'invalid params'});
        address = address.toLowerCase().trim();
        let user = await UserModel.findOne({address: address});
        if (!user) {
            const newUser = new UserModel({
                address: address,
                name: "NoName",
                profilePic: config.profilePic,
                profileCover: config.profileCover,
                isApproved: false,
                nonce: Math.floor(Math.random() * 1000000)
            });
            user = await newUser.save();
        } else {
            user.nonce = Math.floor(Math.random() * 1000000);
            user.last_login = new Date();
            await user.save();
        }
        let token = jwt.sign({data: user.address}, config.jwtToken, {expiresIn: '43200m'}); // expireIn 1 month
        return res.status(200).send({token: token});
    },
    check: async function (req, res, next) {
        const {address} = req.query;
        let user = await UserModel.findOne({address: address.toLowerCase().trim()}).lean();
        if (!user || user.status !== 'active') return res.sendStatus(404);
        return res.status(200).send(user);
    },
    get: async function (req, res, next) {
        let user_address = req.params.address.toLowerCase();
        let user = await UserModel.findOne({address: user_address}, {_id: 0, __v: 0});
        if (user_address !== "0x" && !user) {
            const newUser = new UserModel({
                address: user_address,
                name: "NoName",
                profilePic: config.profilePic,
                profileCover: config.profileCover,
                isApproved: false,
                nonce: Math.floor(Math.random() * 1000000)
            });
            await newUser.save();
            return res.status(200).send({user: newUser})
        } else res.status(200).send({user: user});
    },
    update: async function (req, res, next) {
        if (!req.body.address) return res.status(400).send({message: "No address"});
        const name = req.body.name || "NoName";
        const bio = req.body.bio || "";
        const facebookLink = req.body.facebookLink || "";
        const twitterLink = req.body.twitterLink || "";
        const googleLink = req.body.googleLink || "";
        const vineLink = req.body.vineLink || "";
        const profileCover = req.body.profileCover || "";
        let user = await UserModel.findOne({address: req.body.address});
        if (!user) return res.status(400).send({message: "User not found"});
        let profilePic = user.profilePic;
        if (req.body.profilePic.length > 1000) {
            let avatarData = req.body.profilePic.replace(/^data:image\/\w+;base64,/, "");
            let file_extension = '.png';
            console.log(avatarData.charAt(0));
            if (avatarData.charAt(0) === '/') file_extension = '.jpg';
            else if (avatarData.charAt(0) === 'R') file_extension = '.gif';
            let profilePath = '/images/profile/profile_' + user.address + file_extension;
            let avatarUploadPath = publicAbsPath + profilePath;
            fs.writeFileSync(avatarUploadPath, avatarData, 'base64');
            profilePic = config.base_url + profilePath;
        }
        await user.updateOne({
            name: name,
            bio: bio,
            facebookLink: facebookLink,
            twitterLink: twitterLink,
            googleLink: googleLink,
            vineLink: vineLink,
            profilePic: profilePic,
            profileCover: profileCover,
        });
        return res.status(200).send({message: "Success update", name: name, profilePic: profilePic});
    },
    getAuthors: async function (req, res, next) {
        let pageLimit = parseInt(req.query.pageLimit) || config.pageLimit;
        let page = parseInt(req.query.page) || 1;
        let authors = await UserModel.find({address: {$ne: '0x'}}, {_id: 0, __v: 0})
            .skip((page - 1) * pageLimit).limit(pageLimit).lean();
        return res.status(200).send({authors: authors});
    },
    activities: async function (req, res, next) {
        let pageLimit = parseInt(req.query.pageLimit) || config.pageLimit;
        let page = parseInt(req.query.page) || 1;
        let filter = req.query.filter || 'Recent';
        let filter_query = {}; let bid = false;
        switch (filter) {
            case 'Minting': filter_query.name = 'Minted'; break;
            case 'Listing': filter_query.name = 'Listed'; break;
            case 'Delisting': filter_query.name = 'Delisted'; break;
            case 'Auction': filter_query['$or'] = [{name: 'AuctionCreated'}, {name: 'AuctionCanceled'}]; break;
            case 'Purchase': filter_query['$or'] = [{name: 'MarketSold'}, {name: 'AuctionSold'}]; break;
            case 'Bids': bid = true; break;
            default: break;
        }
        let events = await EventModel.find(filter_query, {_id: 0, __v: 0})
            .sort({timestamp: -1}).skip((page - 1) * pageLimit).limit(pageLimit).lean();
        for (let i = 0; i < events.length; i++) {
            let fromUser = await UserModel.findOne({address: events[i].from}, {_id: 0, __v: 0}).lean();
            let toUser = await UserModel.findOne({address: events[i].to}, {_id: 0, __v: 0}).lean();
            if (fromUser) events[i].fromUser = fromUser;
            if (toUser) events[i].toUser = toUser;
            events[i].item = await ItemModel.findOne({itemCollection: events[i].itemCollection, tokenId: events[i].tokenId},
                {_id: 0, name: 1}).lean();
        }
        return res.status(200).send({events: events});
    },
    checkApproved: async function (req, res, next) {
        let address = req.params.address.toLowerCase();
        let account = await UserModel.findOne({address: address.toLowerCase(), isApproved: true});
        if (account) return res.send({status: 'success', 'message': 'This user is Approved'});
        else return res.send({status: 'error', 'message': "This user is unauthorized"});
    },
});
