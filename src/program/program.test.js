import parseArgsStringToArgv from "string-argv";
import program from "./program";
import defaults from "../defaults";

const run = (args = "") =>
  new Promise ((resolve, reject) => {
    program ((args, options, logger) => {
      resolve (options);
    }).then (instance =>
      instance.parse ([ ...process.argv, ...parseArgsStringToArgv (args) ])
    );
  });

describe ("ensures args correctly override their designated default value", () => {
  it ("will only push from master branch", () => {
    return run ().then (options => {
      expect (options).toHaveProperty ("anyBranch", false);
    });
  });

  it ("will allow pushing from any branch", () => {
    return run (`--any-branch`).then (options => {
      expect (options).toHaveProperty ("anyBranch", true);
    });
  });

  it ("will not use yarn", () => {
    return run (`--no-yarn`).then (options => {
      expect (options).toHaveProperty ("noYarn", true);
    });
  });

  it ("will set hook to other than `build`", () => {
    return run (`--hook "test:hook"`).then (options => {
      expect (options).toHaveProperty ("hook", "test:hook");
    });
  });

  it ("will set directory other than `dist`", () => {
    return run (`--directory "lib"`).then (options => {
      expect (options).toHaveProperty ("directory", "lib");
    });
  });

  it ("will set branch other than `gh-pages`", () => {
    return run (`--branch "test-branch"`).then (options => {
      expect (options).toHaveProperty ("branch", "test-branch");
    });
  });
});
