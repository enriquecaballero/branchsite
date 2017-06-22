import { exec } from "../utils";

export default options => [
  {
    title: "Clean workspace",
    skip: () => options.noCleanup && "Using --no-cleanup",
    task: () => exec ("rm", [ "-Rf", ".branchsite" ])
  }
];
