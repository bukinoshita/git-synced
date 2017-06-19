# git-synced [![Build Status](https://travis-ci.org/bukinoshita/git-synced.svg?branch=master)](https://travis-ci.org/bukinoshita/git-synced)

> :wind_chime: Keep a fork up to date

## Install
```bash
$ npm install -g git-synced
```

## Usage
```bash
$ git-synced --help

  Usage:
    $ git-synced                Update fork
    $ git-synced <repo url>     Update fork with GitHub repo url
    $ git-synced <user/repo>    Update fork with GitHub repo

  Example:
    $ git-synced
    $ git-synced https://github.com/bukinoshita/git-synced
    $ git-synced bukinoshita/git-synced
    $ git-synced --branch=staging
    $ git-synced --default

  Options:
    -b BRANCH, --branch=BRANCH  Choose branch as default
    -d, --default               Use master branch as default
    -h, --help                  Show help options
    -v, --version               Show version
```

## Demo

![](https://github.com/bukinoshita/git-synced/blob/master/demo.gif)

## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
