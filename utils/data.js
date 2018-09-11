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

Buffer.prototype.asciiEncode = function () {
  return this.toString();
}

Buffer.prototype.xor = function (key) {
  return this
    .map((x, i) => (x ^ key[i % key.length]));
}

Buffer.prototype.bits = function () {
  return [...this]
    .map(c => c.toString(2))
    .join('')
    .replace(/0/g, '')
    .length;
}

Buffer.prototype.getBlocks = function (length, nBlocks) {
  let blocks = [];

  if (nBlocks === undefined) nBlocks = Math.ceil(this.length / length);

  for (let i = 0; i < nBlocks; i++) {
    let index = i * length;
    blocks.push(this.slice(index, index + length));
  }

  return blocks;
}

// Array methods

Array.prototype.transposeBlocks = function () {
  const length = this[0].length;
  let transposed = [];

  for (let i = 0; i < length; i++) {
    let block = [];

    for (let k = 0; k < this.length; k++) {
      block.push(this[k][i]);
    }

    transposed.push(Buffer.from(block));
  }

  return transposed;
}
