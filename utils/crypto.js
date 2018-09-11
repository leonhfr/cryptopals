const crypto = require('crypto');

String.prototype.scoreText = function () {
  const frequencies = { a: 8.176, b: 1.492, c: 2.782, d: 4.253, e: 12.702,
    f: 2.228, g: 2.015, h: 6.094, i: 6.966, j: 0.153, k: 0.772, l: 4.025,
    m: 2.406, n: 6.749, o: 7.507, p: 1.929, q: 0.095, r: 5.987, s: 6.327,
    t: 9.056, u: 2.758, v: 0.978, w: 2.360, x: 0.150, y: 1.974, z: 0.074,
    ' ': 20.000 };
  return this
    .toLowerCase()
    .split('')
    .reduce((acc, char) => {
      return acc += frequencies[char] ?
        frequencies[char] :
        0;
    }, 0) / this.length;
}

Buffer.prototype.singleCharacterXor = function () {
  let search = {
    key: 0,
    score: -Infinity
  };
  for (let key = 0; key < 256; key++) {
    const score = this
      .xor(Buffer.from([key]))
      .asciiEncode()
      .scoreText();
    if (score > search.score) search = { key, score };
  }
  const plaintext = this
    .xor(Buffer.from([search.key]))
    .asciiEncode();
  return { plaintext, key: search.key };
}

Buffer.prototype.hammingDistance = function (buffer) {
  return this
    .xor(buffer)
    .bits();
}

Buffer.prototype.pad = function (blockLength) {
  blockLength = blockLength || 16;
  const padLength = blockLength - this.length % blockLength;
  if (blockLength === 0 || padLength <= 0) return this;
  return Buffer.concat([this, Buffer.alloc(padLength, padLength)]);
}

Buffer.prototype.stripPadding = function (blockLength) {
  blockLength = blockLength || 16;
  const pad = this[this.length - 1];
  if (pad < blockLength && this.valPadding(blockLength)) return this.slice(0, this.length - pad);
  else return this;
}

Buffer.prototype.valPadding = function (blockLength) {
  if (this.length % blockLength !== 0) return false;
  const pad = this[this.length - 1];
  for (let i = 0; i < pad; i++) {
    if (this[this.length - i - 1] !== pad) return false;
  }
  return true;
}

Buffer.prototype.ecbEncrypt = function (key) {
  const iv = '';
  const cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
  cipher.setAutoPadding(false);
  return Buffer.concat([cipher.update(this), cipher.final()]);
}

Buffer.prototype.ecbDecrypt = function (key) {
  const iv = '';
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
  decipher.setAutoPadding(false);
  return Buffer.concat([decipher.update(this), decipher.final()]);
}

Buffer.prototype.cbcDecrypt = function (key, iv) {
  const blockLength = 16;
  iv                = iv || Buffer.alloc(blockLength);
  const blocks      = this.getBlocks(blockLength);
  let plaintext     = [];

  plaintext.push(blocks[0].ecbDecrypt(key).xor(iv));
  blocks.slice(1).forEach((block, i) => {
    plaintext.push(block.ecbDecrypt(key).xor(blocks[i]));
  });
  return Buffer.concat(plaintext);
}

Buffer.prototype.cbcEncrypt = function (key, iv) {
  const blockLength = 16;
  iv                = iv || Buffer.alloc(blockLength);
  const blocks      = this.pad(blockLength).getBlocks(blockLength);
  let ciphertext    = [iv];

  blocks.forEach((block, i) => {
    ciphertext.push(block.xor(ciphertext[i])  .ecbEncrypt(key))
  });
  return Buffer.concat(ciphertext.slice(1));
}
