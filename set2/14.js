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
  };

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
    .breakECB(blockLength, prefixLength)
    .stripPadding(blockLength)
    .asciiEncode();
  console.log('3: break it!');
  console.log('   Plaintext:\n', plaintext);
};
