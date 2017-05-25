import program from "./program";
import tasks from "./tasks";

program ((args, options, logger) => {
  tasks (options).run ().catch (error => console.error (error));
}).then (instance => instance.parse (process.argv));
