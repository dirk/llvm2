var ffi      = require('ffi'),
    ref      = require('ref'),
    refTypes = require('./ref-types')

var ptr           = refTypes.ptr,
    void_         = ref.types.void,
    TypeRefArray  = refTypes.TypeRefArray,
    ArgRefArray   = refTypes.ArgRefArray


// Build the FFI library
var Library = ffi.Library('libLLVM-3.5', {
  'LLVMModuleCreateWithName': [ptr,   ['CString']],
  'LLVMDumpModule':           [void_, [ptr]],
  'LLVMAddFunction':          [ptr,   [ptr, 'CString', ptr]],

  'LLVMCreateFunctionPassManagerForModule': [ptr, [ptr]],

  'LLVMAppendBasicBlock':     [ptr,   [ptr, 'CString']],

  'LLVMCreateBuilder':        [ptr,   []],
  'LLVMPositionBuilderAtEnd': [void_, [ptr, ptr]],
  'LLVMBuildGlobalStringPtr': [ptr,   [ptr, 'CString', 'CString']],
  'LLVMBuildCall':            [ptr,   [ptr, ptr, ArgRefArray, 'uint', 'CString']],
  'LLVMBuildRetVoid':         [ptr,   [ptr]],
  'LLVMBuildAlloca':          [ptr,   [ptr, ptr, 'CString']],
  'LLVMBuildGEP':             [ptr,   [ptr, ptr, ArgRefArray, 'uint', 'CString']],
  'LLVMBuildStructGEP':       [ptr,   [ptr, ptr, 'uint', 'CString']],
  'LLVMBuildStore':           [ptr,   [ptr, ptr, ptr]],
  'LLVMBuildLoad':            [ptr,   [ptr, ptr, 'CString']],

  'LLVMFunctionType':         [ptr, [ptr, TypeRefArray, 'uint', 'bool']],

  'LLVMInt32Type':            [ptr, []],
  'LLVMInt8Type':             [ptr, []],
  'LLVMVoidType':             [ptr, []],
  'LLVMPointerType':          [ptr, [ptr, 'uint']],
  'LLVMStructType':           [ptr, [TypeRefArray, 'uint', 'bool']],

  'LLVMConstString':          [ptr, ['CString', 'uint', 'bool']],
  'LLVMConstInt':             [ptr, [ptr, 'ulonglong', 'bool']],

  'LLVMGetParam':             [ptr, [ptr, 'uint']],

  'LLVMWriteBitcodeToFile':   ['int', [ptr, 'CString']]
})

module.exports = Library

