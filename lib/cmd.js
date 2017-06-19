'use strict'

const execa = require('execa')

exports.showRemotes = () => execa.shell(`git remote show`)
exports.addUpstream = repo => execa.shell(`git remote add upstream ${repo}`)
exports.fetchUpstream = () => execa.shell('git fetch upstream')
exports.updateFork = branch => execa.shell(`git pull upstream ${branch}`)
exports.removeUpstream = () => execa.shell('git remote rm upstream')
