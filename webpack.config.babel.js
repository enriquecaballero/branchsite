/* eslint-disable no-console, import/no-unresolved */

import webpack from "webpack";
import path from "path";
import fs from "fs";

const packageJSON = JSON.parse (
  fs.readFileSync (path.resolve (path.resolve (__dirname, "package.json")), "utf8")
);

function createExternalDependencies () {
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
}

export default {
  entry: [ path.resolve (__dirname, "src", "index.js") ],
  output: {
    path: path.resolve (__dirname, "lib"),
    filename: "index.js"
  },
  externals: createExternalDependencies (),
  resolve: {
    extensions: [ "*", ".js" ]
  },
  plugins: [
    new webpack.BannerPlugin ({ banner: "#!/usr/bin/env node", raw: true })
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
