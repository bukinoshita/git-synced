'use strict'

const { showRemotes } = require('./cmd')
const sync = require('./sync')
const confirmDelete = require('./confirm-delete')
const error = require('./output/error')

const gitSynced = (repo, spinner) => {
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
}

module.exports = gitSynced
