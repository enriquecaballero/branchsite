import execa from "execa";
import Listr from "listr";
import { Observable } from "rxjs";
import streamToObservable from "stream-to-observable";
import split from "split";
import fs from "fs";
import path from "path";

const PARENT_PROCESS = process.cwd ();
const parentPackageJSON = JSON.parse (
  fs.readFileSync (
    path.resolve (path.resolve (PARENT_PROCESS, "package.json")),
    "utf8"
  )
);

const exec = (cmd, args) => {
  const cp = execa (cmd, args);
  return Observable.merge (
    streamToObservable (cp.stdout.pipe (split ()), { await: cp }),
    streamToObservable (cp.stderr.pipe (split ()), { await: cp })
  ).filter (Boolean);
};

export default options =>
  new Listr (
    [
      {
        title: "Check current branch",
        skip: () => options.anyBranch && "Using --any-branch",
        task: () =>
          execa
            .stdout ("git", [ "symbolic-ref", "--short", "HEAD" ])
            .then (branch => {
              if (branch !== "master") {
                throw new Error (
                  "Not on `master` branch. Use --any-branch to push anyway."
                );
              }
            })
      },
      {
        title: "Building static files using Yarn",
        enabled: () => !options.noYarn,
        task: () =>
          exec ("yarn", [ options.hook ]).catch (error => {
            throw error;
          })
      },
      {
        title: "Building static files using npm",
        enabled: () => options.noYarn,
        task: () =>
          exec ("npm", [ "run", options.hook ]).catch (error => {
            throw error;
          })
      },
      {
        title: "Checking if files differ",
        task: () =>
          execa
            .stdout ("git", [ "status", options.directory, "--porcelain" ])
            .then (status => {
              if (status === "") {
                throw new Error (
                  "Files don't differ from those in your commit history"
                );
              }
            })
            .catch (error => {
              throw error;
            })
      },
      {
        title: "Staging files",
        skip: () =>
          options.noCommit
            ? options.stage ? false : "Using --no-commit"
            : false,
        task: () =>
          exec ("git", [ "add", options.directory ]).catch (error => {
            throw error;
          })
      },
      {
        title: "Commiting files",
        skip: () => options.noCommit && "Using --no-commit",
        task: () => {
          let commitmsg = `chore(${options.branch}): v${parentPackageJSON.version}`;
          if (typeof options.commit === "string") {
            commitmsg += `: ${options.commit}`;
          }
          return exec ("git", [ "commit", "-m", commitmsg ]).catch (error => {
            throw error;
          });
        }
      },
      {
        title: "Pushing files",
        skip: () =>
          options.noCommit
            ? "Using --no-commit"
            : options.noPush ? "Using --no-push" : false,
        task: () =>
          new Observable (observer => {
            observer.next (`Pushing to '${options.branch}'`);
            execa ("git", [ "push" ])
              .then (() =>
                execa ("git", [
                  "subtree",
                  "push",
                  "--prefix",
                  options.directory,
                  options.remote,
                  options.branch
                ])
                  .then (() => {
                    observer.complete ();
                  })
                  .catch (error => {
                    throw error;
                  })
              )
              .catch (error => {
                throw error;
              });
          })
      }
    ],
    {
      showSubtasks: false
    }
  );
