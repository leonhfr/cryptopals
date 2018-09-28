'use strict';

const assert = require('assert');

module.exports = () => {
  console.log('Implement CTR, the stream cipher mode\n');
  const ciphertext = 'L77na/nrFsKvynd6HzOoG7GHTLXsTVu9qvY/2syLXzhPweyyMTJULu/6/kXX0KSvoOLSFQ==';
  const key        = 'YELLOW SUBMARINE'.asciiDecode();
  const nonce      = Buffer.alloc(8);
  const plaintext  = ciphertext
    .base64Decode()
    .ctr(key, nonce)
    .asciiEncode();
  console.log(plaintext);
  const reverse = plaintext
    .asciiDecode()
    .ctr(key, nonce)
    .base64Encode();
  console.log(ciphertext === reverse ?
    'All good!' :
    'Reverse operation doesn\'t work :(');
};
