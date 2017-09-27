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


## Related

- [del-git-index](https://github.com/bukinoshita/del-git-index) — Safely delete index.lock of the current project
- [repo-exist](https://github.com/bukinoshita/repo-exist) — Checks if GitHub repository exist
- [gopn](https://github.com/bukinoshita/gopn) — Open GitHub repositories
- [is-github-repo](https://github.com/bukinoshita/is-github-repo) — Checks if string is a git repository
- [git-url-prettify](https://github.com/bukinoshita/git-url-prettify) — Prettify git url
- [git-url-uglify](https://github.com/bukinoshita/git-url-uglify) — Uglify git url


## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
