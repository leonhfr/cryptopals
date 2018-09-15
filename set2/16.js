const crypto = require('crypto');
const assert = require('assert');

module.exports = () => {
  console.log('CBC bitflipping attack\n');

  // DEFINE KEY AND CIPHER

  const key      = crypto.randomBytes(16);
  const iv       = crypto.randomBytes(16);
  const cipher   = {
    encrypt: (input) => {
      const prefix  = 'comment1=cooking%20MCs;userdata=';
      const suffix  = ';comment2=%20like%20a%20pound%20of%20bacon';
      return (prefix + input + suffix).asciiDecode().cbcEncrypt(key, iv);
    },
    decrypt: (input) => {
      return input.cbcDecrypt(key, iv)
    }
  };

  // FUNCTIONS TESTS

  console.log('0: test basic functions');
  assert.ok(!'hello'.encryptURL(cipher.encrypt).testURL(cipher.decrypt));
  assert.ok(!'data;admin=true'.encryptURL(cipher.encrypt).testURL(cipher.decrypt));
  assert.ok(!'dataadmin=true'.encryptURL(cipher.encrypt).testURL(cipher.decrypt));
  assert.ok(!'data;admin=true'.encryptURL(cipher.encrypt).testURL(cipher.decrypt));

  // GET TARGET BLOCK
  const targetBlock = cipher.encrypt.findTargetBlock();
  console.log('1: get target block:');
  console.log('  ', targetBlock);

  // BREAK IT
  console.log('2: break it!');
  const target = ';admin=true;';
  const broke  = cipher.breakCBC(targetBlock, target);
  console.log(broke.stripPadding().asciiEncode());
}

Object.prototype.breakCBC = function (targetBlock, target) {
  const ciphertext  = target.encryptURL(this.encrypt);
  const blocks      = ciphertext.getBlocks();
  const mutateBlock = targetBlock - 1;
  console.log('Original ciphertext:\n' + ciphertext.hexEncode());
  console.log('Original ciphertext:\n' + this.decrypt(ciphertext).stripPadding().asciiEncode());
  let index = 0;
  let lastIndex = -1;
  while (!Buffer.concat(blocks).testURL(this.decrypt, target)) {
    if (index > lastIndex) lastIndex = index;
    else throw new Error('could not find byte', index)
    for (let i = 0; i < 256; i++) {
      blocks[mutateBlock] = blocks[mutateBlock].changeByte(index, [i]);
      const testBlock     = this
        .decrypt(Buffer.concat(blocks))
        .getBlocks()
        [targetBlock];
      if (testBlock[index] === Buffer.from(target)[index]) {
        console.log('found byte', index);
        index++;
        break;
      }
    }
  }
  const plaintext = Buffer.concat(blocks);
  console.log('Ciphertext after bitflipping attack:\n' + plaintext.hexEncode());
  return this.decrypt(plaintext);
}

String.prototype.encryptURL = function (cipher) {
  const data = this.replace(/;/g, '%3B').replace(/=/g, '%3D');
  return cipher(data);
}

Buffer.prototype.testURL = function (cipher, target) {
  return cipher(this).asciiEncode().search(new RegExp(target, 'g')) > 0;
}

Function.prototype.findTargetBlock = function () {
  const stringA = Buffer.alloc(16, 'A').asciiEncode();
  const stringB = Buffer.alloc(16, 'A').changeByte(0, 'B').asciiEncode();
  const bufferA = this(stringA).getBlocks();
  const bufferB = this(stringB).getBlocks();
  for (let i = 0; i < bufferA.length; i++) {
    if (!bufferA[i].equals(bufferB[i])) return i
  }
  return -1;
}

Buffer.prototype.changeByte = function (index, byte) {
  return Buffer.concat([
    this.slice(0, index),
    Buffer.from(byte),
    this.slice(index + 1)
  ]);
}
