Buffer.prototype.pad = function (blockLength) {
  blockLength = blockLength || 16;
  const padLength = blockLength - this.length % blockLength;
  if (blockLength === 0 || padLength <= 0) return this;
  return Buffer.concat([this, Buffer.alloc(padLength, padLength)]);
}

Buffer.prototype.stripPadding = function (blockLength) {
  blockLength = blockLength || 16;
  const pad = this[this.length - 1];
  if (pad < blockLength && this.valPadding(blockLength))
    return this.slice(0, this.length - pad);
  else return this;
}

Buffer.prototype.valPadding = function (blockLength) {
  // if (this.length % blockLength !== 0) return false;
  const pad = this[this.length - 1];
  for (let i = 0; i < pad; i++) {
    if (this[this.length - i - 1] !== pad) return false;
  }
  return true;
}
