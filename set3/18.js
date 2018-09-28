const crypto = require('crypto');

module.exports = () => {
  console.log('Implement CTR, the stream cipher mode\n');
  const ciphertext = 'L77na/nrFsKvynd6HzOoG7GHTLXsTVu9qvY/2syLXzhPweyyMTJULu/6/kXX0KSvoOLSFQ==';
  const key        = 'YELLOW SUBMARINE'.asciiDecode();
  const nonce      = Buffer.alloc(8);
  const plaintext  = ciphertext
    .base64Decode()
    .ctrDecrypt(key, nonce)
    .asciiEncode();
  console.log(plaintext);
};

Buffer.prototype.ctrEncrypt = function (key, nonce) {
  nonce = nonce || Buffer.concat([crypto.randomBytes(8), Buffer.alloc(8)]);
  const cipher = crypto.createCipheriv('aes-128-ctr', key, nonce);
  return Buffer.concat([nounce, cipher.update(this), cipher.final()]);
};

// Buffer.prototype.ctrDecrypt = function (key, nonce) {
//   nonce = nonce || this.slice(0, 16);
//   const decipher = crypto.createDecipheriv('aes-128-ctr', key, nonce);
//   return Buffer.concat([decipher.update(this), decipher.final()]);
// }

// Buffer.prototype.ctrDecrypt = function (key, nonce) {
//   const blockLength = 16;
//   const blocks      = this.getBlocks(blockLength);
//   nonce             = nonce || Buffer.alloc(8);
//   let plaintext     = [];
//   blocks.forEach((block, i) => {
//     let counter = [];
//     while (i !== 0) {
//
//     }
//     const counter = i;
//     console.log(counter);
//   });
//   return Buffer.concat(plaintext);
// }
