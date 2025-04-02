const config = require('../config')();
const axios = require('axios');
const {ethers} = require("ethers");
const fs = require('fs');
const BaseController = require('./BaseController');
const {SettingModel, EventModel} = require('../models/common');
const {UserModel} = require('../models/user');
const {
    ItemModel, PairModel, CollectionModel, HatchModel, PlayerCardModel, BackpackCardModel, KuCardModel
} = require('../models/nft');
const governanceToken = config.governanceToken.toLowerCase();
const ku_collector_address = config.Ku_CollectorAddress.toLowerCase();
const ku_ku_address = config.Ku_KuAddress.toLowerCase();
const ku_backpack_address = config.Ku_BackpackAddress.toLowerCase();
const ku_item_address = config.Ku_ItemAddress.toLowerCase();
const marketAddr = config.marketAddr.toLowerCase();
const {} = require('@polkadot/util');
const {signatureVerify} = require('@polkadot/util-crypto');
axios.defaults.timeout = 10000;

const getKoreABI = () => {
    return JSON.parse(fs.readFileSync(`${__dirname}/../config/KORE.json`));
};

const getKuABI = () => {
    return JSON.parse(fs.readFileSync(`${__dirname}/../config/Ku_Ku.json`));
};

module.exports = BaseController.extend({
    name: 'SyncController',
    init: async function () {
        let setting = await SettingModel.findOne({});
        if (!setting) {
            setting = {
                timestamp: config.timestamp,
                startBlock: config.startBlock
            };
            await SettingModel.create(setting);
        }
    },
    execute: async function () {
        let that = this;
        try {
            const setting = await SettingModel.findOne({});
            let lastTimeStamp = setting?.timestamp || config.timestamp;
            let latestTimestamp = setting?.timestamp || config.timestamp;
            // lastTimeStamp = 600000;
            console.log(`Syncing from: ${lastTimeStamp}`);
            let data = JSON.stringify({
                query: `{
                    collectors(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        collection
                        tokenId
                        model
                        creator
                        owner
                        position
                    }
                    kus(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        collection
                        tokenId
                        creator
                        owner
                        position
                    }
                    backpacks(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        collection
                        tokenId
                        model
                        creator
                        owner
                        position
                    }
                    items(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        collection
                        tokenId
                        model
                        creator
                        owner
                        position
                    }
                    pairs(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        collection
                        tokenId
                        owner
                        price
                        bValid
                    }
                    events(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        collection
                        tokenId
                        name
                        from
                        to
                        price
                    }
                    playerCards(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        collectorId
                        backpackId
                        itemId
                        kuId1
                        kuId2
                        kuId3
                        isCreated
                    }
                    backpackCards(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        backpackId
                        slotIds
                    }
                    kuCards(limit:1000, offset: 0, where:{timestamp_gt:${lastTimeStamp}}, orderBy:timestamp_ASC) {
                        id
                        timestamp
                        txhash
                        logIndex
                        kuId
                        slotIds
                    }
                }`
            });
            let graph_config = {
                method: 'post',
                url: config.graphql,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            let result;
            try {
                result = await axios(graph_config);
                // console.log(result.data);
            } catch (e) {
                console.log("GraphQL call error...", e);
                return;
            }
            const collectors = this.sortByTimeStamp(result.data.data.collectors);
            const kus = this.sortByTimeStamp(result.data.data.kus);
            const backpacks = this.sortByTimeStamp(result.data.data.backpacks);
            const items = this.sortByTimeStamp(result.data.data.items);
            const pairs = this.sortByTimeStamp(result.data.data.pairs);
            const events = this.sortByTimeStamp(result.data.data.events);
            const playerCards = this.sortByTimeStamp(result.data.data.playerCards);
            const backpackCards = this.sortByTimeStamp(result.data.data.backpackCards);
            const kuCards = this.sortByTimeStamp(result.data.data.kuCards);
            // Collector
            for (let i = 0; i < collectors.length; i++) {
                const node = collectors[i];
                const timestamp = node.timestamp;
                const txHash = node.txhas;
                const collection = node.collection.toLowerCase();
                const tokenId = node.tokenId;
                const model = node.model;
                const creator = node.creator.toLowerCase();
                const owner = node.owner.toLowerCase();
                const position = node.position;
                let itemOwner = owner;
                if (position === "1") itemOwner = marketAddr;
                else itemOwner = owner;
                let _id = parseInt(tokenId);
                let _model = parseInt(model);
                let _baseURL = "";
                if (_model === 1) _baseURL = config.Ku_CollectorMaleURI;
                else _baseURL = config.Ku_CollectorFemaleURI;
                let tokenURI = _baseURL + _id.toString() + ".json";
                const uriRequest = {
                    method: 'get',
                    url: tokenURI,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {}
                };
                let uriResult;
                try {
                    uriResult = await axios(uriRequest);
                } catch (e) {
                    console.log("Failed to fetch URI for Collector");
                    return;
                }
                const name = uriResult.data.name;
                const description = uriResult.data.description;
                const mainData = uriResult.data.image;
                let extension = mainData.split(/[#?]/)[0].split('.').pop().trim() || "png";
                const assetType = extension === 'mp4' ? "video" : "image";
                const coverImage = "";
                const attributes = uriResult.data.attributes;
                const gameStats = uriResult.data["GameStats"];
                let item = await ItemModel.findOne({tokenId: tokenId, itemCollection: collection});
                if (!item) {
                    console.log("New Item for Collector ...");
                    const newItem = new ItemModel({
                        itemCollection: collection,
                        timestamp: timestamp,
                        txHash: txHash,
                        tokenId: tokenId,
                        creator: creator,
                        owner: owner,
                        itemOwner: itemOwner,
                        royalty: 0,
                        tokenURI: tokenURI,
                        model: model,
                        position: position,
                        assetType: assetType,
                        name: name,
                        description: description,
                        mainData: mainData,
                        coverImage: coverImage,
                        attributes: attributes,
                        gameStats: gameStats,
                        itemStatus: true,
                        likeCount: 0,
                        likes: [],
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                    await newItem.save();
                } else {
                    console.log("Update One for Collector ...");
                    await item.updateOne({
                        timestamp: timestamp,
                        txHash: txHash,
                        owner: owner,
                        itemOwner: itemOwner,
                        tokenURI: tokenURI,
                        position: position,
                        updated_at: new Date(),
                    });
                }
                if (latestTimestamp < timestamp) latestTimestamp = timestamp;
            }
            // Ku
            for (let i = 0; i < kus.length; i++) {
                const node = kus[i];
                // console.log("Ku Node: ", node);
                const timestamp = node.timestamp;
                const txHash = node.txhash;
                const collection = node.collection.toLowerCase();
                const tokenId = node.tokenId;
                const creator = node.creator.toLowerCase();
                const owner = node.owner.toLowerCase();
                const position = node.position;
                let itemOwner = owner;
                if (position === "1") itemOwner = marketAddr;
                else itemOwner = owner;
                let _id = parseInt(tokenId);
                let _baseURL = config.Ku_KuURI;
                let tokenURI = _baseURL + _id.toString() + ".json";
                const uriRequest = {
                    method: 'get',
                    url: tokenURI,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {}
                };
                let uriResult;
                try {
                    uriResult = await axios(uriRequest);
                } catch (e) {
                    console.log("Failed to fetch URI for Ku");
                    return;
                }
                const name = uriResult.data.name;
                const description = uriResult.data.description;
                const mainData = uriResult.data.image;
                let extension = mainData.split(/[#?]/)[0].split('.').pop().trim() || "png";
                const assetType = extension === 'mp4' ? "video" : "image";
                const coverImage = "";
                const attributes = uriResult.data.attributes;
                const gameStats = uriResult.data["GameStats"];
                let item = await ItemModel.findOne({tokenId: tokenId, itemCollection: collection});
                if (!item) {
                    console.log("New Item for Ku ...");
                    const newItem = new ItemModel({
                        itemCollection: collection,
                        timestamp: timestamp,
                        txHash: txHash,
                        tokenId: tokenId,
                        creator: creator,
                        owner: owner,
                        itemOwner: itemOwner,
                        royalty: 0,
                        tokenURI: tokenURI,
                        model: 0,
                        position: position,
                        assetType: assetType,
                        name: name,
                        description: description,
                        mainData: mainData,
                        coverImage: coverImage,
                        attributes: attributes,
                        gameStats: gameStats,
                        itemStatus: true,
                        likeCount: 0,
                        likes: [],
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                    await newItem.save();
                } else {
                    console.log("Update One for Ku...");
                    await item.updateOne({
                        timestamp: timestamp,
                        txHash: txHash,
                        owner: owner,
                        itemOwner: itemOwner,
                        tokenURI: tokenURI,
                        position: position,
                        updated_at: new Date(),
                    });
                }
                if (latestTimestamp < timestamp) latestTimestamp = timestamp;
            }
            // Backpack
            for (let i = 0; i < backpacks.length; i++) {
                const node = backpacks[i];
                const timestamp = node.timestamp;
                const txHash = node.txhas;
                const collection = node.collection.toLowerCase();
                const tokenId = node.tokenId;
                const model = node.model;
                const creator = node.creator.toLowerCase();
                const owner = node.owner.toLowerCase();
                const position = node.position;
                let itemOwner = owner;
                if (position === "1") itemOwner = marketAddr;
                else itemOwner = owner;
                let _id = parseInt(tokenId);
                let _model = parseInt(model);
                let _baseURL = "";
                if (_model === 1) _baseURL = config.Ku_BackpackClassicURI;
                else if (_model === 2) _baseURL = config.Ku_BackpackSpecialURI;
                else _baseURL = config.Ku_BackpackFounderURI;
                let tokenURI = _baseURL + that.createIndex(4, _id) + ".json";
                const uriRequest = {
                    method: 'get',
                    url: tokenURI,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {}
                };
                let uriResult;
                try {
                    uriResult = await axios(uriRequest);
                } catch (e) {
                    console.log("Failed to fetch URI for Backpack");
                    return;
                }
                const name = uriResult.data.name;
                const description = uriResult.data.description;
                const mainData = uriResult.data.image;
                let extension = mainData.split(/[#?]/)[0].split('.').pop().trim() || "png";
                const assetType = extension === 'mp4' ? "video" : "image";
                const coverImage = "";
                const attributes = uriResult.data.attributes;
                let attack = 0, defence = 0, health = 0, speed = 0, range = 0;
                for (let k = 0; k < attributes.length; k++) {
                    if (attributes[k].trait_type === "Attack") attack = attributes[k].value;
                    else if (attributes[k].trait_type === "Defence") defence = attributes[k].value;
                    else if (attributes[k].trait_type === "Health") health = attributes[k].value;
                    else if (attributes[k].trait_type === "Speed") speed = attributes[k].value;
                    else if (attributes[k].trait_type === "Range") range = attributes[k].value;
                }
                let item = await ItemModel.findOne({tokenId: tokenId, itemCollection: collection});
                if (!item) {
                    console.log("New Item for Backpack ...");
                    const newItem = new ItemModel({
                        itemCollection: collection,
                        timestamp: timestamp,
                        txHash: txHash,
                        tokenId: tokenId,
                        creator: creator,
                        owner: owner,
                        itemOwner: itemOwner,
                        royalty: 0,
                        tokenURI: tokenURI,
                        model: model,
                        position: position,
                        assetType: assetType,
                        name: name,
                        description: description,
                        mainData: mainData,
                        coverImage: coverImage,
                        // properties
                        attack: attack,
                        defence: defence,
                        health: health,
                        speed: speed,
                        range: range,
                        itemStatus: true,
                        likeCount: 0,
                        likes: [],
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                    await newItem.save();
                } else {
                    console.log("Update One for Backpack...");
                    await item.updateOne({
                        timestamp: timestamp,
                        txHash: txHash,
                        owner: owner,
                        itemOwner: itemOwner,
                        tokenURI: tokenURI,
                        position: position,
                        updated_at: new Date(),
                    });
                }
                if (latestTimestamp < timestamp) latestTimestamp = timestamp;
            }
            // Item
            for (let i = 0; i < items.length; i++) {
                const node = items[i];
                const timestamp = node.timestamp;
                const txHash = node.txhash;
                const collection = node.collection.toLowerCase();
                const tokenId = node.tokenId;
                const model = node.model;
                const creator = node.creator.toLowerCase();
                const owner = node.owner.toLowerCase();
                const position = node.position;
                let itemOwner = owner;
                if (position === "1") itemOwner = marketAddr;
                else itemOwner = owner;
                let _id = parseInt(tokenId);
                let _model = parseInt(model);
                let _baseURL = "";
                if (_model === 1) _baseURL = config.Ku_ItemKuberryURI;
                else if (_model === 2) _baseURL = config.Ku_ItemSamanutURI;
                else if (_model === 3) _baseURL = config.Ku_ItemMoonmelonURI;
                else _baseURL = config.Ku_ItemIronBeakURI;
                let tokenURI = _baseURL + that.createIndex(5, _id) + ".json";
                const uriRequest = {
                    method: 'get',
                    url: tokenURI,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {}
                };
                let uriResult;
                try {
                    uriResult = await axios(uriRequest);
                } catch (e) {
                    console.log("Failed to fetch URI for Item");
                    return;
                }
                const name = uriResult.data.name;
                const description = uriResult.data.description;
                const mainData = uriResult.data.image;
                let extension = mainData.split(/[#?]/)[0].split('.').pop().trim() || "png";
                const assetType = extension === 'mp4' ? "video" : "image";
                const coverImage = "";
                const attributes = uriResult.data.attributes;
                let attack = 0, defence = 0, health = 0, speed = 0, range = 0;
                for (let k = 0; k < attributes.length; k++) {
                    if (attributes[k].trait_type === "Attack") attack = attributes[k].value;
                    else if (attributes[k].trait_type === "Defence") defence = attributes[k].value;
                    else if (attributes[k].trait_type === "Health") health = attributes[k].value;
                    else if (attributes[k].trait_type === "Speed") speed = attributes[k].value;
                    else if (attributes[k].trait_type === "Range") range = attributes[k].value;
                }
                let item = await ItemModel.findOne({tokenId: tokenId, itemCollection: collection});
                if (!item) {
                    console.log("New Item for Item ...");
                    const newItem = new ItemModel({
                        itemCollection: collection,
                        timestamp: timestamp,
                        txHash: txHash,
                        tokenId: tokenId,
                        creator: creator,
                        owner: owner,
                        itemOwner: itemOwner,
                        royalty: 0,
                        tokenURI: tokenURI,
                        model: model,
                        position: position,
                        assetType: assetType,
                        name: name,
                        description: description,
                        mainData: mainData,
                        coverImage: coverImage,
                        // properties
                        attack: attack,
                        defence: defence,
                        health: health,
                        speed: speed,
                        range: range,
                        itemStatus: true,
                        likeCount: 0,
                        likes: [],
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                    await newItem.save();
                } else {
                    console.log("Update One for Item...");
                    await item.updateOne({
                        timestamp: timestamp,
                        txHash: txHash,
                        owner: owner,
                        itemOwner: itemOwner,
                        tokenURI: tokenURI,
                        position: position,
                        updated_at: new Date(),
                    });
                }
                if (latestTimestamp < timestamp) latestTimestamp = timestamp;
            }
            // Event node
            for (let index = 0; index < events.length; index++) {
                const node = events[index];
                const id = node.id;
                const timestamp = node.timestamp;
                const txHash = node.txhash;
                const collection = node.collection.toLowerCase();
                const tokenId = node.tokenId;
                const name = node.name;
                const from = node.from.toLowerCase();
                const to = node.to.toLowerCase();
                const price = that.toEth(node.price);
                let checkEvent = await EventModel.findOne({id: id});
                if (!checkEvent) {
                    let newEvent = new EventModel({
                        id: id,
                        timestamp: timestamp,
                        txHash: txHash,
                        itemCollection: collection,
                        tokenId: tokenId,
                        name: name,
                        from: from,
                        to: to,
                        price: price,
                    });
                    await newEvent.save();
                } else {
                    await checkEvent.updateOne({
                        timestamp: timestamp,
                        txHash: txHash,
                        itemCollection: collection,
                        tokenId: tokenId,
                        name: name,
                        from: from,
                        to: to,
                        price: price,
                    })
                }
                if (latestTimestamp < timestamp) latestTimestamp = timestamp;
            }
            // Pair node
            for (let index = 0; index < pairs.length; index++) {
                const node = pairs[index];
                const id = node.id;
                const timestamp = node.timestamp;
                const collection = node.collection.toLowerCase();
                const tokenId = node.tokenId;
                const owner = node.owner.toLowerCase();
                const price = node.price;
                const bValid = node.bValid;
                if (bValid) {
                    console.log("Update pair item");
                    await PairModel.findOneAndUpdate({id: id}, {
                        id: id,
                        timestamp: timestamp,
                        itemCollection: collection,
                        tokenId: tokenId,
                        owner: owner,
                        price: ethers.utils.formatEther(price),
                        bValid: bValid
                    }, {new: true, upsert: true});
                } else {
                    console.log("Remove pair item");
                    await PairModel.findOneAndDelete({id: id});
                }
                if (latestTimestamp < timestamp) latestTimestamp = timestamp;
            }
            // PlayerCards
            for (let i = 0; i < playerCards.length; i++) {
                const node = playerCards[i];
                const nodeId = node.id.toLowerCase();
                const timestamp = node.timestamp;
                const collectorId = node.collectorId;
                const backpackId = node.backpackId;
                const itemId = node.itemId;
                const kuId1 = node.kuId1;
                const kuId2 = node.kuId2;
                const kuId3 = node.kuId3;
                let playerOne = await PlayerCardModel.findOne({sId: nodeId});
                if (!playerOne) {
                    console.log("New Player-Collector ...");
                    const newPlayer = new PlayerCardModel({
                        sId: nodeId,
                        collectorId: collectorId,
                        backpackId: backpackId,
                        itemId: itemId,
                        kuId1: kuId1,
                        kuId2: kuId2,
                        kuId3: kuId3,
                        timestamp: timestamp,
                    });
                    await newPlayer.save();
                } else {
                    console.log("Update Player-Collector ...");
                    await playerOne.updateOne({
                        collectorId: collectorId,
                        backpackId: backpackId,
                        itemId: itemId,
                        kuId1: kuId1,
                        kuId2: kuId2,
                        kuId3: kuId3,
                        timestamp: timestamp,
                    })
                }
            }
            // BackpackCards
            for (let i = 0; i < backpackCards.length; i++) {
                const node = backpackCards[i];
                const nodeId = node.id.toLowerCase();
                const timestamp = node.timestamp;
                const backpackId = node.backpackId;
                const slotIdString = node.slotIds;
                let slotModels = [];
                let slotIds = [];
                let slotSplits = slotIdString.split('-');
                for (let k = 0; k < slotSplits.length; k++) {
                    let slotItemString = slotSplits[k].replace('(', '').replace(')', '');
                    if (slotItemString.indexOf('k') > -1) {
                        let slotId = parseInt(slotItemString.replace(/\D/g, ''));
                        slotModels.push(that.BACKPACK_KU);
                        slotIds.push(slotId)
                    } else if (slotItemString.indexOf('i') > -1) {
                        let slotId = parseInt(slotItemString.replace(/\D/g, ''));
                        slotModels.push(that.BACKPACK_ITEM);
                        slotIds.push(slotId)
                    }
                }
                let backpackOne = await BackpackCardModel.findOne({sId: nodeId});
                if (!backpackOne) {
                    console.log("New Player-Backpack ...");
                    const newBackpack = new BackpackCardModel({
                        sId: nodeId,
                        backpackId: backpackId,
                        slotModels: slotModels,
                        slotIds: slotIds,
                        timestamp: timestamp,
                    });
                    await newBackpack.save();
                } else {
                    console.log("Update Player-Backpack ...");
                    await backpackOne.updateOne({
                        backpackId: backpackId,
                        slotModels: slotModels,
                        slotIds: slotIds,
                        timestamp: timestamp,
                    })
                }
            }
            // KuCards
            for (let i = 0; i < kuCards.length; i++) {
                const node = kuCards[i];
                const nodeId = node.id.toLowerCase();
                const timestamp = node.timestamp;
                const kuId = node.kuId;
                const slotIdString = node.slotIds;
                let slotIds = [];
                let slotSplits = slotIdString.split('-');
                for (let k = 0; k < slotSplits.length; k++) {
                    if (!slotSplits[k]) continue;
                    let slotItemString = slotSplits[k].replace('(', '').replace(')', '');
                    let slotId = parseInt(slotItemString.replace(/\D/g, ''));
                    slotIds.push(slotId);
                }
                let kuOne = await KuCardModel.findOne({sId: nodeId});
                if (!kuOne) {
                    console.log("New Player-Ku ...");
                    const newKuOne = new KuCardModel({
                        sId: nodeId,
                        kuId: kuId,
                        slotIds: slotIds,
                        timestamp: timestamp,
                    });
                    await newKuOne.save();
                } else {
                    console.log("Update Player-Ku ...");
                    await kuOne.updateOne({
                        kuId: kuId,
                        slotIds: slotIds,
                        timestamp: timestamp,
                    })
                }
            }
            if (latestTimestamp === lastTimeStamp) latestTimestamp += 1;
            if (latestTimestamp > lastTimeStamp) {
                await setting.updateOne({timestamp: latestTimestamp});
            }
        } catch (e) {
            console.log("sync_events error: ", e);
        }
    },
    sync_block_post: async function (req, res, next) {
        await this.sleep(10000);
        return res.send({status: 'success', message: "Syncing is working well"});
    },
    init_collections: async function () {
        const init_data = [
            {
                address: ku_collector_address,
                owner: marketAddr,
                name: 'Ku_Collector',
                uri: '',
                isPublic: true,
                timestamp: parseInt(Date.now() / 1000)
            },
            {
                address: ku_ku_address,
                owner: marketAddr,
                name: 'Ku_Ku',
                uri: '',
                isPublic: true,
                timestamp: parseInt(Date.now() / 1000)
            },
            {
                address: ku_backpack_address,
                owner: marketAddr,
                name: 'Ku_Backpack',
                uri: '',
                isPublic: true,
                timestamp: parseInt(Date.now() / 1000)
            },
            {
                address: ku_item_address,
                owner: marketAddr,
                name: 'Ku_Item',
                uri: '',
                isPublic: true,
                timestamp: parseInt(Date.now() / 1000)
            }
        ];
        await CollectionModel.insertMany(init_data);
        console.log("Init Collections");
    },

    initHatches: async function () {
        // testing
        // const data = [
        //     {
        //         egg_id: "13255399-6ea7dcb81187898743-KRKU-KR_EGGS_1-00000001",
        //         ku_id: "5001"
        //     }, {
        //         egg_id: "13255864-6ea7dcb81187898743-KRKU-KR_EGGS_2-00000002",
        //         ku_id: "5002"
        //     }, {
        //         egg_id: "13270638-6ea7dcb81187898743-KRKU-KR_EGGS_3-00000003",
        //         ku_id: "5003"
        //     }, {
        //         egg_id: "13279389-6ea7dcb81187898743-KRKU-KR_EGGS_4-00000004",
        //         ku_id: "5004"
        //     }, {
        //         egg_id: "13724737-6ea7dcb81187898743-KRKU-KR_EGGS_5-00000005",
        //         ku_id: "5005"
        //     }, {
        //         egg_id: "13724761-6ea7dcb81187898743-KRKU-KR_EGGS_6-00000006",
        //         ku_id: "5006"
        //     }, {
        //         egg_id: "13724781-6ea7dcb81187898743-KRKU-KR_EGGS_7-00000007",
        //         ku_id: "5007"
        //     }, {
        //         egg_id: "14979368-6ea7dcb81187898743-KRKU-KR_EGGS_8-00000008",
        //         ku_id: "5008"
        //     }
        // ];
        const data = JSON.parse(fs.readFileSync(`${__dirname}/../egg-ku-matching.json`));
        for (let i = 0; i < data.length; i++) {
            let newHatch = new HatchModel({
                egg_id: data[i].egg_id,
                ku_id: data[i].ku_id,
                ku_address: "",
                mb_address: "",
                hatchStatus: true,
                airdropStatus: true,
                created_at: new Date(),
                updated_at: new Date(),
            });
            await newHatch.save();
        }
        console.log("Complete!")
    },
    func_kuEggs: async function (wallet) {
        let eggs = [];
        let axios_config = {
            method: 'get',
            url: config.ku_sub_link + wallet + "/nfts",
            headers: {'Content-Type': 'application/json'},
            data: {}
        };
        try {
            const result = await axios(axios_config);
            for (let i = 0; i < result.data.rmrk2.length; i++) {
                if (result.data.rmrk2[i].id.includes(config.ku_search_key)) eggs.push(result.data.rmrk2[i]);
            }
        } catch (e) {
            console.log("One more try: ", config.ku_sub_link + wallet + "/nfts");
            try {
                const result1 = await axios(axios_config);
                for (let i = 0; i < result1.data.rmrk2.length; i++) {
                    if (result1.data.rmrk2[i].id.includes(config.ku_search_key)) eggs.push(result1.data.rmrk2[i]);
                }
            } catch (e) {
                console.log("eggs axios error: ", e.message);
            }
        }
        return eggs;
    },
    func_checkEgg: async function (wallet, eggId) {
        let callData = JSON.stringify({
            query: `{
                nfts(where: {id: {_eq: "${eggId}"}, owner: {_eq: "${wallet}"}, collectionId: {_eq: "${config.ku_collector_id}"}}) {
                    id
                    forsale
                    collectionId
                    symbol
                    metadata
                    metadata_image
                    metadata_name
                    owner
                    rootowner
                }
            }`
        });
        let graph_config = {
            method: 'post',
            url: config.ku_gql_link,
            headers: {'Content-Type': 'application/json'},
            data: callData,
        };
        let eggs = [];
        let result;
        try {
            result = await axios(graph_config);
        } catch (e) {
            console.log("GraphQL call error...");
            return eggs;
        }
        const items = result.data.data.nfts;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let item_name = item.metadata_name;
            let item_image = item.metadata_image;
            let item_metadata = item.metadata;
            if (!item_name || !item_image) {
                try {
                    if (!item_metadata) continue;
                    let metaRes = await axios({
                        method: 'get',
                        url: item_metadata.replace("ipfs://", "https://ipfs.rmrk.link/"),
                        headers: {'Content-Type': 'application/json'}
                    });
                    item_name = metaRes.data.name;
                    item_image = metaRes.data.mediaUri;
                } catch (e1) {
                    console.log("Metadata Axios Error: ", e1);
                    continue;
                }
            }
            eggs.push({
                ...item,
                name: item_name,
                metadata: item_metadata.replace("ipfs://", "https://ipfs.rmrk.link/"),
                image: item_image.replace("ipfs://", "https://ipfs.rmrk.link/")
            })
        }
        return eggs;
    },
    func_kuEggsGql: async function (wallet) {
        let eggs = [];
        let callData = JSON.stringify({
            query: `{
                nfts(where: {rootowner: {_in: ["${wallet}"]}, collectionId: {_in: ["${config.ku_collector_id}"]}}, order_by: {block: desc}) {
                    id
                    forsale
                    collectionId
                    symbol
                    metadata
                    metadata_image
                    metadata_name
                    owner
                    rootowner
                }
            }`
        });
        let graph_config = {
            method: 'post',
            url: config.ku_gql_link,
            headers: {'Content-Type': 'application/json'},
            data: callData,
        };
        let result;
        try {
            result = await axios(graph_config);
        } catch (e) {
            console.log("GraphQL call error...");
            return eggs;
        }
        // console.log(result.data.data.nfts);
        const items = result.data.data.nfts;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let item_name = item.metadata_name;
            let item_image = item.metadata_image;
            let item_metadata = item.metadata;
            if (!item_name || !item_image) {
                try {
                    if (!item_metadata) continue;
                    let metaRes = await axios({
                        method: 'get',
                        url: item_metadata.replace("ipfs://", "https://ipfs.rmrk.link/"),
                        headers: {'Content-Type': 'application/json'}
                    });
                    item_name = metaRes.data.name;
                    item_image = metaRes.data.mediaUri;
                } catch (e1) {
                    console.log("Metadata Axios Error: ", e1);
                    continue;
                }
            }
            eggs.push({
                ...item,
                name: item_name,
                metadata: item_metadata.replace("ipfs://", "https://ipfs.rmrk.link/"),
                image: item_image.replace("ipfs://", "https://ipfs.rmrk.link/")
            })
        }
        return eggs;
    },
    getKuEggs: async function (req, res, next) {
        let eggs = [];
        if (req.params.wallet) {
            // eggs = await this.func_kuEggs(req.params.wallet);
            eggs = await this.func_kuEggsGql(req.params.wallet);
        }
        return res.send({status: 'success', eggs: eggs});
    },
    verifyHatchSig: async function (req, res, next) {
        let signature = req.body.signature;
        let mb_address = req.body.mb_address;
        let ku_address = req.body.ku_address;
        const msg = "Please sign to verify your kuverse account. " + mb_address.toLowerCase();
        const {isValid} = signatureVerify(msg, signature, ku_address);
        let _result = {status: 'success', kusama_wallet: ku_address, evm_wallet: mb_address};
        if (isValid) {
            // let eggs = await this.func_kuEggs(ku_address);
            let eggs = await this.func_kuEggsGql(ku_address);
            for (let i = 0; i < eggs.length; i++) {
                await HatchModel.updateOne({egg_id: eggs[i].id}, {ku_address: ku_address, mb_address: mb_address.toLowerCase()});
            }
            return res.send(_result);
        } else {
            _result.status = 'error';
            return res.send(_result);
        }
    },
    hatchEgg: async function (req, res, next) {
        const that = this;
        await that.sleep(20000);  // waiting for egg transfer
        let ku_address = req.body.ku_address;
        let egg_id = req.body.egg_id;
        let checkItem = await HatchModel.findOne({ku_address: ku_address, egg_id: egg_id});
        if (!checkItem) return res.send({status: 'error', message: 'Failed to find the EGG.'});
        if (!checkItem.hatchStatus || !checkItem.airdropStatus) return res.send({status: 'error', message: 'The egg is hatched already.'});
        let check_egg_to_hatch = await this.func_checkEgg(config.hatchKuAddress, egg_id);
        console.log("check_egg_to_hatch: ", check_egg_to_hatch);
        if (!check_egg_to_hatch.length) return res.send({status: 'error', message: 'Failed to search the EGG.'});
        console.log("hatching...");
        const provider = new ethers.providers.JsonRpcProvider(config.jsonRPC);
        const signer = new ethers.Wallet(config.hatchKey, provider);
        const koreContracts = new ethers.Contract(config.governanceToken, getKoreABI(), signer);
        const kuContracts = new ethers.Contract(config.Ku_KuAddress, getKuABI(), signer);
        try {
            // Mint Ku NFT for egg
            const kuTx = await kuContracts.hatch(checkItem.mb_address, checkItem.ku_id);
            console.log("kuTx: ", kuTx.hash);
            const receipt = await kuTx.wait(2);
            console.log("receipt: ", receipt.confirmations);
            await that.sleep(60000);  // wait for subsquid syncing
            await checkItem.updateOne({hatchStatus: false, updated_at: new Date()});
            // Airdrop Kore Token
            const koreTx = await koreContracts.airdrop(checkItem.mb_address);
            console.log("koreTx: ", koreTx.hash);
            const recKore = await koreTx.wait(2);
            console.log("recKore: ", recKore.confirmations);
            await checkItem.updateOne({airdropStatus: false, updated_at: new Date()});
            await that.sleep(20000);
            const hatchKuNode = await ItemModel.findOne({txHash: kuTx.hash}, {_id: 0, __v: 0});
            console.log("hatchKuNode: ", hatchKuNode?.name);
            console.log("Hatching is completed!");
            return res.send({status: 'success', koreHash: koreTx.hash, kuHash: kuTx.hash, kuNode: hatchKuNode});
            // return res.send({status: 'success', koreHash: "", kuHash: "", kuNode: null});
        } catch (e) {
            console.log("Hatch Error: ", e.message);
            return res.send({status: 'error', message: 'Failed to hatch'});
        }
    },
    getHatchCount: async function (req, res, next) {
        let count = await HatchModel.countDocuments({hatchStatus: false});
        return res.send({status: 'success', count: count});
    },
});
