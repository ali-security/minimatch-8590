const t = require('tap')
const Module = require('module')

// Re-load minimatch with a mocked path module that returns null (simulates missing path module)
const mmPath = require.resolve('../')
delete require.cache[mmPath]

const origLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'path') return null
  return origLoad.call(this, request, parent, isMain)
}

const mm = require('../')
Module._load = origLoad

t.equal(mm.sep, '/')
