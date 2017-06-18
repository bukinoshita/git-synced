'use strict'

const { addUpstream, fetchUpstream, updateFork } = require('./cmd')
const shoutSuccess = require('shout-success')
const shoutError = require('shout-error')

const sync = (repo, spinner) => {
  return Promise.all([addUpstream(repo), fetchUpstream(), updateFork()])
    .then(res => {
      spinner.stop()
      res[2].stdout.length > 1
        ? shoutSuccess(res[2].stdout)
        : shoutSuccess('Fork updated.')
    })
    .catch(err => {
      console.log(err)
      spinner.stop()
      shoutError('package.json not found in the current project.')
    })
}

module.exports = sync
