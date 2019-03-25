var dotenv = require('dotenv');
dotenv.config();

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var PORT = 8080;
var HOST = 'localhost'
var argv = process.argv || [];

if (argv.indexOf('--port') > -1) {
    PORT = argv[argv.indexOf('--port') + 1]
}

if (argv.indexOf('--host') > -1) {
    HOST = argv[argv.indexOf('--host') + 1]
}

var isProduction = argv.indexOf('--production') != -1;
var isBuildForCordova = argv.indexOf('--cordova') != -1;
var isRunningOnServer = argv.find(v => v.includes('webpack-dev-server'))

var plugins = [];

var entryPoints = [
    './styles/index.css',
    './src/test-index.tsx'
];

if (isProduction) {
    // Adding Production environment specific features.

    plugins.push(
        new webpack.optimize.UglifyJsPlugin({  // Used for minification of .js and .css files.
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'API_URL': JSON.stringify(process.env.API_URL),
                'SERVER_URL': JSON.stringify(process.env.SERVER_URL),
            }
        })
    );
} else {
    // Adding Development environment specific features.
    if (isRunningOnServer) {
        entryPoints.push(
            'webpack/hot/only-dev-server'  // Used to enable hot reloading in webpack.
        );
    }

    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'API_URL': JSON.stringify(process.env.API_URL),
                'SERVER_URL': JSON.stringify(process.env.SERVER_URL),
            }
        })
    );
}

plugins.push(
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.ejs'
    }),
    new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
    new webpack.optimize.ModuleConcatenationPlugin()
);

var config = {
    entry: entryPoints,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProduction ? 'bundle.[hash].min.js' : 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true
    },
    devtool: 'source-map',
    resolve: {
        modules: [
            path.resolve('./src'),
            "node_modules"
        ],
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.json', '.ejs'],
        enforceExtension: false
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'tslint-loader', exclude: /node_modules/, enforce: 'pre'},
            {test: /\.tsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'ts-loader']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})},
            {test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'},
            {test: /\.(jpg|jpeg|gif|png)$/, loader: 'url-loader?limit=10&mimetype=image/(jpg|jpeg|gif|png)&name=images/[name].[ext]'},
            {test: /\.json$/, loader: 'json-loader' },
            {test: /\.ejs$/, loader: 'ejs-loader' }
        ],
        noParse: /node_modules\/json-schema\/lib\/validate\.js/
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    plugins: plugins,
};

if (isRunningOnServer) {
    config.devServer = {
        historyApiFallback: true
    }
}

module.exports = config;

