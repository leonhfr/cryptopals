// String methods

String.prototype.hexDecode = function () {
  return Buffer.from(this, 'hex');
}

String.prototype.base64Decode = function () {
  return Buffer.from(this, 'base64');
}

String.prototype.asciiDecode = function () {
  return Buffer.from(this);
}

// Buffer methods

Buffer.prototype.hexEncode = function () {
  return this.toString('hex');
}

Buffer.prototype.base64Encode = function () {
  return this.toString('base64');
}

Buffer.prototype.asciiEncode = function () {
  return this.toString();
}
