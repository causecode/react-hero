var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProduction = process.argv.indexOf('--production') != -1;

var plugins = [];
if (isProduction) {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	);
}

plugins.push(
	new ExtractTextPlugin("style.css", {allChunks: true})
);

var config = {
	entry: [
		"./src/styles/index.css",
		"./src/index.tsx",
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'
	],
	output: {
		path:"./dist",
		filename: isProduction ? "bundle.[hash].min.js" : "bundle.js",
		publicPath: "http://localhost:8080/dist"
	},
	devtool: 'source-map',
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		loaders: [
			{test: /\.tsx?$/, exclude: /(node_modules)/, loaders: ["react-hot", "ts-loader"]},
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
		]
	},
	plugins: plugins
};

module.exports = config;