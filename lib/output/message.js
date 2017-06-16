'use strict'

const chalk = require('chalk')

module.exports = msg => {
  console.log(`\n${chalk.gray('>')} ${msg}`)
}
