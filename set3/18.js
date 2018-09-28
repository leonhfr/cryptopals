'use strict';

const assert = require('assert');

module.exports = () => {
  console.log('Implement CTR, the stream cipher mode\n');
  const ciphertext = 'L77na/nrFsKvynd6HzOoG7GHTLXsTVu9qvY/2syLXzhPweyyMTJULu/6/kXX0KSvoOLSFQ==';
  const key        = 'YELLOW SUBMARINE'.asciiDecode();
  const nonce      = Buffer.alloc(8);
  const plaintext  = ciphertext
    .base64Decode()
    .ctrEncrypt(key, nonce)
    .asciiEncode();
  console.log(plaintext);
  const reverse = plaintext
    .asciiDecode()
    .ctrEncrypt(key, nonce)
    .base64Encode();
  console.log(ciphertext === reverse ?
    'All good!' :
    'Reverse operation doesn\'t work :(');
};

Buffer.prototype.ctrEncrypt = function (key, nonce) {
  const blockLength = 16;
  const blocks      = this.getBlocks(blockLength);
  const stream      = [];
  for (let i = 0; i < blocks.length; i++) {
    // TODO: ability to count above 256...
    const count = Buffer.from([i, 0, 0, 0, 0, 0, 0, 0]);
    stream.push(Buffer.concat([nonce, count]));
  }
  const keystream   = Buffer.concat(stream).ecbEncrypt(key);
  return this.xor(keystream);
};
