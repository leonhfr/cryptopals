// String methods

String.prototype.hexDecode = function () {
  return Buffer.from(this, 'hex');
}

// Buffer methods

Buffer.prototype.hexEncode = function () {
  return this.toString('hex');
}

Buffer.prototype.base64Encode = function () {
  return this.toString('base64');
}

Buffer.prototype.xor = function (key) {
  return this
    .map((x, i) => (x ^ key[i % key.length]));
}
