import parseArgsStringToArgv from "string-argv";
import program from "../program";
import defaults from "../defaults";
import { createTasks } from "./tasks";

const run = (args = "") =>
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

describe ("ensures args have the correct effect on tasking behavior", () => {
  it ("will only pushing from master branch", () => {
    return run ().then (task => {
      expect (task ("Check current branch").skip ()).toBeFalsy ();
    });
  });

  it ("will allow pushing from any branch", () => {
    return run (`--any-branch`).then (task => {
      expect (task ("Check current branch").skip ()).toBeTruthy ();
    });
  });

  it ("will not use yarn", () => {
    return run (`--no-yarn`).then (task => {
      expect (task ("Building static files using Yarn").enabled ()).toBeFalsy ();
    });
  });

  it ("will stage files", () => {
    return run ().then (task => {
      expect (task ("Staging files").skip ()).toBeFalsy ();
    });
  });

  it ("will not stage files when not commiting", () => {
    return run (`--no-commit`).then (task => {
      expect (task ("Staging files").skip ()).toBeTruthy ();
    });
  });

  it ("will stage files without commiting", () => {
    return run (`--no-commit --stage`).then (task => {
      expect (task ("Staging files").skip ()).toBeFalsy ();
    });
  });

  it ("will not commit files", () => {
    return run (`--no-commit`).then (task => {
      expect (task ("Commiting files").skip ()).toBeTruthy ();
    });
  });

  it ("will commit files", () => {
    return run ().then (task => {
      expect (task ("Commiting files").skip ()).toBeFalsy ();
    });
  });

  it ("will push files to branch", () => {
    return run ().then (task => {
      expect (task ("Pushing files").skip ()).toBeFalsy ();
    });
  });

  it ("will push files to branch", () => {
    return run ().then (task => {
      expect (task ("Pushing files").skip ()).toBeFalsy ();
    });
  });

  it ("will not push files to branch", () => {
    return run (`--no-push`).then (task => {
      expect (task ("Pushing files").skip ()).toBeTruthy ();
    });
  });

  it ("will not push files to branch when not commiting", () => {
    return run (`'--no-commit'`).then (task => {
      expect (task ("Pushing files").skip ()).toBeTruthy ();
    });
  });
});
