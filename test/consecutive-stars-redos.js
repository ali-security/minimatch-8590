var t = require('tap')
var Minimatch = require('../').Minimatch

t.test('consecutive stars are coalesced', function (t) {
  var re1 = new Minimatch('a*b').makeRe()
  var re3 = new Minimatch('a***b').makeRe()
  t.equal(re3.toString(), re1.toString(), 'a***b same regex as a*b')
  t.end()
})

t.test('100+ consecutive stars do not cause ReDoS', function (t) {
  var stars = '*'.repeat(100)
  var pattern = 'a' + stars + 'b'
  var start = Date.now()
  var mm = new Minimatch(pattern)
  var re = mm.makeRe()
  re.test('a' + 'c'.repeat(25))
  var elapsed = Date.now() - start
  t.ok(elapsed < 1000, 'completed in ' + elapsed + 'ms (< 1s)')
  t.end()
})
