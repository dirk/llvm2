var Library = require('./library')

module.exports = {
  Int64Type: Library.LLVMInt64Type(),
  Int32Type: Library.LLVMInt32Type(),
  Int16Type: Library.LLVMInt16Type(),
  Int8Type:  Library.LLVMInt8Type(),
  Int1Type:  Library.LLVMInt1Type(),
  VoidType:  Library.LLVMVoidType(),
  pointerType: function (type) {
    return Library.LLVMPointerType(type, 0)
  }
}

