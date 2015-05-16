
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

describe('Pass manager', function () {
  it('should create a pass manager', function () {
    var pm = Library.LLVMCreatePassManager()
    expect(pm).to.be.a(Buffer)
    expect(pm.isNull()).to.be(false)
  })
})

describe('Function pass manager', function () {
  var module = null
  it('should create a module for the pass manager', function () {
    module = Library.LLVMModuleCreateWithName('test-pass-manager')
    expect(module).to.be.a(Buffer)
    expect(module.isNull()).to.be(false)
  })
  it('should create the pass manager for the module', function () {
    var pm = Library.LLVMCreateFunctionPassManagerForModule(module)
    expect(pm).to.be.a(Buffer)
    expect(pm.isNull()).to.be(false)
  })
})

function checkPointerBuffer (buffer) {
  expect(buffer).to.be.a(Buffer)
  expect(buffer.isNull()).to.be(false)
}

describe('Target', function () {
  before(function () {
    // Have to set up all this target stuff beforehand
    LLVM.Library.LLVMInitializeX86Target()
    LLVM.Library.LLVMInitializeX86TargetInfo()
    LLVM.Library.LLVMInitializeX86TargetMC()
  })

  it('should get a target triple', function () {
    var triple = Library.LLVMGetDefaultTargetTriple()
    expect(triple).to.match(/[a-z0-9_]+-[a-z0-9_]+-[a-z0-9._]+/)
  })
  var targetMachine
  it('should get a target machine', function () {
    var nativeTargetTriple = LLVM.Library.LLVMGetDefaultTargetTriple()
    expect(nativeTargetTriple).to.be.a('string')

    var target = LLVM.Library.LLVMGetFirstTarget()
    checkPointerBuffer(target)

    targetMachine = LLVM.Library.LLVMCreateTargetMachine(target, nativeTargetTriple, '', '', 0, 0, 0)
    checkPointerBuffer(targetMachine)
  })
  it('should get target data of that machine', function () {
    var targetData = LLVM.Library.LLVMGetTargetMachineData(targetMachine)
    checkPointerBuffer(targetData)
  })
})

describe('Module', function () {
  var module = null
  it('should create a module', function () {
    module = Library.LLVMModuleCreateWithName('test')
    expect(module.isNull()).to.be(false)
  })
  it('should print the empty module to a string', function () {
    var str = Library.LLVMPrintModuleToString(module)
    expect(str).to.be.a('string')
    str = str.trim()
    expect(str).to.eql("; ModuleID = 'test'")
  })
})

