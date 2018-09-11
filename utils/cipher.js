Function.prototype.detectMode = function () {
  const blockLength = 16;
  const data        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(10);
  const plaintext   = Buffer.from(data);
  const ciphertext  = this(plaintext);
  return ciphertext.hasDuplicateBlocks(blockLength).dup ? 'ECB' : 'CBC';
}

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
}

Function.prototype.breakECB = function (blockLength, bytes) {
  bytes = bytes || Buffer.from('');
  const targetByte  = bytes.length;
  const targetBlock = Math.floor(targetByte / blockLength) * blockLength;
  const target      = [ targetBlock, targetBlock + blockLength ];
  const padding     = Buffer.alloc(blockLength - (targetByte % blockLength) - 1, 'A');
  const byte        = this.breakECBByte(padding, bytes, target);
  if (byte < 0) return bytes;
  bytes = Buffer.concat([bytes, Buffer.from(byte)]);
  return this.breakECB(blockLength, bytes);
}

Function.prototype.breakECBByte = function (padding, bytes, target) {
  const paddedBlock = this(padding).slice(...target);
  for (let i = 0; i < 256; i++) {
    const byte      = Buffer.from([i]);
    const plaintext = this(Buffer.concat([padding, bytes, byte])).slice(...target);
    if (paddedBlock.hexEncode() === plaintext.hexEncode()) return byte;
  }
  return -1;
}
