import program from "caporal";
import hasYarn from "has-yarn";
import createTasks from "./tasks";

const defaultOptions = {
  anyBranch: false,
  noYarn: !hasYarn (),
  commit: "",
  noCommit: false,
  stage: true,
  noPush: false,
  hook: "build",
  directory: "dist",
  branch: "gh-pages",
  remote: "origin"
};

const launch = (args, options, logger) => {
  const tasks = createTasks (
    Object.assign ({}, defaultOptions, JSON.parse (JSON.stringify (options)))
  );
  tasks.run ().catch (error => console.error (error));
};

program
  .version ("semantic-release")
  .description (
    "CLI tool for publishing your static website to a separate branch Edit"
  )
  .option ("--any-branch", "Allow pushing from any branch")
  .option ("--no-yarn", "Don't use Yarn")
  .option ("-C, --commit <commit>", "Optional commit message")
  .option ("--no-commit", "Don't commit")
  .option ("--stage", "Stage files while using --no-commit")
  .option ("--no-push", "Don't push to branch")
  .option ("-H, --hook <hook>", "NPM hook that builds your static website")
  .option (
    "-D, --directory <path>",
    "Directory that will be pushed to separate branch"
  )
  .option ("-B, --branch <branch>", "Branch that will be used as subtree")
  .option ("-R, --remote <remote>", "Repository that will be pushed to")
  .action (launch);

program.parse (process.argv);
