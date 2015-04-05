var ref = require('ref'),
    ArrayType = require('ref-array')

var ptr = ref.refType(ref.types.void)

// LLVMTypeRef *ParamTypes
var TypeRefArray = ArrayType(ptr),
    ArgRefArray  =  ArrayType(ptr)

module.exports = {
  ptr:          ptr,
  TypeRefArray: TypeRefArray,
  ArgRefArray:  ArgRefArray
}

