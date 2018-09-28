const crypto = require('crypto');

module.exports = (data) => {
  console.log('Break fixed-nonce CTR mode using substitutions\n');

  const key   = crypto.randomBytes(16);
  const nonce = Buffer.alloc(8);

  const ciphertexts = data
    .split('\n')
    .filter(el => el.length > 0)
    .map(line => line.base64Decode().ctr(key, nonce));

  const truncLen = ciphertexts.reduce((acc, val) => {
    return Math.min(acc, val.length);
  }, Infinity);

  const ciphers    = ciphertexts.map(el => el.slice(0, truncLen));
  const transposed = ciphers.transposeBuffers();

  const keystream = [];
  for (let i = 0; i < truncLen; i++) {
    keystream.push(transposed[i].breakCTRByte().keyByte);
  }
  for (let cipher of ciphertexts) {
    const plaintext = cipher
      .slice(0, truncLen)
      .xor(Buffer.from(keystream))
      .asciiEncode();
    console.log(plaintext);
  }
};

Buffer.prototype.breakCTRByte = function () {
  const bestGuess = {
    score: 0,
    keyByte: 0
  };
  for (let char = 0; char < 256; char++) {
    const score = this
      .xor(Buffer.from([char]))
      .asciiEncode()
      .scoreText();

    if (score > bestGuess.score) {
      bestGuess.score   = score;
      bestGuess.keyByte = char;
    }
  }
  return bestGuess;
};

Array.prototype.transposeBuffers = function () {
  const transposed = [];
  for (let i = 0; i < this[0].length; i++) {
    let el = Buffer.alloc(0);
    for (let k = 0; k < this.length; k++) {
      el = Buffer.concat([el, Buffer.from([this[k][i]])]);
    }
    transposed.push(el);
  }
  return transposed;
};
