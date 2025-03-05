// webpack.config.js
const webpack = require("webpack");

module.exports = {
    resolve: {
        alias: {
            "node:process": "process",
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};
