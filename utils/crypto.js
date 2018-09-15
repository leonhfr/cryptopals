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
  const blocks      = this.getBlocks(blockLength);
  iv                = iv || blocks.shift();
  let plaintext     = [];
  plaintext.push(blocks[0].ecbDecrypt(key).xor(iv));
  blocks.slice(1).forEach((block, i) => {
    plaintext.push(block.ecbDecrypt(key).xor(blocks[i]));
  });
  return Buffer.concat(plaintext);
}

Buffer.prototype.cbcEncrypt = function (key, iv) {
  const blockLength = 16;
  const blocks      = this.pad(blockLength).getBlocks(blockLength);
  iv                = iv || crypto.randomBytes(blockLength);
  let ciphertext    = [iv];
  blocks.forEach((block, i) => {
    ciphertext.push(block.xor(ciphertext[i]).ecbEncrypt(key))
  });
  return Buffer.concat(ciphertext);
}

Buffer.prototype.detectMode = function (blockLength) {
  blockLength = blockLength || 16;
  return this.hasDuplicateBlocks(blockLength).dup ? 'ECB' : 'CBC';
}

Function.prototype.detectMode = function (blockLength) {
  blockLength = blockLength || 16;
  const data        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(10);
  const plaintext   = Buffer.from(data);
  const ciphertext  = this(plaintext);
  return ciphertext.hasDuplicateBlocks(blockLength).dup ? 'ECB' : 'CBC';
}
