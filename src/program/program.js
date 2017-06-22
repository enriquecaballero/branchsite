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
          "CLI tool for publishing your static website to a separate branch"
        )
        .option ("--any-branch", "Allow pushing from any branch")
        .option ("--no-yarn", "Don't use Yarn")
        .option ("--no-publish", "Don't publish")
        .option ("--no-cleanup", "Will skip the clean up stage")
        .option ("--hook <hook>", "NPM hook that builds your static website")
        .option (
          "--directory <path>",
          "Directory that will be pushed to separate branch"
        )
        .option ("--branch <branch>", "Branch that will be used for deployment")
        .action ((args, options, logger) => {
          callback (
            args,
            Object.assign ({}, defaults, sanitize (options)),
            logger
          );
        })
    );
  });
