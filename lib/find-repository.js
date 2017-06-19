'use strict'

const url = require('url')
const isURL = require('is-url')
const repoExist = require('repo-exist')
const readPackage = require('read-package')

module.exports = repository => {
  return new Promise((resolve, reject) => {
    const allowedHosts = ['github.com']

    if (repository) {
      if (isURL(repository)) {
        const urlParts = url.parse(repository)
        const slashSplitted = urlParts.path.split('/').filter(n => n)
        const notBare = slashSplitted.length >= 2

        if (allowedHosts.includes(urlParts.host) && notBare) {
          resolve(repository)
        }
      }

      const slashSplitted = repository.split('/').filter(n => n)
      const owner = slashSplitted[0]
      const repo = slashSplitted[1]

      return repoExist({ owner, repo })
        .then(exist => {
          if (exist) {
            resolve(`https://github.com/${owner}/${repo}`)
          }

          reject({
            message: `Couldn't find repository '${repo}' under ${owner}.`
          })
        })
        .catch(() =>
          reject({
            message: `Couldn't find repository '${repo}' under ${owner}.`
          })
        )
    }

    return readPackage()
      .then(pkg => {
        if (pkg.repository) {
          if (typeof pkg.repository === 'string') {
            resolve(pkg.repository)
          }

          resolve(pkg.repository.url)
        }

        reject({
          message: `Couldn't find repository, try again using the GitHub url.`
        })
      })
      .catch(() =>
        reject({
          message: `Couldn't find repository, try again using the GitHub url.`
        })
      )
  })
}
