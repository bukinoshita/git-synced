'use strict'

const shoutError = require('shout-error')
const { showRemotes } = require('./cmd')
const sync = require('./sync')
const confirmDelete = require('./confirm-delete')

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
      shoutError(err)
    })
}

module.exports = gitSynced
