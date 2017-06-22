import Listr from "listr";
import program from "./program";
import createTasks, {
  prerequisites,
  assets,
  build,
  publish,
  cleanup
} from "./tasks";

program ((args, options, logger) => {
  const start = _ => createTasks (_, options);
  start (prerequisites)
    .then (() => start (assets))
    .then (() => start (build))
    .then (() => start (publish))
    .then (() => start (cleanup))
    .catch (error => console.error (error));
}).then (instance => instance.parse (process.argv));
