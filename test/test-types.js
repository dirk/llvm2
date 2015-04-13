
var LLVM    = require('./helper').LLVM,
    Library = LLVM.Library,
    Types   = LLVM.Types,
    expect  = require('expect.js')

describe('Types', function () {
  function checkType (ty, tyStr) {
    expect(ty).to.be.a(Buffer)
    expect(Library.LLVMPrintTypeToString(ty)).to.equal(tyStr)
  }
  it('should have integer types', function () {
    checkType(Types.Int64Type, 'i64')
    checkType(Types.Int32Type, 'i32')
    checkType(Types.Int16Type, 'i16')
    checkType(Types.Int8Type,  'i8')
    checkType(Types.Int1Type,  'i1')
  })
  it('should have void type', function () {
    checkType(Types.VoidType,  'void')
  })
  it('should make a pointer type', function () {
    var ptrTy = Types.pointerType(Types.Int1Type)
    checkType(ptrTy, 'i1*')
  })
})

