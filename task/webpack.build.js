

var HtmlWebpackPlugin = require('html-webpack-plugin');

var common = require("./common");

var config = {
    entry: {
        index: ['./src/example.js'],
    },
    output: {
        path: "./build",
        filename: '[name].js?[hash:8]'
    },
};

common.plugins.push(
    new HtmlWebpackPlugin({
        title: "",
        inject: false,
        template: "./src/example.template.html",
        filename: "index.html",
    })
);



Object.keys(config).forEach(function (item, key) {
    common[item] = config[item];
});

module.exports = common;

