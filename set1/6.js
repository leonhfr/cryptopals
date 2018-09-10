module.exports = (data) => {
  console.log('Break repeating-key XOR\n');

  const a    = 'this is a test';
  const b    = 'wokka wokka!!!';
  const dist = Buffer
    .from(a)
    .hammingDistance(Buffer.from(b));

  console.log('The Hamming distance between:');
  console.log('a: ', a);
  console.log('b: ', b);
  console.log(`should be 37 and was found to be ${dist}\n`);

  const ciphertext = data.base64Decode();
  const keyLengths = findKeyLengths(ciphertext);

  console.log('Key lengths:\n');
  keyLengths.forEach(a => {
    console.log('Hamming distance: ', a.distance.toFixed(1), ' | Key length: ', a.length);
  });
  console.log('\n');

  const sol = breakXOR(ciphertext, keyLengths[0].length)

  console.log('Key:', sol.key.toAscii(), '\n');
  console.log('Plaintext:\n', sol.plaintext.toAscii());
}

function findKeyLengths (ciphertext) {
  const nBlocks  = 10;
  let keyLengths = [];

  for (let length = 2; length <= 40; length++) {
    keyLengths.push({
      length,
      distance: testKeySize(ciphertext, length, nBlocks)
    });
  }

  return keyLengths
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);
}

function testKeySize (ciphertext, length, nBlocks) {
  const blocks = ciphertext.getBlocks(length, nBlocks);

  let distance = 0;
  blocks.reduce((acc, curr) => {
    distance += acc.hammingDistance(curr);
    return curr;
  });

  return distance / length;
}

function breakXOR (ciphertext, keyLength) {
  const blocks = ciphertext
    .getBlocks(keyLength)
    .transposeBlocks();

  const keyBytes = blocks.map(x => x.singleCharacterXor().key);
  const key      = Buffer.from(keyBytes);

  return {
    keyLength,
    key,
    plaintext: ciphertext.xor(key)
  };
}
