# branchsite

Heavily inspired by [`np`](https://github.com/sindresorhus/np), this provides a complementary tool that eases the process of publishing your static files to a branch (e.g. gh-pages).

[![Build Status](https://travis-ci.org/enriquecaballero/branchsite.svg?branch=master)](https://travis-ci.org/enriquecaballero/branchsite)  [![Greenkeeper badge](https://badges.greenkeeper.io/enriquecaballero/branchsite.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  [![semantic-release](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Install
```
$ yarn global add branchsite
```

## Usage
```
$ bs --help

    bs - CLI tool for publishing your static website to a separate branch

    USAGE

      bs

    OPTIONS

      --any-branch            Allow pushing from any branch                         optional
      --no-yarn               Don't use Yarn                                        optional
      --no-publish            Don't publish                                         optional
      --no-cleanup            Will skip the clean up stage                          optional
      --hook <hook>           NPM hook that builds your static website              optional
      --directory <path>      Directory that will be pushed to separate branch      optional
      --branch <branch>       Branch that will be used for deployment               optional

    GLOBAL OPTIONS

      -h, --help         Display help
      -V, --version      Display version
      --no-color         Disable colors
      --quiet            Quiet mode - only displays warn and error messages
      -v, --verbose      Verbose mode - will also output debug messages
```

## Contributing

See our [contributing guide](CONTRIBUTING.md) to learn about our development process.

## Changelog

Every release is automatically documented on the GitHub [releases page](https://github.com/enriquecaballero/branchsite/releases) using [semantic-release](https://github.com/semantic-release/semantic-release).

## License

MIT
