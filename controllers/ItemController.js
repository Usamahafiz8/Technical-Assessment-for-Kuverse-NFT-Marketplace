const config = require('../config')();
const BaseController = require("./BaseController");
const {UserModel} = require('../models/user');
const {CollectionModel, ItemModel, PairModel, PlayerCardModel, BackpackCardModel, KuCardModel} = require('../models/nft');
const {EventModel} = require('../models/common');

module.exports = BaseController.extend({
    name: "ItemController",
    get: async function (req, res, next) {
        let data = this.handleGetRequest(req, config.pageLimit);
        // console.log("get: ", data);
        let items = await ItemModel.find(data.query, {__v: 0, _id: 0}).sort(data.sort).limit(data.limit).skip(data.skip).lean();
        if (!items) return res.status(404).send({message: "No items found"});
        let ret = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            // let owner = item.owner;
            if (item.itemOwner === config.marketAddr.toLowerCase()) {
                // marketplace item
                let pair = await PairModel.findOne({tokenId: item.tokenId, itemCollection: item.itemCollection, bValid: true}, {_id: 0, __v: 0}).lean();
                if (pair) item.pair = pair;
            }
            // set item creator
            let creator = await UserModel.findOne({address: item.creator}, {_id: 0, __v: 0}).lean();
            if (!creator) {
                const newUser = new UserModel({
                    address: item.creator.toLowerCase(),
                    name: "NoName",
                    profilePic: config.profilePic,
                    profileCover: config.profileCover,
                    isApproved: false,
                    nonce: Math.floor(Math.random() * 1000000)
                });
                await newUser.save();
                item.creatorUser = newUser;
            } else {
                item.creatorUser = creator;
            }
            // set item owner
            let ownerUserItem = await UserModel.findOne({address: item.owner}, {_id: 0, __v: 0}).lean();
            if (!ownerUserItem) {
                const newUser = new UserModel({
                    address: item.creator.toLowerCase(),
                    name: "NoName",
                    profilePic: config.profilePic,
                    profileCover: config.profileCover,
                    isApproved: false,
                    nonce: Math.floor(Math.random() * 1000000)
                });
                await newUser.save();
                item.ownerUser = newUser;
            } else {
                item.ownerUser = ownerUserItem;
            }
            ret.push(item);
        }
        let totalCount = await ItemModel.countDocuments(data.query);
        return res.status(200).send({items: ret, count: totalCount});
    },
    hotItems: async function (req, res, next) {
        let ret = [];
        const eventQuery = [
            {
                '$group': {
                    '_id': {
                        'itemCollection': '$itemCollection',
                        'tokenId': '$tokenId'
                    },
                    'totalActions': {$sum: 1}
                }
            }
            , {'$sort': {'totalActions': -1}}
            , {'$limit': 7}
        ];

        const idList = await EventModel.aggregate(eventQuery);
        if (idList && idList?.length > 0) {
            for (let index = 0; index < idList.length; index++) {
                let ItemId = idList[index];
                let tokenId = ItemId._id.tokenId;
                let itemCollection = ItemId._id.itemCollection;
                let item = await ItemModel.findOne({tokenId: tokenId, itemCollection: itemCollection}, {_id: 0, __v: 0}).lean();
                let creator = await UserModel.findOne({address: item.creator}, {_id: 0, __v: 0}).lean();
                if (!creator) {
                    let newUser = new UserModel({
                        address: item.creator,
                        name: "NoName",
                        profilePic: config.profilePic,
                        profileCover: config.profileCover,
                        isApproved: false,
                        nonce: Math.floor(Math.random() * 1000000)
                    });
                    item.creatorUser = newUser;
                } else {
                    item.creatorUser = creator;
                }
                ret.push(item)
            }
        }
        if (ret.length > 0) return res.status(200).send({items: ret, count: ret.length});
        else return res.status(404).send({message: "No Hot items found"});
    },
    detail: async function (req, res, next) {
        // console.log("Item details ...", req.params);
        let _collection = req.params.collection;
        let _tokenId = parseInt(req.params.tokenId);
        let item = await ItemModel.findOne({tokenId: _tokenId, itemCollection: _collection}, {__v: 0, _id: 0}).lean();
        if (!item) return res.status(404).send({message: "No item found"});
        // set pair data
        let pair = await PairModel.findOne({tokenId: _tokenId, itemCollection: _collection, bValid: true}, {_id: 0, __v: 0}).lean();
        if (pair) item.pair = pair;
        // set transaction history data
        let events = await EventModel.find({tokenId: _tokenId, itemCollection: _collection}, {_id: 0, __v: 0}).sort({timestamp: -1}).lean();
        if (events.length > 0) {
            for (let index = 0; index < events.length; index++) {
                const event = events[index];
                let eventFrom = event.from.toLowerCase();
                let eventCollectionFrom = await CollectionModel.findOne({address: eventFrom});
                if (eventFrom !== config.marketAddr.toLowerCase() && eventFrom !== config.auctionAddr.toLowerCase() && !eventCollectionFrom) {
                    let userFrom = await UserModel.findOne({address: eventFrom}, {_id: 0, __v: 0}).lean();
                    if (event.name !== "Minted" && !userFrom) {
                        const newUserFrom = new UserModel({
                            address: eventFrom,
                            name: "NoName",
                            profilePic: config.profilePic,
                            profileCover: config.profileCover,
                            isApproved: false,
                            nonce: Math.floor(Math.random() * 1000000)
                        });
                        await newUserFrom.save();
                        event.userFrom = newUserFrom;
                    } else {
                        event.userFrom = userFrom;
                    }
                }
                let eventTo = event.to.toLowerCase();
                let eventCollectionTo = await CollectionModel.findOne({address: eventTo});
                if (eventTo !== config.marketAddr.toLowerCase() && eventTo !== config.auctionAddr.toLowerCase() && !eventCollectionTo) {
                    let userTo = await UserModel.findOne({address: eventTo}, {_id: 0, __v: 0}).lean();
                    if (!userTo) {
                        const newUserTo = new UserModel({
                            address: eventTo,
                            name: "NoName",
                            profilePic: config.profilePic,
                            profileCover: config.profileCover,
                            isApproved: false,
                            nonce: Math.floor(Math.random() * 1000000)
                        });
                        await newUserTo.save();
                        event.userTo = newUserTo;
                    } else {
                        event.userTo = userTo;
                    }
                }
            }
        }
        item.events = events;
        // set collection
        item.collection = await CollectionModel.findOne({address: _collection}, {_id: 0, __v: 0}).lean();
        // set item creator
        let creator = await UserModel.findOne({address: item.creator}, {_id: 0, __v: 0}).lean();
        if (!creator) {
            const newUser = new UserModel({
                address: item.creator.toLowerCase(),
                name: "NoName",
                profilePic: config.profilePic,
                profileCover: config.profileCover,
                isApproved: false,
                nonce: Math.floor(Math.random() * 1000000)
            });
            await newUser.save();
            item.creatorUser = newUser;
        } else {
            item.creatorUser = creator;
        }
        // set item owner
        let ownerAddress = item.owner;
        if (pair) ownerAddress = pair.owner;
        let owner = await UserModel.findOne({address: ownerAddress.toLowerCase()}, {_id: 0, __v: 0}).lean();
        if (!owner) {
            const newUser = new UserModel({
                address: item.owner.toLowerCase(),
                name: "NoName",
                profilePic: config.profilePic,
                profileCover: config.profileCover,
                isApproved: false,
                nonce: Math.floor(Math.random() * 1000000)
            });
            await newUser.save();
            item.ownerUser = newUser;
        } else {
            item.ownerUser = owner;
        }
        return res.status(200).send({item: item});
    },
    like: async function (req, res, next) {
        if (!req.body.address || !req.body.tokenId || !req.body.collection)
            return res.status(400).send("missing params");
        let item = await ItemModel.findOne({tokenId: req.body.tokenId, itemCollection: req.body.collection});
        if (!item) return res.status(404).send({message: "No item found"});
        const likeCount = item.likeCount;
        if (item.likes.includes(req.body.address.toLowerCase())) {
            item.likes.splice(item.likes.indexOf(req.body.address.toLowerCase()), 1);
            item.likeCount = likeCount - 1;
        } else {
            item.likes.push(req.body.address);
            item.likeCount = likeCount + 1;
        }
        await item.save();
        return res.status(200).send({item: item});
    },
    getPlayerGig: async function (req, res, next) {
        let address = req.params.address;
        const user = await UserModel.findOne({address: address.toLowerCase()});
        if (!user) return res.status(404).send({message: "Unknown player!"});
        let collectors = await ItemModel.find({owner: user.address, itemCollection: config.Ku_CollectorAddress.toLowerCase(), position: 0}).lean();
        let backpacks = await ItemModel.find({owner: user.address, itemCollection: config.Ku_BackpackAddress.toLowerCase(), position: 0}).lean();
        let kus = await ItemModel.find({owner: user.address, itemCollection: config.Ku_KuAddress.toLowerCase(), position: 0}).lean();
        let items = await ItemModel.find({owner: user.address, itemCollection: config.Ku_ItemAddress.toLowerCase(), position: 0}).lean();
        return res.status(200).send({collectors: collectors, backpacks: backpacks, kus: kus, items: items});
    },
    getPlayerCard: async function (req, res, next) {
        const that  = this;
        let address = req.params.address;
        if (!address) return res.status(404).send({message: "Unknown player!"});
        address = address.toLowerCase();
        let player = await PlayerCardModel.findOne({sId: address}, {_id: 0, __v: 0}).lean();
        if (!player) return res.status(404).send({message: "Unknown player!"});
        player.collector = await ItemModel.findOne({
            itemCollection: config.Ku_CollectorAddress.toLowerCase(), tokenId: player.collectorId
        }, {_id: 0, __v: 0}).lean();
        player.backpack = await ItemModel.findOne({
            itemCollection: config.Ku_BackpackAddress.toLowerCase(), tokenId: player.backpackId
        }, {_id: 0, __v: 0}).lean();
        player.item = await ItemModel.findOne({
            itemCollection: config.Ku_ItemAddress.toLowerCase(), tokenId: player.itemId
        }, {_id: 0, __v: 0}).lean();
        player.ku1 = await ItemModel.findOne({
            itemCollection: config.Ku_KuAddress.toLowerCase(), tokenId: player.kuId1
        }, {_id: 0, __v: 0}).lean();
        player.ku2 = await ItemModel.findOne({
            itemCollection: config.Ku_KuAddress.toLowerCase(), tokenId: player.kuId2
        }, {_id: 0, __v: 0}).lean();
        player.ku3 = await ItemModel.findOne({
            itemCollection: config.Ku_KuAddress.toLowerCase(), tokenId: player.kuId3
        }, {_id: 0, __v: 0}).lean();
        // ku slots
        if (player.ku1) {
            let sId = address + '-' + player.kuId1.toString();
            let ku1Card = await KuCardModel.findOne({sId: sId}).lean();
            if (ku1Card) player.ku1.slots = await ItemModel.find({
                itemCollection: config.Ku_ItemAddress.toLowerCase(), tokenId: {$in: ku1Card.slotIds}}, {_id: 0, __v: 0}).lean();
        }
        if (player.ku2) {
            let sId = address + '-' + player.kuId2.toString();
            let ku2Card = await KuCardModel.findOne({sId: sId}).lean();
            if (ku2Card) player.ku2.slots = await ItemModel.find({
                itemCollection: config.Ku_ItemAddress.toLowerCase(), tokenId: {$in: ku2Card.slotIds}}, {_id: 0, __v: 0}).lean();
        }
        if (player.ku3) {
            let sId = address + '-' + player.kuId3.toString();
            let ku3Card = await KuCardModel.findOne({sId: sId}).lean();
            if (ku3Card) player.ku3.slots = await ItemModel.find({
                itemCollection: config.Ku_ItemAddress.toLowerCase(), tokenId: {$in: ku3Card.slotIds}}, {_id: 0, __v: 0}).lean();
        }
        // backpack slots
        if (player.backpack) {
            let backpack_slots = [];
            let sId = address + '-' + player.backpackId.toString();
            let backpackOne = await BackpackCardModel.findOne({sId: sId}).lean();
            if (backpackOne && backpackOne.slotModels.length === backpackOne.slotIds.length) {
                for (let k = 0; k < backpackOne.slotIds.length; k++) {
                    if (backpackOne.slotModels[k] === that.BACKPACK_KU) {
                        let slotItem = await ItemModel.findOne({
                            itemCollection: config.Ku_KuAddress.toLowerCase(), tokenId: backpackOne.slotIds[k]
                        }, {_id: 0, __v: 0}).lean();
                        if (!slotItem) continue;
                        slotItem.slot_model = that.BACKPACK_KU;
                        let sId_backpack_ku = address + '-' + backpackOne.slotIds[k].toString();
                        let card_backpack_ku = await KuCardModel.findOne({sId: sId_backpack_ku}).lean();
                        if (card_backpack_ku) slotItem.slots = await ItemModel.find({
                            itemCollection: config.Ku_ItemAddress.toLowerCase(), tokenId: {$in: card_backpack_ku.slotIds}
                        }, {_id: 0, __v: 0}).lean();
                        backpack_slots.push(slotItem);
                    }
                    else if (backpackOne.slotModels[k] === that.BACKPACK_ITEM) {
                        let slotItem = await ItemModel.findOne({
                            itemCollection: config.Ku_ItemAddress.toLowerCase(), tokenId: backpackOne.slotIds[k]
                        }, {_id: 0, __v: 0}).lean();
                        if (!slotItem) continue;
                        slotItem.slot_model = that.BACKPACK_ITEM;
                        backpack_slots.push(slotItem);
                    }
                }
            }
            player.backpack.slots = backpack_slots;
        }
        return res.status(200).send({player: player});
    },

    handleGetRequest: function (req, limit) {
        const pageLimit = parseInt(req.query.pageLimit) || limit;
        const page = req.query.page && parseInt(req.query.page) ? parseInt(req.query.page) : 1;
        let skip = (page - 1) * pageLimit;
        let sortDir = (req.query.sortDir === "asc") ? 1 : -1;
        const sortBy =
            req.query.sortBy === "name" ||
            req.query.sortBy === "likeCount" ||
            req.query.sortBy === "price" ||
            req.query.sortBy === "timestamp"
                ? req.query.sortBy
                : "timestamp";
        delete req.query.pageLimit;
        delete req.query.page;
        delete req.query.sortBy;
        delete req.query.sortDir;

        let sort;
        if (sortBy === "name") sort = {name: sortDir};
        else if (sortBy === "likeCount") sort = {likeCount: sortDir};
        else if (sortBy === "price") sort = {price: sortDir};
        else sort = {timestamp: sortDir};

        if (req.query.likes) req.query.likes = req.query.likes.toLowerCase();
        if (req.query.collection && req.query.collection !== 'all') req.query.itemCollection = req.query.collection.toLowerCase();
        delete req.query.collection;
        if (req.query.creator) req.query.creator = req.query.creator.toLowerCase();
        if (req.query.owner) req.query.owner = req.query.owner.toLowerCase();
        if (req.query.owned) req.query.itemOwner = req.query.owner.toLowerCase();
        delete req.query.owned;
        if (req.query.onsale) req.query.itemOwner = config.marketAddr.toLowerCase();
        delete req.query.onsale;

        const saleType = req.query.saleType;
        delete req.query.saleType;

        if (saleType === 'fixed') req.query.itemOwner = config.marketAddr.toLowerCase();
        else if (saleType === 'all') req.query.itemOwner = config.marketAddr.toLowerCase();

        const searchTxt = req.query.searchTxt;
        delete req.query.searchTxt;
        if (searchTxt) {
            const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
            const searchRgx = rgx(searchTxt);
            req.query.name = {$regex: searchRgx, $options: "i"};
        }
        req.query.itemStatus = true;
        return {query: req.query, sort: sort, skip: skip, limit: pageLimit};
    },
});

