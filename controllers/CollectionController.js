const config = require('../config')();
const BaseController = require('./BaseController');
const {UserModel} = require('../models/user');
const {CollectionModel} = require('../models/nft');

module.exports = BaseController.extend({
    name: 'CollectionController',
    get: async function (req, res, next) {
        let query = {$or: [{owner: req.query.owner}, {isPublic: true}]};
        let collections = await CollectionModel.find(query);
        if (!collections) return res.send({status: 'error', message: 'No collections found', collections: []});
        return res.send({status: 'success', collections: collections});
    },
    isExist: async function (req, res, next) {
        let collections = await CollectionModel.find({name: req.query.name});
        if (!collections || collections.length === 0) return res.status(404).send({message: "No collections found"});
        return res.status(200).send({collections: collections})
    },
    detail: async function (req, res, next) {
        let collection = await CollectionModel.findOne({name: req.params.name});
        if (!collection) return res.status(404).send({message: "No collections found"});
        return res.status(200).send({collection: collection});
    },
    getAll: async function (req, res, next) {
        let page = parseInt(req.query.page) || 1;
        let pageLimit = parseInt(req.query.pageLimit) || config.pageLimit;
        let collections = await CollectionModel.find({}, {_id: 0, __v: 0})
            .skip((page - 1) * pageLimit).limit(pageLimit).lean();
        for (let i = 0; i < collections.length; i++) {
            let checkOwner = await UserModel.findOne({address: collections[i].owner}, {_id: 0, __v: 0}).lean();
            if (!checkOwner) {
                let newOwner = new UserModel({
                    address: collections[i].owner,
                    name: "NoName",
                    profilePic: config.profilePic,
                    profileCover: config.profileCover,
                    isApproved: false,
                    nonce: Math.floor(Math.random() * 1000000)
                });
                await newOwner.save();
                checkOwner = newOwner;
            }
            collections[i].ownerUser = checkOwner;
        }
        return res.status(200).send({collections: collections});
    },
});
