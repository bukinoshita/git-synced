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
    $ git-synced https://github.com/bukinoshita/git-synced
    $ git-synced bukinoshita/git-synced
    $ git-synced --branch=staging
    $ git-synced --default

  Options:
    -b BRANCH, --branch=BRANCH  Choose branch as default
    -d, --default               Use master branch as default
    -h, --help                  Show help options
    -v, --version               Show version
`,
  {
    alias: {
      b: 'branch',
      d: 'default',
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()
const repository = cli.input[0]
let userRepo
let skip = false

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
    userRepo = repo

    if (cli.flags.d) {
      skip = true
      return { branch: 'master' }
    }

    if (cli.flags.b) {
      skip = true
      return { branch: cli.flags.b }
    }

    const spinner = ora('Getting branches...')
    spinner.start()
    return getBranches(repo)
      .then(branches => {
        spinner.stop()
        return branches
      })
      .catch(err => {
        spinner.stop()
        shoutError(err)
        process.exit()
      })
  })
  .then(branches => {
    if (skip) {
      return branches
    }

    return chooseBranch(branches)
  })
  .then(({ branch }) => {
    const spinner = ora(`Updating fork with branch '${branch}'...`)
    spinner.start()

    return gitSynced(userRepo, branch)
      .then(res => {
        spinner.stop()

        if (res.failed) {
          return shoutError(`${res.stderr}.`)
        }

        shoutSuccess(res)
      })
      .catch(err => shoutError(err))
  })
