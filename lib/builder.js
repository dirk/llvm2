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
  // If we got a Function object rather than a Ref/Buffer
  if (fn.ptr) {
    fn = fn.ptr
  }
  // expect(fn).to.be.a(Function)
  expect(args).to.be.an('array')
  expect(name).to.be.a('string')
  var argsArray = arrayToArgRefArray(args)
  return Library.LLVMBuildCall(this.ptr, fn, argsArray, args.length, name)
}
Builder.prototype.buildRet = function (val) {
  return Library.LLVMBuildRet(this.ptr, val)
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
Builder.prototype.buildStructGEP = function (ptr, idx, name) {
  expect(ptr).to.be.a(Buffer)
  expect(idx).to.be.a('number')
  expect(name).to.be.a('string')
  return Library.LLVMBuildStructGEP(this.ptr, ptr, idx, name)
}
Builder.prototype.buildStore = function (val, ptr) {
  return Library.LLVMBuildStore(this.ptr, val, ptr)
}
Builder.prototype.buildLoad = function (ptr, name) {
  expect(name).to.be.a('string')
  return Library.LLVMBuildLoad(this.ptr, ptr, name)
}
Builder.prototype.buildICmp = function (op, lhs, rhs, name) {
  expect(op).to.be.a('number')
  expect(op).to.be.greaterThan(Library.LLVMIntEQ - 1)
  return Library.LLVMBuildICmp(this.ptr, op, lhs, rhs, name)
}
Builder.prototype.buildCondBr = function (ifBlock, thenBlock, elseBlock) {
  return Library.LLVMBuildCondBr(this.ptr, ifBlock, thenBlock, elseBlock)
}
Builder.prototype.buildBr = function (block) {
  return Library.LLVMBuildBr(this.ptr, block)
}
Builder.prototype.buildPointerCast = function (ptr, ty, name) {
  return Library.LLVMBuildPointerCast(this.ptr, ptr, ty, name)
}
Builder.prototype.buildUnreachable = function () {
  return Library.LLVMBuildUnreachable(this.ptr)
}

Builder.prototype.positionAtEnd = function (block) {
  return Library.LLVMPositionBuilderAtEnd(this.ptr, block)
}

module.exports = Builder

