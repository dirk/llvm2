
var LLVM    = require('./helper').LLVM,
    Library = LLVM.Library,
    expect  = require('expect.js')

describe('Int type', function () {
  var addressSpace = 0

  var int64Type = null,
      int64PtrType = null
  it('should be created', function () {
    int64Type = Library.LLVMInt64Type()
    expect(int64Type).to.be.a(Buffer)
    int64PtrType = Library.LLVMPointerType(int64Type, addressSpace)
    expect(int64PtrType).to.be.a(Buffer)
  })
  it('should be dumped', function () {
    var str = Library.LLVMPrintTypeToString(int64Type)
    expect(str).to.eql('i64')
    str = Library.LLVMPrintTypeToString(int64PtrType)
    expect(str).to.eql('i64*')
  })

  it('should be created with a size', function () {
    var intType = Library.LLVMIntType(64)
    expect(intType).to.be.a(Buffer)
    var intTypeStr = Library.LLVMPrintTypeToString(intType)
    expect(intTypeStr).to.eql('i64')
  })

  it('should fail to create a pointer without an address space', function () {
    expect(function () {
      Library.LLVMPointerType(Library.LLVMInt8Type())
    }).to.throwException(/Expected 2 arguments, got 1/)
  })
})

describe('Context', function () {
  it('should get a global context', function () {
    var ctx = Library.LLVMGetGlobalContext()
    expect(ctx).to.be.a(Buffer)
    expect(ctx.isNull()).to.be(false)
  })
})

