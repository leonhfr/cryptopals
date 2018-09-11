const crypto = require('crypto');

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
