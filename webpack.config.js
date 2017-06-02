const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    context: __dirname + "/public-src/js",
    devtool: "inline-source-map",
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        "./index.js"
    ],
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/js",
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [ 'babel-loader', ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader?sourceMap=true', 'sass-loader?sourceMap=true']
                })
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            // {
            //     test: /\.svg$/,
            //     use: "file-loader"
            // },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader" }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new ExtractTextPlugin({
            publicPath: __dirname + "/dist",
            filename: "bundle.css",
            allChunks: true,
        })
    ],
    devServer: {
        compress: true,
        hot: true,
        stats: {colors: true},
        contentBase: path.join(__dirname, "public-src"),
        proxy: {
            "/main": "http://localhost:8000",
            "/region": "http://localhost:8000",
            "/getsubmenu": "http://localhost:8000",
            "/getmapdata": "http://localhost:8000",
            "/render": "http://localhost:8000",
            "/claster_layers": "http://localhost:8000",
            "/data_bubble": "http://localhost:8000",
            "/ato": "http://localhost:8000",
        }
    },
    resolve: {
        modules: [path.resolve(__dirname, "public-src"), "node_modules"]
    }
};