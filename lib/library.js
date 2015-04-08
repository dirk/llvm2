var ffi      = require('ffi'),
    ref      = require('ref'),
    refTypes = require('./ref-types')

var ptr           = refTypes.ptr,
    void_         = ref.types.void,
    TypeRefArray  = refTypes.TypeRefArray,
    ArgRefArray   = refTypes.ArgRefArray,
    CStringPtr    = ref.refType(ref.types.CString)

// Build the FFI library
var Library = ffi.Library('libLLVM-3.5', {
  // Modules and functions
  'LLVMModuleCreateWithName': [ptr,       ['CString']],
  'LLVMGetTarget':            ['CString', [ptr]],
  'LLVMSetTarget':            [void_,     [ptr, 'CString']],
  'LLVMGetDataLayout':        ['CString', [ptr]],
  'LLVMDumpModule':           [void_, [ptr]],
  'LLVMDumpValue':            [void_, [ptr]],
  'LLVMAddFunction':          [ptr,   [ptr, 'CString', ptr]],

  'LLVMGetGlobalContext':     [ptr, []],

  'LLVMGetGlobalPassRegistry': [ptr, []],
  'LLVMCreateFunctionPassManagerForModule': [ptr, [ptr]],

  // Target platforms/CPUs
  'LLVMInitializeX86Target':     [void_, []],
  'LLVMInitializeX86TargetInfo': [void_, []],
  'LLVMInitializeX86TargetMC':   [void_, []],

  // Targets
  'LLVMGetDefaultTargetTriple':             ['CString', []],
  'LLVMGetFirstTarget':                     [ptr,       []],
  'LLVMTargetHasTargetMachine':             ['bool',    [ptr]],

  // Target machines
  'LLVMCreateTargetMachine':                [ptr,       [ptr, 'CString', 'CString', 'CString', 'int', 'int', 'int']],
  'LLVMGetTargetMachineFeatureString':      ['CString', [ptr]],

  // Target data
  'LLVMGetTargetMachineData':               [ptr,       [ptr]],
  'LLVMCreateTargetData':                   [ptr,       ['CString']],
  'LLVMCopyStringRepOfTargetData':          ['CString', [ptr]],

  // Instruction builder and support functions
  'LLVMCreateBuilder':        [ptr,   []],
  'LLVMPositionBuilderAtEnd': [void_, [ptr, ptr]],
  'LLVMAppendBasicBlock':     [ptr,   [ptr, 'CString']],
  'LLVMGetInsertBlock':       [ptr,   [ptr]],
  // Building instructions
  'LLVMBuildGlobalStringPtr': [ptr,   [ptr, 'CString', 'CString']],
  'LLVMBuildCall':            [ptr,   [ptr, ptr, ArgRefArray, 'uint', 'CString']],
  'LLVMBuildRet':             [ptr,   [ptr, ptr]],
  'LLVMBuildRetVoid':         [ptr,   [ptr]],
  'LLVMBuildAlloca':          [ptr,   [ptr, ptr, 'CString']],
  'LLVMBuildGEP':             [ptr,   [ptr, ptr, ArgRefArray, 'uint', 'CString']],
  'LLVMBuildStructGEP':       [ptr,   [ptr, ptr, 'uint', 'CString']],
  'LLVMBuildStore':           [ptr,   [ptr, ptr, ptr]],
  'LLVMBuildLoad':            [ptr,   [ptr, ptr, 'CString']],
  'LLVMBuildPointerCast':     [ptr,   [ptr, ptr, ptr, 'CString']],
  'LLVMBuildICmp':            [ptr,   [ptr, 'int', ptr, ptr, 'CString']],
  'LLVMBuildCondBr':          [ptr,   [ptr, ptr, ptr, ptr]],
  'LLVMBuildBr':              [ptr,   [ptr, ptr]],

  // Type constructors
  'LLVMFunctionType':         [ptr,   [ptr, TypeRefArray, 'uint', 'bool']],
  'LLVMInt64Type':            [ptr,   []],
  'LLVMInt32Type':            [ptr,   []],
  'LLVMInt8Type':             [ptr,   []],
  'LLVMVoidType':             [ptr,   []],
  'LLVMPointerType':          [ptr,   [ptr, 'uint']],
  'LLVMStructType':           [ptr,   [TypeRefArray, 'uint', 'bool']],
  'LLVMStructCreateNamed':    [ptr,   [ptr, 'CString']],
  'LLVMStructSetBody':        [void_, [ptr, TypeRefArray, 'uint', 'bool']],

  // Type functions/utilities
  'LLVMDumpType':             [void_,     [ptr]],
  'LLVMTypeOf':               [ptr,       [ptr]],
  'LLVMGetElementType':       [ptr,       [ptr]],
  'LLVMGetTypeKind':          ['int',     [ptr]],
  'LLVMPrintTypeToString':    ['CString', [ptr]],

  // Constant values and casting
  'LLVMConstString':          [ptr, ['CString', 'uint', 'bool']],
  'LLVMConstNull':            [ptr, [ptr]],
  'LLVMConstInt':             [ptr, [ptr, 'ulonglong', 'bool']],
  'LLVMConstIntCast':         [ptr, [ptr, ptr, 'bool']],
  'LLVMConstIntToPtr':        [ptr, [ptr, ptr]],
  'LLVMConstFPCast':          [ptr, [ptr, ptr]],
  'LLVMConstBitCast':         [ptr, [ptr, ptr]],
  'LLVMConstPointerCast':     [ptr, [ptr, ptr]],

  'LLVMGetParam':             [ptr, [ptr, 'uint']],

  'LLVMWriteBitcodeToFile':   ['int', [ptr, 'CString']]
})
Library.LLVMIntEQ = 32
Library.LLVMIntNE = Library.LLVMIntEQ + 1

Library.newCStringPtr = function () {
  return ref.alloc(CStringPtr)
}
Library.readCStringPtr = function (ptr) {
  var buf = ptr.deref()
  return ref.readCString(buf, 0)
}

module.exports = Library

