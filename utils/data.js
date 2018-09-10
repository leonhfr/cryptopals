String.prototype.hexDecode = function () {
  return Buffer.from(this, 'hex');
}

Buffer.prototype.base64Encode = function () {
  return this.toString('base64');
}
