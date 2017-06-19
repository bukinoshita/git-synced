'use strict'

const shoutMessage = require('shout-message')
const nicht = require('nicht')
const { showRemotes, removeUpstream } = require('./cmd')

module.exports = () => {
  return showRemotes()
    .then(remote => {
      const hasUpstream = remote.stdout.includes('upstream')

      if (hasUpstream) {
        shoutMessage('Upstream already exist.')
        return nicht('Do you want to delete `upstream`?').then(res => {
          if (res) {
            return removeUpstream()
          }

          return process.exit()
        })
      }
    })
    .catch(err => err)
}
