Function.prototype.detectMode = function () {
  const blockLength = 16;
  const data        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(10);
  const plaintext   = Buffer.from(data);
  const ciphertext  = this(plaintext);
  return ciphertext.hasDuplicateBlocks(blockLength).dup ? 'ECB' : 'CBC';
};

Function.prototype.findBlockLength = function () {
  const A       = Buffer.from('A');
  let data      = Buffer.from('');
  const length  = this(data).length;
  let newLength = length;
  while (length === newLength) {
    data = Buffer.concat([data, A]);
    newLength = this(data).length;
  }
  return newLength - length;
};

Function.prototype.breakECB = function (blockLength, prefixLength, bytes) {
  bytes = bytes || Buffer.from('');
  const targetByte   = bytes.length;
  const targetPrefix = Math.ceil(prefixLength / blockLength) * blockLength;
  const targetBlock  = Math.floor(targetByte / blockLength) * blockLength;
  const target       = [ targetPrefix + targetBlock, targetPrefix + targetBlock + blockLength ];
  const padPrefix    = blockLength - (prefixLength % blockLength || blockLength);
  const padLength    = blockLength - (targetByte % blockLength) - 1;
  const padding      = Buffer.alloc(padPrefix + padLength, 'A');
  const byte         = this.breakECBByte(padding, bytes, target);
  if (byte < 0) return bytes;
  bytes = Buffer.concat([bytes, Buffer.from(byte)]);
  return this.breakECB(blockLength, prefixLength, bytes);
};

Function.prototype.breakECBByte = function (padding, bytes, target) {
  const paddedBlock = this(padding).slice(...target);
  for (let i = 0; i < 256; i++) {
    const byte      = Buffer.from([i]);
    const plaintext = this(Buffer.concat([padding, bytes, byte])).slice(...target);
    if (paddedBlock.hexEncode() === plaintext.hexEncode()) return byte;
  }
  return -1;
};

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
};
