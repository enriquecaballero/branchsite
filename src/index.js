import program from "commander";
import hasYarn from "has-yarn";
import createTasks from "./tasks";

const defaultOptions = {
  hook: "build",
  directory: "dist",
  remote: "origin",
  branch: "gh-pages",
  yarn: hasYarn (),
  anyBranch: false,
  stage: true,
  commit: true,
  publish: true
};

program
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
  .parse (process.argv);

const options = Object.assign ({}, defaultOptions, program);
const tasks = createTasks (options);

tasks.run ().catch (error => console.error (error));
