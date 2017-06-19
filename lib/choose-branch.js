'use strict'

const inquirer = require('inquirer')

module.exports = branches => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'branch',
        message: 'Which branch do you want to sync with?',
        choices: branches,
        default: 'master'
      }
    ])
    .then(choice => choice)
    .catch(err => err)
}
