const crypto = require('crypto');

module.exports = (data) => {
  console.log('The CBC padding oracle\n');

  const key      = crypto.randomBytes(16);
  const iv       = crypto.randomBytes(16);
  data = data
    .split('\n')
    [Math.floor(Math.random() * 10)]
    .base64Decode();

  console.log(data);

  const randomCBC = function (data) {
    return this
      .pad()
      .cbcEncrypt(key, iv);
  }
  const isPaddingValid = function (data) {
    return this
      .cbcDecrypt(key, iv)
      .valPadding();
  }
}
