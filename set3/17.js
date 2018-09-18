const crypto = require('crypto');

module.exports = (data) => {
  console.log('The CBC padding oracle\n');

  const key      = crypto.randomBytes(16);
  const iv       = crypto.randomBytes(16);
  const target = data
    .split('\n')
    [Math.floor(Math.random() * 10)]
    .base64Decode()
    .cbcEncrypt(key, iv);

  const apiEndpoint = (ciphertext) => ciphertext.cbcDecrypt(key, iv).valPadding();
  const blockLength = 16;
  const plaintext   = target
    .paddingOracleCBC(apiEndpoint, blockLength)
    .stripPadding()
    .asciiEncode();
  console.log(plaintext);
}

Buffer.prototype.paddingOracleCBC = function (apiEndpoint, blockLength) {
  // this = target ciphertext
  const blocks = this.getBlocks(blockLength);
  const iv     = blocks[0] || blocks.shift();
  console.log('iv:', iv);
  console.log('blocks:');
  console.log(blocks);
  let plaintext = [];
  for (let i = 1; i < blocks.length; i++) {
    plaintext.push(blocks[i-1].paddingOracleCBCBlock(apiEndpoint, blockLength, blocks[i]));
  }
  return Buffer.concat(plaintext);
}

Buffer.prototype.paddingOracleCBCBlock = function (apiEndpoint, blockLength, target) {
  // this = ciphertext block c1
  // target = ciphertext block c2
  let intermState = Array(blockLength).fill(Buffer.from([0]));
  for (let i = 1; i <= blockLength; i++) {
    // console.log('*** Trying to find byte', i);
    const intermBuffer = Buffer.concat(intermState);
    const intermByte   = intermBuffer
      .paddingOracleCBCByte(apiEndpoint, blockLength, target, i);
    intermState[blockLength - i] = intermByte;
    if (intermByte < 0) throw new Error('Could not find byte ' + i);
  }
  console.log('intermState', intermState);
  return intermState;
}

Buffer.prototype.paddingOracleCBCByte = function (apiEndpoint, blockLength, target, padding) {
  // this = intermediate state block I2
  // target: ciphertext block C2
  // padding: 1-16

  const paddingTarget = Buffer.from([padding]);
  const suffixData    = [];
  for (let i = 1; i < padding; i++) {
    suffixData.unshift(paddingTarget.xor(Buffer.from([this[blockLength - i]])));
  }
  const suffix = Buffer.concat(suffixData);
  const prefix = Buffer.alloc(blockLength - padding);
  for (let i = 0; i < 256; i++) {
    const byte       = Buffer.from([i]);
    const ciphertext = Buffer.concat([prefix, byte, suffix, target]);
    // console.log('ciphertext', ciphertext);
    // console.log('ciphertext', ciphertext.length);
    if (apiEndpoint(ciphertext)) {
      const intermByte = byte.xor(paddingTarget);
      // console.log('found byte', padding, 'value', intermByte);
      return intermByte;
    }
  }
  return -1;
}
