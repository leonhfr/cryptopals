module.exports = (data) => {
  console.log('AES in ECB mode\n');

  const ciphertext = data.base64Decode();
  const key        = 'YELLOW SUBMARINE';
  const plaintext  = ciphertext
    .ecbDecrypt(Buffer.from(key))
    .stripPadding(key.length)
    .asciiEncode();
  const encrypted  = plaintext
    .asciiDecode()
    .pad()
    .ecbEncrypt(Buffer.from(key))
    .base64Encode();

  console.log('Plaintext:\n', plaintext);
  console.log('Result:', ciphertext.base64Encode() === encrypted);
};
