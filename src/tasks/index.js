import Listr from "listr";
import ctx from "./ctx";

export { default as prerequisites } from "./prerequisites";
export { default as assets } from "./assets";
export { default as branch } from "./branch";
export { default as publish } from "./publish";
export { default as cleanup } from "./cleanup";

export default (tasks, options) => {
  return new Listr (tasks (options, ctx), {
    showSubtasks: false
  }).run ();
};
