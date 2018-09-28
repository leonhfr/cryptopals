const crypto = require('crypto');

module.exports = (data) => {
  console.log('The CBC padding oracle\n');

  const key    = crypto.randomBytes(16);
  const iv     = crypto.randomBytes(16);
  const line   = 0 || Math.floor(Math.random() * 10);
  const target = data
    .split('\n')[line]
    .base64Decode()
    .cbcEncrypt(key, iv);

  console.log();
  const apiEndpoint = (ciphertext) => ciphertext.cbcDecrypt(key).valPadding();
  const blockLength = 16;
  const plaintext   = target
    .paddingOracleCBC(apiEndpoint, blockLength)
    .stripPadding()
    .asciiEncode();

  console.log('Plaintext:');
  console.log(plaintext);
};

Buffer.prototype.paddingOracleCBC = function (apiEndpoint, blockLength) {
  const blocks = this.getBlocks(blockLength);
  let plaintext = [];
  for (let i = 1; i < blocks.length; i++) {
    plaintext.push(blocks[i-1].paddingOracleCBCBlock(apiEndpoint, blockLength, blocks[i]));
  }
  return Buffer.concat(plaintext);
};

Buffer.prototype.paddingOracleCBCBlock = function (apiEndpoint, blockLength, target) {
  // this = ciphertext block c1
  // target = ciphertext block c2
  let intermState = Buffer.alloc(blockLength);
  for (let i = 1; i <= blockLength; i++) {
    const intermByte = intermState.paddingOracleCBCByte(apiEndpoint, blockLength, target, i);
    intermState[blockLength - i] = [...intermByte];
  }
  return this.xor(intermState);
};

Buffer.prototype.paddingOracleCBCByte = function (apiEndpoint, blockLength, target, padding) {
  // this = intermediate state i2
  // target: ciphertext block C2
  // padding: 1-16
  console.log('*** byte:', padding);
  console.log('THIS (interm block I2)\n', this);
  const paddingTarget = Buffer.alloc(1, padding);
  const suffixData    = [];
  for (let i = 1; i < padding; i++) {
    const buffer = Buffer.alloc(1, this[this.length - i]);
    suffixData.unshift(paddingTarget.xor(buffer));
  }
  const suffix = Buffer.concat(suffixData);
  console.log('padding target', paddingTarget);
  console.log('suffix', suffix);
  const prefix = Buffer.alloc(blockLength - padding);
  for (let i = 0; i < 256; i++) {
    const byte       = Buffer.alloc(1, i);
    const ciphertext = Buffer.concat([prefix, byte, suffix, target]);
    if (ciphertext.length !== 32) throw new Error('ciphertext not a multiple of blockLength');
    if (apiEndpoint(ciphertext)) {
      const intermByte = byte.xor(paddingTarget);
      console.log('found byte', padding, 'value', intermByte);
      return intermByte;
    }
  }
  console.log();
  console.log('CBCByte ERROR');
  console.log('this', this);
  console.log('target', target);
  console.log('prefix', prefix, prefix.length, 'suffix', suffix, suffix.length);
  throw new Error('CBCByte: Could not find byte ' + padding);
};
