var ffi = require('ffi'),
    ref = require('ref')

var ptrType   = ref.refType(ref.types.void),
    void_     = ref.types.void

// Pull in the big FFI library
var Builder  = require('./lib/builder'),
    Library  = require('./lib/library'),
    Types    = require('./lib/types'),
    Wrappers = require('./lib/wrappers'),
    RefTypes = require('./lib/ref-types')

function constString (str) {
  var dontNullTerminate = false
  return Library.LLVMConstString(str, str.length, dontNullTerminate)
}

var toExport = {
  Builder:     Builder,
  Library:     Library,
  Types:       Types,
  RefTypes:    RefTypes,
  constString: constString
};

['FunctionType', 'Function', 'Module', 'FunctionPassManager']
.forEach(function (n) {
  toExport[n] = Wrappers[n]
})

module.exports = toExport

