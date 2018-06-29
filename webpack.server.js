
var path = require("path")
    fs = require("fs")
    webpack = require("webpack")
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const nodeModules = fs.readdirSync("./node_modules").filter(d => d != ".bin");
function ignoreNodeModules(context, request, callback ) {
    if(request[0] == "."){ // ignore relative paths
        return callback();
    }

    const module = request.split("/")[0];
    if( nodeModules.indexOf(module) !== -1) {
        return callback( null, "commonjs " + request );
    }
    return callback();
}

function createConfig(isDebug) {

    const plugins = [];
    if( !isDebug ) {
        plugins.push( new UglifyJsPlugin());
    }

    /** Webpack config */
    return {
        target: "node",
        devtool: "source-map",
        mode: 'development',
        entry: "./src/server/server.js",
        output: {
            path: path.join(__dirname, "build"),
            filename: "server.js"
        },
        resolve: {
            alias: {
                shared: path.join(__dirname, "src", "shared")
            }
        },
        module: {
            rules: [
             {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {emitWarning: true}

             },
             {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
             },
            ]
        },
        externals: [ignoreNodeModules], // this hooks in the above created method.
        plugins: plugins


    };
}

module.exports = createConfig(true);
module.exports = createConfig;
