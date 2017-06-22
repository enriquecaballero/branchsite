import { configureTasksForTesting } from "../utils";
import tasks from "./prerequisites";

const run = _ => configureTasksForTesting (tasks, _);

describe ("ensures the prerequisites stage works properly", () => {
  it ("will work on any branch", () => {
    return run ("--any-branch").then (task => {
      expect (task ("Validate current branch").skip ()).toBeTruthy ();
    });
  });
});
