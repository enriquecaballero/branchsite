import program from "caporal";
import defaults from "../defaults";

/** Removes properties within an object with values of `undefined`;
    returns new object with defined values only **/
const sanitize = object => JSON.parse (JSON.stringify (object));

export default callback =>
  new Promise ((resolve, reject) => {
    resolve (
      program
        .version ("semantic-release")
        .description (
          "CLI tool for publishing your static website to a separate branch Edit"
        )
        .option ("--any-branch", "Allow pushing from any branch")
        .option ("--no-yarn", "Don't use Yarn")
        .option ("--yarn", "Force the use of Yarn")
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
        .action ((args, options, logger) => {
          callback (
            args,
            Object.assign ({}, defaults, sanitize (options)),
            logger
          );
        })
    );
  });
