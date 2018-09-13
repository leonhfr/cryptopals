const crypto = require('crypto');

module.exports = (data) => {
  console.log('Byte-at-a-time ECB decryption\n');

  const key    = crypto.randomBytes(16);
  const cipher = function (input) {
    const buffer    = data.replace(/\n/g, '').base64Decode();
    const plaintext = Buffer.concat([input, buffer]);
    return plaintext.pad().ecbEncrypt(key);
  }

  const blockLength = cipher.findBlockLength();
  console.log('1: find the block length');
  console.log('Block length:', blockLength);

  const mode = cipher.detectMode();
  console.log('2: confirm we\'re dealing with ECB encryption');
  console.log('Detected mode:', mode);

  const plaintext = cipher
    .breakECB(blockLength, 0)
    .stripPadding()
    .asciiEncode();
  console.log('3: break it!');
  console.log('Plaintext:\n', plaintext);
}
