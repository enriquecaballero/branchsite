import { configureTasksForTesting } from "../utils";
import tasks from "./cleanup";

const run = _ => configureTasksForTesting (tasks, _);

describe ("ensures the cleanup stage works properly", () => {
  it ("will skip cleanup task", () => {
    return run ("--no-cleanup").then (task => {
      expect (task ("Clean workspace").skip ()).toBeTruthy ();
    });
  });
});
