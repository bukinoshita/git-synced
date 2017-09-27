'use strict'

const gitUrlUglify = require('git-url-uglify')
const ghGot = require('gh-got')

module.exports = repo => {
  const { owner, repository } = gitUrlUglify(repo)

  return ghGot(`repos/${owner}/${repository}/branches`, {
    headers: {
      'user-agent': 'https://github.com/bukinoshita/git-synced'
    }
  })
    .then(branches => branches.body)
    .catch(() => ['master']) // Probably getting error with Rate limit, so just return master branch as default.
}
