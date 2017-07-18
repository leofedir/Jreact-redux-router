const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const prod = process.argv.indexOf('-p') !== -1;

const config = {

    context: __dirname + "/public-src/js",
    // devtool: "inline-source-map",
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        prod ? '' : 'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        "./index.js"
    ],
    output: {
        path: __dirname + "/public-src/dist",
        filename: "bundle.js",
        publicPath: "/dist/",
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['babel-loader',],
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
            {
                test: /\.png$/,
                use: "file-loader"
            },
            {
                test: /\.gif$/,
                use: "file-loader"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader"}
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
                warnings    : false,
                drop_console: true,
                unsafe      : true
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new ExtractTextPlugin({
            publicPath: __dirname + "/public-src/dist",
            filename: "bundle.css",
            allChunks: true,
        }),
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
            "/info": "http://localhost:8000",
            "/kadastr": "http://localhost:8000"
        }
    },
    resolve: {
        modules: [path.resolve(__dirname, "public-src"), "node_modules"]
    }
};

if (!prod) {
    config.entry = [
        'react-hot-loader/patch',
        // activate HMR for React

       'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        "./index.js"
    ]
} else {
    config.entry = [
        'react-hot-loader/patch',
        // activate HMR for React

        // 'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        "./index.js"
    ]
}

module.exports = config;

