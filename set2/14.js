const crypto = require('crypto');

module.exports = (data) => {
  console.log('Byte-at-a-time ECB decryption (harder)\n');

  const key    = crypto.randomBytes(16);
  const length = crypto.randomBytes(1)[0] % 40 + 13;
  const prefix = crypto.randomBytes(length);
  const cipher = function (input) {
    const target    = data.replace(/\n/g, '').base64Decode();
    const plaintext = Buffer.concat([prefix, input, target]);
    return plaintext.pad().ecbEncrypt(key);
  }

  const blockLength = cipher.findBlockLength();
  console.log('1: find the block length');
  console.log('Block length:', blockLength);

  const mode = cipher.detectMode();
  console.log('2: confirm we\'re dealing with ECB encryption');
  console.log('Detected mode:', mode);

  const prefixLength = cipher.getPrefixLength(blockLength);
  console.log('3: get prefix length');
  console.log('   prefix length:', prefixLength, '| true length:', prefix.length);

  const plaintext = cipher
    .breakPrefixECB(blockLength, prefixLength)
    .stripPadding(blockLength)
    .asciiEncode();
  console.log('3: break it!');
  console.log('   Plaintext:\n', plaintext);
}

Function.prototype.breakPrefixECB = function (blockLength, prefixLength, bytes) {
  bytes = bytes || Buffer.from('');
  const targetByte   = bytes.length;
  const targetPrefix = Math.ceil(prefixLength / blockLength) * blockLength;
  const targetBlock  = Math.floor(targetByte / blockLength) * blockLength;
  const target       = [ targetPrefix + targetBlock, targetPrefix + targetBlock + blockLength ];
  const padPrefix    = blockLength - (prefixLength % blockLength || blockLength);
  const padLength    = blockLength - (targetByte % blockLength) - 1;
  const padding      = Buffer.alloc(padPrefix + padLength, 'A');
  const byte         = this.breakECBByte(padding, bytes, target);
  if (byte < 0) return bytes;
  bytes = Buffer.concat([bytes, Buffer.from(byte)]);
  return this.breakPrefixECB(blockLength, prefixLength, bytes);
}
