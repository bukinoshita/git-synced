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
    $ git-synced -d             Update fork with master branch as default

  Example:
    $ git-synced
    $ git-synced https://github.com/ORIGINAL-USER/REPO.git
    $ git-synced ORIGINAL-USER/REPO
    $ git-synced -d

  Options:
    -d, --default      Use branch master as default
    -h, --help         Show help options
    -v, --version      Show version
```

## Demo

![](https://github.com/bukinoshita/git-synced/blob/master/demo.gif)

## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
