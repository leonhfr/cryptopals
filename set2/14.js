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
}

Function.prototype.getPrefixLength = function (blockLength) {
  let padding = 3 * blockLength + 1;
  let index, lastIndex;
  do {
    padding--;
    lastIndex = index;
    const plaintext  = Buffer.alloc(padding, 'A');
    const ciphertext = this(plaintext);
    index = ciphertext.hasDuplicateBlocks(blockLength).index;
  } while (index > -1);

  if (!lastIndex) {
    throw new Error('Couldn\'t find duplicate block');
  }
  const minPadding = padding + 1 - blockLength;
  return lastIndex - minPadding;
}
