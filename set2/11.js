const crypto = require('crypto');

module.exports = () => {
  console.log('An ECB/CBC encryption oracle\n');

  const guesses   = 1000;
  let result      = 0;
  for (let i = 0; i < guesses; i++) {
    result += ecbOrCbc.detectModeCheck();
  }
  const rate = 100 * result / guesses;
  console.log(`Success rate: ${rate.toFixed(1)}%`);
}

const ecbOrCbc = function (plaintext) {
  const cbcMode    = crypto.randomBytes(1)[0] < 128;
  const prefix     = crypto.randomBytes(crypto.randomBytes(1)[0] % 5 + 5);
  const suffix     = crypto.randomBytes(crypto.randomBytes(1)[0] % 5 + 5);
  const data       = Buffer.concat([prefix, plaintext, suffix]);
  const key        = crypto.randomBytes(16);
  const iv         = crypto.randomBytes(16);
  const ciphertext = cbcMode ?
    data.pad().cbcEncrypt(key, iv) :
    data.pad().ecbEncrypt(key);

  return { cbcMode, ciphertext };
}

Function.prototype.detectModeCheck = function () {
  const blockLength = 16;
  const data        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(10);
  const plaintext   = Buffer.from(data);
  const ciphertext  = this(plaintext);
  const usedMode    = ciphertext.cbcMode ? 'CBC' : 'ECB';
  const detected    = ciphertext.ciphertext
    .hasDuplicateBlocks(blockLength).dup ? 'ECB' : 'CBC';
  return usedMode === detected;
}
