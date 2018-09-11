Buffer.prototype.getBlocks = function (length, nBlocks) {
  let blocks = [];
  if (nBlocks === undefined) nBlocks = Math.ceil(this.length / length);
  for (let i = 0; i < nBlocks; i++) {
    let index = i * length;
    blocks.push(this.slice(index, index + length));
  }
  return blocks;
}

Buffer.prototype.hasDuplicateBlocks = function (length) {
  const blocks = this.getBlocks(length);
  for (let i = 0; i < blocks.length; i++) {
    const index = this.indexOf(blocks[i]);
    if (index > -1 && index !== (i * length)) return { dup: true, block: blocks[i] };
  }
  return { dup: false };
  // TODO: log positions
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
