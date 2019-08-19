const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackStaticAssetsPlugin = require("../index");

module.exports = (pp, options = {}) => {
  const compiler = webpack({
    mode: "production",
    entry: "./index.js",
    output: {
      path: __dirname + "/testDist",
      filename: "index_bundle.js"
    },
    plugins: [new HtmlWebpackPlugin(), new HtmlWebpackStaticAssetsPlugin(...pp)]
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

      resolve(stats);
    });
  });
};
