var ffi      = require('ffi'),
    ref      = require('ref'),
    refTypes = require('./ref-types')

var ptr           = refTypes.ptr,
    void_         = ref.types.void,
    enum_         = 'int',
    TypeRefArray  = refTypes.TypeRefArray,
    ArgRefArray   = refTypes.ArgRefArray,
    CStringPtr    = ref.refType(ref.types.CString)

// Configuration for the FFI library
var libraryConfig = {
  // Modules and functions
  'LLVMModuleCreateWithName': [ptr,       ['CString']],
  'LLVMGetTarget':            ['CString', [ptr]],
  'LLVMSetTarget':            [void_,     [ptr, 'CString']],
  'LLVMGetDataLayout':        ['CString', [ptr]],
  'LLVMVerifyModule':         ['bool',    [ptr, enum_, CStringPtr]],
  'LLVMDumpModule':           [void_,     [ptr]],
  'LLVMDumpValue':            [void_,     [ptr]],
  'LLVMPrintModuleToString':  ['CString', [ptr]],
  'LLVMAddFunction':          [ptr,   [ptr, 'CString', ptr]],
  'LLVMAddGlobal':            [ptr,   [ptr, ptr, 'CString']],
  'LLVMSetLinkage':           [void_, [ptr, enum_]],
  'LLVMSetInitializer':       [void_, [ptr, ptr]],
  'LLVMSetGlobalConstant':    [void_, [ptr, 'bool']],

  'LLVMGetGlobalContext':     [ptr, []],

  'LLVMGetGlobalPassRegistry':              [ptr,    []],

  'LLVMCreatePassManager':                  [ptr,    []],
  'LLVMRunPassManager':                     ['bool', [ptr, ptr]],
  'LLVMCreateFunctionPassManagerForModule': [ptr,    [ptr]],
  'LLVMRunFunctionPassManager':             ['bool', [ptr, ptr]],

  // Scalar transformations
  'LLVMAddArgumentPromotionPass':       [void_, [ptr]],
  'LLVMAddCFGSimplificationPass':       [void_, [ptr]],
  'LLVMAddConstantMergePass':           [void_, [ptr]],
  'LLVMAddEarlyCSEPass':                [void_, [ptr]],
  'LLVMAddGVNPass':                     [void_, [ptr]],
  'LLVMAddIndVarSimplifyPass':          [void_, [ptr]],
  'LLVMAddPromoteMemoryToRegisterPass': [void_, [ptr]],
  'LLVMAddScalarReplAggregatesPass':    [void_, [ptr]],

  // Target platforms/CPUs
  'LLVMInitializeX86Target':     [void_, []],
  'LLVMInitializeX86TargetInfo': [void_, []],
  'LLVMInitializeX86TargetMC':   [void_, []],

  // Targets
  'LLVMGetDefaultTargetTriple': ['CString', []],
  'LLVMGetFirstTarget':         [ptr,       []],
  'LLVMTargetHasTargetMachine': ['bool',    [ptr]],

  // Target machines
  'LLVMCreateTargetMachine':           [ptr,       [ptr, 'CString', 'CString', 'CString', enum_, enum_, enum_]],
  'LLVMGetTargetMachineFeatureString': ['CString', [ptr]],

  // Target data
  'LLVMGetTargetMachineData':      [ptr,       [ptr]],
  'LLVMCreateTargetData':          [ptr,       ['CString']],
  'LLVMCopyStringRepOfTargetData': ['CString', [ptr]],

  // Instruction builder and support functions
  'LLVMCreateBuilder':        [ptr,   []],
  'LLVMPositionBuilderAtEnd': [void_, [ptr, ptr]],
  'LLVMAppendBasicBlock':     [ptr,   [ptr, 'CString']],
  'LLVMGetInsertBlock':       [ptr,   [ptr]],
  'LLVMGetFirstBasicBlock':   [ptr,   [ptr]],
  'LLVMGetNextBasicBlock':    [ptr,   [ptr]],
  'LLVMGetLastInstruction':   [ptr,   [ptr]],
  'LLVMGetInstructionOpcode': [enum_, [ptr]],
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
  'LLVMBuildAdd':             [ptr,   [ptr, ptr, ptr, 'CString']],
  'LLVMBuildSub':             [ptr,   [ptr, ptr, ptr, 'CString']],
  'LLVMBuildICmp':            [ptr,   [ptr, enum_, ptr, ptr, 'CString']],
  'LLVMBuildCondBr':          [ptr,   [ptr, ptr, ptr, ptr]],
  'LLVMBuildBr':              [ptr,   [ptr, ptr]],
  'LLVMBuildUnreachable':     [ptr,   [ptr]],

  // Type constructors
  'LLVMFunctionType':         [ptr,   [ptr, TypeRefArray, 'uint', 'bool']],
  'LLVMIntType':              [ptr,   ['uint']],
  'LLVMInt64Type':            [ptr,   []],
  'LLVMInt32Type':            [ptr,   []],
  'LLVMInt16Type':            [ptr,   []],
  'LLVMInt8Type':             [ptr,   []],
  'LLVMInt1Type':             [ptr,   []],
  'LLVMVoidType':             [ptr,   []],
  'LLVMPointerType':          [ptr,   [ptr, 'uint']],
  'LLVMStructType':           [ptr,   [TypeRefArray, 'uint', 'bool']],
  'LLVMStructCreateNamed':    [ptr,   [ptr, 'CString']],
  'LLVMStructSetBody':        [void_, [ptr, TypeRefArray, 'uint', 'bool']],

  // Type functions/utilities
  'LLVMDumpType':             [void_,     [ptr]],
  'LLVMTypeOf':               [ptr,       [ptr]],
  'LLVMGetElementType':       [ptr,       [ptr]],
  'LLVMGetTypeKind':          [enum_,     [ptr]],
  'LLVMPrintTypeToString':    ['CString', [ptr]],
  'LLVMABISizeOfType':        ['ulonglong', [ptr, ptr]],

  // Constant values and casting
  'LLVMConstString':          [ptr, ['CString', 'uint', 'bool']],
  'LLVMConstNull':            [ptr, [ptr]],
  'LLVMConstInt':             [ptr, [ptr, 'ulonglong', 'bool']],
  'LLVMConstIntCast':         [ptr, [ptr, ptr, 'bool']],
  'LLVMConstIntToPtr':        [ptr, [ptr, ptr]],
  'LLVMConstFPCast':          [ptr, [ptr, ptr]],
  'LLVMConstBitCast':         [ptr, [ptr, ptr]],
  'LLVMConstPointerCast':     [ptr, [ptr, ptr]],
  'LLVMConstPointerNull':     [ptr, [ptr]],

  'LLVMGetParam':             [ptr, [ptr, 'uint']],

  'LLVMWriteBitcodeToFile':   ['int', [ptr, 'CString']]
}
var Library = null
try {
  Library = ffi.Library('libLLVM-3.5', libraryConfig)
} catch (err) {
  if (/Dynamic Linking Error/.test(err.message)) {
    var out = "Uh oh! llvm2 wasn't able to dynamically link to the LLVM library.\n"+
              "Please make sure `libLLVM-3.5.dylib` is on your dynamic linker's\n"+
              "search path.\n\n";
    process.stderr.write(out)
  }
  throw err
}

