/* @flow */

import hasYarn from "has-yarn";

export type Options = {
  hook: string,
  directory: string,
  remote: string,
  branch: string,
  anyBranch: boolean,
  yarn: boolean,
  commit: boolean | string,
  push: boolean
};

export const defaultOptions: Options = {
  hook: "build",
  directory: "dist",
  remote: "origin",
  branch: "gh-pages",
  yarn: hasYarn (),
  anyBranch: false,
  commit: true,
  push: true
};
