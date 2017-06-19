'use strict'

const { addUpstream, fetchUpstream, updateFork } = require('./cmd')

module.exports = (repo, branch) => {
  return Promise.all([addUpstream(repo), fetchUpstream(), updateFork(branch)])
    .then(res => {
      return res[2].stdout === 'Already up-to-date.'
        ? res[2].stdout
        : 'Fork updated.'
    })
    .catch(err => err)
}
