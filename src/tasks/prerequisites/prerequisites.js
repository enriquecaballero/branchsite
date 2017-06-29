import Listr from "listr";
import execa from "execa";
import { exec } from "../utils";

export const prepareWorkspace = options => [
  {
    title: "Delete existing working directory, if any",
    task: () => exec ("rm", [ "-rf", ".branchsite" ])
  },
  {
    title: "Delete node_modules",
    skip: () => options.skipInstall && "Using --skip-install",
    task: () => exec ("rm", [ "-rf", "node_modules" ])
  },
  {
    title: "Delete static assets directory",
    task: () => exec ("rm", [ "-rf", options.directory ])
  }
];

export default (options, ctx) => [
  {
    title: "Prepare workspace",
    task: () => new Listr (prepareWorkspace (options))
  },
  {
    title: "Validate current branch",
    skip: () => options.anyBranch && "Using --any-branch",
    task: () =>
      execa.stdout ("git", [ "symbolic-ref", "--short", "HEAD" ]).then (branch => {
        if (branch !== "master") {
          throw new Error (
            "Not on `master` branch. Use --any-branch to push anyway."
          );
        }
      })
  },
  {
    title: "Retrieve remote URL",
    task: () =>
      execa
        .stdout ("git", [ "config", "remote.origin.url" ])
        .then (remote => {
          ctx.set ({ remote });
        })
        .catch (error => {
          throw error;
        })
  },
  {
    title: "Validate remote branches",
    task: () =>
      execa
        .stdout ("git", [
          "ls-remote",
          "--heads",
          ctx.get ("remote"),
          options.branch
        ])
        .then (output => {
          ctx.set ({ exists: output ? true : false });
        })
        .catch (error => {
          throw error;
        })
  }
];
