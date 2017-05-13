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
        enabled: () => options.yarn,
        task: () =>
          exec ("yarn", [ options.hook ]).catch (error => {
            throw error;
          })
      },
      {
        title: "Building static files using npm",
        enabled: () => !options.yarn,
        task: () =>
          exec ("npm", [ "run", options.hook ]).catch (error => {
            throw error;
          })
      },
      {
        title: "Checking if files differ",
        skip: () => !options.commit && "Using --no-commit",
        task: () =>
          execa ("git", [ "status", options.directory, "--porcelain" ])
            .then (diff => {
              if (diff === "") {
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
        title: "Staging files for commit",
        skip: () => !options.commit && "Using --no-commit",
        task: () =>
          execa ("git", [ "add", options.directory ]).catch (error => {
            throw error;
          })
      },
      {
        title: "Commiting files",
        skip: () => !options.commit && "Using --no-commit",
        task: () => {
          let commitmsg = `v${parentPackageJSON.version}(${options.branch})`;
          if (typeof options.commit === "string") {
            commitmsg += `: ${options.commit}`;
          }
          return execa ("git", [ "commit", "-m", commitmsg ]).catch (error => {
            throw error;
          });
        }
      },
      {
        title: "Pushing files",
        skip: () =>
          !options.commit
            ? "Using --no-commit"
            : !options.push ? "Using --no-push" : false,
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
