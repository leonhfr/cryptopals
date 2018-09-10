// String methods

String.prototype.hexDecode = function () {
  return Buffer.from(this, 'hex');
}

String.prototype.base64Decode = function () {
  return Buffer.from(this, 'base64');
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

Buffer.prototype.toAscii = function () {
  return this.toString();
}

Buffer.prototype.bits = function () {
  return [...this]
    .map(c => c.toString(2))
    .join('')
    .replace(/0/g, '')
    .length;
}
