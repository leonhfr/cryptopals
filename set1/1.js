const hex    = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
const base64 = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';
const conversion = hex
  .hexDecode()
  .base64Encode();

module.exports = () => {
  console.log('Convert hex to base64');
  console.log('Hex:        ', hex);
  console.log('Base 64:    ', base64);
  console.log('Conversion: ', conversion);
}
