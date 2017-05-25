import hasYarn from "has-yarn";

export default {
  anyBranch: false,
  noYarn: !hasYarn (),
  commit: "",
  noCommit: false,
  stage: undefined,
  noPush: false,
  hook: "build",
  directory: "dist",
  branch: "gh-pages",
  remote: "origin"
};
