const plaintext  = 'Burning \'em, if you ain\'t quick and nimble\nI go crazy when I hear a cymbal';
const key        = 'ICE';
const expected   = '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f';
const ciphertext = Buffer
  .from(plaintext)
  .xor(Buffer.from(key))
  .hexEncode();

module.exports = () => {
  console.log('Implement repeating-key XOR:\n');
  console.log('Plaintext:  ', plaintext);
  console.log('Key:        ', key);
  console.log('Ciphertext: ', ciphertext);
  console.log('Result:     ', ciphertext === expected);
};
