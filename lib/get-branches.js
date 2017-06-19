'use strict'

const url = require('url')
const ghGot = require('gh-got')

module.exports = repository => {
  const urlParts = url.parse(repository)
  const slashSplitted = urlParts.path.split('/').filter(n => n)
  const owner = slashSplitted[0]
  const repo = slashSplitted[1]

  return ghGot(`repos/${owner}/${repo}/branches`, {
    headers: {
      'user-agent': 'https://github.com/bukinoshita/git-synced'
    }
  })
    .then(branches => branches.body)
    .catch(() => ['master']) // Probably getting error with Rate limit, so just return master branch as default.
}
