const hex = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
const sol = hex
  .hexDecode()
  .singleCharacterXor();

const key       = sol.key;
const plaintext = sol.plaintext;

module.exports = function () {
  console.log('Ciphertext: ', hex);
  console.log('Key:        ', key);
  console.log('Plaintext:  ', plaintext);
}
