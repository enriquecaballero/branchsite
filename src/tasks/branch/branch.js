import Listr from "listr";
import { exec } from "../utils";

export const checkoutTargetBranch = options => [
  {
    title: "Checkout",
    task: () =>
      exec ("git", [ "checkout", options.branch ], {
        cwd: "./.branchsite"
      })
  },
  {
    title: "Delete old assets, if any",
    task: () =>
      exec ("git", [ "rm", "-rf", "." ], {
        cwd: "./.branchsite"
      })
  }
];

export const buildBranch = (options, ctx) => [
  {
    title: "Create working directory",
    task: () => exec ("mkdir", [ ".branchsite" ])
  },
  {
    title: "Initialize repository",
    task: () => exec ("git", [ "init" ], { cwd: "./.branchsite" })
  },
  {
    title: "Set up remote",
    task: () =>
      exec ("git", [ "remote", "add", "--fetch", "origin", ctx.get ("remote") ], {
        cwd: "./.branchsite"
      })
  },
  {
    title: "Checkout target branch",
    task: () =>
      ctx.get ("exists")
        ? new Listr (checkoutTargetBranch (options))
        : exec ("git", [ "checkout", "--orphan", options.branch ], {
            cwd: "./.branchsite"
          })
  },
  {
    title: "Copy static assets into directory",
    task: () =>
      exec ("cp", [
        "-R",
        `${options.directory}/.`,
        "./.branchsite"
      ]).catch (error => {
        throw error;
      })
  }
];

export default (options, ctx) => [
  {
    title: `Build '${options.branch}'`,
    task: () => new Listr (buildBranch (options, ctx))
  }
];
