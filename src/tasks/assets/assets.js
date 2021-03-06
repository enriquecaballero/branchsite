import { exec } from "../utils";

export default options => [
  {
    title: "Install dependencies using Yarn",
    enabled: () => !options.noYarn,
    skip: () => options.skipInstall && "Using --skip-install",
    task: () => exec ("yarn")
  },
  {
    title: "Install dependencies using npm",
    enabled: () => options.noYarn,
    skip: () => options.skipInstall && "Using --skip-install",
    task: () => exec ("yarn", [ "install" ])
  },
  {
    title: "Build static assets using Yarn",
    enabled: () => !options.noYarn,
    skip: () => !options.hook && "No build --hook found",
    task: () => exec ("yarn", [ options.hook ])
  },
  {
    title: "Build static assets using npm",
    enabled: () => options.noYarn,
    skip: () => !options.hook && "No build --hook found",
    task: () => exec ("npm", [ "run", options.hook ])
  }
];
