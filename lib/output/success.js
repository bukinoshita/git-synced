'use strict'

const chalk = require('chalk')

module.exports = msg => {
  console.log(`${chalk.green('> Success!')} ${msg}`)
}
