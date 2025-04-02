const config = require('./config')();
const mongoose = require("mongoose");
const sync_controller = require('./controllers/SyncController');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const loopSyncBlock = async () => {
    while (1) {
        try {
            await sync_controller.execute();
        } catch (e) {
            console.log("Loop Sync Block: ", e.message);
        }
        await sleep(3000);
    }
};

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db_name,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true},
    async function (err, db) {
        let d = new Date();
        if (err) {
            console.log('[' + d.toLocaleString() + '] ' + 'Sorry, there is no mongo db server running.');
        } else {
            // await sync_controller.init_collections();
            // await sync_controller.initHatches();
            await sync_controller.init();
            await loopSyncBlock();
        }
    });
