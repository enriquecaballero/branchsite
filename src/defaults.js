import hasYarn from "has-yarn";

export const defaultOptions = {
  hook: "build",
  directory: "dist",
  remote: "origin",
  branch: "gh-pages",
  yarn: hasYarn (),
  anyBranch: false,
  commit: true,
  push: true
};
