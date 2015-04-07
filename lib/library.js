var ffi      = require('ffi'),
    ref      = require('ref'),
    refTypes = require('./ref-types')

var ptr           = refTypes.ptr,
    void_         = ref.types.void,
    TypeRefArray  = refTypes.TypeRefArray,
    ArgRefArray   = refTypes.ArgRefArray


// Build the FFI library
var Library = ffi.Library('libLLVM-3.5', {
  // Modules and functions
  'LLVMModuleCreateWithName': [ptr,   ['CString']],
  'LLVMDumpModule':           [void_, [ptr]],
  'LLVMDumpValue':            [void_, [ptr]],
  'LLVMAddFunction':          [ptr,   [ptr, 'CString', ptr]],

  'LLVMCreateFunctionPassManagerForModule': [ptr, [ptr]],

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

  // Type constructors
  'LLVMFunctionType':         [ptr, [ptr, TypeRefArray, 'uint', 'bool']],
  'LLVMInt64Type':            [ptr, []],
  'LLVMInt32Type':            [ptr, []],
  'LLVMInt8Type':             [ptr, []],
  'LLVMVoidType':             [ptr, []],
  'LLVMPointerType':          [ptr, [ptr, 'uint']],
  'LLVMStructType':           [ptr, [TypeRefArray, 'uint', 'bool']],

  // Type functions/utilities
  'LLVMDumpType':             [void_, [ptr]],
  'LLVMTypeOf':               [ptr,   [ptr]],
  'LLVMGetElementType':       [ptr,   [ptr]],
  'LLVMGetTypeKind':          ['int', [ptr]],

  // Constant values and casting
  'LLVMConstString':          [ptr, ['CString', 'uint', 'bool']],
  'LLVMConstInt':             [ptr, [ptr, 'ulonglong', 'bool']],
  'LLVMConstIntCast':         [ptr, [ptr, ptr, 'bool']],
  'LLVMConstIntToPtr':        [ptr, [ptr, ptr]],
  'LLVMConstFPCast':          [ptr, [ptr, ptr]],
  'LLVMConstBitCast':         [ptr, [ptr, ptr]],
  'LLVMConstPointerCast':     [ptr, [ptr, ptr]],

  'LLVMGetParam':             [ptr, [ptr, 'uint']],

  'LLVMWriteBitcodeToFile':   ['int', [ptr, 'CString']]
})

module.exports = Library

