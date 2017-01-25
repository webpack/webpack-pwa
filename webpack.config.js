const path = require("path");
const OfflinePlugin = require("offline-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ appShell } = {}) => ({
	entry: appShell ? {
		shell: "./app/shell.js"
	} : {
		dashboard: "./app/dashboard.js",
		login: "./app/login.js",
		admin: "./app/admin.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]-[chunkhash].js",
		chunkFilename: "[chunkhash].js"
	},
	module: {
		rules: [
			{
				test: /\.html/,
				use: "html-loader"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "dashboard.html",
			chunks: !appShell && ["dashboard"]
		}),
		new HtmlWebpackPlugin({
			filename: "login.html",
			chunks: !appShell && ["login"]
		}),
		new HtmlWebpackPlugin({
			filename: "admin.html",
			chunks: !appShell && ["admin"]
		}),
		new OfflinePlugin()
	]
});