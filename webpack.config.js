const path = require("path");
const OfflinePlugin = require("offline-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ appShell, output = "." } = {}) => ({
	entry: appShell ? {
		// App Shell has only a single entry point
		// this entry point loads pages with import()
		shell: "./app/shell.js"
	} : {
		// Page Shell requires an entry point per page
		dashboard: "./app/dashboard.js",
		login: "./app/login.js",
		admin: "./app/admin.js"
	},
	output: {
		path: path.resolve(__dirname, "dist", output),
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
		// Generate a HTML page per page
		// This could be replace by some server logic or SSR
		// For the Page Shell each HTML page need to reference the correct entry point
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
		// Offline support
		new OfflinePlugin({
			caches: {
				main: [
					// These assets don't have a chunk hash.
					// SW fetch them on every SW update.
					"dashboard.html",
					"login.html",
					"admin.html"
				],
				additional: [
					// All other assets have a chunk hash.
					// SW only fetch them once.
					// They'll have another name on change.
					":rest:"
				]
			},
			// To remove a warning about additional need to have hash
			safeToUseOptionalCaches: true,
			// "additional" section is fetch only once.
			updateStrategy: "changed"
		})
	]
});