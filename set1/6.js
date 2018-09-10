module.exports = () => {
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


}
