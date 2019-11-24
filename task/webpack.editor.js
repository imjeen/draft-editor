
var common = require("./common");

var config = {
    entry: {
        index: ['./src/index.js'],
    },
    output: {
        path: "./dist",
        filename: '[name].js?[hash:8]'
    },
};

Object.keys(config).forEach(function (item, key) {
    common[item] = config[item];
});

module.exports = common;
