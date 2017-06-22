import Listr from "listr";
import { exec } from "../utils";

export const publishTo = options => [
  {
    title: "Stage",
    task: () =>
      exec ("git", [ "add", "-A" ], {
        cwd: "./.branchsite"
      })
  },
  {
    title: "Commit",
    task: () =>
      exec (
        "git",
        [
          "commit",
          "--allow-empty",
          "-m",
          `Deployed on ${new Date ().toUTCString ()}`
        ],
        {
          cwd: "./.branchsite"
        }
      )
  },
  {
    title: "Push",
    task: () =>
      exec ("git", [ "push", "origin", options.branch ], {
        cwd: "./.branchsite"
      })
  }
];

export default options => [
  {
    title: `Publish to '${options.branch}'`,
    task: () => new Listr (publishTo (options))
  }
];
