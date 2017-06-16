#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const ora = require('ora')

const readPackage = require('read-package')
const sync = require('./lib/sync')
const error = require('./lib/error')
const confirmDelete = require('./lib/confirm-delete')
const { showRemotes } = require('./lib/cmd')

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
  if (cli.input[0]) {
    spinner.start()
  } else {
    spinner.start()
    readPackage()
      .then(pkg => {
        const repo = pkg.repository.url || pkg.repository
        return showRemotes()
          .then(remote => {
            const hasUpstream = remote.stdout.includes('upstream')

            if (hasUpstream) {
              return confirmDelete(repo, spinner)
            }

            sync(repo, spinner)
          })
          .catch(err => {
            spinner.stop()
            error(err)
          })
      })
      .catch(err => {
        spinner.stop()
        error(err)
      })
  }
}

run()
