Buffer.prototype.getBlocks = function (blockLength, nBlocks) {
  let blocks = [];
  blockLength  = blockLength || 16;
  nBlocks = nBlocks || Math.ceil(this.length / blockLength);
  for (let i = 0; i < nBlocks; i++) {
    const index = i * blockLength;
    blocks.push(this.slice(index, index + blockLength));
  }
  return blocks;
}

Buffer.prototype.hasDuplicateBlocks = function (length) {
  const blocks = this.getBlocks(length);
  for (let i = 0; i < blocks.length; i++) {
    const index = this.indexOf(blocks[i], i * length + length);
    if (index > -1) return { dup: true, block: blocks[i], index };
  }
  return { dup: false, index: -1 };
}

Array.prototype.transposeBlocks = function () {
  const length = this[0].length;
  let transposed = [];
  for (let i = 0; i < length; i++) {
    let block = [];
    for (let k = 0; k < this.length; k++) {
      block.push(this[k][i]);
    }
    transposed.push(Buffer.from(block));
  }
  return transposed;
}
