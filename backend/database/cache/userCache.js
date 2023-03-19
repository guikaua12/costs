const NodeCache = require('node-cache');

const cache = new NodeCache({
    stdTTL: 300,
    checkperiod: 300
});

module.exports = cache;