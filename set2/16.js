const crypto = require('crypto');

module.exports = () => {
  console.log('CBC bitflipping attack\n');

  // DEFINE KEY AND CIPHER

  const key      = crypto.randomBytes(16);
  const cipher   = function (input) {
    return encryptURL(input, key);
  }
  const decipher = function (input) {
    return decryptURL(input, key);
  }

  // FUNCTIONS TESTS

  const test1 = !decryptURL(encryptURL('hello', key), key);
  const test2 = !decryptURL(encryptURL('data;admin=true', key), key);
  const test3 = !decryptURL(encryptURL('', key, 'dataadmin=true'), key);
  const test4 = decryptURL(encryptURL('', key, 'data;admin=true'), key);
  console.log('Test basic functions:');
  console.log((test1 && test2 && test3 && test4) ? 'PASS' : 'FAIL');

  
}

const encryptURL = function (input, key, test) {
  const prefix  = 'comment1=cooking%20MCs;userdata=';
  const suffix  = ';comment2=%20like%20a%20pound%20of%20bacon';
  const quoted  = test ?
    test :
    input.replace(/;/g, '%3B').replace(/=/g, '%3D');
  const data    = (prefix + quoted + suffix).asciiDecode();
  // random iv is used, will only affect the first block
  const iv      = crypto.randomBytes(16);
  const discard = crypto.randomBytes(16);
  return Buffer
    .concat([discard, data])
    .cbcEncrypt(key, iv);
}

const decryptURL = function (input, key) {
  // we discard the first decrypted block
  return input
    .cbcDecrypt(key)
    .slice(16)
    .asciiEncode()
    .search(/;admin=true;/g) > 0;
}
