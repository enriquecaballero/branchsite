import { configureTasksForTesting } from "../utils";
import tasks from "./assets";

const run = _ => configureTasksForTesting (tasks, _);

describe ("ensures the assets stage works properly", () => {
  it ("will install dependencies using yarn", () => {
    return run ().then (task => {
      expect (task ("Install dependencies using Yarn").enabled ()).toBeTruthy ();
    });
  });

  it ("will not install dependencies using yarn", () => {
    return run ("--no-yarn").then (task => {
      expect (task ("Install dependencies using Yarn").enabled ()).toBeFalsy ();
    });
  });

  it ("will install dependencies using npm", () => {
    return run ("--no-yarn").then (task => {
      expect (task ("Install dependencies using npm").enabled ()).toBeTruthy ();
    });
  });

  it ("will not install dependencies using npm", () => {
    return run ().then (task => {
      expect (task ("Install dependencies using npm").enabled ()).toBeFalsy ();
    });
  });

  it ("will build static assets using yarn", () => {
    return run ().then (task => {
      expect (task ("Build static assets using Yarn").enabled ()).toBeTruthy ();
    });
  });

  it ("will not build static assets using yarn", () => {
    return run ("--no-yarn").then (task => {
      expect (task ("Build static assets using Yarn").enabled ()).toBeFalsy ();
    });
  });

  it ("will build static assets using npm", () => {
    return run ("--no-yarn").then (task => {
      expect (task ("Build static assets using npm").enabled ()).toBeTruthy ();
    });
  });

  it ("will not build static assets using npm", () => {
    return run ().then (task => {
      expect (task ("Build static assets using npm").enabled ()).toBeFalsy ();
    });
  });
});
