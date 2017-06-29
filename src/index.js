import Listr from "listr";
import program from "./program";
import createTasks, {
  prerequisites,
  assets,
  branch,
  publish,
  cleanup
} from "./tasks";

program ((args, options, logger) => {
  const start = _ => createTasks (_, options);
  start (prerequisites)
    .then (() => start (assets))
    .then (() => start (branch))
    .then (() => start (publish))
    .then (() => start (cleanup))
    .catch (error => console.error (error));
}).then (instance => instance.parse (process.argv));
