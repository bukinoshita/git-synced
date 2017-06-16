'use strict'

const { addUpstream, fetchUpstream, updateFork } = require('./cmd')
const success = require('./success')
const error = require('./error')

const sync = (repo, spinner) => {
  return Promise.all([addUpstream(repo), fetchUpstream(), updateFork()])
    .then(() => {
      spinner.stop()
      success('Fork updated.')
    })
    .catch(() => {
      spinner.stop()
      error('package.json not found in the current project.')
    })
}

module.exports = sync
