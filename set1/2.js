const a = '1c0111001f010100061a024b53535009181c';
const b = '686974207468652062756c6c277320657965';
const c = '746865206b696420646f6e277420706c6179';

const xor = a
  .hexDecode()
  .xor(b.hexDecode())
  .hexEncode();

module.exports = () => {
  console.log('a        ', a);
  console.log('b        ', b);
  console.log('c = a ^ b', c);
  console.log('a ^ b    ', xor);
}
