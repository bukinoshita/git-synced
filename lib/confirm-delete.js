'use strict'

const nicht = require('nicht')

const message = require('./output/message')
const sync = require('./sync')
const { removeUpstream } = require('./cmd')

const confirmDelete = (repo, spinner) => {
  return new Promise(() => {
    spinner.stop()
    message('Upstream already exist.')
    nicht('Do you want to delete `upstream`?').then(res => {
      if (res) {
        spinner.start()
        return removeUpstream().then(() => sync(repo, spinner))
      }

      message('Aborted')
    })
  })
}

module.exports = confirmDelete
