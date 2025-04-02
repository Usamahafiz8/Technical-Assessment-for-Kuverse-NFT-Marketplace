const test_config = {
    mode: 'live',
    server_ip: '',
    port: 5000,
    // base_url: "http://127.0.0.1:5000",
    base_url: "https://test.kuverse.app",
    mongo: {
        host: '127.0.0.1',
        port: 27017,
        db_name: 'Kuverse'
    },
    jwtToken: "KuVerse-JWT",
    startBlock: 3848000,
    syncBlock: 3848000,
    timestamp: 6000000,
    jsonRPC: "https://rpc.api.moonbase.moonbeam.network",  // MoonBase
    governanceToken: "0x73882eC030823e612496dCCcDCf23DD23dDf7D34",  // kore
    Ku_CollectorAddress: "0xEc60ACbC8827aA170A397CDc210C389159ff8698",
    Ku_BackpackAddress: "0x189A6D39559f9272771724e08D28375f7C18A1A9",
    Ku_KuAddress: "0x3ca2D7FF6f7a2b858446B3d47D4c50Bb3F96f8E6",
    Ku_ItemAddress: "0xE0eA8631C65da0cb2D768ACBadb9257d58ac6fF1",
    Ku_CollectorMaleURI: "https://kuverse.mypinata.cloud/ipfs/QmfZJpU6K68ha41jhseZ9fw8Gou5xzFGXeUXKfCmnzJntN/",
    Ku_CollectorFemaleURI: "https://kuverse.mypinata.cloud/ipfs/QmQhgNKNyQeLKkeXwmzsyGb9H3VumMCEJVzsXmsqJtXsf6/",
    Ku_BackpackClassicURI: "https://kuverse.mypinata.cloud/ipfs/QmQhGe7qD5wxVJqmCbdBGZretkz6V3tWoAWpqTkzDAKth2/",
    Ku_BackpackSpecialURI: "https://kuverse.mypinata.cloud/ipfs/QmUqvUHqEGh3W6p2Wche9WEuw8CUeJYWUXiRgai7fTZbcX/",
    Ku_BackpackFounderURI: "https://kuverse.mypinata.cloud/ipfs/QmdobGEZYVoQEqNi2E4PQiidWBi7zeFtBcZhJJCcweCtbu/",
    Ku_KuURI: "https://kuverse.mypinata.cloud/ipfs/QmVvyJSqevL4w1bH3e5aPypWiPiKKZjWecQwbmPWvD2My2/",
    Ku_ItemKuberryURI: "https://kuverse.mypinata.cloud/ipfs/QmSw5w9S57QvA5kMu9KMNeUTxXMeaSvNojEnLwm1ymb4sb/",
    Ku_ItemSamanutURI: "https://kuverse.mypinata.cloud/ipfs/QmcE7AaXFYiK6yxuJXxW4DXSWmKnBN1EPfYmB1SxmSf6co/",
    Ku_ItemMoonmelonURI: "https://kuverse.mypinata.cloud/ipfs/QmVmKULD82g3hb1W2E9BKpusb9HF6MNzfvjmeHbSb1dwr8/",
    Ku_ItemIronBeakURI: "https://kuverse.mypinata.cloud/ipfs/QmRKQ6xGyuTWX8hV9617R23y8SPMBZnK3UKQhejbNXVf7N/",
    marketAddr: "0x9A4F724de858Ad4376f9b183D0D226c3bA88366E",
    auctionAddr: "auction_address",
    playerAddress: "0xe555a2b565F203b329357f6D1Eaa8D9C2689a172",
    // graphql: "https://api.thegraph.com/subgraphs/name/chenxiwang177/kuverse-mbase",
    graphql: "https://squid.subsquid.io/kuverse-moonbase/v/v1/graphql", // MoonBase Test
    pageLimit: 12,
    profilePic: "https://kuverse.mypinata.cloud/ipfs/QmZFskuC4GD93nktkfzGum3tWMEYa2W5u72XuBngSk6EMp",
    profileCover: "https://ipfs.io/ipfs/QmfHZw5sZucRfZvqfPW1MBLAeHJUb5k8m8V4jjD8tbtqwX",
    ku_sub_link: "https://sub.id/api/v1/",
    ku_gql_link: "https://gql-rmrk2-prod.graphcdn.app",
    ku_search_key: "6ea7dcb81187898743-KRKU-KR_EGGS",  // Test
    ku_collector_id: "6ea7dcb81187898743-KRKU",        // Test
    hatchKey: "6b3cf791aa50fa826ca1af796b27478d83a5ea5053148c0950ab33e129093dad",
    hatchAddress: "0x3297555eCfEF81b2e7d4FB6f5Eb6066457d8c7f1",
    hatchKuAddress: "GAcwWJ8TxL2AePtFsUPefuwChEq1EkTLMwBNsEtMNdMYePB",
};
const live_config = {
    mode: 'live',
    server_ip: '',
    port: 5000,
    // base_url: "http://127.0.0.1:5000",
    base_url: "https://kuverse.app",
    mongo: {
        host: '127.0.0.1',
        port: 27017,
        db_name: 'KuverseLive'
    },
    jwtToken: "KuVerse-JWT",
    startBlock: 2647800,
    syncBlock: 2647800,
    timestamp: 6000000,
    jsonRPC: "https://rpc.exosama.com",  // Exosama
    governanceToken: "0x8fFaf4d46cBC847E7D573B929297cD004DFe324b",  // kore
    Ku_CollectorAddress: "0xEc60ACbC8827aA170A397CDc210C389159ff8698",  // Pending
    Ku_BackpackAddress: "0x189A6D39559f9272771724e08D28375f7C18A1A9",  // Pending
    Ku_KuAddress: "0xdD95Ba0418CA46677f11c9FBf915Caa4b210bD99",
    Ku_ItemAddress: "0xE0eA8631C65da0cb2D768ACBadb9257d58ac6fF1",  // Pending
    Ku_CollectorMaleURI: "https://kuverse.mypinata.cloud/ipfs/QmfZJpU6K68ha41jhseZ9fw8Gou5xzFGXeUXKfCmnzJntN/",
    Ku_CollectorFemaleURI: "https://kuverse.mypinata.cloud/ipfs/QmQhgNKNyQeLKkeXwmzsyGb9H3VumMCEJVzsXmsqJtXsf6/",
    Ku_BackpackClassicURI: "https://kuverse.mypinata.cloud/ipfs/QmQhGe7qD5wxVJqmCbdBGZretkz6V3tWoAWpqTkzDAKth2/",
    Ku_BackpackSpecialURI: "https://kuverse.mypinata.cloud/ipfs/QmUqvUHqEGh3W6p2Wche9WEuw8CUeJYWUXiRgai7fTZbcX/",
    Ku_BackpackFounderURI: "https://kuverse.mypinata.cloud/ipfs/QmdobGEZYVoQEqNi2E4PQiidWBi7zeFtBcZhJJCcweCtbu/",
    Ku_KuURI: "https://kuverse.mypinata.cloud/ipfs/QmVvyJSqevL4w1bH3e5aPypWiPiKKZjWecQwbmPWvD2My2/",
    Ku_ItemKuberryURI: "https://kuverse.mypinata.cloud/ipfs/QmSw5w9S57QvA5kMu9KMNeUTxXMeaSvNojEnLwm1ymb4sb/",
    Ku_ItemSamanutURI: "https://kuverse.mypinata.cloud/ipfs/QmcE7AaXFYiK6yxuJXxW4DXSWmKnBN1EPfYmB1SxmSf6co/",
    Ku_ItemMoonmelonURI: "https://kuverse.mypinata.cloud/ipfs/QmVmKULD82g3hb1W2E9BKpusb9HF6MNzfvjmeHbSb1dwr8/",
    Ku_ItemIronBeakURI: "https://kuverse.mypinata.cloud/ipfs/QmRKQ6xGyuTWX8hV9617R23y8SPMBZnK3UKQhejbNXVf7N/",
    marketAddr: "0x9A4F724de858Ad4376f9b183D0D226c3bA88366E",  // Pending
    auctionAddr: "auction_address",
    playerAddress: "0xe555a2b565F203b329357f6D1Eaa8D9C2689a172",  // Pending
    graphql: "https://squid.subsquid.io/kuverse-exosama/v/v1/graphql", // Exosama Live
    pageLimit: 12,
    profilePic: "https://kuverse.mypinata.cloud/ipfs/QmZFskuC4GD93nktkfzGum3tWMEYa2W5u72XuBngSk6EMp",
    profileCover: "https://ipfs.io/ipfs/QmfHZw5sZucRfZvqfPW1MBLAeHJUb5k8m8V4jjD8tbtqwX",
    ku_sub_link: "https://sub.id/api/v1/",
    ku_gql_link: "https://gql-rmrk2-prod.graphcdn.app",
    ku_search_key: "66241b171becfd500e-EGG-KU_EGG",  // Live
    ku_collector_id: "66241b171becfd500e-EGG",        // Live
    hatchKey: "15be4079af5e224b7f41ba66d6127fb138785b3f5f27e7c90ad433bdf78368c7",
    hatchAddress: "0xaa43e8ed4264e7c9f2dc6be08a51de8b3a71cb29",
    hatchKuAddress: "GAcwWJ8TxL2AePtFsUPefuwChEq1EkTLMwBNsEtMNdMYePB",
};
const mode = 'test';
module.exports = function () {
    // console.log("mode: ", mode);
    if (mode === 'test') return test_config;
    else return live_config;
};