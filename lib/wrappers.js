var expect       = require('expect.js'),
    Library      = require('./library'),
    refTypes     = require('./ref-types'),
    TypeRefArray = refTypes.TypeRefArray

function FunctionType (returnType, paramTypes, isVarArg) {
  // Coerce to a boolean
  isVarArg = (isVarArg ? isVarArg : false)
  // Build a proper C array to pass to the C function
  var paramCount = paramTypes.length,
      paramArray = new TypeRefArray(paramCount)
  for (var i = 0; i < paramCount; i++) {
    paramArray[i] = paramTypes[i]
  }
  this.ptr = Library.LLVMFunctionType(returnType, paramArray, paramCount, isVarArg)
}

// Make some handy abstractions around stuff
function Function (ptr) {
  this.ptr = ptr
}
Function.prototype.appendBasicBlock = function (name) {
  return Library.LLVMAppendBasicBlock(this.ptr, name)
}

function Module (name) {
  this.ptr = Library.LLVMModuleCreateWithName(name)
}
Module.prototype.dump = function () {
  Library.LLVMDumpModule(this.ptr)
}
Module.prototype.addFunction = function (name, type) {
  var ptr = Library.LLVMAddFunction(this.ptr, name, type.ptr)
  return new Function(ptr)
}
Module.prototype.writeBitcodeToFile = function (path) {
  expect(path).to.be.a('string')
  return Library.LLVMWriteBitcodeToFile(this.ptr, path)
}


function FunctionPassManager (module) {
  expect(module).to.be.a(Module)
  this.ptr = Library.LLVMCreateFunctionPassManagerForModule(module.ptr)
}
FunctionPassManager.PASSES = [
  'LLVMAddArgumentPromotionPass',
  'LLVMAddCFGSimplificationPass',
  'LLVMAddConstantMergePass',
  'LLVMAddDeadStoreEliminationPass',
  'LLVMAddEarlyCSEPass',
  'LLVMAddGVNPass',
  'LLVMAddIndVarSimplifyPass',
  'LLVMAddPromoteMemoryToRegisterPass',
  'LLVMAddScalarReplAggregatesPass',
];

// Create prototype adder functions for each pass
var adderPairs = FunctionPassManager.PASSES.map(function (p) {
  var adder = p.substring(4, p.length)
  // Lowercase the first letter
  return [p, adder[0].toLowerCase()+adder.substring(1, adder.length)]
})
adderPairs.forEach(function (pairs) {
  var pass         = pairs[0],
      passFunction = Library[pass],
      adder        = pairs[1]

  FunctionPassManager.prototype[adder] = function () {
    passFunction(this.ptr)
  }
})

module.exports = {
  Module:       Module,
  Function:     Function,
  FunctionType: FunctionType,
  FunctionPassManager: FunctionPassManager
}

