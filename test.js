let fs = require('fs');
let {create} = require("ipfs-http-client");

const ipfsClient = create({
    preload: {enabled: false},
    host: 'ipfs.audioburst.io',
    port: 443,
    protocol: 'https',
});

let imagePath = __dirname + "\\logo192.png";
console.log(imagePath);
let buffer = fs.readFileSync(imagePath);
console.log(buffer);
ipfsClient.add(buffer).then(hash => {
    console.log(hash)
}).catch(error => {
    console.log("Hash: ", error.message)
});

