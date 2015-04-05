var Library  = require('./library'),
    refTypes = require('./ref-types'),
    expect   = require('expect.js')

var ArgRefArray = refTypes.ArgRefArray

function arrayToArgRefArray (arr) {
  var argsArray = new ArgRefArray(arr.length)
  for (var i = 0; i < arr.length; i++) {
    var val = arr[i]
    argsArray[i] = val
  }
  return argsArray
}

function Builder () {
  this.ptr = Library.LLVMCreateBuilder()
}
Builder.prototype.buildGlobalStringPtr = function (str, name) {
  expect(str).to.be.a('string')
  expect(name).to.be.a('string')
  return Library.LLVMBuildGlobalStringPtr(this.ptr, str, name)
}
Builder.prototype.buildCall = function (fn, args, name) {
  expect(fn).to.be.a(Function)
  expect(args).to.be.an('array')
  expect(name).to.be.a('string')
  var argsArray = arrayToArgRefArray(args)
  return Library.LLVMBuildCall(this.ptr, fn.ptr, argsArray, args.length, name)
}
Builder.prototype.buildRetVoid = function () {
  return Library.LLVMBuildRetVoid(this.ptr)
}
Builder.prototype.buildAlloca = function (type, name) {
  return Library.LLVMBuildAlloca(this.ptr, type, name)
}
Builder.prototype.buildGEP = function (value, indices, name) {
  expect(value).to.be.a(Buffer)
  expect(indices).to.be.an(Array)
  expect(name).to.be.a('string')
  var indicesArray = arrayToArgRefArray(indices)
  return Library.LLVMBuildGEP(this.ptr, value, indicesArray, indicesArray.length, name)
}
Builder.prototype.buildStore = function (val, ptr) {
  return Library.LLVMBuildStore(this.ptr, val, ptr)
}
Builder.prototype.positionAtEnd = function (block) {
  return Library.LLVMPositionBuilderAtEnd(this.ptr, block)
}

module.exports = Builder
