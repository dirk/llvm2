var Library = require('./library')

module.exports = {
  Int32Type: Library.LLVMInt32Type(),
  Int8Type:  Library.LLVMInt8Type(),
  VoidType:  Library.LLVMVoidType(),
  pointerType: function (type) {
    return Library.LLVMPointerType(type, 0)
  }
}

