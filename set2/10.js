module.exports = (data) => {
  console.log('Implement CBC mode\n');

  const test    = 'Oh well, whatever, nevermind';
  const key     = 'YELLOW SUBMARINE'
  const ecbTest = test
    .asciiDecode()
    .pad()
    .ecbEncrypt(key)
    .ecbDecrypt(key)
    .stripPadding()
    .asciiEncode()
    === test;
  const cbcTest = test
    .asciiDecode()
    .cbcEncrypt(key)
    .cbcDecrypt(key)
    .stripPadding()
    .asciiEncode()
    === test;

  const iv = [ 0,0,0,0,
               0,0,0,0,
               0,0,0,0,
               0,0,0,0 ];
  const plaintext = data
    .replace(/\n/g, '')
    .base64Decode()
    .cbcDecrypt(key, iv)
    .stripPadding()
    .asciiEncode();

  console.log('ECB test: ', ecbTest);
  console.log('CBC test: ', cbcTest);
  console.log('Plaintext:\n', plaintext);
}
