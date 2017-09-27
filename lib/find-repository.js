'use strict'

const repoExist = require('repo-exist')
const readPackage = require('read-package')
const gitUrlPrettify = require('git-url-prettify')
const isGithubRepo = require('is-github-repo')
const gitUrlUglify = require('git-url-uglify')

module.exports = project => {
  return new Promise((resolve, reject) => {
    if (project) {
      const { type } = isGithubRepo(project, { withType: true })
      const repo = type === 'repo'
        ? gitUrlPrettify(project.replace('.git', ''))
        : project
      const { owner, repository } = gitUrlUglify(repo)

      return repoExist({ owner, repo: repository })
        .then(exist => {
          if (exist) {
            resolve(`https://github.com/${owner}/${repository}`)
          }

          reject({
            message: `Couldn't find repository '${repository}' under ${owner}.`
          })
        })
        .catch(() =>
          reject({
            message: `Couldn't find repository '${repository}' under ${owner}.`
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
