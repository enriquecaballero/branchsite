# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Project setup

1. Fork and clone this repository
2. `$ yarn install` to install dependencies
4. Create a branch for your Pull Request

While you can work directly on your own version of `master`, it is recommended you work on a different branch to keep `master` stable

## Development

1. `$ yarn build -- --watch` to watch over your files and bundle on save
2. `$ yarn link` to make `bs` accessible via command line
3. `$ bs` to test out your changes


## Committing and Pushing changes

This project uses [`semantic-release`](https://github.com/semantic-release/semantic-release) to do automatic releases and generate a changelog based on the
commit history. So we follow [a convention](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/ed32559941719a130bb0327f886d6a32a8cbc2ba/convention.md) for commit messages. Please follow this convention for your
commit messages

You can use `commitizen` to help you to follow [the convention](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/ed32559941719a130bb0327f886d6a32a8cbc2ba/convention.md)

Once you are ready to commit the changes, please use the below commands

1. `$ git add <files to be committed>`
2. `$ yarn cz`

...and follow the instruction of the interactive prompt
