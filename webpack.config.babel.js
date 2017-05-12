/* eslint-disable no-console, import/no-unresolved */

import webpack from "webpack";
import path from "path";
import fs from "fs";

export const packageJSON = JSON.parse (
  fs.readFileSync (path.resolve (path.resolve (__dirname, "package.json")), "utf8")
);

export default {
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
  externals: (function () {
    const externals = {};
    const { peerDependencies, dependencies } = packageJSON;
    const set = _dependencies => {
      Object.keys (_dependencies).map (dependency => {
        externals[dependency] = dependency;
      });
    };
    if (dependencies) set (dependencies);
    if (peerDependencies) set (peerDependencies);
    return externals;
  }) (),
  plugins: [
    new webpack.BannerPlugin ({ banner: "#!/usr/bin/env node", raw: true })
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        use: "json-loader"
      }
    ]
  }
};
