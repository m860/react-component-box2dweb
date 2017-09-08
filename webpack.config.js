var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

if (!process.env['NODE_ENV']) {
	process.env['NODE_ENV'] = 'development';
}


console.log('==============================');
console.log('NODE_ENV:' + process.env['NODE_ENV']);
console.log('==============================');

var isProduction = function () {
	return process.env['NODE_ENV'] !== 'development';
};

var plugins = [
	new HtmlWebpackPlugin({
		filename: "index.html",
		template: './src/index.html',
		inject: false
	}),
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: [
				autoprefixer({
					browsers: ['> 5%']
				})
			]
		}
	}),
	new ExtractTextPlugin(isProduction() ? "[contenthash].css" : "[name].[contenthash].css"),
	new webpack.optimize.CommonsChunkPlugin({
		name: "vendor",
		minChunks: function (module) {
			return module.context && module.context.indexOf('node_modules') !== -1;
		}
	}),
	new CleanWebpackPlugin(['dist'], {
		root: __dirname,
		verbose: true,
		dry: false
	}),
	new webpack.DefinePlugin({
		process:{
			env:{
				NODE_ENV: JSON.stringify(process.env['NODE_ENV'])
			}
		}
	})
];

if (isProduction()) {
	plugins.push(new UglifyJSPlugin({
		comments: false,
		compress: {
			warnings: false,
			drop_console: true
		}
	}));
}

module.exports = {
	entry: {
		index: './src/App.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: isProduction() ? '[name].[hash].js' : '[name].[hash].js',
		chunkFilename: isProduction() ? "[chunkhash].js" : "[name].[chunkhash].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					"babel-loader",
					{
						loader: "eslint-loader"
					}
				],
				exclude: [
					path.resolve(__dirname, "node_modules")
				],
				include: [
					path.resolve(__dirname, "src")
				]
			}, {
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader"
					}, {
						loader: "postcss-loader"
					}, {
						loader: "sass-loader"
					}]
				})
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader"
					}]
				})
			}, {
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: isProduction() ? "file-loader" : "file-loader?name=[name].[ext]"
			}, {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: isProduction() ? "url-loader?limit=10000&mimetype=application/font-woff" : "url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]"
			}, {
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					isProduction() ? 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]' : 'file-loader?hash=sha512&digest=hex&name=[name].[ext]',
					'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	},
	plugins: plugins,
	resolve: {
		alias: {
			config: path.join(__dirname, 'src/config/app.' + process.env['NODE_ENV'] + '.config.js')
		}
	}
}