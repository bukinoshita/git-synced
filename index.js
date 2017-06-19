#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const ora = require('ora')
const shoutSuccess = require('shout-success')
const shoutError = require('shout-error')

const findRepository = require('./lib/find-repository')
const checkUpstream = require('./lib/check-upstream')
const getBranches = require('./lib/get-branches')
const chooseBranch = require('./lib/choose-branch')
const gitSynced = require('./lib/git-synced')

const cli = meow(
  `
  Usage:
    $ git-synced                Update fork
    $ git-synced <repo url>     Update fork with GitHub repo url
    $ git-synced <user/repo>    Update fork with GitHub repo

  Example:
    $ git-synced
    $ git-synced https://github.com/ORIGINAL-USER/REPO.git
    $ git-synced ORIGINAL-USER/REPO

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
const repository = cli.input[0]
let userRepo

Promise.resolve()
  .then(() => {
    const spinner = ora('Finding repository...')
    spinner.start()
    return findRepository(repository)
      .then(repo => {
        spinner.stop()
        return repo
      })
      .catch(err => {
        spinner.stop()
        shoutError(err)
        process.exit()
      })
  })
  .then(repo => {
    if (repo) {
      return checkUpstream().then(() => repo).catch(err => err)
    }
  })
  .then(repo => {
    const spinner = ora('Getting branches...')
    spinner.start()
    return getBranches(repo)
      .then(branches => {
        spinner.stop()
        userRepo = repo
        return branches
      })
      .catch(err => {
        spinner.stop()
        shoutError(err)
        process.exit()
      })
  })
  .then(branches => chooseBranch(branches))
  .then(({ branch }) => {
    const spinner = ora('Updating fork...')
    spinner.start()

    return gitSynced(userRepo, branch)
      .then(res => {
        spinner.stop()
        shoutSuccess(res)
      })
      .catch(err => shoutError(err))
  })
