var webpack = require('webpack');

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

var config = {
	entry: "./src/scripts/index.tsx",
	output: {
		filename: isProduction ? "./dist/bundle.[hash].min.js" : "./dist/bundle.js"
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},
	module: {
		loaders: [
			{test: /\.tsx?$/, loader: "ts-loader"}
		]
	},
	plugins: plugins
};

module.exports = config;