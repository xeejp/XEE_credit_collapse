module.exports = [{
    entry: ["./host/index.js"],
    output: {
        path: "./",
        filename: "host.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel"
        }]
    },
    resolve: {
        extensions: [
            "", ".js"
        ],
        modulesDirectories: [
            "node_modules",
        ]
    }
}, {
    entry: ["./participant/index.js"],
    output: {
        path: "./",
        filename: "participant.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel"
        }]
    },
    resolve: {
        extensions: [
            "", ".js"
        ],
        modulesDirectories: [
            "node_modules",
        ]
    }
}];
