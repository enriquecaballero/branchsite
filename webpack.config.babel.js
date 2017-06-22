/* eslint-disable no-console, import/no-unresolved */

import webpack from "webpack";
import path from "path";
import fs from "fs";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

export const packageJSON = JSON.parse (
  fs.readFileSync (path.resolve (__dirname, "package.json"), "utf8")
);

export const babelrc = JSON.parse (
  fs.readFileSync (path.resolve (__dirname, ".babelrc"), "utf8")
);

export const externals = (function () {
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
}) ();

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
  externals,
  plugins: [
    new webpack.BannerPlugin ({ banner: "#!/usr/bin/env node", raw: true }),
    new UglifyJsPlugin ()
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: babelrc.presets.map (
            preset =>
              preset === "es2015" ? [ "es2015", { modules: false } ] : preset
          ),
          plugins: [ ...babelrc.plugins ]
        }
      }
    ]
  }
};
