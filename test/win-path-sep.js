const t = require('tap')
const Module = require('module')

// Re-load minimatch with a mocked path module that has Windows separator
const mmPath = require.resolve('../')
delete require.cache[mmPath]

const origLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'path') return { sep: '\\' }
  return origLoad.call(this, request, parent, isMain)
}

const mm = require('../')
Module._load = origLoad

t.equal(mm('x\\y\\z', 'x/y/*/z'), false)
t.equal(mm('x\\y\\w\\z', 'x/y/*/z'), true)
