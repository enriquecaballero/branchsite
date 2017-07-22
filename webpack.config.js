var webpack = require ("webpack");
var path = require ("path");
var fs = require ("fs");
var UglifyJsPlugin = require ("uglifyjs-webpack-plugin");

const packageJSON = JSON.parse (
  fs.readFileSync (path.resolve (__dirname, "package.json"), "utf8")
);

module.exports = {
  entry: [ path.resolve (__dirname, "src", "index.js") ],
  output: {
    path: path.resolve (__dirname, "lib"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  target: "node",
  resolve: {
    extensions: [ "*", ".js" ]
  },
  externals: Object.keys (
    Object.assign ({}, packageJSON.peerDependencies, packageJSON.dependencies)
  ).reduce (function (previous, key) {
    return Object.assign ({}, previous, {
      [key]: key
    });
  }, {}),
  plugins: [
    new webpack.BannerPlugin ({ banner: "#!/usr/bin/env node", raw: true }),
    new UglifyJsPlugin ()
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
