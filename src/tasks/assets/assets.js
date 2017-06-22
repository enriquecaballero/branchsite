import { exec } from "../utils";

export default options => [
  {
    title: "Install dependencies using Yarn",
    enabled: () => !options.noYarn,
    task: () => exec ("yarn")
  },
  {
    title: "Install dependencies using npm",
    enabled: () => options.noYarn,
    task: () => exec ("yarn", [ "install" ])
  },
  {
    title: "Build static assets using Yarn",
    enabled: () => !options.noYarn,
    task: () => exec ("yarn", [ options.hook ])
  },
  {
    title: "Build static assets using npm",
    enabled: () => options.noYarn,
    task: () => exec ("npm", [ "run", options.hook ])
  }
];
