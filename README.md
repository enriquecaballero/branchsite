# branchsite

Heavily inspired by [`np`](https://github.com/sindresorhus/np), this provides a complimentary tool that eases the process of publishing your static files to a branch (e.g. gh-pages) via the use of `git subtree`.

[![Build Status](https://travis-ci.org/enriquecaballero/branchsite.svg?branch=master)](https://travis-ci.org/enriquecaballero/branchsite)  [![Greenkeeper badge](https://badges.greenkeeper.io/enriquecaballero/branchsite.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  [![semantic-release](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Install
```
$ yarn global add branchsite
```

## Usage
```
$ bs --help

  Usage: bs [options]

  Options:

    -h, --help              output usage information
    --any-branch            Allow pushing from any branch
    --no-yarn               Don't use Yarn
    -C, --commit <commit>   Optional commit message
    --no-commit             Don't commit
    --stage                 Stage files while using --no-commit
    --no-push               Don't push to branch
    -H, --hook <hook>       NPM hook that builds your static website
    -D, --directory <path>  Directory that will be pushed to separate branch
    -B, --branch <branch>   Branch that will be used as subtree
    -R, --remote <remote>   Repository that will be pushed to
```

## Contributing

See our [contributing guide](CONTRIBUTING.md) to learn about our development process.

## Changelog

Every release is automatically documented on the GitHub [releases page](https://github.com/enriquecaballero/branchsite/releases) using [semantic-release](https://github.com/semantic-release/semantic-release).

## License

MIT
