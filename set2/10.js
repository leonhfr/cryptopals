module.exports = (data) => {
  console.log('Implement CBC mode\n');

  const plaintext = 'Oh well, whatever, nevermind';
  const key       = 'Kurt Cobain Flea'
  const ecbTest   = plaintext
    .asciiDecode()
    .pad()
    .ecbEncrypt(key)
    .ecbDecrypt(key)
    .stripPadding()
    .asciiEncode()
    === plaintext;
  const cbcTest   = plaintext
    .asciiDecode()
    .cbcEncrypt(key)
    .cbcDecrypt(key)
    .stripPadding()
    .asciiEncode()
    === plaintext;

  console.log('ECB test: ', ecbTest);
  console.log('CBC test: ', cbcTest);
}
