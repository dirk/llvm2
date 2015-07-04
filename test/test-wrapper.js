var LLVM    = require('./helper').LLVM,
    expect  = require('expect.js')

describe('Wrappers', function () {
  describe('Module', function () {
    it('should create a Module', function () {
      var module = new LLVM.Module('test-module-wrapper')
      expect(module).to.be.ok()

      // Check the underlying pointer
      expect(module.ptr).to.be.a(Buffer)
      expect(module.ptr.isNull()).to.be(false)
    })
  })

  describe('FunctionPassManager', function () {
    var fpm = null
    it('should create a FunctionPassManager', function () {
      var module = new LLVM.Module('test-function-pass-manager-wrapper')

      fpm = new LLVM.FunctionPassManager(module)
      expect(fpm).to.be.ok()
    })

    it('should add some passes', function () {
      fpm.addGVNPass()
      fpm.addCFGSimplificationPass()
      fpm.addEarlyCSEPass()
    })
  })
})
