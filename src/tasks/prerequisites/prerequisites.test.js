import { configureTasksForTesting } from "../utils";
import tasks, { prepareWorkspace } from "./prerequisites";

describe ("ensures the prerequisites stage works properly", () => {
  const run = _ => configureTasksForTesting (tasks, _);

  it ("will work on any branch", () => {
    return run ("--any-branch").then (task => {
      expect (task ("Validate current branch").skip ()).toBeTruthy ();
    });
  });
});

describe ("ensures the prerequisites workspace subtasking work properly", () => {
  const run = _ => configureTasksForTesting (prepareWorkspace, _);

  it ("will delete node_modules", () => {
    return run ("--skip-install").then (task => {
      expect (task ("Delete node_modules").skip ()).toBeTruthy ();
    });
  });

  it ("will not delete node_modules", () => {
    return run ().then (task => {
      expect (task ("Delete node_modules").skip ()).toBeFalsy ();
    });
  });

  it ("will delete static assets directory", () => {
    return run ("--hook npm_build_hook").then (task => {
      expect (task ("Delete static assets directory").skip ()).toBeFalsy ();
    });
  });

  it ("will not delete static assets directory", () => {
    return run ().then (task => {
      expect (task ("Delete static assets directory").skip ()).toBeTruthy ();
    });
  });
});