Library.LLVMIntEQ = 32
Library.LLVMIntNE = Library.LLVMIntEQ + 1
Library.LLVMAbortProcessAction = 0

Library.LLVMRet        = 1
Library.LLVMBr         = 2
Library.LLVMSwitch     = 3
Library.LLVMIndirectBr = 4
Library.LLVMInvoke     = 5

var linkages = [
  'LLVMExternalLinkage',
  'LLVMAvailableExternallyLinkage',
  'LLVMLinkOnceAnyLinkage',
  'LLVMLinkOnceODRLinkage',
  'LLVMLinkOnceODRAutoHideLinkage',
  'LLVMWeakAnyLinkage',
  'LLVMWeakODRLinkage',
  'LLVMAppendingLinkage',
  'LLVMInternalLinkage',
  'LLVMPrivateLinkage',
  'LLVMDLLImportLinkage',
  'LLVMDLLExportLinkage',
  'LLVMExternalWeakLinkage',
  'LLVMGhostLinkage',
  'LLVMCommonLinkage',
  'LLVMLinkerPrivateLinkage',
  'LLVMLinkerPrivateWeakLinkage'
];
for (var i = 0; i < linkages.length; i++) {
  var linkage = linkages[i]
  Library[linkage] = i
}

Library.TerminatorInstructions = [1, 2, 3, 4, 5]

Library.newCStringPtr = function () {
  return ref.alloc(CStringPtr)
}
Library.readCStringPtr = function (ptr) {
  var buf = ptr.deref()
  return ref.readCString(buf, 0)
}

module.exports = Library

