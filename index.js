#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const ora = require('ora')

const readPackage = require('read-package')
const error = require('./lib/output/error')
const gitSynced = require('./lib/git-synced')

const cli = meow(
  `
  Usage:
    $ git-synced                Update fork
    $ git-synced <repo url>     Update fork with repo url

  Example:
    $ git-synced
    $ git-synced git://github.com/ORIGINAL-DEV-USERNAME/REPO-YOU-FORKED-FROM.git

  Options:
    -h, --help         Show help options
    -v, --version      Show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const spinner = ora('Updating fork...')

const run = () => {
  spinner.start()

  if (cli.input[0]) {
    const repo = cli.input[0]
    gitSynced(repo, spinner)
  } else {
    readPackage()
      .then(pkg => {
        const repo = pkg.repository.url || pkg.repository
        gitSynced(repo, spinner)
      })
      .catch(err => {
        spinner.stop()
        error(err)
      })
  }
}

run()
