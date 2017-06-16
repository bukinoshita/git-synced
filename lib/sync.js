'use strict'

const { addUpstream, fetchUpstream, updateFork } = require('./cmd')
const success = require('./output/success')
const error = require('./output/error')

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
