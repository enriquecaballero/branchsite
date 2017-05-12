# branchsite

Heavily inspired by [`np`](https://github.com/sindresorhus/np), this provides a complimentary tool that eases the process of publishing your static files to a branch (e.g. gh-pages) via the use of `git subtree`

## Install
```
$ yarn global add branchsite
```
You can also install the tool into your project and use it via NPM hooks:
```
$ yarn add -D branchsite
```

## Usage
Once installed, just run:
```
$ bs
```
If you opted for using the tool from within your project, you will need an NPM hook to use it as such:
```json
{
  "scripts": {
    "my-hook": "bs"
  }
}
```
```
$ yarn my-hook
```

## Flags

- `-h, --help`

  Output usage information

- `-V, --version`

  Output the version number

- `--any-branch`

  Allow pushing from any branch (defaults to `false`)

- `--no-yarn`

  Don't use Yarn

- `-C, --commit <commit>`

  Optional commit message

- `--no-commit`

  Don't commit

- `--no-push`

  Don't push to branch

- `-H, --hook <hook>`

  NPM hook that builds your static website (defaults to `build`)

- `-D, --directory <path>`

  Directory that will be pushed to separate branch  (defaults to `dist`)

- `-B, --branch <branch>`

  Branch that will be used as subtree (defaults to `gh-pages`)

- `-R, --remote <remote>`

  Repository that will be pushed to (defaults to `origin`)
