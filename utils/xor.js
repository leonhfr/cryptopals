Buffer.prototype.xor = function (key) {
  return Buffer.from(this.map((x, i) => (x ^ key[i % key.length])));
};

Buffer.prototype.singleCharacterXor = function () {
  let search = {
    key: 0,
    score: -Infinity
  };
  for (let key = 0; key < 256; key++) {
    const score = this
      .xor(Buffer.from([key]))
      .asciiEncode()
      .scoreText();
    if (score > search.score) search = { key, score };
  }
  const plaintext = this
    .xor(Buffer.from([search.key]))
    .asciiEncode();
  return { plaintext, key: search.key };
};

Buffer.prototype.hammingDistance = function (buffer) {
  return this
    .xor(buffer)
    .bits();
};

Buffer.prototype.bits = function () {
  return [...this]
    .map(c => c.toString(2))
    .join('')
    .replace(/0/g, '')
    .length;
};
