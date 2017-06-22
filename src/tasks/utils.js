import execa from "execa";
import { Observable } from "rxjs";
import streamToObservable from "stream-to-observable";
import split from "split";
import fs from "fs";
import path from "path";
import parseArgsStringToArgv from "string-argv";
import program from "../program";

export const PARENT_PROCESS = process.cwd ();
export const packageJSON = JSON.parse (
  fs.readFileSync (
    path.resolve (path.resolve (PARENT_PROCESS, "package.json")),
    "utf8"
  )
);

export const exec = (cmd, args, opts = {}) => {
  const cp = execa (cmd, args, opts);
  return Observable.merge (
    streamToObservable (cp.stdout.pipe (split ()), { await: cp }),
    streamToObservable (cp.stderr.pipe (split ()), { await: cp })
  ).filter (Boolean);
};

/** Used to test tasks, see *.test.js files for usage **/
export const configureTasksForTesting = (createTasks, args = "") =>
  new Promise ((resolve, reject) => {
    program ((args, options, logger) => {
      resolve (title =>
        createTasks (options).find (task => {
          return task.title === title;
        })
      );
    }).then (instance =>
      instance.parse ([ ...process.argv, ...parseArgsStringToArgv (args) ])
    );
  });
