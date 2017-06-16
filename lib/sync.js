'use strict'

const { addUpstream, fetchUpstream, updateFork } = require('./cmd')
const success = require('./output/success')
const error = require('./output/error')

const sync = (repo, spinner) => {
  return Promise.all([addUpstream(repo), fetchUpstream(), updateFork()])
    .then(res => {
      spinner.stop()
      res[2].stdout.length > 1
        ? success(res[2].stdout)
        : success('Fork updated.')
    })
    .catch(err => {
      console.log(err)
      spinner.stop()
      error('package.json not found in the current project.')
    })
}

module.exports = sync
