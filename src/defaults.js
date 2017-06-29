import hasYarn from "has-yarn";

export default {
  anyBranch: false,
  noYarn: !hasYarn (),
  noPublish: false,
  noCleanup: false,
  skipInstall: false,
  hook: null,
  directory: "dist",
  branch: "gh-pages"
};
