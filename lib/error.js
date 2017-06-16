'use strict'

const chalk = require('chalk')

module.exports = msg => {
  if (msg.message) {
    msg = msg.message
  }
  console.error(`${chalk.red('> Error!')} ${msg}`)
}
