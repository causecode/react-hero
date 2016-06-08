var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProduction = process.argv.indexOf('--production') != -1;

var plugins = [];

var entryPoints = [
	'./src/styles/index.css',
	'./src/index.tsx'
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
				'NODE_ENV': JSON.stringify('production')
			}
		})
	);
} else {
	// Adding Development environment specific features.

	entryPoints.push(
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'  // Used to enable hot reloading in webpack.
	)
}

plugins.push(
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'index.ejs'
	}),
	new ExtractTextPlugin("style.css", {allChunks: true})
);

var config = {
	entry: entryPoints,
	output: {
		path:"./dist",
		filename: isProduction ? "bundle.[hash].min.js" : "bundle.js",
	},
	devtool: 'source-map',
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		loaders: [
			{test: /\.tsx?$/, exclude: /(node_modules)/, loaders: ["react-hot", "ts-loader"]},
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000'}
		]
	},
	plugins: plugins
};

module.exports = config;